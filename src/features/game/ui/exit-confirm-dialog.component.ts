import type { VisualThemeId } from '../../../domain/game-constants';
import { getTemplate } from '../../../shared/template-registry';

/** Builds the HTML for the exit confirmation dialog, applying theme-specific 
  label overrides if the 'gaming' theme is active.*/
export function buildExitConfirmDialogHtml(visualThemeId: VisualThemeId): string {
  const exitConfirmTpl = getTemplate('exit-confirm-dialog.html');
  if (visualThemeId !== 'gaming') {
    return exitConfirmTpl;
  }
  return exitConfirmTpl
    .replace('>Back to game<', '>No, back to game<')
    .replace('>Exit game<', '>Yes, quit game<');
}

