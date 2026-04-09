import { appState, createEmptySettingsDraft, DEFAULT_GAME_SETTINGS } from './app-state';
import { MemoryGame } from './memory-game';
import { readSettingsFromForm } from './read-settings-form';

function bindDataAction(root: HTMLElement, action: string, handler: () => void): void {
  root.querySelectorAll(`[data-action="${action}"]`).forEach((el) => {
    el.addEventListener('click', handler);
  });
}

function goToSettingsView(render: () => void): void {
  appState.view = 'settings';
  appState.settingsDraft = createEmptySettingsDraft();
  render();
}

function goToHomeView(render: () => void): void {
  appState.view = 'home';
  render();
}

function startGameFromSettings(root: HTMLElement, render: () => void): void {
  readSettingsFromForm(root);
  appState.settings = {
    ...DEFAULT_GAME_SETTINGS,
    ...(appState.settingsDraft.visualThemeId ? { visualThemeId: appState.settingsDraft.visualThemeId } : {}),
    ...(appState.settingsDraft.firstPlayerColor ? { firstPlayerColor: appState.settingsDraft.firstPlayerColor } : {}),
    ...(appState.settingsDraft.boardSizeId ? { boardSizeId: appState.settingsDraft.boardSizeId } : {}),
  };
  appState.game = new MemoryGame(appState.settings);
  appState.showGameOver = false;
  appState.view = 'game';
  render();
}

function exitToSettings(render: () => void): void {
  appState.game = null;
  appState.showGameOver = false;
  appState.view = 'settings';
  appState.settingsDraft = createEmptySettingsDraft();
  render();
}

function startNewRound(render: () => void): void {
  appState.game = new MemoryGame(appState.settings);
  appState.showGameOver = false;
  render();
}

function onMemoryCardClick(event: Event, render: () => void): void {
  const target = event.currentTarget as HTMLButtonElement;
  const idx = Number(target.dataset.cardIndex);
  const game = appState.game;
  if (game === null || Number.isNaN(idx)) {
    return;
  }
  const onRoundComplete = (): void => {
    appState.showGameOver = true;
    render();
  };
  game.selectCard(idx, () => render(), onRoundComplete);
}

function attachMemoryCardListeners(root: HTMLElement, render: () => void): void {
  root.querySelectorAll('.memory-card[data-card-index]').forEach((btn) => {
    btn.addEventListener('click', (e) => onMemoryCardClick(e, render));
  });
}

function attachSettingsFormListeners(root: HTMLElement, render: () => void): void {
  const settingsRoot = root.querySelector('.screen--settings');
  if (settingsRoot === null) {
    return;
  }
  settingsRoot.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener('change', () => {
      readSettingsFromForm(root);
      render();
    });
  });
}

/**
 * Registriert alle UI-Events für die aktuell gerenderte Ansicht.
 */
export function bindAppEvents(root: HTMLElement, render: () => void): void {
  bindDataAction(root, 'go-settings', () => goToSettingsView(render));
  bindDataAction(root, 'go-home', () => goToHomeView(render));
  bindDataAction(root, 'start-game', () => startGameFromSettings(root, render));
  bindDataAction(root, 'exit-game', () => exitToSettings(render));
  bindDataAction(root, 'new-round', () => startNewRound(render));
  bindDataAction(root, 'go-settings-from-game', () => exitToSettings(render));
  attachMemoryCardListeners(root, render);
  attachSettingsFormListeners(root, render);
}
