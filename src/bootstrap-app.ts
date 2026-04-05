import { renderApp } from './app-render';

const APP_MOUNT_ID = 'app';

/**
 * Sucht das Mount-Element und startet die erste Render-Runde.
 */
export function bootstrapApp(): void {
  const root = document.getElementById(APP_MOUNT_ID);
  if (root === null) {
    return;
  }
  renderApp(root);
}
