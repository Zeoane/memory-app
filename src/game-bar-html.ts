import type { PlayerColors } from './game-constants';
import type { MemoryGameSnapshot } from './memory-game';

const PLAYER_ONE_INDEX = 0;

function buildScorePairRow(label: string, score: number, spanClass: string): string {
  return `<div class="game-bar__pair">
            <dt class="game-bar__score-label">${label}</dt>
            <dd class="game-bar__score-value"><span class="${spanClass}">${score}</span></dd>
          </div>`;
}

function buildScoresDlHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const c1 = `score score--p1 player-tag player-tag--${colors.player1}`;
  const c2 = `score score--p2 player-tag player-tag--${colors.player2}`;
  const inner = `${buildScorePairRow('Spieler 1', snap.scores[0], c1)}${buildScorePairRow(
    'Spieler 2',
    snap.scores[1],
    c2,
  )}`;
  return `<dl class="game-bar__scores">${inner}</dl>`;
}

function buildCurrentPlayerClass(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const isFirst = snap.currentPlayer === PLAYER_ONE_INDEX;
  return isFirst ? `player-tag--${colors.player1}` : `player-tag--${colors.player2}`;
}

function buildCurrentPlayerLabel(snap: MemoryGameSnapshot): string {
  const isFirst = snap.currentPlayer === PLAYER_ONE_INDEX;
  return isFirst ? 'Spieler 1' : 'Spieler 2';
}

function buildTurnParagraphHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const cls = buildCurrentPlayerClass(snap, colors);
  const label = buildCurrentPlayerLabel(snap);
  return `<p class="game-bar__turn">Am Zug: <strong class="player-tag ${cls}">${label}</strong></p>`;
}

function buildExitNavHtml(): string {
  return `<nav class="game-bar__nav" aria-label="Spielaktionen">
          <ul class="game-bar__nav-list">
            <li>
              <button type="button" class="btn btn--ghost" data-action="exit-game">Exit Game</button>
            </li>
          </ul>
        </nav>`;
}

/**
 * Erzeugt die Kopfzeile der Spielansicht (Punkte, Zug, Navigation).
 */
export function buildGameBarHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  return `${buildScoresDlHtml(snap, colors)}${buildTurnParagraphHtml(snap, colors)}${buildExitNavHtml()}`;
}
