import type { ReactNode } from 'react';
import type { ThemeModeType } from './theme/theme.type';
import type { LanguageCodeType } from './types/language.type';

/**
 * Persisted application preferences resolved at request time.
 */
export type PreferencesType = {
  /**
   * Active language code.
   */
  language: LanguageCodeType;
  /**
   * Active theme mode.
   */
  theme: ThemeModeType;
};

/**
 * Input payload for cookie header parsing.
 */
export type ParseCookiesInputType = {
  /**
   * Raw `cookie` header value from the request.
   */
  cookieHeader: string | null;
};

/**
 * Input payload for theme resolution from request metadata.
 */
export type ResolveThemeFromRequestInputType = {
  /**
   * Theme value from persisted cookie.
   */
  cookieValue: string | undefined;
  /**
   * Theme hint from `sec-ch-prefers-color-scheme`.
   */
  prefersColorSchemeHeader: string | null;
};

/**
 * Input payload for resolving language from cookie value.
 */
export type ResolveLanguageFromCookieInputType = {
  /**
   * Language cookie value.
   */
  value: string | undefined;
};

/**
 * Input payload for cookie serialization.
 */
export type SerializeCookieInputType = {
  /**
   * Cookie key.
   */
  key: string;
  /**
   * Cookie value.
   */
  value: string;
};

/**
 * Input payload for route document layout rendering.
 */
export type RootLayoutPropsType = {
  /**
   * Nested route content.
   */
  children: ReactNode;
};

/**
 * Input payload for root route component rendering.
 */
export type RootRoutePropsType = {
  /**
   * Root loader data payload.
   */
  loaderData: {
    preferences: PreferencesType;
  };
};
