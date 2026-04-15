import { appState } from './app-state';
import { bindAppEvents } from './bind-app-events';
import { applyThemeClasses } from './dom-apply-theme';
import { buildGameScreenHtml } from './game-screen-html';
import { buildHomeHtml } from './home-html';
import { buildSettingsHtml } from './settings-html';

/** Resolves the HTML string for the current app view. */
function resolveViewHtml(): string {
  const view = appState.view;
  if (view === 'home') {
    return buildHomeHtml();
  }
  if (view === 'settings') {
    return buildSettingsHtml(appState.settings, appState.settingsDraft);
  }
  return buildGameScreenHtml(
    appState.game,
    appState.settings,
    appState.showGameOver,
    appState.showCodeVibesWinnerOrange,
    appState.showCodeVibesWinnerBlue,
    appState.showGamingWinnerOrange,
    appState.showGamingWinnerBlue,
    appState.showExitConfirm,
  );
}

/**
 * Renders the current view and binds events to the root element.
 */
export function renderApp(root: HTMLElement): void {
  applyThemeClasses(root, appState.settings, appState.view);
  root.innerHTML = resolveViewHtml();
  bindAppEvents(root, () => renderApp(root));
}
