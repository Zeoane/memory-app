type TemplateName =
  | 'home.html'
  | 'settings-shell.html'
  | 'settings-board-size-section.html'
  | 'settings-player-color-section.html'
  | 'settings-visual-theme-section.html'
  | 'game-shell.html'
  | 'exit-confirm-dialog.html'
  | 'game-over-dialog.html'
  | 'game-over-dialog-code-vibes.html'
  | 'game-over-dialog-gaming.html'
  | 'code-vibes-winner-blue-dialog.html'
  | 'code-vibes-winner-orange-dialog.html'
  | 'gaming-winner-blue-dialog.html'
  | 'gaming-winner-orange-dialog.html'
  | 'controller-figure.html'
  | 'settings-board-size-item.html'
  | 'settings-player-color-item.html'
  | 'settings-visual-theme-item.html'
  | 'game-unavailable-theme.html'
  | 'game-no-active-game.html'
  | 'game-over-cv-draw-banner.html'
  | 'gaming-scores-panel.html'
  | 'settings-preview.html'
  | 'game-over-standalone.html'
  | 'game-over-score-line.html'
  | 'game-bar-score-row.html'
  | 'game-bar-scores-panel.html'
  | 'game-bar-generic-score-left.html'
  | 'game-bar-generic-score-right.html'
  | 'game-bar-cv-score-left.html'
  | 'game-bar-cv-score-right.html'
  | 'game-bar-gt-score-left.html'
  | 'game-bar-gt-score-right.html'
  | 'game-bar-turn-code-vibes.html'
  | 'game-bar-turn-gaming.html'
  | 'game-bar-turn-generic.html'
  | 'game-bar-exit-nav.html'
  | 'memory-card-wrapper.html'
  | 'memory-card-inner.html'
  | 'memory-card-face-back-illustrated.html'
  | 'memory-card-face-back-text.html'
  | 'memory-card-face-front-illustrated.html'
  | 'memory-card-face-front-text.html';

const TEMPLATE_BASE_URL = './templates/';
const TEMPLATE_NAMES: readonly TemplateName[] = [
  'home.html',
  'settings-shell.html',
  'settings-board-size-section.html',
  'settings-player-color-section.html',
  'settings-visual-theme-section.html',
  'game-shell.html',
  'exit-confirm-dialog.html',
  'game-over-dialog.html',
  'game-over-dialog-code-vibes.html',
  'game-over-dialog-gaming.html',
  'code-vibes-winner-blue-dialog.html',
  'code-vibes-winner-orange-dialog.html',
  'gaming-winner-blue-dialog.html',
  'gaming-winner-orange-dialog.html',
  'controller-figure.html',
  'settings-board-size-item.html',
  'settings-player-color-item.html',
  'settings-visual-theme-item.html',
  'game-unavailable-theme.html',
  'game-no-active-game.html',
  'game-over-cv-draw-banner.html',
  'gaming-scores-panel.html',
  'settings-preview.html',
  'game-over-standalone.html',
  'game-over-score-line.html',
  'game-bar-score-row.html',
  'game-bar-scores-panel.html',
  'game-bar-generic-score-left.html',
  'game-bar-generic-score-right.html',
  'game-bar-cv-score-left.html',
  'game-bar-cv-score-right.html',
  'game-bar-gt-score-left.html',
  'game-bar-gt-score-right.html',
  'game-bar-turn-code-vibes.html',
  'game-bar-turn-gaming.html',
  'game-bar-turn-generic.html',
  'game-bar-exit-nav.html',
  'memory-card-wrapper.html',
  'memory-card-inner.html',
  'memory-card-face-back-illustrated.html',
  'memory-card-face-back-text.html',
  'memory-card-face-front-illustrated.html',
  'memory-card-face-front-text.html',
];

const TEMPLATE_CACHE = new Map<TemplateName, string>();

/** Fetches a template file from the public templates directory. */
async function fetchTemplate(name: TemplateName): Promise<string> {
  const res = await fetch(`${TEMPLATE_BASE_URL}${name}`, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error(`Failed to load template "${name}" (${res.status} ${res.statusText})`);
  }
  return await res.text();
}

/** Loads all known templates and returns their HTML strings. */
async function fetchAllTemplates(): Promise<readonly string[]> {
  return await Promise.all(TEMPLATE_NAMES.map((name) => fetchTemplate(name)));
}

/** Writes loaded templates into the in-memory cache. */
function populateTemplateCache(templates: readonly string[]): void {
  TEMPLATE_NAMES.forEach((name, i) => TEMPLATE_CACHE.set(name, templates[i] ?? ''));
}

/**
 * Preloads all templates from `public/templates/` into an in-memory cache.
 * Must be called once during app bootstrap before the first render.
 */
export async function preloadTemplates(): Promise<void> {
  const loaded = await fetchAllTemplates();
  populateTemplateCache(loaded);
}

/** Returns a preloaded template string (sync). */
export function getTemplate(name: TemplateName): string {
  const tpl = TEMPLATE_CACHE.get(name);
  if (tpl === undefined) {
    throw new Error(`Template "${name}" not preloaded. Call preloadTemplates() before rendering.`);
  }
  return tpl;
}

