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
import previewTopbarCodeVibesUrl from './assets/img_settings_themes/Code-Vibes_Inner-Topbar.svg?url';
import previewStageCodeVibesUrl from './assets/img_settings_themes/Code-Vibes-cv.svg?url';
import previewTopbarGamingUrl from './assets/img_settings_themes/Gaming_Theme-topbar.svg?url';
import previewStageGamingUrl from './assets/img_settings_themes/Gaming_Theme.svg?url';
import previewTopbarDaProjectsUrl from './assets/img_settings_themes/DA_Projects-topbar.svg?url';
import previewStageDaProjectsUrl from './assets/img_settings_themes/DA_Projects.svg?url';
import previewTopbarFoodsUrl from './assets/img_settings_themes/Foods-theme-topbar.svg?url';
import previewStageFoodsUrl from './assets/img_settings_themes/Foods-theme.svg?url';
import settingsTitleRuleUrl from './assets/img_settings_themes/Line 3.svg?url';
import settingsThemeRuleShortUrl from './assets/img_settings_themes/Line 3_short.svg?url';
import startBtnDefaultUrl from './assets/img_settings_themes/start-btn-default.svg?url';
import startBtnHoverUrl from './assets/img_settings_themes/Start-btn-hover.svg?url';
import startBtnDisabledUrl from './assets/img_settings_themes/start-btn-disabled.svg?url';
import type { SettingsDraft } from './app-state';
import type { VisualThemeId } from './game-constants';

type SettingsPreviewAssets = {
  readonly topbarUrl: string;
  readonly stageUrl: string;
};

function getSettingsPreviewAssets(themeId: VisualThemeId): SettingsPreviewAssets {
  switch (themeId) {
    case 'code-vibes':
      return { topbarUrl: previewTopbarCodeVibesUrl, stageUrl: previewStageCodeVibesUrl };
    case 'gaming':
      return { topbarUrl: previewTopbarGamingUrl, stageUrl: previewStageGamingUrl };
    case 'da-projects':
      return { topbarUrl: previewTopbarDaProjectsUrl, stageUrl: previewStageDaProjectsUrl };
    case 'foods':
      return { topbarUrl: previewTopbarFoodsUrl, stageUrl: previewStageFoodsUrl };
  }
}

function buildBoardSizeRadioItem(draft: SettingsDraft, opt: (typeof BOARD_SIZE_OPTIONS)[number]): string {
  const checked = draft.boardSizeId === opt.id ? 'checked' : '';
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
 * Generates the radio playlist for the playing field size.
 */
function buildBoardSizeRadiosHtml(settings: GameSettings): string {
  // backwards compat helper; not used anymore
  return BOARD_SIZE_OPTIONS.map((opt) => buildBoardSizeRadioItem(
    { boardSizeId: settings.boardSizeId, visualThemeId: settings.visualThemeId, firstPlayerColor: settings.firstPlayerColor },
    opt,
  )).join('');
}

function buildColorRadioItem(draft: SettingsDraft, c: PlayerColorChoice): string {
  const checked = draft.firstPlayerColor === c ? 'checked' : '';
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
 * Generates the radio list for player color (Player 1).
 */
function buildColorRadiosHtml(settings: GameSettings): string {

  const choices: readonly PlayerColorChoice[] = ['blue', 'orange'];
  return choices
    .map((c) =>
      buildColorRadioItem(
        { boardSizeId: settings.boardSizeId, visualThemeId: settings.visualThemeId, firstPlayerColor: settings.firstPlayerColor },
        c,
      ),
    )
    .join('');
}

function buildThemeRadioItem(draft: SettingsDraft, t: (typeof VISUAL_THEMES)[number]): string {
  const checked = draft.visualThemeId === t.id ? 'checked' : '';
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
 * Generates the radio list for visual themes.
 */
function buildThemeRadiosHtml(settings: GameSettings): string {

  return VISUAL_THEMES.map((t) =>
    buildThemeRadioItem(
      { boardSizeId: settings.boardSizeId, visualThemeId: settings.visualThemeId, firstPlayerColor: settings.firstPlayerColor },
      t,
    ),
  ).join('');
}

function buildBoardSizeSectionHtml(draft: SettingsDraft): string {
  return fillTemplate(boardSizeSectionTpl, {
    RADIOS: BOARD_SIZE_OPTIONS.map((opt) => buildBoardSizeRadioItem(draft, opt)).join(''),
  });
}

function buildPlayerColorSectionHtml(draft: SettingsDraft): string {
  const choices: readonly PlayerColorChoice[] = ['blue', 'orange'];
  return fillTemplate(playerColorSectionTpl, {
    RADIOS: choices.map((c) => buildColorRadioItem(draft, c)).join(''),
  });
}

function buildVisualThemeSectionHtml(draft: SettingsDraft): string {
  return fillTemplate(visualThemeSectionTpl, {
    RADIOS: VISUAL_THEMES.map((t) => buildThemeRadioItem(draft, t)).join(''),
  });
}

/**
 * Builds all sections for the settings page.
 */
function buildFooterThemeLabel(settings: GameSettings, draft: SettingsDraft): string {
  if (draft.visualThemeId === null) {
    return 'Game theme';
  }
  return getVisualTheme(draft.visualThemeId).label;
}

function buildFooterPlayerLabel(_settings: GameSettings, draft: SettingsDraft): string {
  if (draft.firstPlayerColor === null) {
    return 'Player';
  }
  return draft.firstPlayerColor === 'blue' ? 'Blue' : 'Orange';
}

function buildFooterBoardLabel(_settings: GameSettings, draft: SettingsDraft): string {
  if (draft.boardSizeId === null) {
    return 'Board size';
  }
  return getBoardSizeOption(draft.boardSizeId).label;
}

/**
 * Static preview of the game interface.
 */
function buildSettingsPreviewHtml(settings: GameSettings, draft: SettingsDraft): string {
  const effectiveThemeId: VisualThemeId = (draft.visualThemeId ?? settings.visualThemeId) as VisualThemeId;
  const preview = getSettingsPreviewAssets(effectiveThemeId);
  const chromeClass = `settings-preview__chrome settings-preview__chrome--${effectiveThemeId}`;
  return `
    <div class="settings-preview">
      <div class="${chromeClass}">
        <div class="settings-preview__topbar-art" aria-hidden="true">
          <img
            class="settings-preview__topbar-img"
            src="${preview.topbarUrl}"
            width="451"
            height="57"
            alt=""
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </div>
        <div class="settings-preview__stage">
          <div class="settings-preview__stage-art">
            <img
              class="settings-preview__stage-img"
              src="${preview.stageUrl}"
              width="349"
              height="249"
              alt="Vorschau: Spielleiste und Karten"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  `.trim();
}

function assembleSettingsSections(settings: GameSettings, draft: SettingsDraft): Record<string, string> {
  const isStartDisabled =
    draft.boardSizeId === null || draft.visualThemeId === null || draft.firstPlayerColor === null;
  return {
    BOARD_SIZE_SECTION: buildBoardSizeSectionHtml(draft),
    PLAYER_COLOR_SECTION: buildPlayerColorSectionHtml(draft),
    VISUAL_THEME_SECTION: buildVisualThemeSectionHtml(draft),
    PREVIEW: buildSettingsPreviewHtml(settings, draft),
    FOOTER_THEME: escapeHtml(buildFooterThemeLabel(settings, draft)),
    FOOTER_PLAYER: escapeHtml(buildFooterPlayerLabel(settings, draft)),
    FOOTER_BOARD: escapeHtml(buildFooterBoardLabel(settings, draft)),
    TITLE_RULE_IMG: settingsTitleRuleUrl,
    START_BTN_DEFAULT_SRC: startBtnDefaultUrl,
    START_BTN_HOVER_SRC: startBtnHoverUrl,
    START_BTN_DISABLED_SRC: startBtnDisabledUrl,
    START_BTN_DISABLED_ATTR: isStartDisabled ? 'disabled' : '',
  };
}

/**
 * Full markup of the settings view.
 */
export function buildSettingsHtml(settings: GameSettings, draft: SettingsDraft): string {
  const sections = assembleSettingsSections(settings, draft);
  return fillTemplate(settingsShellTpl, sections);
}
