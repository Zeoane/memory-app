/**
 * SVG icon URLs for the code-vibes card fronts.
 */
const CODE_VIBES_ICON_MODULES = import.meta.glob<string>('../assets/img_code_vibes-theme/code-icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

/** Returns the filename stem (without extension) for a module path. */
function stemFromPath(path: string): string {
  const seg = path.split('/').pop() ?? path;
  return seg.replace(/\.svg$/i, '');
}

/** Precomputed icon URL lookup by filename stem. */
const CODE_VIBES_ICON_URL_BY_STEM: ReadonlyMap<string, string> = new Map(
  Object.entries(CODE_VIBES_ICON_MODULES).map(([path, url]) => [stemFromPath(path), url]),
);

/** Returns the icon URL for a given code-vibes symbol key. */
export function getCodeVibesIconUrl(symbol: string): string | undefined {
  return CODE_VIBES_ICON_URL_BY_STEM.get(symbol);
}
