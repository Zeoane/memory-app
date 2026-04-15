import winnerTpl from './templates/gaming-winner-orange-dialog.html?raw';
import winnerUrl from './assets/img_gaming-theme/gt-orange-winner.svg?url';
import trophyUrl from './assets/img_gaming-theme/pockal 1.svg?url';
import { fillTemplate } from './template-utils';

/** Builds the gaming orange winner dialog HTML. */
export function buildGamingWinnerOrangeDialogHtml(): string {
  return fillTemplate(winnerTpl, {
    WINNER_SVG: winnerUrl,
    TROPHY_SVG: trophyUrl,
  });
}

