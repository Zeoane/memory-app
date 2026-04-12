import { BOARD_SIZE_OPTIONS, getPlayerColors } from './game-constants';
import type { BoardSizeOption, GameSettings, PlayerColors, VisualThemeId } from './game-constants';
import { buildGameBarHtml } from './game-bar-html';
import { buildMemoryCardHtml } from './game-card-html';
import { buildExitConfirmDialogHtml } from './exit-confirm-dialog-html';
import { buildCodeVibesWinnerBlueDialogHtml } from './code-vibes-winner-blue-dialog-html';
import { buildCodeVibesWinnerOrangeDialogHtml } from './code-vibes-winner-orange-dialog-html';
import { buildGameOverDialogHtml } from './game-over-dialog-html';
import type { MemoryGame, MemoryGameSnapshot } from './memory-game';
import gameShellTpl from './templates/game-shell.html?raw';
import { fillTemplate } from './template-utils';

function buildGridStyle(cols: number, rows: number): string {
  return `--cols: ${cols}; --rows: ${rows};`;
}

function buildAllCardsHtml(game: MemoryGame, snap: MemoryGameSnapshot, settings: GameSettings): string {
  return snap.cards.map((_, i) => buildMemoryCardHtml(game, snap, i, settings.visualThemeId)).join('');
}

function resolveModalHtml(
  snap: MemoryGameSnapshot,
  showGameOver: boolean,
  showCodeVibesWinnerOrange: boolean,
  showCodeVibesWinnerBlue: boolean,
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
  return buildGameOverDialogHtml(snap.scores[0], snap.scores[1], colors, visualThemeId);
}

function resolveBoardOption(settings: GameSettings): BoardSizeOption {
  const found = BOARD_SIZE_OPTIONS.find((b) => b.id === settings.boardSizeId);
  /* Ungültige oder veraltete boardSizeId (z. B. nach Sync) würde sonst die ganze Spielansicht leeren. */
  return found ?? BOARD_SIZE_OPTIONS[0];
}

function assembleGameScreen(
  game: MemoryGame,
  settings: GameSettings,
  showGameOver: boolean,
  showCodeVibesWinnerOrange: boolean,
  showCodeVibesWinnerBlue: boolean,
  showExitConfirm: boolean,
): string {
  const snap = game.getSnapshot();
  const colors = getPlayerColors(settings.firstPlayerColor);
  const board = resolveBoardOption(settings);
  const parts = {
    GAME_BAR: buildGameBarHtml(snap, colors, settings.visualThemeId),
    GRID_STYLE: buildGridStyle(board.cols, board.rows),
    CARDS: buildAllCardsHtml(game, snap, settings),
    GAME_OVER: resolveModalHtml(
      snap,
      showGameOver,
      showCodeVibesWinnerOrange,
      showCodeVibesWinnerBlue,
      colors,
      settings.visualThemeId,
    ),
    EXIT_CONFIRM: showExitConfirm ? buildExitConfirmDialogHtml() : '',
  };
  return fillTemplate(gameShellTpl, parts);
}

/**
 * Vollständiges Markup der Spielansicht inkl. optionalem Game-over-Dialog.
 */
export function buildGameScreenHtml(
  game: MemoryGame | null,
  settings: GameSettings,
  showGameOver: boolean,
  showCodeVibesWinnerOrange: boolean,
  showCodeVibesWinnerBlue: boolean,
  showExitConfirm: boolean,
): string {
  if (game === null) {
    return `<main class="screen screen--game" role="alert">
  <div class="screen__content screen__content--wide">
    <p class="screen__subtitle">Es ist kein Spiel aktiv. Bitte über die Einstellungen eine neue Runde starten.</p>
    <nav class="screen__nav" aria-label="Navigation">
      <ul class="screen__nav-list">
        <li><button type="button" class="btn btn--primary" data-action="go-settings">Zu den Einstellungen</button></li>
      </ul>
    </nav>
  </div>
</main>`;
  }
  return assembleGameScreen(game, settings, showGameOver, showCodeVibesWinnerOrange, showCodeVibesWinnerBlue, showExitConfirm);
}
