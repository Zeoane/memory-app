import type { GameSettings } from './game-constants';
import type { MemoryGame } from './memory-game';

export type ViewId = 'home' | 'settings' | 'game';

export interface AppState {
  view: ViewId;
  settings: GameSettings;
  game: MemoryGame | null;
  showGameOver: boolean;
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  boardSizeId: '4x4',
  visualThemeId: 'code-vibes',
  layoutId: 'nature',
  firstPlayerColor: 'blue',
};

export const appState: AppState = {
  view: 'home',
  settings: { ...DEFAULT_GAME_SETTINGS },
  game: null,
  showGameOver: false,
};
