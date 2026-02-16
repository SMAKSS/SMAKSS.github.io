import { describe, expect, it } from 'vitest';

import { resolveLanguageFromHeader, resolveSupportedLanguage } from './language.utils';

describe('language.utils', () => {
  it('resolveSupportedLanguage normalizes supported inputs', () => {
    expect(resolveSupportedLanguage({ input: 'fa-IR' })).toBe('fa');
    expect(resolveSupportedLanguage({ input: 'en-US' })).toBe('en');
  });

  it('resolveSupportedLanguage falls back for unsupported values', () => {
    expect(resolveSupportedLanguage({ input: 'de-DE' })).toBe('en');
    expect(resolveSupportedLanguage({ input: null })).toBe('en');
  });

  it('resolveLanguageFromHeader parses first accepted language token', () => {
    expect(resolveLanguageFromHeader({ acceptLanguage: 'fa-IR,fa;q=0.9,en;q=0.8' })).toBe('fa');
    expect(resolveLanguageFromHeader({ acceptLanguage: 'en-US,en;q=0.9,fa;q=0.7' })).toBe('en');
  });
});
