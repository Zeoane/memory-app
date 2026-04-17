import type { GameSettings } from '../domain/game-constants';
import type { MemoryGame } from '../domain/memory-game';

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
  showCodeVibesWinnerOrange: boolean;
  showCodeVibesWinnerBlue: boolean;
  showGamingWinnerOrange: boolean;
  showGamingWinnerBlue: boolean;
  showExitConfirm: boolean;
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  boardSizeId: '4x4',
  visualThemeId: 'code-vibes',
  firstPlayerColor: 'blue',
};

/** Creates an empty settings draft (no selections). */
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
  showGamingWinnerOrange: false,
  showGamingWinnerBlue: false,
  showExitConfirm: false,
};
