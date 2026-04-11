import { renderApp } from './app-render';

const APP_MOUNT_ID = 'app';

/**
 * Locate the mount element and start the first render cycle.
 */
export function bootstrapApp(): void {
  const root = document.getElementById(APP_MOUNT_ID);
  if (root === null) {
    return;
  }
  renderApp(root);
}
