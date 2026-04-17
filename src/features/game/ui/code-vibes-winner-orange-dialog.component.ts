import confettiUrl from '../../../assets/img_code_vibes-theme/Confetti.svg?url';
import pawnOrangeUrl from '../../../assets/img_code_vibes-theme/chess_pawn-winner-orange.svg?url';
import winnerOrangeUrl from '../../../assets/img_code_vibes-theme/winner-orange.svg?url';
import { fillTemplate } from '../../../shared/template-utils';
import { getTemplate } from '../../../shared/template-registry';

export function buildCodeVibesWinnerOrangeDialogHtml(): string {
  return fillTemplate(getTemplate('code-vibes-winner-orange-dialog.html'), {
    CONFETTI_SVG: confettiUrl,
    WINNER_ORANGE_SVG: winnerOrangeUrl,
    PAWN_SVG: pawnOrangeUrl,
  });
}

