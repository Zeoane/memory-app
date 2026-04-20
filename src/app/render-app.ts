import { bindAppEvents } from './bind-app-events';
import { applyThemeClasses } from '../ui/dom-apply-theme';
import { appState } from '../state/app-state';
import { buildGameScreenHtml } from '../features/game/game-screen.component';
import { buildGameBarHtml } from '../features/game/ui/game-bar.component';
import { buildHomeHtml } from '../features/home/home.component';
import { buildSettingsHtml } from '../features/settings/settings.component';
import { getPlayerColors } from '../domain/game-constants';
import type { MemoryGame } from '../domain/memory-game';

/** Resolves the HTML string for the current app view. */
function resolveViewHtml(): string {
  const view = appState.view;
  if (view === 'home') {
    return buildHomeHtml();
  }
  if (view === 'settings') {
    return buildSettingsHtml(appState.settings, appState.settingsDraft);
  }
  return buildGameScreenHtml(appState.game, appState.settings, {
    showGameOver: appState.showGameOver,
    showCodeVibesWinnerOrange: appState.showCodeVibesWinnerOrange,
    showCodeVibesWinnerBlue: appState.showCodeVibesWinnerBlue,
    showGamingWinnerOrange: appState.showGamingWinnerOrange,
    showGamingWinnerBlue: appState.showGamingWinnerBlue,
    showExitConfirm: appState.showExitConfirm,
  });
}

/** Patches a single card element to match current game state. */
function updateCardDom(cardEl: HTMLElement, game: MemoryGame, snap = game.getSnapshot()): void {
  const idx = Number(cardEl.dataset.cardIndex);
  if (Number.isNaN(idx) || idx < 0 || idx >= snap.cards.length) {
    return;
  }
  const visible = game.isFaceVisible(idx);
  const matched = snap.matched[idx];

  cardEl.classList.toggle('is-flipped', visible);
  cardEl.classList.toggle('is-matched', matched);

  const isDisabled = snap.isBusy || snap.isComplete || matched;
  if (isDisabled) {
    cardEl.setAttribute('aria-disabled', 'true');
    cardEl.setAttribute('tabindex', '-1');
  } else {
    cardEl.removeAttribute('aria-disabled');
    cardEl.setAttribute('tabindex', '0');
  }
}

/** Updates game-bar HTML and card flip state without full rerender. */
function patchGameView(root: HTMLElement, game: MemoryGame): void {
  const snap = game.getSnapshot();

  const bar = root.querySelector<HTMLElement>('.game-bar');
  if (bar) {
    const colors = getPlayerColors(appState.settings.firstPlayerColor);
    bar.innerHTML = buildGameBarHtml(snap, colors, appState.settings.visualThemeId);
  }

  root.querySelectorAll<HTMLElement>('.memory-card[data-card-index]').forEach((cardEl) => {
    updateCardDom(cardEl, game, snap);
  });
}

type RenderKey = {
  view: typeof appState.view;
  game: MemoryGame | null;
  boardSizeId: string;
  visualThemeId: string;
  showGameOver: boolean;
  showCodeVibesWinnerOrange: boolean;
  showCodeVibesWinnerBlue: boolean;
  showGamingWinnerOrange: boolean;
  showGamingWinnerBlue: boolean;
  showExitConfirm: boolean;
};

let lastRenderKey: RenderKey | null = null;

/** Builds a stable key describing what must trigger a full rerender. */
function buildRenderKey(): RenderKey {
  return {
    view: appState.view,
    game: appState.game,
    boardSizeId: appState.settings.boardSizeId,
    visualThemeId: appState.settings.visualThemeId,
    showGameOver: appState.showGameOver,
    showCodeVibesWinnerOrange: appState.showCodeVibesWinnerOrange,
    showCodeVibesWinnerBlue: appState.showCodeVibesWinnerBlue,
    showGamingWinnerOrange: appState.showGamingWinnerOrange,
    showGamingWinnerBlue: appState.showGamingWinnerBlue,
    showExitConfirm: appState.showExitConfirm,
  };
}

/** True when both keys refer to the same active game instance. */
function isSameActiveGame(lastKey: RenderKey | null, key: RenderKey): lastKey is RenderKey {
  return key.view === 'game' && key.game !== null && lastKey !== null && lastKey.view === 'game' && lastKey.game === key.game;
}

/** True when state changes are safe for minimal DOM patching. */
function isPatchSafe(lastKey: RenderKey, key: RenderKey): boolean {
  return (
    lastKey.boardSizeId === key.boardSizeId &&
    lastKey.visualThemeId === key.visualThemeId &&
    lastKey.showGameOver === key.showGameOver &&
    lastKey.showExitConfirm === key.showExitConfirm &&
    lastKey.showCodeVibesWinnerOrange === key.showCodeVibesWinnerOrange &&
    lastKey.showCodeVibesWinnerBlue === key.showCodeVibesWinnerBlue &&
    lastKey.showGamingWinnerOrange === key.showGamingWinnerOrange &&
    lastKey.showGamingWinnerBlue === key.showGamingWinnerBlue
  );
}

/** True if the current state can be patched without full rerender. */
function canPatchGame(lastKey: RenderKey | null, key: RenderKey): key is RenderKey & { game: MemoryGame } {
  if (key.view !== 'game' || key.game === null) return false;
  if (!isSameActiveGame(lastKey, key)) return false;
  return isPatchSafe(lastKey, key);
}

/** Performs a full rerender and re-binds events. */
function renderFull(root: HTMLElement): void {
  applyThemeClasses(root, appState.settings, appState.view);
  root.innerHTML = resolveViewHtml();
  bindAppEvents(root, () => renderApp(root));
}

/**
 * Renders the current view and binds events to the root element.
 */
export function renderApp(root: HTMLElement): void {
  const key = buildRenderKey();
  if (canPatchGame(lastRenderKey, key)) {
    patchGameView(root, key.game);
  } else {
    renderFull(root);
  }
  lastRenderKey = key;
}

