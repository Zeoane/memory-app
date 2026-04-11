import { getLayoutOption } from './game-constants';
import type { GameSettings } from './game-constants';
import type { ViewId } from './app-state';

const APP_ROOT_CLASS = 'app-root';

/**
 * Sets theme and layout classes on the app container.
 * @param root 
 * @param settings 
 * @param view 
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
