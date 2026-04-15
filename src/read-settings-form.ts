import type { GameSettings, PlayerColorChoice } from './game-constants';
import { appState } from './app-state';

/** Reads the checked radio value for a given input name. */
function readCheckedRadioValue(root: HTMLElement, name: string): string | null {
  const input = root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  return input?.value ?? null;
}

/** Reads the selected board size value into the settings draft. */
function applyBoardSizeFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'boardSize');
  if (value !== null) {
    const trimmed = value.trim();
    appState.settingsDraft.boardSizeId = trimmed as GameSettings['boardSizeId'];
  }
}

/** Reads the selected first player color into the settings draft. */
function applyPlayerColorFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'playerColor');
  if (value !== null) {
    appState.settingsDraft.firstPlayerColor = value as PlayerColorChoice;
  }
}

/** Reads the selected visual theme into the settings draft. */
function applyVisualThemeFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'visualTheme');
  if (value !== null) {
    appState.settingsDraft.visualThemeId = value as GameSettings['visualThemeId'];
  }
}

/**
 * Reads selected radio values from the settings form into app state.
 */
export function readSettingsFromForm(root: HTMLElement): void {
  applyBoardSizeFromForm(root);
  applyPlayerColorFromForm(root);
  applyVisualThemeFromForm(root);
}
