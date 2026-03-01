import type {
  DecodeCookieSegmentInputType,
  DecodeCookieSegmentResultType,
  ParseCookiesInputType,
  ParseCookiesResultType,
  ResolveLanguageFromCookieInputType,
  ResolveLanguageFromCookieResultType,
  ResolveRequestLanguageInputType,
  ResolveRequestLanguageResultType,
  ResolveRequestPreferencesInputType,
  ResolveRequestPreferencesResultType,
  ResolveThemeFromRequestInputType,
  ResolveThemeFromRequestResultType,
  SerializeCookieInputType,
  SerializeCookieResultType,
} from '@/root.type';
import type { LanguageCodeType } from '@/types/language.type';
import { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES } from '@constants/language.constants';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from '@theme/theme.constants';
import { resolveLanguageFromHeader } from '@utils/language.utils';

/**
 * Decodes a cookie segment while treating malformed encoding as ignorable input.
 */
const decodeCookieSegment = ({
  value,
}: DecodeCookieSegmentInputType): DecodeCookieSegmentResultType => {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
};

/**
 * Parses a request cookie header into a key/value map.
 */
export const parseCookies = ({ cookieHeader }: ParseCookiesInputType): ParseCookiesResultType => {
  if (cookieHeader === null || cookieHeader.trim() === '') {
    return {};
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((accumulator, part) => {
    const [rawKey, ...rawValueParts] = part.trim().split('=');

    if (rawKey === undefined || rawKey === '') {
      return accumulator;
    }

    const decodedKey = decodeCookieSegment({ value: rawKey });
    const decodedValue = decodeCookieSegment({ value: rawValueParts.join('=') });

    if (decodedKey === null || decodedValue === null) {
      return accumulator;
    }

    accumulator[decodedKey] = decodedValue;

    return accumulator;
  }, {});
};

/**
 * Resolves theme from cookie first, then request client-hint.
 */
export const resolveThemeFromRequest = ({
  cookieValue,
  prefersColorSchemeHeader,
}: ResolveThemeFromRequestInputType): ResolveThemeFromRequestResultType => {
  if (cookieValue === 'dark' || cookieValue === 'light') {
    return cookieValue;
  }

  if (prefersColorSchemeHeader === 'dark' || prefersColorSchemeHeader === 'light') {
    return prefersColorSchemeHeader;
  }

  return null;
};

/**
 * Resolves language from persisted cookie value.
 */
export const resolveLanguageFromCookie = ({
  value,
}: ResolveLanguageFromCookieInputType): ResolveLanguageFromCookieResultType => {
  if (value === undefined) {
    return null;
  }

  return SUPPORTED_LANGUAGES.includes(value as LanguageCodeType)
    ? (value as LanguageCodeType)
    : null;
};

/**
 * Resolves the preferred language from request cookies and Accept-Language.
 */
export const resolveRequestLanguage = ({
  request,
}: ResolveRequestLanguageInputType): ResolveRequestLanguageResultType => {
  const cookieValues = parseCookies({ cookieHeader: request.headers.get('cookie') });
  const cookieLanguage = resolveLanguageFromCookie({
    value: cookieValues[LANGUAGE_STORAGE_KEY],
  });

  return (
    cookieLanguage ??
    resolveLanguageFromHeader({ acceptLanguage: request.headers.get('accept-language') })
  );
};

/**
 * Resolves root-level language and theme preferences from the incoming request.
 */
export const resolveRequestPreferences = ({
  request,
}: ResolveRequestPreferencesInputType): ResolveRequestPreferencesResultType => {
  const cookieValues = parseCookies({ cookieHeader: request.headers.get('cookie') });
  const language =
    resolveLanguageFromCookie({
      value: cookieValues[LANGUAGE_STORAGE_KEY],
    }) ?? resolveLanguageFromHeader({ acceptLanguage: request.headers.get('accept-language') });
  const theme = resolveThemeFromRequest({
    cookieValue: cookieValues[THEME_STORAGE_KEY],
    prefersColorSchemeHeader: request.headers.get('sec-ch-prefers-color-scheme'),
  });

  return {
    documentTheme: theme,
    preferences: {
      language,
      theme: theme ?? DEFAULT_THEME,
    },
  };
};

/**
 * Serializes a cookie with long-lived, path-wide defaults.
 */
export const serializeCookie = ({
  key,
  value,
}: SerializeCookieInputType): SerializeCookieResultType => {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
};
