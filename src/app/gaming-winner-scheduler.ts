import { codeVibesBlueWins, codeVibesOrangeWins } from '../features/game/ui/game-over-dialog.component';
import { getPlayerColors } from '../domain/game-constants';
import { appState } from '../state/app-state';

let gamingWinnerTimer: ReturnType<typeof setTimeout> | null = null;

/** Cancels any scheduled gaming winner overlay. */
export function clearGamingWinnerTimer(): void {
  if (gamingWinnerTimer !== null) {
    clearTimeout(gamingWinnerTimer);
    gamingWinnerTimer = null;
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
    appState.showGamingWinnerOrange = true;
    appState.showGamingWinnerBlue = false;
    return;
  }
  appState.showGamingWinnerBlue = true;
  appState.showGamingWinnerOrange = false;
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
  gamingWinnerTimer = setTimeout(() => {
    gamingWinnerTimer = null;
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

/** Resolves the winner kind (blue/orange) or null for draws. */
function resolveWinnerKind(scores: readonly [number, number]): WinnerKind | null {
  const colors = getPlayerColors(appState.settings.firstPlayerColor);
  if (codeVibesOrangeWins(scores[0], scores[1], colors)) return 'orange';
  if (codeVibesBlueWins(scores[0], scores[1], colors)) return 'blue';
  return null;
}

/**
 * Schedules the gaming winner overlay after game over (only for a non-draw).
 */
export function scheduleGamingWinnerIfNeeded(render: () => void): void {
  clearGamingWinnerTimer();
  if (appState.settings.visualThemeId !== 'gaming') return;
  const game = appState.game;
  if (game === null) return;
  const snap = game.getSnapshot();
  if (!snap.isComplete) return;
  const kind = resolveWinnerKind(snap.scores);
  if (kind === null) return;
  scheduleOverlay(render, kind);
}

