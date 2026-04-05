/**
 * Zentrale Konfiguration: Spielfeldgrößen, Themes, Layouts und Spielerfarben.
 */

export type BoardSizeId = '4x4' | '4x6' | '6x6';

export interface BoardSizeOption {
  readonly id: BoardSizeId;
  readonly cols: number;
  readonly rows: number;
  readonly label: string;
}

export const BOARD_SIZE_OPTIONS: readonly BoardSizeOption[] = [
  { id: '4x4', cols: 4, rows: 4, label: '16 cards' },
  { id: '4x6', cols: 4, rows: 6, label: '24 cards' },
  { id: '6x6', cols: 6, rows: 6, label: '36 cards' },
] as const;

/** Optische Darstellung des Spielfeldes (Game themes in den Einstellungen). */
export type VisualThemeId = 'code-vibes' | 'gaming' | 'da-projects' | 'foods';

export interface VisualTheme {
  readonly id: VisualThemeId;
  readonly label: string;
  readonly description: string;
}

export const VISUAL_THEMES: readonly VisualTheme[] = [
  { id: 'code-vibes', label: 'Code vibes theme', description: 'Teal, klarer Dev-Look' },
  { id: 'gaming', label: 'Gaming theme', description: 'Neon-Kanten, dunkle Karten' },
  { id: 'da-projects', label: 'DA Projects theme', description: 'Sachlich, hoher Kontrast' },
  { id: 'foods', label: 'Foods theme', description: 'Warme Töne, einladend' },
] as const;

/**
 * Layouts: verändern Farbschema und Themengebiete der Memory-Bilder (User Story 3).
 */
export type LayoutId = 'nature' | 'space';

export interface LayoutOption {
  readonly id: LayoutId;
  readonly label: string;
  readonly description: string;
  readonly cssClass: string;
  readonly pairs: readonly string[];
}

const NATURE_PAIRS = [
  '🐻',
  '🦊',
  '🐸',
  '🐼',
  '🦁',
  '🐯',
  '🐵',
  '🐰',
  '🦉',
  '🦋',
  '🐢',
  '🦔',
  '🌲',
  '🌿',
  '🍄',
  '🌻',
  '🦆',
  '🐧',
  '🦩',
  '🐝',
  '🍃',
  '🌳',
  '🌺',
  '🪵',
  '🪨',
  '🦫',
  '🐿️',
  '🦌',
  '🐬',
  '🦭',
  '🪷',
  '🌴',
] as const;

const SPACE_PAIRS = [
  '🚀',
  '🛸',
  '🛰️',
  '🌙',
  '⭐',
  '🌟',
  '🪐',
  '☄️',
  '🌌',
  '👽',
  '🌑',
  '🌠',
  '🔭',
  '🌍',
  '🌕',
  '☀️',
  '🌎',
  '🌖',
  '🌗',
  '🌘',
  '🌒',
  '🌓',
  '🌔',
  '🌚',
  '👾',
  '🤖',
  '💫',
  '✨',
  '⚡',
  '🌩️',
  '📡',
  '🧑‍🚀',
] as const;

export const LAYOUT_OPTIONS: readonly LayoutOption[] = [
  {
    id: 'nature',
    label: 'Natur & Tiere',
    description: 'Grüntöne, Wald- und Tier-Motive',
    cssClass: 'layout-nature',
    pairs: NATURE_PAIRS,
  },
  {
    id: 'space',
    label: 'Weltraum',
    description: 'Dunkelblau/Violett, Kosmos-Motive',
    cssClass: 'layout-space',
    pairs: SPACE_PAIRS,
  },
] as const;

export type PlayerColorChoice = 'blue' | 'orange';

export interface PlayerColors {
  readonly player1: PlayerColorChoice;
  readonly player2: PlayerColorChoice;
}

export function getPlayerColors(choice: PlayerColorChoice): PlayerColors {
  return choice === 'blue'
    ? { player1: 'blue', player2: 'orange' }
    : { player1: 'orange', player2: 'blue' };
}

export interface GameSettings {
  boardSizeId: BoardSizeId;
  visualThemeId: VisualThemeId;
  layoutId: LayoutId;
  firstPlayerColor: PlayerColorChoice;
}

export function getBoardSizeOption(id: BoardSizeId): BoardSizeOption {
  const found = BOARD_SIZE_OPTIONS.find((o) => o.id === id);
  if (!found) {
    throw new Error(`Unbekannte Spielfeldgröße: ${id}`);
  }
  return found;
}

export function getLayoutOption(id: LayoutId): LayoutOption {
  const found = LAYOUT_OPTIONS.find((l) => l.id === id);
  if (!found) {
    throw new Error(`Unbekanntes Layout: ${id}`);
  }
  return found;
}

export function getVisualTheme(id: VisualThemeId): VisualTheme {
  const found = VISUAL_THEMES.find((t) => t.id === id);
  if (!found) {
    throw new Error(`Unbekanntes Theme: ${id}`);
  }
  return found;
}

export function pairCountForBoard(size: BoardSizeOption): number {
  return (size.cols * size.rows) / 2;
}
