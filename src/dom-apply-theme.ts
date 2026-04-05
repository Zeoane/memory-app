import { getLayoutOption } from './game-constants';
import type { GameSettings } from './game-constants';
import type { ViewId } from './app-state';

const APP_ROOT_CLASS = 'app-root';

/**
 * Setzt Theme- und Layout-Klassen am App-Container.
 * @param root Wurzelelement der SPA
 * @param settings aktuelle Spiel-Einstellungen
 * @param view aktuelle Ansicht (Einstellungen: helle Oberfläche ohne Layout-Verlauf)
 */
export function applyThemeClasses(root: HTMLElement, settings: GameSettings, view: ViewId): void {
  root.className = '';
  root.classList.add(APP_ROOT_CLASS);
  root.classList.add(`theme--${settings.visualThemeId}`);
  if (view === 'settings') {
    root.classList.add('app-root--settings');
    return;
  }
  root.classList.add(getLayoutOption(settings.layoutId).cssClass);
}
