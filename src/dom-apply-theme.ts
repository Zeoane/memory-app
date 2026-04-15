import type { GameSettings } from './game-constants';
import type { ViewId } from './app-state';

const APP_ROOT_CLASS = 'app-root';

/**
 * Applies root CSS classes for the current theme and view.
 * @param root App root element
 * @param settings Current game settings
 * @param view Current view id
 */
export function applyThemeClasses(root: HTMLElement, settings: GameSettings, view: ViewId): void {
  root.className = '';
  root.classList.add(APP_ROOT_CLASS);
  root.classList.add(`theme--${settings.visualThemeId}`);
  if (view === 'settings') {
    root.classList.add('app-root--settings');
    return;
  }
}
