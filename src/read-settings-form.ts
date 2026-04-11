import type { GameSettings, PlayerColorChoice } from './game-constants';
import { appState } from './app-state';

function readCheckedRadioValue(root: HTMLElement, name: string): string | null {
  const input = root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  return input?.value ?? null;
}

function applyBoardSizeFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'boardSize');
  if (value !== null) {
    const trimmed = value.trim();
    appState.settingsDraft.boardSizeId = trimmed as GameSettings['boardSizeId'];
  }
}

function applyPlayerColorFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'playerColor');
  if (value !== null) {
    appState.settingsDraft.firstPlayerColor = value as PlayerColorChoice;
  }
}

function applyVisualThemeFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'visualTheme');
  if (value !== null) {
    appState.settingsDraft.visualThemeId = value as GameSettings['visualThemeId'];
  }
}

/**
 * Reads the selected radio values ​​from the settings form into the app state.
 */
export function readSettingsFromForm(root: HTMLElement): void {
  applyBoardSizeFromForm(root);
  applyPlayerColorFromForm(root);
  applyVisualThemeFromForm(root);
}
