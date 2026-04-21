import codeVibesConfettiUrl from '../../../assets/img_code_vibes-theme/Confetti.svg?url';
import codeVibesPawnBlueUrl from '../../../assets/img_code_vibes-theme/chess_pawn-winner-blue.svg?url';
import codeVibesPawnOrangeUrl from '../../../assets/img_code_vibes-theme/chess_pawn-winner-orange.svg?url';
import codeVibesWinnerBlueUrl from '../../../assets/img_code_vibes-theme/winner-blue.svg?url';
import codeVibesWinnerOrangeUrl from '../../../assets/img_code_vibes-theme/winner-orange.svg?url';
import gamingWinnerBlueUrl from '../../../assets/img_gaming-theme/gt-blue-winner.svg?url';
import gamingWinnerOrangeUrl from '../../../assets/img_gaming-theme/gt-orange-winner.svg?url';
import gamingTrophyUrl from '../../../assets/img_gaming-theme/pockal 1.svg?url';
import { fillTemplate } from '../../../shared/template-utils';
import { getTemplate } from '../../../shared/template-registry';

/**
 * Builds the HTML markup for the Code Vibes themed "blue player wins" dialog.
 * @returns 
 */
export function buildCodeVibesWinnerBlueDialogHtml(): string {
  return fillTemplate(getTemplate('code-vibes-winner-blue-dialog.html'), {
    CONFETTI_SVG: codeVibesConfettiUrl,
    WINNER_BLUE_SVG: codeVibesWinnerBlueUrl,
    PAWN_SVG: codeVibesPawnBlueUrl,
  });
}

/**
 * Builds the HTML markup for the Code Vibes themed "orange player wins" dialog.
 * @returns 
 */
export function buildCodeVibesWinnerOrangeDialogHtml(): string {
  return fillTemplate(getTemplate('code-vibes-winner-orange-dialog.html'), {
    CONFETTI_SVG: codeVibesConfettiUrl,
    WINNER_ORANGE_SVG: codeVibesWinnerOrangeUrl,
    PAWN_SVG: codeVibesPawnOrangeUrl,
  });
}

/**
 * Builds the HTML markup for the Gaming themed "blue player wins" dialog.
 * @returns 
 */
export function buildGamingWinnerBlueDialogHtml(): string {
  return fillTemplate(getTemplate('gaming-winner-blue-dialog.html'), {
    WINNER_SVG: gamingWinnerBlueUrl,
    TROPHY_SVG: gamingTrophyUrl,
  });
}

/**
 * Builds the HTML markup for the Gaming themed "orange player wins" dialog.
 * @returns 
 */
export function buildGamingWinnerOrangeDialogHtml(): string {
  return fillTemplate(getTemplate('gaming-winner-orange-dialog.html'), {
    WINNER_SVG: gamingWinnerOrangeUrl,
    TROPHY_SVG: gamingTrophyUrl,
  });
}
