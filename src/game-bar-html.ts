import type { PlayerColors, VisualThemeId } from './game-constants';
import type { MemoryGameSnapshot } from './memory-game';
import labelBlueUrl from './assets/img_code_vibes-theme/label-blue.svg?url';
import labelOrangeUrl from './assets/img_code_vibes-theme/label-orange.svg?url';
import exitGameIconUrl from './assets/img_settings_themes/exit_game.svg?url';

const PLAYER_ONE_INDEX = 0;

function buildScorePairRow(label: string, score: number, spanClass: string): string {
  return `<div class="game-bar__pair">
            <span class="game-bar__score-label">${label}</span>
            <span class="game-bar__score-value"><span class="${spanClass}">${score}</span></span>
          </div>`;
}

function buildScoresBlockHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const c1 = `score score--p1 player-tag player-tag--${colors.player1}`;
  const c2 = `score score--p2 player-tag player-tag--${colors.player2}`;
  const inner = `${buildScorePairRow('Spieler 1', snap.scores[0], c1)}${buildScorePairRow(
    'Spieler 2',
    snap.scores[1],
    c2,
  )}`;
  return `<div class="game-bar__scores-panel">
            <div class="game-bar__scores" role="group" aria-label="Punktestände">${inner}</div>
          </div>`;
}

function buildCodeVibesScoresHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const blueScore = colors.player1 === 'blue' ? snap.scores[0] : snap.scores[1];
  const orangeScore = colors.player1 === 'orange' ? snap.scores[0] : snap.scores[1];
  return `<div class="game-bar__scores-panel game-bar__scores-panel--code-vibes">
            <div class="game-bar__scores game-bar__scores--code-vibes" role="group" aria-label="Punktestände">
              <div class="game-bar__pair game-bar__pair--code-vibes">
                <img class="game-bar__label-icon" src="${labelBlueUrl}" alt="" width="24" height="20" decoding="async" />
                <span class="game-bar__player-name">Blue</span>
                <span class="game-bar__score-num game-bar__score-num--blue">${blueScore}</span>
              </div>
              <div class="game-bar__pair game-bar__pair--code-vibes">
                <img class="game-bar__label-icon" src="${labelOrangeUrl}" alt="" width="24" height="20" decoding="async" />
                <span class="game-bar__player-name">Orange</span>
                <span class="game-bar__score-num game-bar__score-num--orange">${orangeScore}</span>
              </div>
            </div>
          </div>`;
}

function buildCurrentPlayerClass(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const isFirst = snap.currentPlayer === PLAYER_ONE_INDEX;
  return isFirst ? `player-tag--${colors.player1}` : `player-tag--${colors.player2}`;
}

function buildCurrentPlayerNameForAria(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const p = snap.currentPlayer === PLAYER_ONE_INDEX ? colors.player1 : colors.player2;
  return p === 'blue' ? 'Blue' : 'Orange';
}

function resolveCurrentPlayerLabelIconUrl(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const p = snap.currentPlayer === PLAYER_ONE_INDEX ? colors.player1 : colors.player2;
  return p === 'blue' ? labelBlueUrl : labelOrangeUrl;
}

function buildCurrentPlayerLabelDe(snap: MemoryGameSnapshot): string {
  const isFirst = snap.currentPlayer === PLAYER_ONE_INDEX;
  return isFirst ? 'Spieler 1' : 'Spieler 2';
}

function buildTurnParagraphHtml(snap: MemoryGameSnapshot, colors: PlayerColors, theme: VisualThemeId): string {
  if (theme === 'code-vibes') {
    const iconUrl = resolveCurrentPlayerLabelIconUrl(snap, colors);
    const currentName = buildCurrentPlayerNameForAria(snap, colors);
    return `<p class="game-bar__turn game-bar__turn--code-vibes" role="status" aria-live="polite">
              <span class="game-bar__turn-prefix">Current player:</span>
              <img class="game-bar__turn-current-label" src="${iconUrl}" alt="" width="24" height="20" decoding="async" />
              <span class="visually-hidden">${currentName}</span>
            </p>`;
  }
  const cls = buildCurrentPlayerClass(snap, colors);
  const label = buildCurrentPlayerLabelDe(snap);
  return `<p class="game-bar__turn">Am Zug: <strong class="player-tag ${cls}">${label}</strong></p>`;
}

function buildExitNavHtml(): string {
  return `<nav class="game-bar__nav" aria-label="Spielaktionen">
            <button type="button" class="btn btn--game-exit" data-action="exit-game">
              <img class="btn--game-exit__icon" src="${exitGameIconUrl}" alt="" width="30" height="30" decoding="async" />
              <span class="btn--game-exit__label">Exit game</span>
            </button>
          </nav>`;
}

/**
 * Generates the header of the game view (scores, move, navigation).
 */
export function buildGameBarHtml(
  snap: MemoryGameSnapshot,
  colors: PlayerColors,
  visualThemeId: VisualThemeId,
): string {
  const scoresBlock =
    visualThemeId === 'code-vibes' ? buildCodeVibesScoresHtml(snap, colors) : buildScoresBlockHtml(snap, colors);
  return `${scoresBlock}${buildTurnParagraphHtml(snap, colors, visualThemeId)}${buildExitNavHtml()}`;
}
