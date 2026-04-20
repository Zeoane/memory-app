import { MemoryGame } from '../domain/memory-game';
import { appState, createEmptySettingsDraft, DEFAULT_GAME_SETTINGS } from '../state/app-state';
import { clearCodeVibesWinnerTimer, scheduleCodeVibesWinnerIfNeeded } from './code-vibes-winner-scheduler';
import { clearGamingWinnerTimer, scheduleGamingWinnerIfNeeded } from './gaming-winner-scheduler';
import { readSettingsFromForm } from './read-settings-form';

type RenderFn = () => void;

/** Clears one-off UI flags and cancels winner overlays. */
function resetTransientGameUiState(): void {
  appState.showGameOver = false;
  appState.showCodeVibesWinnerOrange = false;
  appState.showCodeVibesWinnerBlue = false;
  clearCodeVibesWinnerTimer();
  appState.showGamingWinnerOrange = false;
  appState.showGamingWinnerBlue = false;
  clearGamingWinnerTimer();
  appState.showExitConfirm = false;
}

/** Switches the app to the settings view and resets the draft. */
function goToSettingsView(render: RenderFn): void {
  appState.view = 'settings';
  appState.settingsDraft = createEmptySettingsDraft();
  render();
}

/** Switches the app to the home view and clears transient game UI state. */
function goToHomeView(render: RenderFn): void {
  appState.view = 'home';
  resetTransientGameUiState();
  render();
}

/** Derives the effective game settings from the current draft selections. */
function buildSettingsFromDraft(): typeof DEFAULT_GAME_SETTINGS {
  const draft = appState.settingsDraft;
  return {
    ...DEFAULT_GAME_SETTINGS,
    ...(draft.visualThemeId ? { visualThemeId: draft.visualThemeId } : {}),
    ...(draft.firstPlayerColor ? { firstPlayerColor: draft.firstPlayerColor } : {}),
    ...(draft.boardSizeId ? { boardSizeId: draft.boardSizeId } : {}),
  };
}

/** Creates a new game instance from the current app settings. */
function createGameFromSettings(): MemoryGame {
  return new MemoryGame(appState.settings);
}

/** Starts a new game using the current settings form selections. */
function startGameFromSettings(root: HTMLElement, render: RenderFn): void {
  readSettingsFromForm(root);
  appState.settings = buildSettingsFromDraft();
  appState.game = createGameFromSettings();
  resetTransientGameUiState();
  appState.view = 'game';
  render();
}

/** Exits the current game and returns to the settings view. */
function exitToSettings(render: RenderFn): void {
  appState.game = null;
  resetTransientGameUiState();
  appState.view = 'settings';
  appState.settingsDraft = createEmptySettingsDraft();
  render();
}

/** Starts a new round with the existing game settings. */
function startNewRound(render: RenderFn): void {
  appState.game = createGameFromSettings();
  resetTransientGameUiState();
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
  if (target.getAttribute('aria-disabled') === 'true') return;

  const idx = Number(target.dataset.cardIndex);
  const game = appState.game;
  if (game === null || Number.isNaN(idx)) return;

  game.selectCard(idx, render, () => handleRoundComplete(render));
}

/** Applies game-over UI state and schedules winner overlays. */
function handleRoundComplete(render: RenderFn): void {
  appState.showGameOver = true;
  appState.showCodeVibesWinnerOrange = false;
  appState.showCodeVibesWinnerBlue = false;
  appState.showGamingWinnerOrange = false;
  appState.showGamingWinnerBlue = false;
  scheduleCodeVibesWinnerIfNeeded(render);
  scheduleGamingWinnerIfNeeded(render);
  render();
}

/** Handles Enter activation for memory cards. */
function onMemoryCardKeydown(event: KeyboardEvent, render: RenderFn): void {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const node = event.currentTarget as HTMLElement;
  if (node.getAttribute('aria-disabled') === 'true') return;
  event.preventDefault();
  onMemoryCardClick(event, render);
}

/** Attaches click and keyboard handlers for all currently rendered cards. */
function attachMemoryCardListeners(root: HTMLElement, render: RenderFn): void {
  root.querySelectorAll('.memory-card[data-card-index]').forEach((el) => {
    el.addEventListener('click', (e) => onMemoryCardClick(e, render));
    el.addEventListener('keydown', (e: Event) => onMemoryCardKeydown(e as KeyboardEvent, render));
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
 */
function ensureDelegatedActionHandler(root: HTMLElement, render: RenderFn): void {
  if (root.dataset.actionsBound === 'true') return;
  root.dataset.actionsBound = 'true';
  root.addEventListener('click', createDelegatedActionClickHandler(root, render));
}

type ActionHandler = (root: HTMLElement, render: RenderFn) => void;

/** Maps `[data-action]` ids to their respective handlers. */
const ACTION_HANDLERS: Readonly<Record<string, ActionHandler>> = {
  'go-settings': (_root, render) => goToSettingsView(render),
  'go-home': (_root, render) => goToHomeView(render),
  'start-game': (root, render) => startGameFromSettings(root, render),
  'exit-game': (_root, render) => openExitConfirm(render),
  'dismiss-exit-confirm': (_root, render) => dismissExitConfirm(render),
  'confirm-exit-game': (_root, render) => exitToSettings(render),
  'new-round': (_root, render) => startNewRound(render),
  'go-settings-from-game': (_root, render) => exitToSettings(render),
};

/** Returns the closest `[data-action]` element for an event target. */
function findActionElement(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest('[data-action]');
  return el instanceof HTMLElement ? el : null;
}

/** Reads the action id from a `[data-action]` element. */
function readActionId(el: HTMLElement): string | null {
  return el.dataset.action ?? null;
}

/** Dispatches a `[data-action]` id to a registered handler. */
function dispatchAction(actionId: string, root: HTMLElement, render: RenderFn): void {
  const handler = ACTION_HANDLERS[actionId];
  if (!handler) return;
  handler(root, render);
}

/** Creates the delegated click handler closure for the given root/render. */
function createDelegatedActionClickHandler(root: HTMLElement, render: RenderFn): (e: MouseEvent) => void {
  return (e) => {
    const el = findActionElement(e.target);
    if (!el) return;
    const actionId = readActionId(el);
    if (!actionId) return;
    e.preventDefault();
    dispatchAction(actionId, root, render);
  };
}

/**
 * Registers all UI events for the currently rendered view.
 */
export function bindAppEvents(root: HTMLElement, render: RenderFn): void {
  ensureDelegatedActionHandler(root, render);
  attachMemoryCardListeners(root, render);
  attachSettingsFormListeners(root, render);
}
