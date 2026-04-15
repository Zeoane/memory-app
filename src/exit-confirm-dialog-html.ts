import exitConfirmTpl from './templates/exit-confirm-dialog.html?raw';
import type { VisualThemeId } from './game-constants';

/** Builds the exit confirmation dialog HTML for the given theme. */
export function buildExitConfirmDialogHtml(visualThemeId: VisualThemeId): string {
  if (visualThemeId !== 'gaming') {
    return exitConfirmTpl;
  }
  return exitConfirmTpl
    .replace('>Back to game<', '>No, back to game<')
    .replace('>Exit game<', '>Yes, quit game<');
}
