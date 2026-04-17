import type { PlayerColors, VisualThemeId } from '../../../domain/game-constants';
import { escapeHtml } from '../../../shared/escape-text';
import { getWinnerLabel } from '../../../domain/memory-game';
import { fillTemplate } from '../../../shared/template-utils';
import { getTemplate } from '../../../shared/template-registry';
import gameOverHeroUrl from '../../../assets/img_code_vibes-theme/game over.svg?url';
import labelBlueUrl from '../../../assets/img_code_vibes-theme/label-blue.svg?url';
import labelOrangeUrl from '../../../assets/img_code_vibes-theme/label-orange.svg?url';
import chessPawnOrangeUrl from '../../../assets/img_gaming-theme/gt-chess_pawn-orange.svg?url';
import chessPawnBlueUrl from '../../../assets/img_gaming-theme/gt-chess_pawn-blue.svg?url';

/** Builds the generic score line HTML for the game-over dialog. */
function buildScoreLineHtml(p1: number, p2: number, colors: PlayerColors): string {
  return fillTemplate(getTemplate('game-over-score-line.html'), {
    P1_COLOR: colors.player1,
    P1_SCORE: String(p1),
    P2_COLOR: colors.player2,
    P2_SCORE: String(p2),
  });
}

/** Resolves a localized winner message for generic themes. */
function resolveWinnerMessage(winner: 'player1' | 'player2' | 'draw'): string {
  if (winner === 'draw') {
    return 'Unentschieden!';
  }
  if (winner === 'player1') {
    return 'Spieler 1 gewinnt!';
  }
  return 'Spieler 2 gewinnt!';
}

/** Returns the CSS modifier for winner highlighting. */
function buildWinnerModifier(winner: 'player1' | 'player2' | 'draw'): string {
  return winner === 'draw' ? '' : ' modal__winner--highlight';
}

/** Resolves blue/orange scores based on player color mapping. */
function resolveBlueOrangeScores(
  scoreP1: number,
  scoreP2: number,
  colors: PlayerColors,
): { blue: number; orange: number } {
  const blue = colors.player1 === 'blue' ? scoreP1 : scoreP2;
  const orange = colors.player1 === 'orange' ? scoreP1 : scoreP2;
  return { blue, orange };
}

/** True if orange wins in code-vibes/gaming themes. */
export function codeVibesOrangeWins(scoreP1: number, scoreP2: number, colors: PlayerColors): boolean {
  const { blue, orange } = resolveBlueOrangeScores(scoreP1, scoreP2, colors);
  return orange > blue;
}

/** True if blue wins in code-vibes/gaming themes. */
export function codeVibesBlueWins(scoreP1: number, scoreP2: number, colors: PlayerColors): boolean {
  const { blue, orange } = resolveBlueOrangeScores(scoreP1, scoreP2, colors);
  return blue > orange;
}

/** Builds the code-vibes themed game-over dialog HTML. */
function buildCodeVibesGameOverHtml(scoreP1: number, scoreP2: number, colors: PlayerColors): string {
  const { blue, orange } = resolveBlueOrangeScores(scoreP1, scoreP2, colors);
  const drawBanner = blue === orange ? getTemplate('game-over-cv-draw-banner.html') : '';
  return fillTemplate(getTemplate('game-over-dialog-code-vibes.html'), {
    GAME_OVER_SVG: gameOverHeroUrl,
    LABEL_BLUE: labelBlueUrl,
    LABEL_ORANGE: labelOrangeUrl,
    BLUE_SCORE: String(blue),
    ORANGE_SCORE: String(orange),
    DRAW_BANNER: drawBanner,
  });
}

/** Builds the gaming scores panel HTML. */
function buildGamingScoresPanelHtml(scoreP1: number, scoreP2: number, colors: PlayerColors): string {
  const { blue, orange } = resolveBlueOrangeScores(scoreP1, scoreP2, colors);
  return fillTemplate(getTemplate('gaming-scores-panel.html'), {
    PAWN_ORANGE_SRC: chessPawnOrangeUrl,
    PAWN_BLUE_SRC: chessPawnBlueUrl,
    ORANGE_SCORE: String(orange),
    BLUE_SCORE: String(blue),
  });
}

/** Builds the gaming themed game-over dialog HTML. */
function buildGamingGameOverHtml(scoreP1: number, scoreP2: number, colors: PlayerColors): string {
  return fillTemplate(getTemplate('game-over-dialog-gaming.html'), {
    SCORES_PANEL: buildGamingScoresPanelHtml(scoreP1, scoreP2, colors),
  });
}

/** Builds the game-over dialog HTML for the selected theme. */
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
  return fillTemplate(getTemplate('game-over-dialog.html'), {
    SCORE_LINE: buildScoreLineHtml(scoreP1, scoreP2, colors),
    WINNER_MODIFIER: buildWinnerModifier(winner),
    MESSAGE: escapeHtml(resolveWinnerMessage(winner)),
  });
}

