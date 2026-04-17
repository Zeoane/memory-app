import type { VisualThemeId } from '../../../domain/game-constants';
import { getTemplate } from '../../../shared/template-registry';

export function buildExitConfirmDialogHtml(visualThemeId: VisualThemeId): string {
  const exitConfirmTpl = getTemplate('exit-confirm-dialog.html');
  if (visualThemeId !== 'gaming') {
    return exitConfirmTpl;
  }
  return exitConfirmTpl
    .replace('>Back to game<', '>No, back to game<')
    .replace('>Exit game<', '>Yes, quit game<');
}

