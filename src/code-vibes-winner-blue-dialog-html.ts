import cvWinnerBlueTpl from './templates/code-vibes-winner-blue-dialog.html?raw';
import confettiUrl from './assets/img_code_vibes-theme/Confetti.svg?url';
import pawnUrl from './assets/img_code_vibes-theme/chess_pawn-winner-blue.svg?url';
import winnerBlueUrl from './assets/img_code_vibes-theme/winner-blue.svg?url';
import { fillTemplate } from './template-utils';

/** Builds the code-vibes blue winner dialog HTML. */
export function buildCodeVibesWinnerBlueDialogHtml(): string {
  return fillTemplate(cvWinnerBlueTpl, {
    CONFETTI_SVG: confettiUrl,
    WINNER_BLUE_SVG: winnerBlueUrl,
    PAWN_SVG: pawnUrl,
  });
}
