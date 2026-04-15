/** Central configuration for game options and themes. */

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

/** Visual theme ids used by the settings UI. */
export type VisualThemeId = 'code-vibes' | 'gaming' | 'da-projects' | 'foods';

export interface VisualTheme {
  readonly id: VisualThemeId;
  readonly label: string;
  readonly description: string;
}

/** Visual themes shown in settings. */
export const VISUAL_THEMES: readonly VisualTheme[] = [
  { id: 'code-vibes', label: 'Code vibes theme', description: 'Teal, klarer Dev-Look' },
  { id: 'gaming', label: 'Gaming theme', description: 'Neon-Kanten, dunkle Karten' },
  { id: 'da-projects', label: 'DA Projects theme', description: 'Sachlich, hoher Kontrast' },
  { id: 'foods', label: 'Foods theme', description: 'Warme Töne, einladend' },
] as const;

/** Fixed symbol keys for the code-vibes theme. */
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

/** Fixed symbol keys for the gaming theme. */
const GAMING_THEME_PAIRS = [
  'gt-banana',
  'gt-circle',
  'gt-cmiyc',
  'gt-controller',
  'gt-diamond-card',
  'gt-dice',
  'gt-gb',
  'gt-maze',
  'gt-medal',
  'gt-mushroom',
  'gt-pack-man',
  'gt-pacman-pixel',
  'gt-play',
  'gt-puzzle',
  'gt-sq-face',
  'gt-square',
  'gt-star',
  'gt-triangle',
] as const;

export type PlayerColorChoice = 'blue' | 'orange';

export interface PlayerColors {
  readonly player1: PlayerColorChoice;
  readonly player2: PlayerColorChoice;
}

/** Resolves which logical player is blue/orange based on the first pick. */
export function getPlayerColors(choice: PlayerColorChoice): PlayerColors {
  return choice === 'blue'
    ? { player1: 'blue', player2: 'orange' }
    : { player1: 'orange', player2: 'blue' };
}

export interface GameSettings {
  boardSizeId: BoardSizeId;
  visualThemeId: VisualThemeId;
  firstPlayerColor: PlayerColorChoice;
}

/** Returns the board size option for the given id. */
export function getBoardSizeOption(id: BoardSizeId): BoardSizeOption {
  const found = BOARD_SIZE_OPTIONS.find((o) => o.id === id);
  if (!found) {
    throw new Error(`Unbekannte Spielfeldgröße: ${id}`);
  }
  return found;
}

/** Returns the symbol pool for the selected visual theme. */
export function getSymbolPoolForGame(settings: GameSettings): readonly string[] {
  switch (settings.visualThemeId) {
    case 'code-vibes':
      return CODE_VIBES_PAIRS;
    case 'gaming':
      return GAMING_THEME_PAIRS;
    case 'da-projects':
    case 'foods':
      return CODE_VIBES_PAIRS;
    default: {
      const _exhaustive: never = settings.visualThemeId;
      return _exhaustive;
    }
  }
}

/** Returns the visual theme metadata for the given id. */
export function getVisualTheme(id: VisualThemeId): VisualTheme {
  const found = VISUAL_THEMES.find((t) => t.id === id);
  if (!found) {
    throw new Error(`Unbekanntes Theme: ${id}`);
  }
  return found;
}

/** Returns the required number of pairs for a given board size. */
export function pairCountForBoard(size: BoardSizeOption): number {
  return (size.cols * size.rows) / 2;
}
