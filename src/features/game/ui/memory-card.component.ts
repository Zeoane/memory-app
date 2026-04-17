import type { VisualThemeId } from '../../../domain/game-constants';
import { getCodeVibesIconUrl } from '../../../assets/code-vibes-icon-urls';
import { getGamingIconUrl } from '../../../assets/gaming-icon-urls';
import { escapeHtml } from '../../../shared/escape-text';
import type { MemoryGame, MemoryGameSnapshot } from '../../../domain/memory-game';

import codeVibesCardBackUrl from '../../../assets/img_code_vibes-theme/Code vibes card 1.svg?url';
import gamingCardArtUrl from '../../../assets/img_gaming-theme/Game card 28.svg?url';

import { fillTemplate } from '../../../shared/template-utils';
import { getTemplate } from '../../../shared/template-registry';

/** Builds `aria-disabled` / `tabindex` attributes based on game state. */
function buildCardDisabledAttr(snap: MemoryGameSnapshot, matched: boolean): string {
  const isDisabled = snap.isBusy || snap.isComplete || matched;
  return isDisabled ? 'aria-disabled="true" tabindex="-1"' : 'tabindex="0"';
}

/** Builds the card back face HTML for the selected theme. */
function buildBackFaceHtml(visualThemeId: VisualThemeId): string {
  if (visualThemeId === 'code-vibes') {
    return fillTemplate(getTemplate('memory-card-face-back-illustrated.html'), {
      SRC: codeVibesCardBackUrl,
      WIDTH: String(120),
      HEIGHT: String(120),
    });
  }
  if (visualThemeId === 'gaming') {
    return fillTemplate(getTemplate('memory-card-face-back-illustrated.html'), {
      SRC: gamingCardArtUrl,
      WIDTH: String(105),
      HEIGHT: String(120),
    });
  }
  return getTemplate('memory-card-face-back-text.html');
}

/** Builds the illustrated front face HTML for an icon URL. */
function buildIllustratedFrontFaceHtml(
  iconUrl: string,
  modifierClass: string,
  width: number,
  height: number,
): string {
  return fillTemplate(getTemplate('memory-card-face-front-illustrated.html'), {
    FRONT_MODIFIER_CLASS: modifierClass,
    SRC: iconUrl,
    WIDTH: String(width),
    HEIGHT: String(height),
  });
}

/** Builds the text front face HTML. */
function buildTextFrontFaceHtml(text: string): string {
  return fillTemplate(getTemplate('memory-card-face-front-text.html'), { TEXT: escapeHtml(text) });
}

/** Resolves the icon URL for the given symbol and theme. */
function resolveIconUrl(symbol: string, visualThemeId: VisualThemeId): string | undefined {
  if (visualThemeId === 'gaming') return getGamingIconUrl(symbol);
  if (visualThemeId === 'code-vibes') return getCodeVibesIconUrl(symbol);
  return undefined;
}

/** Builds the card front face HTML for the selected theme. */
function buildFrontFaceHtml(symbol: string, visualThemeId: VisualThemeId): string {
  const iconUrl = resolveIconUrl(symbol, visualThemeId);
  if (!iconUrl) return buildTextFrontFaceHtml(symbol);

  if (visualThemeId === 'code-vibes') {
    return buildIllustratedFrontFaceHtml(iconUrl, 'memory-card__face--front--code-vibes-icon', 72, 72);
  }
  return buildIllustratedFrontFaceHtml(iconUrl, 'memory-card__face--front--illustrated', 96, 96);
}

/** Builds the inner faces markup for a card. */
function buildCardFacesHtml(symbol: string, visualThemeId: VisualThemeId): string {
  return fillTemplate(getTemplate('memory-card-inner.html'), {
    BACK_FACE: buildBackFaceHtml(visualThemeId),
    FRONT_FACE: buildFrontFaceHtml(symbol, visualThemeId),
  });
}

/** Builds the full memory card wrapper HTML. */
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

  return fillTemplate(getTemplate('memory-card-wrapper.html'), {
    FLIPPED_CLASS: flippedClass,
    MATCHED_CLASS: matchedClass,
    INDEX: String(index),
    LABEL: String(label),
    DISABLED_ATTR: disabledAttr,
    FACES: buildCardFacesHtml(card.symbol, visualThemeId),
  });
}

