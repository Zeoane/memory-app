import { BOARD_SIZE_OPTIONS, getPlayerColors } from '../../domain/game-constants';
import type { BoardSizeOption, GameSettings, PlayerColors, VisualThemeId } from '../../domain/game-constants';
import { buildGameBarHtml } from './ui/game-bar.component';
import { buildMemoryCardHtml } from './ui/memory-card.component';
import { buildExitConfirmDialogHtml } from './ui/exit-confirm-dialog.component';
import {
  buildCodeVibesWinnerBlueDialogHtml,
  buildCodeVibesWinnerOrangeDialogHtml,
  buildGamingWinnerBlueDialogHtml,
  buildGamingWinnerOrangeDialogHtml,
} from './ui/winner-dialogs.component';
import { buildGameOverDialogHtml } from './ui/game-over-dialog.component';
import type { MemoryGame, MemoryGameSnapshot } from '../../domain/memory-game';
import { fillTemplate } from '../../shared/template-utils';
import { getTemplate } from '../../shared/template-registry';

type GameOverFlags = {
  readonly showGameOver: boolean;
  readonly showCodeVibesWinnerOrange: boolean;
  readonly showCodeVibesWinnerBlue: boolean;
  readonly showGamingWinnerOrange: boolean;
  readonly showGamingWinnerBlue: boolean;
};

type UiFlags = GameOverFlags & {
  readonly showExitConfirm: boolean;
};

/** Builds the CSS grid sizing style for a board. */
function buildGridStyle(cols: number, rows: number): string {
  return `--cols: ${cols}; --rows: ${rows};`;
}

/** Builds the full cards HTML for the current deck snapshot. */
function buildAllCardsHtml(game: MemoryGame, snap: MemoryGameSnapshot, settings: GameSettings): string {
  return snap.cards.map((_, i) => buildMemoryCardHtml(game, snap, i, settings.visualThemeId)).join('');
}

function resolveWinnerDialogHtml(flags: GameOverFlags, visualThemeId: VisualThemeId): string | null {
  if (visualThemeId === 'code-vibes' && flags.showCodeVibesWinnerBlue) return buildCodeVibesWinnerBlueDialogHtml();
  if (visualThemeId === 'code-vibes' && flags.showCodeVibesWinnerOrange) return buildCodeVibesWinnerOrangeDialogHtml();
  if (visualThemeId === 'gaming' && flags.showGamingWinnerBlue) return buildGamingWinnerBlueDialogHtml();
  if (visualThemeId === 'gaming' && flags.showGamingWinnerOrange) return buildGamingWinnerOrangeDialogHtml();
  return null;
}

function resolveDefaultGameOverDialogHtml(
  snap: MemoryGameSnapshot,
  colors: PlayerColors,
  visualThemeId: VisualThemeId,
): string {
  return buildGameOverDialogHtml(snap.scores[0], snap.scores[1], colors, visualThemeId);
}

/** Resolves the dialog HTML to show on game-over. */
function resolveModalHtml(
  snap: MemoryGameSnapshot,
  flags: GameOverFlags,
  colors: PlayerColors,
  visualThemeId: VisualThemeId,
): string {
  if (!snap.isComplete || !flags.showGameOver) return '';
  return resolveWinnerDialogHtml(flags, visualThemeId) ?? resolveDefaultGameOverDialogHtml(snap, colors, visualThemeId);
}

/** Resolves the selected board option from settings. */
function resolveBoardOption(settings: GameSettings): BoardSizeOption {
  const found = BOARD_SIZE_OPTIONS.find((b) => b.id === settings.boardSizeId);
  return found ?? BOARD_SIZE_OPTIONS[0];
}

type GameScreenContext = {
  readonly snap: MemoryGameSnapshot;
  readonly colors: PlayerColors;
  readonly board: BoardSizeOption;
};

function resolveGameScreenContext(game: MemoryGame, settings: GameSettings): GameScreenContext {
  return {
    snap: game.getSnapshot(),
    colors: getPlayerColors(settings.firstPlayerColor),
    board: resolveBoardOption(settings),
  };
}

/** Builds the full template replacements for the game screen. */
function buildGameScreenParts(
  game: MemoryGame,
  settings: GameSettings,
  flags: UiFlags,
): Record<string, string> {
  const ctx = resolveGameScreenContext(game, settings);
  return {
    GAME_BAR: buildGameBarHtml(ctx.snap, ctx.colors, settings.visualThemeId),
    GRID_STYLE: buildGridStyle(ctx.board.cols, ctx.board.rows),
    CARDS: buildAllCardsHtml(game, ctx.snap, settings),
    GAME_OVER: resolveModalHtml(ctx.snap, flags, ctx.colors, settings.visualThemeId),
    EXIT_CONFIRM: flags.showExitConfirm ? buildExitConfirmDialogHtml(settings.visualThemeId) : '',
  };
}

/** Renders the main game shell with cards, bar, and modals. */
function assembleGameScreen(
  game: MemoryGame,
  settings: GameSettings,
  flags: UiFlags,
): string {
  const parts = buildGameScreenParts(game, settings, flags);
  return fillTemplate(getTemplate('game-shell.html'), parts);
}

/** Resolves the effective theme id used for the settings preview. */
function isUnavailableTheme(id: VisualThemeId): boolean {
  return id === 'da-projects' || id === 'foods';
}

function resolveUnavailableThemeHtml(settings: GameSettings): string | null {
  return isUnavailableTheme(settings.visualThemeId) ? getTemplate('game-unavailable-theme.html') : null;
}

function shouldRenderStandaloneGameOver(snap: MemoryGameSnapshot, flags: GameOverFlags): boolean {
  return snap.isComplete && flags.showGameOver;
}

/** Builds the standalone game-over screen HTML for completed rounds. */
function buildStandaloneGameOverHtml(
  snap: MemoryGameSnapshot,
  settings: GameSettings,
  flags: GameOverFlags,
): string {
  if (!snap.isComplete || !flags.showGameOver) return '';
  const colors = getPlayerColors(settings.firstPlayerColor);
  const gameOverOnly = resolveModalHtml(
    snap,
    flags,
    colors,
    settings.visualThemeId,
  );
  return fillTemplate(getTemplate('game-over-standalone.html'), { GAME_OVER: gameOverOnly });
}

/** Builds the full game screen HTML based on current settings and state. */
export function buildGameScreenHtml(
  game: MemoryGame | null,
  settings: GameSettings,
  flags: UiFlags,
): string {
  const themeGuard = resolveUnavailableThemeHtml(settings);
  if (themeGuard) return themeGuard;
  if (game === null) return getTemplate('game-no-active-game.html');
  const snap = game.getSnapshot();
  return shouldRenderStandaloneGameOver(snap, flags)
    ? buildStandaloneGameOverHtml(snap, settings, flags)
    : assembleGameScreen(game, settings, flags);
}

