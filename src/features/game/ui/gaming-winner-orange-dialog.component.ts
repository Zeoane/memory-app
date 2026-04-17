import winnerUrl from '../../../assets/img_gaming-theme/gt-orange-winner.svg?url';
import trophyUrl from '../../../assets/img_gaming-theme/pockal 1.svg?url';
import { fillTemplate } from '../../../shared/template-utils';
import { getTemplate } from '../../../shared/template-registry';

export function buildGamingWinnerOrangeDialogHtml(): string {
  return fillTemplate(getTemplate('gaming-winner-orange-dialog.html'), {
    WINNER_SVG: winnerUrl,
    TROPHY_SVG: trophyUrl,
  });
}

