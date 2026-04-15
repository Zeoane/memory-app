import { appState, createEmptySettingsDraft, DEFAULT_GAME_SETTINGS } from './app-state';
import { clearCodeVibesWinnerTimer, scheduleCodeVibesWinnerIfNeeded } from './code-vibes-winner-scheduler';
import { clearGamingWinnerTimer, scheduleGamingWinnerIfNeeded } from './gaming-winner-scheduler';
import { MemoryGame } from './memory-game';
import { readSettingsFromForm } from './read-settings-form';

/** Binds a click handler to elements with a matching data-action attribute. */
function bindDataAction(root: HTMLElement, action: string, handler: () => void): void {
  root.querySelectorAll(`[data-action="${action}"]`).forEach((el) => {
    el.addEventListener('click', handler);
  });
}

/** Switches the app to the settings view and resets the draft. */
function goToSettingsView(render: () => void): void {
  appState.view = 'settings';
  appState.settingsDraft = createEmptySettingsDraft();
  render();
}

/** Switches the app to the home view and clears transient game UI state. */
function goToHomeView(render: () => void): void {
  appState.view = 'home';
  appState.showGameOver = false;
  appState.showCodeVibesWinnerOrange = false;
  appState.showCodeVibesWinnerBlue = false;
  clearCodeVibesWinnerTimer();
  appState.showGamingWinnerOrange = false;
  appState.showGamingWinnerBlue = false;
  clearGamingWinnerTimer();
  appState.showExitConfirm = false;
  render();
}

/** Starts a new game using the current settings form selections. */
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
  appState.showCodeVibesWinnerOrange = false;
  appState.showCodeVibesWinnerBlue = false;
  clearCodeVibesWinnerTimer();
  appState.showGamingWinnerOrange = false;
  appState.showGamingWinnerBlue = false;
  clearGamingWinnerTimer();
  appState.showExitConfirm = false;
  appState.view = 'game';
  render();
}

/** Exits the current game and returns to the settings view. */
function exitToSettings(render: () => void): void {
  appState.game = null;
  appState.showGameOver = false;
  appState.showCodeVibesWinnerOrange = false;
  appState.showCodeVibesWinnerBlue = false;
  clearCodeVibesWinnerTimer();
  appState.showGamingWinnerOrange = false;
  appState.showGamingWinnerBlue = false;
  clearGamingWinnerTimer();
  appState.showExitConfirm = false;
  appState.view = 'settings';
  appState.settingsDraft = createEmptySettingsDraft();
  render();
}

/** Starts a new round with the existing game settings. */
function startNewRound(render: () => void): void {
  appState.game = new MemoryGame(appState.settings);
  appState.showGameOver = false;
  appState.showCodeVibesWinnerOrange = false;
  appState.showCodeVibesWinnerBlue = false;
  clearCodeVibesWinnerTimer();
  appState.showGamingWinnerOrange = false;
  appState.showGamingWinnerBlue = false;
  clearGamingWinnerTimer();
  appState.showExitConfirm = false;
  render();
}

/** Opens the "exit game" confirmation dialog. */
function openExitConfirm(render: () => void): void {
  appState.showExitConfirm = true;
  render();
}

/** Closes the "exit game" confirmation dialog. */
function dismissExitConfirm(render: () => void): void {
  appState.showExitConfirm = false;
  render();
}

/** Handles selection of a memory card from the UI. */
function onMemoryCardClick(event: Event, render: () => void): void {
  const target = event.currentTarget as HTMLElement;
  if (target.getAttribute('aria-disabled') === 'true') {
    return;
  }
  const idx = Number(target.dataset.cardIndex);
  const game = appState.game;
  if (game === null || Number.isNaN(idx)) {
    return;
  }
  const onRoundComplete = (): void => {
    appState.showGameOver = true;
    appState.showCodeVibesWinnerOrange = false;
    appState.showCodeVibesWinnerBlue = false;
    appState.showGamingWinnerOrange = false;
    appState.showGamingWinnerBlue = false;
    scheduleCodeVibesWinnerIfNeeded(render);
    scheduleGamingWinnerIfNeeded(render);
    render();
  };
  game.selectCard(idx, () => render(), onRoundComplete);
}

/** Attaches click and keyboard handlers for all currently rendered cards. */
function attachMemoryCardListeners(root: HTMLElement, render: () => void): void {
  root.querySelectorAll('.memory-card[data-card-index]').forEach((el) => {
    el.addEventListener('click', (e) => onMemoryCardClick(e, render));
    el.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key !== 'Enter' && ke.key !== ' ') {
        return;
      }
      const node = ke.currentTarget as HTMLElement;
      if (node.getAttribute('aria-disabled') === 'true') {
        return;
      }
      ke.preventDefault();
      onMemoryCardClick(ke, render);
    });
  });
}

/** Attaches listeners to settings radio inputs to update the draft preview. */
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
 * Registers all UI events for the currently rendered view.
 */
export function bindAppEvents(root: HTMLElement, render: () => void): void {
  bindDataAction(root, 'go-settings', () => goToSettingsView(render));
  bindDataAction(root, 'go-home', () => goToHomeView(render));
  bindDataAction(root, 'start-game', () => startGameFromSettings(root, render));
  bindDataAction(root, 'exit-game', () => openExitConfirm(render));
  bindDataAction(root, 'dismiss-exit-confirm', () => dismissExitConfirm(render));
  bindDataAction(root, 'confirm-exit-game', () => exitToSettings(render));
  bindDataAction(root, 'new-round', () => startNewRound(render));
  bindDataAction(root, 'go-settings-from-game', () => exitToSettings(render));
  attachMemoryCardListeners(root, render);
  attachSettingsFormListeners(root, render);
}
