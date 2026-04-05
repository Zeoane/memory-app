import type { GameSettings, PlayerColorChoice } from './game-constants';
import { appState } from './app-state';

function readCheckedRadioValue(root: HTMLElement, name: string): string | null {
  const input = root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  return input?.value ?? null;
}

function applyBoardSizeFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'boardSize');
  if (value !== null) {
    appState.settings.boardSizeId = value as GameSettings['boardSizeId'];
  }
}

function applyPlayerColorFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'playerColor');
  if (value !== null) {
    appState.settings.firstPlayerColor = value as PlayerColorChoice;
  }
}

function applyVisualThemeFromForm(root: HTMLElement): void {
  const value = readCheckedRadioValue(root, 'visualTheme');
  if (value !== null) {
    appState.settings.visualThemeId = value as GameSettings['visualThemeId'];
  }
}

/**
 * Liest die gewählten Radio-Werte aus dem Einstellungsformular in den App-State.
 */
export function readSettingsFromForm(root: HTMLElement): void {
  applyBoardSizeFromForm(root);
  applyPlayerColorFromForm(root);
  applyVisualThemeFromForm(root);
}
