/**
 * Central configuration: playing field sizes, themes, layouts and player colors.
 */

export type BoardSizeId = '4x4' | '6x4' | '6x6';

export interface BoardSizeOption {
  readonly id: BoardSizeId;
  readonly cols: number;
  readonly rows: number;
  readonly label: string;
}

export const BOARD_SIZE_OPTIONS: readonly BoardSizeOption[] = [
  { id: '4x4', cols: 4, rows: 4, label: '16 cards' },
  { id: '6x4', cols: 6, rows: 4, label: '24 cards' },
  { id: '6x6', cols: 6, rows: 6, label: '36 cards' },
] as const;

/** Visual representation of the playing field (Game themes in the settings). */
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
 * Layouts: change the color scheme and subject areas of the memory images (User Story 3).
 */
export type LayoutId = 'nature' | 'space';

export interface LayoutOption {
  readonly id: LayoutId;
  readonly label: string;
  readonly description: string;
  readonly cssClass: string;
  readonly pairs: readonly string[];
}

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

/**
 * Motive für „Code vibes“: Keys = Dateiname ohne .svg in code-icons/ (max. 18 → 6×6).
 * Reihenfolge = festes Deck (erste N je nach Spielfeldgröße).
 */
const CODE_VIBES_PAIRS = [
  'Angular Icon 1',
  'Bootstrap 1',
  'CSS Logo 1',
  'Firebase 1',
  'HTML Logo 1',
  'Javascript Logo 1',
  'SQL 1',
  'Sass_Logo_Color 1',
  'angular-icon 2',
  'atom icon',
  'cloud',
  'cloud-server',
  'code',
  'django Icon 1',
  'figma-icon',
  'git icon 1',
  'python',
  'vetur icon',
] as const;

export const LAYOUT_OPTIONS: readonly LayoutOption[] = [
  {
    id: 'nature',
    label: 'Natur & Tiere',
    description: 'Grüntöne, Wald- und Tier-Motive',
    cssClass: 'layout-nature',
    pairs: [
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
    ] as const,
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

/**
 * Symbol-Pool für das Memory-Deck: bei Code vibes / Gaming feste Motive,
 * sonst nach Layout (Natur vs. Weltraum).
 */
export function getSymbolPoolForGame(settings: GameSettings): readonly string[] {
  switch (settings.visualThemeId) {
    case 'code-vibes':
      return CODE_VIBES_PAIRS;
    case 'gaming':
      return SPACE_PAIRS;
    case 'da-projects':
    case 'foods':
      return getLayoutOption(settings.layoutId).pairs;
    default: {
      const _exhaustive: never = settings.visualThemeId;
      return _exhaustive;
    }
  }
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
