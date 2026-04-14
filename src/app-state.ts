import type { GameSettings } from './game-constants';
import type { MemoryGame } from './memory-game';

export type ViewId = 'home' | 'settings' | 'game';

export interface SettingsDraft {
  boardSizeId: GameSettings['boardSizeId'] | null;
  visualThemeId: GameSettings['visualThemeId'] | null;
  firstPlayerColor: GameSettings['firstPlayerColor'] | null;
}

export interface AppState {
  view: ViewId;
  settings: GameSettings;
  settingsDraft: SettingsDraft;
  game: MemoryGame | null;
  showGameOver: boolean;
  /** Nach Game Over (Code Vibes): Gewinner-Overlay Orange nach 3 s — ersetzt die Game-Over-Ansicht. */
  showCodeVibesWinnerOrange: boolean;
  /** Nach Game Over (Code Vibes): Gewinner-Overlay Blue nach 3 s. */
  showCodeVibesWinnerBlue: boolean;
  /** Bestätigungs-Popup vor dem Verlassen der Spielansicht (Exit-Button in der Game-Bar). */
  showExitConfirm: boolean;
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  boardSizeId: '4x4',
  visualThemeId: 'code-vibes',
  layoutId: 'space',
  firstPlayerColor: 'blue',
};

export function createEmptySettingsDraft(): SettingsDraft {
  return {
    boardSizeId: null,
    visualThemeId: null,
    firstPlayerColor: null,
  };
}

export const appState: AppState = {
  view: 'home',
  settings: { ...DEFAULT_GAME_SETTINGS },
  settingsDraft: createEmptySettingsDraft(),
  game: null,
  showGameOver: false,
  showCodeVibesWinnerOrange: false,
  showCodeVibesWinnerBlue: false,
  showExitConfirm: false,
};
