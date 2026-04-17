import winnerUrl from '../../../assets/img_gaming-theme/gt-blue-winner.svg?url';
import trophyUrl from '../../../assets/img_gaming-theme/pockal 1.svg?url';
import { fillTemplate } from '../../../shared/template-utils';
import { getTemplate } from '../../../shared/template-registry';

export function buildGamingWinnerBlueDialogHtml(): string {
  return fillTemplate(getTemplate('gaming-winner-blue-dialog.html'), {
    WINNER_SVG: winnerUrl,
    TROPHY_SVG: trophyUrl,
  });
}

