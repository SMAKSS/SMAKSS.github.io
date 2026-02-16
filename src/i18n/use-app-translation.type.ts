import type { LanguageCodeType } from '../types/language.type';

/**
 * Locale values used by localized formatters.
 */
export type AppLocaleType = 'en-GB' | 'fa-IR';

/**
 * Generic translation options supported by the wrapper translation function.
 */
export type AppTranslationOptionsType = Record<string, unknown>;

/**
 * Translation function signature exposed by the app translation wrapper.
 */
export type AppTranslateFunctionType = (key: string, options?: AppTranslationOptionsType) => string;

/**
 * Minimal i18n shape exposed by the app translation wrapper.
 */
export type AppI18nType = {
  /**
   * Active resolved language key from i18next.
   */
  resolvedLanguage: string | undefined;
  /**
   * Changes the active language and resolves when ready.
   */
  changeLanguage: (language: string) => Promise<unknown>;
};

/**
 * Wrapped translation payload with normalized language metadata.
 */
export type UseAppTranslationResultType = {
  /**
   * Translation function.
   */
  t: AppTranslateFunctionType;
  /**
   * i18n instance for language reads and writes.
   */
  i18n: AppI18nType;
  /**
   * Readiness state from react-i18next.
   */
  ready: boolean;
  /**
   * Normalized supported language code.
   */
  currentLanguage: LanguageCodeType;
  /**
   * Matching locale for Intl formatters.
   */
  currentLocale: AppLocaleType;
  /**
   * Whether the current language is right-to-left.
   */
  isRtl: boolean;
};
