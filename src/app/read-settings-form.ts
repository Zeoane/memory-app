import type { GameSettings, PlayerColorChoice } from '../domain/game-constants';
import { appState } from '../state/app-state';

/** Coerces a string into a board size id if possible. */
function coerceBoardSizeId(value: string): GameSettings['boardSizeId'] {
  return value.trim() as GameSettings['boardSizeId'];
}

/** Coerces a string into a player color choice if possible. */
function coercePlayerColor(value: string): PlayerColorChoice {
  return value.trim() as PlayerColorChoice;
}

/** Coerces a string into a visual theme id if possible. */
function coerceVisualThemeId(value: string): GameSettings['visualThemeId'] {
  return value.trim() as GameSettings['visualThemeId'];
}

/** Reads the checked radio value for a given input name. */
function readCheckedRadioValue(root: HTMLElement, name: string): string | null {
  const input = root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  return input?.value ?? null;
}

/** Reads the selected board size value into the settings draft. */
function applyBoardSizeFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'boardSize');
  if (value !== null) {
    appState.settingsDraft.boardSizeId = coerceBoardSizeId(value);
  }
}

/** Reads the selected first player color into the settings draft. */
function applyPlayerColorFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'playerColor');
  if (value !== null) {
    appState.settingsDraft.firstPlayerColor = coercePlayerColor(value);
  }
}

/** Reads the selected visual theme into the settings draft. */
function applyVisualThemeFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'visualTheme');
  if (value !== null) {
    appState.settingsDraft.visualThemeId = coerceVisualThemeId(value);
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
