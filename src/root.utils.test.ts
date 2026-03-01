import { describe, expect, it } from 'vitest';
import { LANGUAGE_STORAGE_KEY } from './constants/language.constants';
import { parseCookies, resolveRequestLanguage, resolveRequestPreferences } from './root.utils';
import { THEME_STORAGE_KEY } from './theme/theme.constants';

describe('root.utils', () => {
  it('parseCookies ignores malformed percent-encoded segments', () => {
    expect(
      parseCookies({
        cookieHeader: 'valid=value; broken=%E0%A4%A; %E0%A4%A=value; another=still-valid',
      }),
    ).toEqual({
      another: 'still-valid',
      valid: 'value',
    });
  });

  it('parseCookies keeps valid cookies when other segments are malformed', () => {
    expect(
      parseCookies({
        cookieHeader: `first=one; broken=%E0%A4%A; ${LANGUAGE_STORAGE_KEY}=fa`,
      }),
    ).toEqual({
      first: 'one',
      [LANGUAGE_STORAGE_KEY]: 'fa',
    });
  });

  it('resolveRequestLanguage prefers the persisted language cookie', () => {
    const request = new Request('https://smakss.com', {
      headers: {
        'accept-language': 'en-GB,en;q=0.9,fa;q=0.8',
        cookie: `${LANGUAGE_STORAGE_KEY}=fa`,
      },
    });

    expect(resolveRequestLanguage({ request })).toBe('fa');
  });

  it('resolveRequestPreferences falls back to weighted Accept-Language and theme hint', () => {
    const request = new Request('https://smakss.com', {
      headers: {
        'accept-language': 'de-DE,en;q=0.9,fa;q=1',
        'sec-ch-prefers-color-scheme': 'dark',
      },
    });

    expect(resolveRequestPreferences({ request })).toEqual({
      documentTheme: 'dark',
      preferences: {
        language: 'fa',
        theme: 'dark',
      },
    });
  });

  it('resolveRequestPreferences tolerates malformed cookies and keeps other preferences', () => {
    const request = new Request('https://smakss.com', {
      headers: {
        'accept-language': 'en-GB,en;q=0.9',
        cookie: `${THEME_STORAGE_KEY}=dark; broken=%E0%A4%A; ${LANGUAGE_STORAGE_KEY}=fa`,
      },
    });

    expect(resolveRequestPreferences({ request })).toEqual({
      documentTheme: 'dark',
      preferences: {
        language: 'fa',
        theme: 'dark',
      },
    });
  });
});
