/**
 * SVG-Icons für die Kartenfront im Theme „Code vibes“ (Ordner code-icons/).
 * Keys = Dateiname ohne .svg, synchron zu CODE_VIBES_PAIRS in game-constants.ts.
 */
const modules = import.meta.glob<string>('./assets/img_code_vibes-theme/code-icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

function stemFromPath(path: string): string {
  const seg = path.split('/').pop() ?? path;
  return seg.replace(/\.svg$/i, '');
}

const urlByStem: ReadonlyMap<string, string> = new Map(
  Object.entries(modules).map(([path, url]) => [stemFromPath(path), url]),
);

export function getCodeVibesIconUrl(symbol: string): string | undefined {
  return urlByStem.get(symbol);
}
