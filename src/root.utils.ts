import { SUPPORTED_LANGUAGES } from './constants/language.constants';
import type {
  ParseCookiesInputType,
  ResolveLanguageFromCookieInputType,
  ResolveThemeFromRequestInputType,
  SerializeCookieInputType,
} from './root.type';
import { DEFAULT_THEME } from './theme/theme.constants';
import type { ThemeModeType } from './theme/theme.type';
import type { LanguageCodeType } from './types/language.type';

/**
 * Parses a request cookie header into a key/value map.
 */
export const parseCookies = ({ cookieHeader }: ParseCookiesInputType): Record<string, string> => {
  if (cookieHeader === null || cookieHeader.trim() === '') {
    return {};
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((accumulator, part) => {
    const [rawKey, ...rawValueParts] = part.trim().split('=');

    if (rawKey === undefined || rawKey === '') {
      return accumulator;
    }

    const value = rawValueParts.join('=');
    accumulator[decodeURIComponent(rawKey)] = decodeURIComponent(value);

    return accumulator;
  }, {});
};

/**
 * Resolves theme from cookie first, then request client-hint, then defaults.
 */
export const resolveThemeFromRequest = ({
  cookieValue,
  prefersColorSchemeHeader,
}: ResolveThemeFromRequestInputType): ThemeModeType => {
  if (cookieValue === 'dark' || cookieValue === 'light') {
    return cookieValue;
  }

  if (prefersColorSchemeHeader === 'dark' || prefersColorSchemeHeader === 'light') {
    return prefersColorSchemeHeader;
  }

  return DEFAULT_THEME;
};

/**
 * Resolves language from persisted cookie value.
 */
export const resolveLanguageFromCookie = ({
  value,
}: ResolveLanguageFromCookieInputType): LanguageCodeType | null => {
  if (value === undefined) {
    return null;
  }

  return SUPPORTED_LANGUAGES.includes(value as LanguageCodeType)
    ? (value as LanguageCodeType)
    : null;
};

/**
 * Serializes a cookie with long-lived, path-wide defaults.
 */
export const serializeCookie = ({ key, value }: SerializeCookieInputType): string => {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
};
