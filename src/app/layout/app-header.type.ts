import type { ThemeModeType } from '../../theme/theme.type';
import type { LanguageCodeType } from '../../types/language.type';

/**
 * Props used by the theme toggle icon renderer.
 */
export type ThemeToggleIconPropsType = {
  /**
   * Current active theme mode.
   */
  theme: ThemeModeType;
};

/**
 * Input payload for language updates in the header controls.
 */
export type ChangeLanguageInputType = {
  /**
   * Next selected language code.
   */
  language: LanguageCodeType;
};

/**
 * Server-provided user preference snapshot used during initial render.
 */
export type InitialPreferencesType = {
  /**
   * Active language for translations and document direction.
   */
  language: LanguageCodeType;
  /**
   * Active theme mode for initial paint.
   */
  theme: ThemeModeType;
};

/**
 * Props consumed by the global app header.
 */
export type AppHeaderPropsType = {
  /**
   * Server-provided initial user preferences.
   */
  initialPreferences: InitialPreferencesType;
  /**
   * Controls whether the page-to-page navigation strip is hidden.
   */
  hidePageNavigation?: boolean;
};

/**
 * Descriptor for one social destination rendered in the header controls.
 */
export type SocialLinkType = {
  /**
   * Destination URL or mailto link.
   */
  href: string;
  /**
   * Stable identifier used for icon selection and tooltip state.
   */
  id: 'github' | 'linkedin' | 'stackoverflow' | 'npm' | 'hackernoon' | 'email';
  /**
   * i18n key used to render localized labels.
   */
  labelKey: string;
};
