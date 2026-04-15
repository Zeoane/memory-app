import { BOARD_SIZE_OPTIONS, getPlayerColors } from './game-constants';
import type { BoardSizeOption, GameSettings, PlayerColors, VisualThemeId } from './game-constants';
import { buildGameBarHtml } from './game-bar-html';
import { buildMemoryCardHtml } from './game-card-html';
import { buildExitConfirmDialogHtml } from './exit-confirm-dialog-html';
import { buildCodeVibesWinnerBlueDialogHtml } from './code-vibes-winner-blue-dialog-html';
import { buildCodeVibesWinnerOrangeDialogHtml } from './code-vibes-winner-orange-dialog-html';
import { buildGamingWinnerBlueDialogHtml } from './gaming-winner-blue-dialog-html';
import { buildGamingWinnerOrangeDialogHtml } from './gaming-winner-orange-dialog-html';
import { buildGameOverDialogHtml } from './game-over-dialog-html';
import type { MemoryGame, MemoryGameSnapshot } from './memory-game';
import gameShellTpl from './templates/game-shell.html?raw';
import { fillTemplate } from './template-utils';

/** Builds CSS custom properties for the grid size. */
function buildGridStyle(cols: number, rows: number): string {
  return `--cols: ${cols}; --rows: ${rows};`;
}

/** Builds the HTML for all cards in the current snapshot. */
function buildAllCardsHtml(game: MemoryGame, snap: MemoryGameSnapshot, settings: GameSettings): string {
  return snap.cards.map((_, i) => buildMemoryCardHtml(game, snap, i, settings.visualThemeId)).join('');
}

/** Resolves the modal HTML for game-over / winner overlays / exit confirmation. */
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

/** Resolves the board option and falls back defensively when needed. */
function resolveBoardOption(settings: GameSettings): BoardSizeOption {
  const found = BOARD_SIZE_OPTIONS.find((b) => b.id === settings.boardSizeId);
  /* A stale/invalid boardSizeId should not blank the entire game view. */
  return found ?? BOARD_SIZE_OPTIONS[0];
}

/** Assembles the full in-game screen including the optional modal layer. */
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
      showGamingWinnerOrange,
      showGamingWinnerBlue,
      colors,
      settings.visualThemeId,
    ),
    EXIT_CONFIRM: showExitConfirm ? buildExitConfirmDialogHtml(settings.visualThemeId) : '',
  };
  return fillTemplate(gameShellTpl, parts);
}

/**
 * Builds the full game view HTML, including optional modals.
 */
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
  if (settings.visualThemeId === 'da-projects' || settings.visualThemeId === 'foods') {
    return `<main class="screen screen--game" role="alert">
  <div class="screen__content screen__content--wide">
    <p class="screen__subtitle">
      Dieses Game Theme steht aktuell nicht zur Verfügung. Bitte wähle &quot;Code vibes&quot; oder &quot;Gaming theme&quot;
      in den Einstellungen.
    </p>
    <nav class="screen__nav" aria-label="Navigation">
      <ul class="screen__nav-list">
        <li><button type="button" class="btn btn--primary" data-action="go-settings">Zu den Einstellungen</button></li>
      </ul>
    </nav>
  </div>
</main>`;
  }
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

  const snap = game.getSnapshot();
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

  // When the round is complete, render game-over as a standalone view (no board behind).
  if (snap.isComplete && showGameOver) {
    return `<main class="screen screen--game">${gameOverOnly}</main>`;
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
