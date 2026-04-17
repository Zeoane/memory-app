import confettiUrl from '../../../assets/img_code_vibes-theme/Confetti.svg?url';
import pawnUrl from '../../../assets/img_code_vibes-theme/chess_pawn-winner-blue.svg?url';
import winnerBlueUrl from '../../../assets/img_code_vibes-theme/winner-blue.svg?url';
import { fillTemplate } from '../../../shared/template-utils';
import { getTemplate } from '../../../shared/template-registry';

export function buildCodeVibesWinnerBlueDialogHtml(): string {
  return fillTemplate(getTemplate('code-vibes-winner-blue-dialog.html'), {
    CONFETTI_SVG: confettiUrl,
    WINNER_BLUE_SVG: winnerBlueUrl,
    PAWN_SVG: pawnUrl,
  });
}

