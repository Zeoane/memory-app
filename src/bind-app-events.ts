import { appState, createEmptySettingsDraft, DEFAULT_GAME_SETTINGS } from './app-state';
import { clearCodeVibesWinnerTimer, scheduleCodeVibesWinnerIfNeeded } from './code-vibes-winner-scheduler';
import { clearGamingWinnerTimer, scheduleGamingWinnerIfNeeded } from './gaming-winner-scheduler';
import { MemoryGame } from './memory-game';
import { readSettingsFromForm } from './read-settings-form';

type RenderFn = () => void;

/** Switches the app to the settings view and resets the draft. */
function goToSettingsView(render: RenderFn): void {
  appState.view = 'settings';
  appState.settingsDraft = createEmptySettingsDraft();
  render();
}

/** Switches the app to the home view and clears transient game UI state. */
function goToHomeView(render: RenderFn): void {
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
function startGameFromSettings(root: HTMLElement, render: RenderFn): void {
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
function exitToSettings(render: RenderFn): void {
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
function startNewRound(render: RenderFn): void {
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
function openExitConfirm(render: RenderFn): void {
  appState.showExitConfirm = true;
  render();
}

/** Closes the "exit game" confirmation dialog. */
function dismissExitConfirm(render: RenderFn): void {
  appState.showExitConfirm = false;
  render();
}

/** Handles selection of a memory card from the UI. */
function onMemoryCardClick(event: Event, render: RenderFn): void {
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
function attachMemoryCardListeners(root: HTMLElement, render: RenderFn): void {
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
function attachSettingsFormListeners(root: HTMLElement, render: RenderFn): void {
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
 * Registers a single delegated click handler for `[data-action]` elements.
 * This is resilient to partial DOM patching (e.g. updating `.game-bar` via `innerHTML`).
 */
function ensureDelegatedActionHandler(root: HTMLElement, render: RenderFn): void {
  if (root.dataset.actionsBound === 'true') {
    return;
  }
  root.dataset.actionsBound = 'true';

  root.addEventListener('click', (e) => {
    const target = e.target as Element | null;
    const el = target?.closest?.('[data-action]') as HTMLElement | null;
    if (!el) {
      return;
    }
    const action = el.dataset.action;
    if (!action) {
      return;
    }
    e.preventDefault();

    switch (action) {
      case 'go-settings':
        goToSettingsView(render);
        break;
      case 'go-home':
        goToHomeView(render);
        break;
      case 'start-game':
        startGameFromSettings(root, render);
        break;
      case 'exit-game':
        openExitConfirm(render);
        break;
      case 'dismiss-exit-confirm':
        dismissExitConfirm(render);
        break;
      case 'confirm-exit-game':
        exitToSettings(render);
        break;
      case 'new-round':
        startNewRound(render);
        break;
      case 'go-settings-from-game':
        exitToSettings(render);
        break;
      default:
        break;
    }
  });
}

/**
 * Registers all UI events for the currently rendered view.
 */
export function bindAppEvents(root: HTMLElement, render: RenderFn): void {
  ensureDelegatedActionHandler(root, render);
  attachMemoryCardListeners(root, render);
  attachSettingsFormListeners(root, render);
}
