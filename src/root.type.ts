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
 * Input payload for request-bound language resolution.
 */
export type ResolveRequestLanguageInputType = {
  /**
   * Incoming request whose cookies and headers should be inspected.
   */
  request: Request;
};

/**
 * Input payload for root-level request preference resolution.
 */
export type ResolveRequestPreferencesInputType = {
  /**
   * Incoming request whose cookies and headers should be inspected.
   */
  request: Request;
};

/**
 * Input payload for safe cookie-segment decoding.
 */
export type DecodeCookieSegmentInputType = {
  /**
   * Raw cookie key or value segment.
   */
  value: string;
};

/**
 * Decoded cookie segment or `null` when decoding fails.
 */
export type DecodeCookieSegmentResultType = string | null;

/**
 * Parsed cookie header key/value map.
 */
export type ParseCookiesResultType = Record<string, string>;

/**
 * Resolved theme from cookies or client hints.
 */
export type ResolveThemeFromRequestResultType = ThemeModeType | null;

/**
 * Resolved persisted language cookie value, if supported.
 */
export type ResolveLanguageFromCookieResultType = LanguageCodeType | null;

/**
 * Resolved request language after cookie and header negotiation.
 */
export type ResolveRequestLanguageResultType = LanguageCodeType;

/**
 * Resolved request preferences returned from root preference helpers.
 */
export type ResolveRequestPreferencesResultType = {
  /**
   * Theme resolved for document hydration, if available.
   */
  documentTheme: ThemeModeType | null;
  /**
   * Persisted application preferences.
   */
  preferences: PreferencesType;
};

/**
 * Serialized `Set-Cookie` header value.
 */
export type SerializeCookieResultType = string;

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
    documentTheme?: ThemeModeType | null;
    preferences: PreferencesType;
  };
};
