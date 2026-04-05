import type { MemoryGame, MemoryGameSnapshot } from './memory-game';

function buildCardDisabledAttr(snap: MemoryGameSnapshot, matched: boolean): string {
  const isDisabled = snap.isBusy || snap.isComplete || matched;
  return isDisabled ? 'disabled' : '';
}

function buildCardFacesHtml(symbol: string): string {
  return `<span class="memory-card__inner">
            <span class="memory-card__face memory-card__face--back" aria-hidden="true">?</span>
            <span class="memory-card__face memory-card__face--front" aria-hidden="true">${symbol}</span>
          </span>`;
}

/**
 * Erzeugt das Markup einer einzelnen Memory-Karte.
 */
export function buildMemoryCardHtml(game: MemoryGame, snap: MemoryGameSnapshot, index: number): string {
  const visible = game.isFaceVisible(index);
  const matched = snap.matched[index];
  const flippedClass = visible ? ' is-flipped' : '';
  const matchedClass = matched ? ' is-matched' : '';
  const disabledAttr = buildCardDisabledAttr(snap, matched);
  const card = snap.cards[index];
  const label = index + 1;
  return `<button type="button" class="memory-card${flippedClass}${matchedClass}" data-card-index="${index}" aria-label="Karte ${label}" ${disabledAttr}>${buildCardFacesHtml(
    card.symbol,
  )}</button>`;
}
