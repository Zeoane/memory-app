import { renderApp } from './render-app';
import { preloadTemplates } from '../shared/template-registry';

const APP_MOUNT_ID = 'app';

/**
 * Locate the mount element and start the first render cycle.
 * Preloads templates before the initial render.
 */
export async function bootstrapApp(): Promise<void> {
  const root = document.getElementById(APP_MOUNT_ID);
  if (root === null) {
    return;
  }
  await preloadTemplates();
  renderApp(root);
}

