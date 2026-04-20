import {
  BOARD_SIZE_OPTIONS,
  GameSettings,
  PlayerColorChoice,
  VISUAL_THEMES,
  getBoardSizeOption,
  getVisualTheme,
} from '../../domain/game-constants';

import { escapeHtml } from '../../shared/escape-text';
import { fillTemplate } from '../../shared/template-utils';
import { getTemplate } from '../../shared/template-registry';

import previewTopbarCodeVibesUrl from '../../assets/img_settings_themes/Code-Vibes_Inner-Topbar.svg?url';
import previewStageCodeVibesUrl from '../../assets/img_settings_themes/Code-Vibes-cv.svg?url';
import previewTopbarGamingUrl from '../../assets/img_settings_themes/Gaming_Theme-topbar.svg?url';
import previewStageGamingUrl from '../../assets/img_settings_themes/Gaming_Theme.svg?url';
import previewTopbarDaProjectsUrl from '../../assets/img_settings_themes/DA_Projects-topbar.svg?url';
import previewStageDaProjectsUrl from '../../assets/img_settings_themes/DA_Projects.svg?url';
import previewTopbarFoodsUrl from '../../assets/img_settings_themes/Foods-theme-topbar.svg?url';
import previewStageFoodsUrl from '../../assets/img_settings_themes/Foods-theme.svg?url';
import settingsTitleRuleUrl from '../../assets/img_settings_themes/Line 3.svg?url';
import settingsThemeRuleShortUrl from '../../assets/img_settings_themes/Line 3_short.svg?url';
import settingsChipSeparatorActiveUrl from '../../assets/img_settings_themes/Line 3_diamond.svg?url';
import settingsChipSeparatorInactiveUrl from '../../assets/img_settings_themes/Line 6.svg?url';
import startBtnDefaultUrl from '../../assets/img_settings_themes/start-btn-default.svg?url';
import startBtnHoverUrl from '../../assets/img_settings_themes/Start-btn-hover.svg?url';
import startBtnDisabledUrl from '../../assets/img_settings_themes/start-btn-disabled.svg?url';

import type { SettingsDraft } from '../../state/app-state';
import type { VisualThemeId } from '../../domain/game-constants';

type SettingsPreviewAssets = {
  readonly topbarUrl: string;
  readonly stageUrl: string;
};

/** Returns the default theme id used for preview when nothing is selected. */
function resolvePreviewThemeId(settings: GameSettings, draft: SettingsDraft): VisualThemeId {
  return draft.visualThemeId ?? settings.visualThemeId;
}

/** Returns the image assets used in the settings preview for a theme. */
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

/** Builds a board-size radio item HTML snippet. */
function buildBoardSizeRadioItem(draft: SettingsDraft, opt: (typeof BOARD_SIZE_OPTIONS)[number]): string {
  const checked = draft.boardSizeId === opt.id ? 'checked' : '';
  return fillTemplate(getTemplate('settings-board-size-item.html'), {
    VALUE: opt.id,
    CHECKED: checked,
    LABEL: escapeHtml(opt.label),
  });
}

/** Builds a player-color radio item HTML snippet. */
function buildColorRadioItem(draft: SettingsDraft, c: PlayerColorChoice): string {
  const checked = draft.firstPlayerColor === c ? 'checked' : '';
  const label = c === 'blue' ? 'Blue' : 'Orange';
  return fillTemplate(getTemplate('settings-player-color-item.html'), {
    VALUE: c,
    CHECKED: checked,
    LABEL: label,
  });
}

/** Builds a visual-theme radio item HTML snippet. */
function buildThemeRadioItem(draft: SettingsDraft, t: (typeof VISUAL_THEMES)[number]): string {
  const checked = draft.visualThemeId === t.id ? 'checked' : '';
  return fillTemplate(getTemplate('settings-visual-theme-item.html'), {
    VALUE: t.id,
    CHECKED: checked,
    LABEL: escapeHtml(t.label),
    RULE_IMG_SRC: settingsThemeRuleShortUrl,
  });
}

/** Builds the board-size section HTML. */
function buildBoardSizeSectionHtml(draft: SettingsDraft): string {
  return fillTemplate(getTemplate('settings-board-size-section.html'), {
    RADIOS: BOARD_SIZE_OPTIONS.map((opt) => buildBoardSizeRadioItem(draft, opt)).join(''),
  });
}

/** Builds the player-color section HTML. */
function buildPlayerColorSectionHtml(draft: SettingsDraft): string {
  const choices: readonly PlayerColorChoice[] = ['blue', 'orange'];
  return fillTemplate(getTemplate('settings-player-color-section.html'), {
    RADIOS: choices.map((c) => buildColorRadioItem(draft, c)).join(''),
  });
}

/** Builds the visual-theme section HTML. */
function buildVisualThemeSectionHtml(draft: SettingsDraft): string {
  return fillTemplate(getTemplate('settings-visual-theme-section.html'), {
    RADIOS: VISUAL_THEMES.map((t) => buildThemeRadioItem(draft, t)).join(''),
  });
}

/** Resolves the footer theme label from draft/settings. */
function buildFooterThemeLabel(settings: GameSettings, draft: SettingsDraft): string {
  if (draft.visualThemeId === null) {
    return 'Theme';
  }
  return getVisualTheme(draft.visualThemeId).label;
}

/** Resolves the footer player label from the draft. */
function buildFooterPlayerLabel(_settings: GameSettings, draft: SettingsDraft): string {
  if (draft.firstPlayerColor === null) {
    return 'Player';
  }
  return draft.firstPlayerColor === 'blue' ? 'Blue' : 'Orange';
}

/** Resolves the footer board size label from the draft. */
function buildFooterBoardLabel(_settings: GameSettings, draft: SettingsDraft): string {
  if (draft.boardSizeId === null) {
    return 'Board size';
  }
  return getBoardSizeOption(draft.boardSizeId).label;
}

/** Builds the settings preview HTML for the currently selected theme. */
function buildSettingsPreviewHtml(settings: GameSettings, draft: SettingsDraft): string {
  const effectiveThemeId = resolvePreviewThemeId(settings, draft);
  const preview = getSettingsPreviewAssets(effectiveThemeId);
  const chromeClass = `settings-preview__chrome settings-preview__chrome--${effectiveThemeId}`;
  return fillTemplate(getTemplate('settings-preview.html'), {
    CHROME_CLASS: chromeClass,
    TOPBAR_SRC: preview.topbarUrl,
    STAGE_SRC: preview.stageUrl,
  });
}

/** True if the start button should be disabled. */
function isStartDisabled(draft: SettingsDraft): boolean {
  return draft.boardSizeId === null || draft.visualThemeId === null || draft.firstPlayerColor === null;
}

/** True as soon as the theme chip has a selection. Controls whether the
 * separator between theme and player shows the active (diamond) variant. */
function isThemePlayerSeparatorVisible(draft: SettingsDraft): boolean {
  return draft.visualThemeId !== null;
}

/** True as soon as the player chip has a selection. Controls whether the
 * separator between player and board shows the active (diamond) variant. */
function isPlayerBoardSeparatorVisible(draft: SettingsDraft): boolean {
  return draft.firstPlayerColor !== null;
}

/** Builds the template replacements for the settings shell. */
function assembleSettingsSections(settings: GameSettings, draft: SettingsDraft): Record<string, string> {
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
    START_BTN_DISABLED_ATTR: isStartDisabled(draft) ? 'disabled' : '',
    CHIP_SEPARATOR_ACTIVE_SRC: settingsChipSeparatorActiveUrl,
    CHIP_SEPARATOR_INACTIVE_SRC: settingsChipSeparatorInactiveUrl,
    SEP_THEME_PLAYER_STATE: isThemePlayerSeparatorVisible(draft) ? 'on' : 'off',
    SEP_PLAYER_BOARD_STATE: isPlayerBoardSeparatorVisible(draft) ? 'on' : 'off',
  };
}

/** Builds the full settings screen HTML from settings and a selection draft. */
export function buildSettingsHtml(settings: GameSettings, draft: SettingsDraft): string {
  const sections = assembleSettingsSections(settings, draft);
  return fillTemplate(getTemplate('settings-shell.html'), sections);
}

