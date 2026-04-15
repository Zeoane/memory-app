import { appState } from './app-state';
import { getPlayerColors } from './game-constants';
import { codeVibesBlueWins, codeVibesOrangeWins } from './game-over-dialog-html';

let gamingWinnerTimer: ReturnType<typeof setTimeout> | null = null;

/** Cancels any scheduled gaming winner overlay. */
export function clearGamingWinnerTimer(): void {
  if (gamingWinnerTimer !== null) {
    clearTimeout(gamingWinnerTimer);
    gamingWinnerTimer = null;
  }
}

type WinnerKind = 'orange' | 'blue';

/** Schedules showing the winner overlay after a fixed delay. */
function scheduleOverlay(render: () => void, kind: WinnerKind): void {
  gamingWinnerTimer = setTimeout(() => {
    gamingWinnerTimer = null;
    if (appState.view !== 'game' || appState.game === null || !appState.showGameOver) {
      return;
    }
    const latest = appState.game.getSnapshot();
    if (!latest.isComplete) {
      return;
    }
    const c = getPlayerColors(appState.settings.firstPlayerColor);
    const s = latest.scores;
    if (kind === 'orange') {
      if (!codeVibesOrangeWins(s[0], s[1], c)) {
        return;
      }
      appState.showGamingWinnerOrange = true;
      appState.showGamingWinnerBlue = false;
    } else {
      if (!codeVibesBlueWins(s[0], s[1], c)) {
        return;
      }
      appState.showGamingWinnerBlue = true;
      appState.showGamingWinnerOrange = false;
    }
    render();
  }, 3000);
}

/**
 * Schedules the gaming winner overlay after game over (only for a non-draw).
 */
export function scheduleGamingWinnerIfNeeded(render: () => void): void {
  clearGamingWinnerTimer();
  if (appState.settings.visualThemeId !== 'gaming' || appState.game === null) {
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

