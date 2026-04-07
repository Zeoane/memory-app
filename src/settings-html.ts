import {
  BOARD_SIZE_OPTIONS,
  GameSettings,
  PlayerColorChoice,
  VISUAL_THEMES,
  getBoardSizeOption,
  getVisualTheme,
} from './game-constants';
import { escapeHtml } from './html-utils';
import settingsShellTpl from './templates/settings-shell.html?raw';
import boardSizeSectionTpl from './templates/settings-board-size-section.html?raw';
import playerColorSectionTpl from './templates/settings-player-color-section.html?raw';
import visualThemeSectionTpl from './templates/settings-visual-theme-section.html?raw';
import { fillTemplate } from './template-utils';
import settingsPreviewVisualUrl from './assets/img_settings_themes/Frame_codeing-vibes.svg?url';
import settingsTitleRuleUrl from './assets/img_settings_themes/Line 3.svg?url';
import settingsThemeRuleShortUrl from './assets/img_settings_themes/Line 3_short.svg?url';
import playerBlueUrl from './assets/img_settings_themes/player_blue.svg?url';
import playerOrangeUrl from './assets/img_settings_themes/player_orange.svg?url';
import currentPlayerBlueUrl from './assets/img_settings_themes/current_player_blue.svg?url';
import currentPlayerOrangeUrl from './assets/img_settings_themes/current_player_orange.svg?url';
import exitGameSvg from './assets/img_settings_themes/exit_game.svg?raw';

function buildBoardSizeRadioItem(settings: GameSettings, opt: (typeof BOARD_SIZE_OPTIONS)[number]): string {
  const checked = settings.boardSizeId === opt.id ? 'checked' : '';
  return `
      <li>
        <label class="choice choice--board-size">
          <input class="choice__radio choice__radio--theme" type="radio" name="boardSize" value="${opt.id}" ${checked} />
          <span class="choice__title choice__title--board">${escapeHtml(opt.label)}</span>
        </label>
      </li>
    `;
}

/**
 * Erzeugt die Radio-Liste für die Spielfeldgröße.
 */
function buildBoardSizeRadiosHtml(settings: GameSettings): string {
  return BOARD_SIZE_OPTIONS.map((opt) => buildBoardSizeRadioItem(settings, opt)).join('');
}

function buildColorRadioItem(settings: GameSettings, c: PlayerColorChoice): string {
  const checked = settings.firstPlayerColor === c ? 'checked' : '';
  const label = c === 'blue' ? 'Blue' : 'Orange';
  return `
      <li>
        <label class="choice choice--choose-player">
          <input class="choice__radio choice__radio--theme" type="radio" name="playerColor" value="${c}" ${checked} />
          <span class="choice__title choice__title--player">${label}</span>
        </label>
      </li>
    `;
}

/**
 * Erzeugt die Radio-Liste für Spielerfarbe (Spieler 1).
 */
function buildColorRadiosHtml(settings: GameSettings): string {
  const choices: readonly PlayerColorChoice[] = ['blue', 'orange'];
  return choices.map((c) => buildColorRadioItem(settings, c)).join('');
}

function buildThemeRadioItem(settings: GameSettings, t: (typeof VISUAL_THEMES)[number]): string {
  const checked = settings.visualThemeId === t.id ? 'checked' : '';
  return `
      <li>
        <label class="choice choice--game-theme">
          <input class="choice__radio choice__radio--theme" type="radio" name="visualTheme" value="${t.id}" ${checked} />
          <span class="choice__theme-body">
            <span class="choice__title choice__title--theme">${escapeHtml(t.label)}</span>
            <span class="choice__theme-accent" aria-hidden="true">
              <img class="choice__theme-accent-img" src="${settingsThemeRuleShortUrl}" width="41" height="18" alt="" decoding="async" />
            </span>
          </span>
        </label>
      </li>
    `;
}

/**
 * Erzeugt die Radio-Liste für visuelle Themes.
 */
function buildThemeRadiosHtml(settings: GameSettings): string {
  return VISUAL_THEMES.map((t) => buildThemeRadioItem(settings, t)).join('');
}

function buildBoardSizeSectionHtml(settings: GameSettings): string {
  return fillTemplate(boardSizeSectionTpl, { RADIOS: buildBoardSizeRadiosHtml(settings) });
}

function buildPlayerColorSectionHtml(settings: GameSettings): string {
  return fillTemplate(playerColorSectionTpl, {
    RADIOS: buildColorRadiosHtml(settings),
  });
}

function buildVisualThemeSectionHtml(settings: GameSettings): string {
  return fillTemplate(visualThemeSectionTpl, { RADIOS: buildThemeRadiosHtml(settings) });
}

/**
 * Baut alle Sektionen für die Einstellungsseite.
 */
function buildFooterThemeLabel(settings: GameSettings): string {
  return getVisualTheme(settings.visualThemeId).label;
}

function buildFooterPlayerLabel(settings: GameSettings): string {
  return settings.firstPlayerColor === 'blue' ? 'Blue' : 'Orange';
}

function buildFooterBoardLabel(settings: GameSettings): string {
  return getBoardSizeOption(settings.boardSizeId).label;
}

/**
 * Statische Vorschau der Spieloberfläche (Figma-Export „Frame 628“).
 */
function buildSettingsPreviewHtml(settings: GameSettings): string {
  const currentPlayerIconUrl = settings.firstPlayerColor === 'blue' ? currentPlayerBlueUrl : currentPlayerOrangeUrl;

  return `
    <div class="settings-preview">
      <div class="settings-preview__chrome">
        <div class="settings-preview__topbar" aria-hidden="true">
          <div class="settings-preview__topbar-inner">
            <div class="settings-preview__topbar-left">
              <span class="settings-preview__player-chip settings-preview__player-chip--blue">
                <img class="settings-preview__player-icon" src="${playerBlueUrl}" width="30" height="10" alt="" />
                <span class="settings-preview__player-count">0</span>
              </span>
              <span class="settings-preview__player-chip settings-preview__player-chip--orange">
                <img class="settings-preview__player-icon" src="${playerOrangeUrl}" width="30" height="10" alt="" />
                <span class="settings-preview__player-count">0</span>
              </span>
            </div>

            <div class="settings-preview__current-player">
              <span class="settings-preview__current-player-label">Current player:</span>
              <img
                class="settings-preview__current-player-icon"
                src="${currentPlayerIconUrl}"
                width="10"
                height="8"
                alt=""
              />
            </div>

            <button type="button" class="settings-preview__exit-btn">
              <span class="settings-preview__exit-icon" aria-hidden="true">${exitGameSvg.trim()}</span>
              <span class="settings-preview__exit-label">Exit game</span>
            </button>
          </div>
        </div>
        <div class="settings-preview__stage">
          <div class="settings-preview__stage-art">
            <img
              class="settings-preview__stage-img"
              src="${settingsPreviewVisualUrl}"
              width="451"
              height="387"
              alt="Vorschau: Spielleiste und Karten"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  `.trim();
}

function assembleSettingsSections(settings: GameSettings): Record<string, string> {
  return {
    BOARD_SIZE_SECTION: buildBoardSizeSectionHtml(settings),
    PLAYER_COLOR_SECTION: buildPlayerColorSectionHtml(settings),
    VISUAL_THEME_SECTION: buildVisualThemeSectionHtml(settings),
    PREVIEW: buildSettingsPreviewHtml(settings),
    FOOTER_THEME: escapeHtml(buildFooterThemeLabel(settings)),
    FOOTER_PLAYER: escapeHtml(buildFooterPlayerLabel(settings)),
    FOOTER_BOARD: escapeHtml(buildFooterBoardLabel(settings)),
    TITLE_RULE_IMG: settingsTitleRuleUrl,
  };
}

/**
 * Vollständiges Markup der Einstellungsansicht.
 */
export function buildSettingsHtml(settings: GameSettings): string {
  const sections = assembleSettingsSections(settings);
  return fillTemplate(settingsShellTpl, sections);
}
