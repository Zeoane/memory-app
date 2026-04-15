import type { VisualThemeId } from './game-constants';
import { getCodeVibesIconUrl } from './code-vibes-icon-urls';
import { getGamingIconUrl } from './gaming-icon-urls';
import { escapeHtml } from './html-utils';
import type { MemoryGame, MemoryGameSnapshot } from './memory-game';
import codeVibesCardBackUrl from './assets/img_code_vibes-theme/Code vibes card 1.svg?url';
import gamingCardArtUrl from './assets/img_gaming-theme/Game card 28.svg?url';

/** Builds accessibility attributes for the card's interactive element. */
function buildCardDisabledAttr(snap: MemoryGameSnapshot, matched: boolean): string {
  const isDisabled = snap.isBusy || snap.isComplete || matched;
  /* Avoid <button>: preserve-3d may be flattened in some browsers, breaking the flip. */
  return isDisabled ? 'aria-disabled="true" tabindex="-1"' : 'tabindex="0"';
}

/** Builds the illustrated card back face markup. */
function buildIllustratedCardBack(url: string, width: number, height: number): string {
  return `<span class="memory-card__face memory-card__face--back memory-card__face--back--illustrated" aria-hidden="true"><img class="memory-card__back-art" src="${url}" alt="" width="${width}" height="${height}" decoding="async" /></span>`;
}

/** Builds the card back face markup for the selected theme. */
function buildCardBackHtml(visualThemeId: VisualThemeId): string {
  if (visualThemeId === 'code-vibes') {
    return buildIllustratedCardBack(codeVibesCardBackUrl, 120, 120);
  }
  if (visualThemeId === 'gaming') {
    return buildIllustratedCardBack(gamingCardArtUrl, 105, 120);
  }
  return `<span class="memory-card__face memory-card__face--back" aria-hidden="true">?</span>`;
}

/** Builds the card front face markup for the selected theme and symbol. */
function buildCardFrontHtml(symbol: string, visualThemeId: VisualThemeId): string {
  if (visualThemeId === 'gaming') {
    const iconUrl = getGamingIconUrl(symbol);
    if (iconUrl) {
      return `<span class="memory-card__face memory-card__face--front memory-card__face--front--illustrated" aria-hidden="true"><img class="memory-card__front-icon" src="${iconUrl}" alt="" width="96" height="96" decoding="async" /></span>`;
    }
    return `<span class="memory-card__face memory-card__face--front" aria-hidden="true">${escapeHtml(symbol)}</span>`;
  }
  if (visualThemeId === 'code-vibes') {
    const iconUrl = getCodeVibesIconUrl(symbol);
    if (iconUrl) {
      return `<span class="memory-card__face memory-card__face--front memory-card__face--front--code-vibes-icon" aria-hidden="true"><img class="memory-card__front-icon" src="${iconUrl}" alt="" width="72" height="72" decoding="async" /></span>`;
    }
  }
  return `<span class="memory-card__face memory-card__face--front" aria-hidden="true">${escapeHtml(symbol)}</span>`;
}

/** Builds the combined inner faces markup for a card. */
function buildCardFacesHtml(symbol: string, visualThemeId: VisualThemeId): string {
  return `<span class="memory-card__inner">
            ${buildCardBackHtml(visualThemeId)}
            ${buildCardFrontHtml(symbol, visualThemeId)}
          </span>`;
}

/**
 * Generates the markup of a single memory card.
 */
export function buildMemoryCardHtml(
  game: MemoryGame,
  snap: MemoryGameSnapshot,
  index: number,
  visualThemeId: VisualThemeId,
): string {
  const visible = game.isFaceVisible(index);
  const matched = snap.matched[index];
  const flippedClass = visible ? ' is-flipped' : '';
  const matchedClass = matched ? ' is-matched' : '';
  const disabledAttr = buildCardDisabledAttr(snap, matched);
  const card = snap.cards[index];
  const label = index + 1;
  return `<div role="button" class="memory-card${flippedClass}${matchedClass}" data-card-index="${index}" aria-label="Karte ${label}" ${disabledAttr}>${buildCardFacesHtml(
    card.symbol,
    visualThemeId,
  )}</div>`;
}
