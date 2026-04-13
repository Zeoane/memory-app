import exitConfirmTpl from './templates/exit-confirm-dialog.html?raw';
import type { VisualThemeId } from './game-constants';

/** Markup für den Exit-Bestätigungsdialog (Figma: 539×270, vertikaler Flow). */
export function buildExitConfirmDialogHtml(visualThemeId: VisualThemeId): string {
  if (visualThemeId !== 'gaming') {
    return exitConfirmTpl;
  }
  return exitConfirmTpl
    .replace('>Back to game<', '>No, back to game<')
    .replace('>Exit game<', '>Yes, quit game<');
}
