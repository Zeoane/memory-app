import { appState } from './app-state';
import { bindAppEvents } from './bind-app-events';
import { applyThemeClasses } from './dom-apply-theme';
import { buildGameScreenHtml } from './game-screen-html';
import { buildHomeHtml } from './home-html';
import { buildSettingsHtml } from './settings-html';

function resolveViewHtml(): string {
  const view = appState.view;
  if (view === 'home') {
    return buildHomeHtml();
  }
  if (view === 'settings') {
    return buildSettingsHtml(appState.settings);
  }
  return buildGameScreenHtml(appState.game, appState.settings, appState.showGameOver);
}

/**
 * Rendert die aktuelle Ansicht und bindet Events an das Wurzelelement.
 */
export function renderApp(root: HTMLElement): void {
  applyThemeClasses(root, appState.settings, appState.view);
  root.innerHTML = resolveViewHtml();
  bindAppEvents(root, () => renderApp(root));
}
