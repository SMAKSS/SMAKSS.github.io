import type { LanguageCodeType } from '@/types/language.type';
import type { SocialIconIdType } from '@components/icon.type';
import type { ThemeModeType } from '@theme/theme.type';

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
  id: SocialIconIdType;
  /**
   * i18n key used to render localized labels.
   */
  labelKey: string;
};

/**
 * Navigation item descriptor rendered by the global header.
 */
export type AppHeaderNavItemType = {
  /**
   * Stable translation key suffix for the nav label.
   */
  key: 'about' | 'home' | 'playground' | 'tools';
  /**
   * Optional exact-match flag for root navigation items.
   */
  end?: boolean;
  /**
   * Optional prefetch strategy used by React Router links.
   */
  prefetch?: 'intent';
  /**
   * Application route destination.
   */
  to: string;
};
