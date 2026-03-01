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

  it('resolveLanguageFromHeader prefers the highest-quality supported language', () => {
    expect(resolveLanguageFromHeader({ acceptLanguage: 'de-DE,en;q=0.9,fa;q=0.8' })).toBe('en');
    expect(resolveLanguageFromHeader({ acceptLanguage: 'de-DE;q=0.9,fa;q=1,en;q=0.8' })).toBe('fa');
  });

  it('resolveLanguageFromHeader preserves source order for equal-quality matches', () => {
    expect(resolveLanguageFromHeader({ acceptLanguage: 'fa;q=0.8,en;q=0.8' })).toBe('fa');
  });
});
