import { BOARD_SIZE_OPTIONS, getPlayerColors } from '../../domain/game-constants';
import type { BoardSizeOption, GameSettings, PlayerColors, VisualThemeId } from '../../domain/game-constants';
import { buildGameBarHtml } from './ui/game-bar.component';
import { buildMemoryCardHtml } from './ui/memory-card.component';
import { buildExitConfirmDialogHtml } from './ui/exit-confirm-dialog.component';
import { buildCodeVibesWinnerBlueDialogHtml } from './ui/code-vibes-winner-blue-dialog.component';
import { buildCodeVibesWinnerOrangeDialogHtml } from './ui/code-vibes-winner-orange-dialog.component';
import { buildGamingWinnerBlueDialogHtml } from './ui/gaming-winner-blue-dialog.component';
import { buildGamingWinnerOrangeDialogHtml } from './ui/gaming-winner-orange-dialog.component';
import { buildGameOverDialogHtml } from './ui/game-over-dialog.component';
import type { MemoryGame, MemoryGameSnapshot } from '../../domain/memory-game';
import { fillTemplate } from '../../shared/template-utils';
import { getTemplate } from '../../shared/template-registry';

/** Builds the CSS grid sizing style for a board. */
function buildGridStyle(cols: number, rows: number): string {
  return `--cols: ${cols}; --rows: ${rows};`;
}

/** Builds the full cards HTML for the current deck snapshot. */
function buildAllCardsHtml(game: MemoryGame, snap: MemoryGameSnapshot, settings: GameSettings): string {
  return snap.cards.map((_, i) => buildMemoryCardHtml(game, snap, i, settings.visualThemeId)).join('');
}

/** Resolves the dialog HTML to show on game-over. */
function resolveModalHtml(
  snap: MemoryGameSnapshot,
  showGameOver: boolean,
  showCodeVibesWinnerOrange: boolean,
  showCodeVibesWinnerBlue: boolean,
  showGamingWinnerOrange: boolean,
  showGamingWinnerBlue: boolean,
  colors: PlayerColors,
  visualThemeId: VisualThemeId,
): string {
  if (!snap.isComplete || !showGameOver) {
    return '';
  }
  if (visualThemeId === 'code-vibes' && showCodeVibesWinnerBlue) {
    return buildCodeVibesWinnerBlueDialogHtml();
  }
  if (visualThemeId === 'code-vibes' && showCodeVibesWinnerOrange) {
    return buildCodeVibesWinnerOrangeDialogHtml();
  }
  if (visualThemeId === 'gaming' && showGamingWinnerBlue) {
    return buildGamingWinnerBlueDialogHtml();
  }
  if (visualThemeId === 'gaming' && showGamingWinnerOrange) {
    return buildGamingWinnerOrangeDialogHtml();
  }
  return buildGameOverDialogHtml(snap.scores[0], snap.scores[1], colors, visualThemeId);
}

/** Resolves the selected board option from settings. */
function resolveBoardOption(settings: GameSettings): BoardSizeOption {
  const found = BOARD_SIZE_OPTIONS.find((b) => b.id === settings.boardSizeId);
  return found ?? BOARD_SIZE_OPTIONS[0];
}

/** Builds the full template replacements for the game screen. */
function buildGameScreenParts(
  game: MemoryGame,
  settings: GameSettings,
  showGameOver: boolean,
  showCodeVibesWinnerOrange: boolean,
  showCodeVibesWinnerBlue: boolean,
  showGamingWinnerOrange: boolean,
  showGamingWinnerBlue: boolean,
  showExitConfirm: boolean,
): Record<string, string> {
  const snap = game.getSnapshot();
  const colors = getPlayerColors(settings.firstPlayerColor);
  const board = resolveBoardOption(settings);
  return {
    GAME_BAR: buildGameBarHtml(snap, colors, settings.visualThemeId),
    GRID_STYLE: buildGridStyle(board.cols, board.rows),
    CARDS: buildAllCardsHtml(game, snap, settings),
    GAME_OVER: resolveModalHtml(
      snap,
      showGameOver,
      showCodeVibesWinnerOrange,
      showCodeVibesWinnerBlue,
      showGamingWinnerOrange,
      showGamingWinnerBlue,
      colors,
      settings.visualThemeId,
    ),
    EXIT_CONFIRM: showExitConfirm ? buildExitConfirmDialogHtml(settings.visualThemeId) : '',
  };
}

/** Renders the main game shell with cards, bar, and modals. */
function assembleGameScreen(
  game: MemoryGame,
  settings: GameSettings,
  showGameOver: boolean,
  showCodeVibesWinnerOrange: boolean,
  showCodeVibesWinnerBlue: boolean,
  showGamingWinnerOrange: boolean,
  showGamingWinnerBlue: boolean,
  showExitConfirm: boolean,
): string {
  const parts = buildGameScreenParts(
    game,
    settings,
    showGameOver,
    showCodeVibesWinnerOrange,
    showCodeVibesWinnerBlue,
    showGamingWinnerOrange,
    showGamingWinnerBlue,
    showExitConfirm,
  );
  return fillTemplate(getTemplate('game-shell.html'), parts);
}

/** Resolves the effective theme id used for the settings preview. */
function isUnavailableTheme(id: VisualThemeId): boolean {
  return id === 'da-projects' || id === 'foods';
}

/** Builds the standalone game-over screen HTML for completed rounds. */
function buildStandaloneGameOverHtml(
  snap: MemoryGameSnapshot,
  settings: GameSettings,
  showGameOver: boolean,
  showCodeVibesWinnerOrange: boolean,
  showCodeVibesWinnerBlue: boolean,
  showGamingWinnerOrange: boolean,
  showGamingWinnerBlue: boolean,
): string {
  if (!snap.isComplete || !showGameOver) return '';
  const colors = getPlayerColors(settings.firstPlayerColor);
  const gameOverOnly = resolveModalHtml(
    snap,
    showGameOver,
    showCodeVibesWinnerOrange,
    showCodeVibesWinnerBlue,
    showGamingWinnerOrange,
    showGamingWinnerBlue,
    colors,
    settings.visualThemeId,
  );
  return fillTemplate(getTemplate('game-over-standalone.html'), { GAME_OVER: gameOverOnly });
}

/** Builds the full game screen HTML based on current settings and state. */
export function buildGameScreenHtml(
  game: MemoryGame | null,
  settings: GameSettings,
  showGameOver: boolean,
  showCodeVibesWinnerOrange: boolean,
  showCodeVibesWinnerBlue: boolean,
  showGamingWinnerOrange: boolean,
  showGamingWinnerBlue: boolean,
  showExitConfirm: boolean,
): string {
  if (isUnavailableTheme(settings.visualThemeId)) {
    return getTemplate('game-unavailable-theme.html');
  }
  if (game === null) {
    return getTemplate('game-no-active-game.html');
  }

  const snap = game.getSnapshot();
  if (snap.isComplete && showGameOver) {
    return buildStandaloneGameOverHtml(
      snap,
      settings,
      showGameOver,
      showCodeVibesWinnerOrange,
      showCodeVibesWinnerBlue,
      showGamingWinnerOrange,
      showGamingWinnerBlue,
    );
  }

  return assembleGameScreen(
    game,
    settings,
    showGameOver,
    showCodeVibesWinnerOrange,
    showCodeVibesWinnerBlue,
    showGamingWinnerOrange,
    showGamingWinnerBlue,
    showExitConfirm,
  );
}

