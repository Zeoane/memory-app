import type { PlayerColors, VisualThemeId } from './game-constants';
import { escapeHtml } from './html-utils';
import { getWinnerLabel } from './memory-game';
import gameOverCodeVibesTpl from './templates/game-over-dialog-code-vibes.html?raw';
import gameOverGamingTpl from './templates/game-over-dialog-gaming.html?raw';
import gameOverTpl from './templates/game-over-dialog.html?raw';
import { fillTemplate } from './template-utils';
import gameOverHeroUrl from './assets/img_code_vibes-theme/game over.svg?url';
import labelBlueUrl from './assets/img_code_vibes-theme/label-blue.svg?url';
import labelOrangeUrl from './assets/img_code_vibes-theme/label-orange.svg?url';
import chessPawnOrangeUrl from './assets/img_gaming-theme/gt-chess_pawn-orange.svg?url';
import chessPawnBlueUrl from './assets/img_gaming-theme/gt-chess_pawn-blue.svg?url';

/** Builds the generic score line for non-themed dialogs. */
function buildScoreLineHtml(p1: number, p2: number, colors: PlayerColors): string {
  return `Spieler 1: <span class="player-tag player-tag--${colors.player1}">${p1}</span> · Spieler 2: <span class="player-tag player-tag--${colors.player2}">${p2}</span>`;
}

/** Returns a short winner message for the generic dialog. */
function resolveWinnerMessage(winner: 'player1' | 'player2' | 'draw'): string {
  if (winner === 'draw') {
    return 'Unentschieden!';
  }
  if (winner === 'player1') {
    return 'Spieler 1 gewinnt!';
  }
  return 'Spieler 2 gewinnt!';
}

/** Returns the CSS modifier for highlighting a non-draw winner line. */
function buildWinnerModifier(winner: 'player1' | 'player2' | 'draw'): string {
  const isDraw = winner === 'draw';
  return isDraw ? '' : ' modal__winner--highlight';
}

/** Maps raw scores to blue/orange scores based on the selected first player color. */
function resolveBlueOrangeScores(
  scoreP1: number,
  scoreP2: number,
  colors: PlayerColors,
): { blue: number; orange: number } {
  const blue = colors.player1 === 'blue' ? scoreP1 : scoreP2;
  const orange = colors.player1 === 'orange' ? scoreP1 : scoreP2;
  return { blue, orange };
}

/** Returns true if orange wins (blue vs orange), excluding draws. */
export function codeVibesOrangeWins(scoreP1: number, scoreP2: number, colors: PlayerColors): boolean {
  const { blue, orange } = resolveBlueOrangeScores(scoreP1, scoreP2, colors);
  return orange > blue;
}

/** Returns true if blue wins (blue vs orange), excluding draws. */
export function codeVibesBlueWins(scoreP1: number, scoreP2: number, colors: PlayerColors): boolean {
  const { blue, orange } = resolveBlueOrangeScores(scoreP1, scoreP2, colors);
  return blue > orange;
}

/** Builds the code-vibes themed game-over dialog HTML. */
function buildCodeVibesGameOverHtml(scoreP1: number, scoreP2: number, colors: PlayerColors): string {
  const { blue, orange } = resolveBlueOrangeScores(scoreP1, scoreP2, colors);
  const isDraw = blue === orange;
  const drawBanner = isDraw
    ? '<p class="modal--game-over-cv__draw">Draw / Unentschieden</p>'
    : '';
  return fillTemplate(gameOverCodeVibesTpl, {
    GAME_OVER_SVG: gameOverHeroUrl,
    LABEL_BLUE: labelBlueUrl,
    LABEL_ORANGE: labelOrangeUrl,
    BLUE_SCORE: String(blue),
    ORANGE_SCORE: String(orange),
    DRAW_BANNER: drawBanner,
  });
}

/** Builds the gaming themed scores panel HTML. */
function buildGamingScoresPanelHtml(scoreP1: number, scoreP2: number, colors: PlayerColors): string {
  const { blue, orange } = resolveBlueOrangeScores(scoreP1, scoreP2, colors);
  return `<div class="game-bar__scores-panel game-bar__scores-panel--gaming">
            <div class="game-bar__scores game-bar__scores--gaming" role="group" aria-label="Punktestände">
              <div class="game-bar__pair game-bar__pair--gaming">
                <img class="game-bar__pawn-icon" src="${chessPawnOrangeUrl}" alt="" width="22" height="28" decoding="async" />
                <span class="game-bar__score-num game-bar__score-num--gaming game-bar__score-num--orange">${orange}</span>
              </div>
              <div class="game-bar__pair game-bar__pair--gaming">
                <img class="game-bar__pawn-icon" src="${chessPawnBlueUrl}" alt="" width="22" height="28" decoding="async" />
                <span class="game-bar__score-num game-bar__score-num--gaming game-bar__score-num--blue">${blue}</span>
              </div>
            </div>
          </div>`;
}

/** Builds the gaming themed game-over dialog HTML. */
function buildGamingGameOverHtml(scoreP1: number, scoreP2: number, colors: PlayerColors): string {
  return fillTemplate(gameOverGamingTpl, {
    SCORES_PANEL: buildGamingScoresPanelHtml(scoreP1, scoreP2, colors),
  });
}

/**
 * Builds the game-over dialog HTML for the given theme.
 */
export function buildGameOverDialogHtml(
  scoreP1: number,
  scoreP2: number,
  colors: PlayerColors,
  visualThemeId: VisualThemeId,
): string {
  if (visualThemeId === 'code-vibes') {
    return buildCodeVibesGameOverHtml(scoreP1, scoreP2, colors);
  }
  if (visualThemeId === 'gaming') {
    return buildGamingGameOverHtml(scoreP1, scoreP2, colors);
  }
  const winner = getWinnerLabel([scoreP1, scoreP2]);
  const message = resolveWinnerMessage(winner);
  const scoreLine = buildScoreLineHtml(scoreP1, scoreP2, colors);
  return fillTemplate(gameOverTpl, {
    SCORE_LINE: scoreLine,
    WINNER_MODIFIER: buildWinnerModifier(winner),
    MESSAGE: escapeHtml(message),
  });
}
