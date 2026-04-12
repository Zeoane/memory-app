import { appState } from './app-state';
import { getPlayerColors } from './game-constants';
import { codeVibesBlueWins, codeVibesOrangeWins } from './game-over-dialog-html';

let codeVibesWinnerTimer: ReturnType<typeof setTimeout> | null = null;

export function clearCodeVibesWinnerTimer(): void {
  if (codeVibesWinnerTimer !== null) {
    clearTimeout(codeVibesWinnerTimer);
    codeVibesWinnerTimer = null;
  }
}

type WinnerKind = 'orange' | 'blue';

function scheduleOverlay(render: () => void, kind: WinnerKind): void {
  codeVibesWinnerTimer = setTimeout(() => {
    codeVibesWinnerTimer = null;
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
      appState.showCodeVibesWinnerOrange = true;
      appState.showCodeVibesWinnerBlue = false;
    } else {
      if (!codeVibesBlueWins(s[0], s[1], c)) {
        return;
      }
      appState.showCodeVibesWinnerBlue = true;
      appState.showCodeVibesWinnerOrange = false;
    }
    render();
  }, 3000);
}

/**
 * Plant nach Spielende (Code Vibes, eindeutiger Sieger Blue oder Orange) die Gewinner-Ansicht nach 3 s.
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
