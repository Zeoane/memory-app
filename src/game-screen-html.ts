import { BOARD_SIZE_OPTIONS, getPlayerColors } from './game-constants';
import type { GameSettings, PlayerColors } from './game-constants';
import { buildGameBarHtml } from './game-bar-html';
import { buildMemoryCardHtml } from './game-card-html';
import { buildGameOverDialogHtml } from './game-over-dialog-html';
import type { MemoryGame, MemoryGameSnapshot } from './memory-game';
import gameShellTpl from './templates/game-shell.html?raw';
import { fillTemplate } from './template-utils';

function buildGridStyle(cols: number, rows: number): string {
  return `--cols: ${cols}; --rows: ${rows};`;
}

function buildAllCardsHtml(game: MemoryGame, snap: MemoryGameSnapshot): string {
  return snap.cards.map((_, i) => buildMemoryCardHtml(game, snap, i)).join('');
}

function resolveModalHtml(
  snap: MemoryGameSnapshot,
  showGameOver: boolean,
  colors: PlayerColors,
): string {
  const shouldShow = showGameOver && snap.isComplete;
  if (!shouldShow) {
    return '';
  }
  return buildGameOverDialogHtml(snap.scores[0], snap.scores[1], colors);
}

function assembleGameScreen(game: MemoryGame, settings: GameSettings, showGameOver: boolean): string {
  const snap = game.getSnapshot();
  const colors = getPlayerColors(settings.firstPlayerColor);
  const board = BOARD_SIZE_OPTIONS.find((b) => b.id === settings.boardSizeId);
  if (board === undefined) {
    return '';
  }
  const parts = {
    GAME_BAR: buildGameBarHtml(snap, colors),
    GRID_STYLE: buildGridStyle(board.cols, board.rows),
    CARDS: buildAllCardsHtml(game, snap),
    GAME_OVER: resolveModalHtml(snap, showGameOver, colors),
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
): string {
  if (game === null) {
    return '';
  }
  return assembleGameScreen(game, settings, showGameOver);
}
