import type { PlayerColors } from './game-constants';
import { escapeHtml } from './html-utils';
import { getWinnerLabel } from './memory-game';
import gameOverTpl from './templates/game-over-dialog.html?raw';
import { fillTemplate } from './template-utils';

function buildScoreLineHtml(p1: number, p2: number, colors: PlayerColors): string {
  return `Spieler 1: <span class="player-tag player-tag--${colors.player1}">${p1}</span> · Spieler 2: <span class="player-tag player-tag--${colors.player2}">${p2}</span>`;
}

function resolveWinnerMessage(winner: 'player1' | 'player2' | 'draw'): string {
  if (winner === 'draw') {
    return 'Unentschieden!';
  }
  if (winner === 'player1') {
    return 'Spieler 1 gewinnt!';
  }
  return 'Spieler 2 gewinnt!';
}

function buildWinnerModifier(winner: 'player1' | 'player2' | 'draw'): string {
  const isDraw = winner === 'draw';
  return isDraw ? '' : ' modal__winner--highlight';
}

/**
 * Markup für den Game-over-Dialog mit Punkten und Gewinnermeldung.
 */
export function buildGameOverDialogHtml(scoreP1: number, scoreP2: number, colors: PlayerColors): string {
  const winner = getWinnerLabel([scoreP1, scoreP2]);
  const message = resolveWinnerMessage(winner);
  const scoreLine = buildScoreLineHtml(scoreP1, scoreP2, colors);
  return fillTemplate(gameOverTpl, {
    SCORE_LINE: scoreLine,
    WINNER_MODIFIER: buildWinnerModifier(winner),
    MESSAGE: escapeHtml(message),
  });
}
