import winnerTpl from './templates/gaming-winner-blue-dialog.html?raw';
import winnerUrl from './assets/img_gaming-theme/gt-blue-winner.svg?url';
import trophyUrl from './assets/img_gaming-theme/pockal 1.svg?url';
import { fillTemplate } from './template-utils';

/** Builds the gaming blue winner dialog HTML. */
export function buildGamingWinnerBlueDialogHtml(): string {
  return fillTemplate(winnerTpl, {
    WINNER_SVG: winnerUrl,
    TROPHY_SVG: trophyUrl,
  });
}

