import { codeVibesBlueWins, codeVibesOrangeWins } from '../features/game/ui/game-over-dialog.component';
import { getPlayerColors } from '../domain/game-constants';
import { appState } from '../state/app-state';

let codeVibesWinnerTimer: ReturnType<typeof setTimeout> | null = null;

/** Cancels any scheduled code-vibes winner overlay. */
export function clearCodeVibesWinnerTimer(): void {
  if (codeVibesWinnerTimer !== null) {
    clearTimeout(codeVibesWinnerTimer);
    codeVibesWinnerTimer = null;
  }
}

type WinnerKind = 'orange' | 'blue';

/** True if a scheduled winner overlay is still valid to show. */
function canShowWinnerOverlay(): boolean {
  return appState.view === 'game' && appState.game !== null && appState.showGameOver;
}

/** Applies the winner overlay state for a validated kind. */
function applyWinnerOverlay(kind: WinnerKind): void {
  if (kind === 'orange') {
    appState.showCodeVibesWinnerOrange = true;
    appState.showCodeVibesWinnerBlue = false;
    return;
  }
  appState.showCodeVibesWinnerBlue = true;
  appState.showCodeVibesWinnerOrange = false;
}

/** True if the given kind is the winner for the latest completed snapshot. */
function isExpectedWinnerKind(scores: readonly [number, number], kind: WinnerKind): boolean {
  const playerColors = getPlayerColors(appState.settings.firstPlayerColor);
  return kind === 'orange'
    ? codeVibesOrangeWins(scores[0], scores[1], playerColors)
    : codeVibesBlueWins(scores[0], scores[1], playerColors);
}

/** Schedules showing the winner overlay after a fixed delay. */
function scheduleOverlay(render: () => void, kind: WinnerKind): void {
  codeVibesWinnerTimer = setTimeout(() => {
    codeVibesWinnerTimer = null;
    if (!canShowWinnerOverlay()) return;
    const game = appState.game;
    if (game === null) return;
    const latest = game.getSnapshot();
    if (!latest.isComplete) return;
    if (!isExpectedWinnerKind(latest.scores, kind)) return;
    applyWinnerOverlay(kind);
    render();
  }, 3000);
}

/**
 * Schedules the code-vibes winner overlay after game over (only for a non-draw).
 */
export function scheduleCodeVibesWinnerIfNeeded(render: () => void): void {
  clearCodeVibesWinnerTimer();
  if (appState.settings.visualThemeId !== 'code-vibes' || appState.game === null) {
    return;
  }
  const snap = appState.game.getSnapshot();
  if (!snap.isComplete) {
    return;
  }
  const colors = getPlayerColors(appState.settings.firstPlayerColor);
  const { scores } = snap;
  if (codeVibesOrangeWins(scores[0], scores[1], colors)) {
    scheduleOverlay(render, 'orange');
    return;
  }
  if (codeVibesBlueWins(scores[0], scores[1], colors)) {
    scheduleOverlay(render, 'blue');
  }
}

