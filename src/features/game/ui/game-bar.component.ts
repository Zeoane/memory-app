import type { PlayerColors, VisualThemeId } from '../../../domain/game-constants';
import type { MemoryGameSnapshot } from '../../../domain/memory-game';

import labelBlueUrl from '../../../assets/img_code_vibes-theme/label-blue.svg?url';
import labelOrangeUrl from '../../../assets/img_code_vibes-theme/label-orange.svg?url';
import chessPawnOrangeUrl from '../../../assets/img_gaming-theme/gt-chess_pawn-orange.svg?url';
import chessPawnBlueUrl from '../../../assets/img_gaming-theme/gt-chess_pawn-blue.svg?url';
import chessPawnWhiteUrl from '../../../assets/img_gaming-theme/gt-chess_pawn-white.svg?url';
import exitGameIconUrl from '../../../assets/img_settings_themes/exit_game.svg?url';

import { fillTemplate } from '../../../shared/template-utils';
import { getTemplate } from '../../../shared/template-registry';

const PLAYER_1_INDEX = 0;

/** Builds a single score row from left/right parts. */
function buildScoreRow(left: string, right: string, pairModifier = ''): string {
  return fillTemplate(getTemplate('game-bar-score-row.html'), {
    PAIR_MODIFIER: pairModifier,
    LEFT: left,
    RIGHT: right,
  });
}

/** Wraps score rows in the scores panel container. */
function buildScoresPanel(rows: string, panelModifier = '', scoresModifier = ''): string {
  return fillTemplate(getTemplate('game-bar-scores-panel.html'), {
    PANEL_MODIFIER: panelModifier,
    SCORES_MODIFIER: scoresModifier,
    ROWS: rows,
  });
}

/** Builds the generic score left label. */
function buildGenericScoreLeft(label: string): string {
  return fillTemplate(getTemplate('game-bar-generic-score-left.html'), { LABEL: label });
}

/** Builds the generic score right number. */
function buildGenericScoreRight(score: number, spanClass: string): string {
  return fillTemplate(getTemplate('game-bar-generic-score-right.html'), {
    SPAN_CLASS: spanClass,
    SCORE: String(score),
  });
}

/** Builds the generic scores block (player 1/2). */
function buildGenericScoresHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const p1SpanClass = `score score--p1 player-tag player-tag--${colors.player1}`;
  const p2SpanClass = `score score--p2 player-tag player-tag--${colors.player2}`;

  const rows = [
    buildScoreRow(
      buildGenericScoreLeft('Spieler 1'),
      buildGenericScoreRight(snap.scores[0], p1SpanClass),
    ),
    buildScoreRow(
      buildGenericScoreLeft('Spieler 2'),
      buildGenericScoreRight(snap.scores[1], p2SpanClass),
    ),
  ].join('');

  return buildScoresPanel(rows);
}

/** Builds the code-vibes score left label. */
function buildCodeVibesScoreLeft(labelIconSrc: string, playerName: string): string {
  return fillTemplate(getTemplate('game-bar-cv-score-left.html'), {
    LABEL_ICON_SRC: labelIconSrc,
    PLAYER_NAME: playerName,
  });
}

/** Builds the code-vibes score right number. */
function buildCodeVibesScoreRight(score: number, color: 'blue' | 'orange'): string {
  return fillTemplate(getTemplate('game-bar-cv-score-right.html'), {
    COLOR: color,
    SCORE: String(score),
  });
}

/** Builds the code-vibes scores block (blue/orange). */
function buildCodeVibesScoresHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const blueScore = colors.player1 === 'blue' ? snap.scores[0] : snap.scores[1];
  const orangeScore = colors.player1 === 'orange' ? snap.scores[0] : snap.scores[1];

  const rows = [
    buildScoreRow(
      buildCodeVibesScoreLeft(labelBlueUrl, 'Blue'),
      buildCodeVibesScoreRight(blueScore, 'blue'),
      ' game-bar__pair--code-vibes',
    ),
    buildScoreRow(
      buildCodeVibesScoreLeft(labelOrangeUrl, 'Orange'),
      buildCodeVibesScoreRight(orangeScore, 'orange'),
      ' game-bar__pair--code-vibes',
    ),
  ].join('');

  return buildScoresPanel(
    rows,
    ' game-bar__scores-panel--code-vibes',
    ' game-bar__scores--code-vibes',
  );
}

/** Builds the gaming score left pawn. */
function buildGamingScoreLeft(pawnSrc: string): string {
  return fillTemplate(getTemplate('game-bar-gt-score-left.html'), { PAWN_SRC: pawnSrc });
}

/** Builds the gaming score right number. */
function buildGamingScoreRight(score: number, color: 'blue' | 'orange'): string {
  return fillTemplate(getTemplate('game-bar-gt-score-right.html'), {
    COLOR: color,
    SCORE: String(score),
  });
}

/** Builds the gaming scores block (blue/orange). */
function buildGamingScoresHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const blueScore = colors.player1 === 'blue' ? snap.scores[0] : snap.scores[1];
  const orangeScore = colors.player1 === 'orange' ? snap.scores[0] : snap.scores[1];

  const rows = [
    buildScoreRow(
      buildGamingScoreLeft(chessPawnOrangeUrl),
      buildGamingScoreRight(orangeScore, 'orange'),
      ' game-bar__pair--gaming',
    ),
    buildScoreRow(
      buildGamingScoreLeft(chessPawnBlueUrl),
      buildGamingScoreRight(blueScore, 'blue'),
      ' game-bar__pair--gaming',
    ),
  ].join('');

  return buildScoresPanel(
    rows,
    ' game-bar__scores-panel--gaming',
    ' game-bar__scores--gaming',
  );
}

/** Resolves the active player's color based on current player index. */
function resolveCurrentPlayerColor(snap: MemoryGameSnapshot, colors: PlayerColors): 'blue' | 'orange' {
  return snap.currentPlayer === PLAYER_1_INDEX ? colors.player1 : colors.player2;
}

/** Builds the current-player tag modifier class. */
function buildCurrentPlayerTagClass(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const current = resolveCurrentPlayerColor(snap, colors);
  return `player-tag--${current}`;
}

/** Builds an accessible current-player name. */
function buildCurrentPlayerNameForAria(snap: MemoryGameSnapshot, colors: PlayerColors): 'Blue' | 'Orange' {
  const p = resolveCurrentPlayerColor(snap, colors);
  return p === 'blue' ? 'Blue' : 'Orange';
}

/** Resolves the code-vibes label icon URL for the active player. */
function resolveCurrentPlayerLabelIconUrl(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const p = resolveCurrentPlayerColor(snap, colors);
  return p === 'blue' ? labelBlueUrl : labelOrangeUrl;
}

/** Builds the German "current player" label for generic UI. */
function buildCurrentPlayerLabelDe(snap: MemoryGameSnapshot): string {
  const isFirst = snap.currentPlayer === PLAYER_1_INDEX;
  return isFirst ? 'Spieler 1' : 'Spieler 2';
}

/** Builds the code-vibes turn indicator HTML. */
function buildCodeVibesTurnHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  return fillTemplate(getTemplate('game-bar-turn-code-vibes.html'), {
    LABEL_ICON_SRC: resolveCurrentPlayerLabelIconUrl(snap, colors),
    CURRENT_NAME: buildCurrentPlayerNameForAria(snap, colors),
  });
}

/** Builds the gaming turn indicator HTML. */
function buildGamingTurnHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  const current = resolveCurrentPlayerColor(snap, colors);
  const badgeClass = current === 'blue' ? 'game-bar__current-badge--blue' : 'game-bar__current-badge--orange';
  return fillTemplate(getTemplate('game-bar-turn-gaming.html'), {
    BADGE_CLASS: badgeClass,
    CURRENT_NAME: current === 'blue' ? 'Blue' : 'Orange',
    PAWN_WHITE_SRC: chessPawnWhiteUrl,
  });
}

/** Builds the generic turn indicator HTML. */
function buildGenericTurnHtml(snap: MemoryGameSnapshot, colors: PlayerColors): string {
  return fillTemplate(getTemplate('game-bar-turn-generic.html'), {
    TAG_CLASS: buildCurrentPlayerTagClass(snap, colors),
    LABEL: buildCurrentPlayerLabelDe(snap),
  });
}

/** Builds the "current turn" block for the selected theme. */
function buildTurnHtml(snap: MemoryGameSnapshot, colors: PlayerColors, theme: VisualThemeId): string {
  if (theme === 'code-vibes') return buildCodeVibesTurnHtml(snap, colors);
  if (theme === 'gaming') return buildGamingTurnHtml(snap, colors);
  return buildGenericTurnHtml(snap, colors);
}

/** Builds the "exit game" navigation HTML. */
function buildExitNavHtml(): string {
  return fillTemplate(getTemplate('game-bar-exit-nav.html'), { EXIT_ICON_SRC: exitGameIconUrl });
}

/** Builds the game bar HTML from scores, turn and navigation. */
export function buildGameBarHtml(
  snap: MemoryGameSnapshot,
  colors: PlayerColors,
  visualThemeId: VisualThemeId,
): string {
  const scoresBlock = resolveScoresBlock(snap, colors, visualThemeId);
  return `${scoresBlock}${buildTurnHtml(snap, colors, visualThemeId)}${buildExitNavHtml()}`;
}

/** Resolves the scores HTML block for the selected theme. */
function resolveScoresBlock(snap: MemoryGameSnapshot, colors: PlayerColors, theme: VisualThemeId): string {
  if (theme === 'code-vibes') return buildCodeVibesScoresHtml(snap, colors);
  if (theme === 'gaming') return buildGamingScoresHtml(snap, colors);
  return buildGenericScoresHtml(snap, colors);
}

