import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants/language.constants';
import type { LanguageCodeType } from '../types/language.type';
import type {
  ResolveLanguageFromHeaderInputType,
  ResolveSupportedLanguageInputType,
} from './language.utils.type';

/**
 * Normalizes a raw language token into one of the supported language codes.
 */
export const resolveSupportedLanguage = ({
  input,
}: ResolveSupportedLanguageInputType): LanguageCodeType => {
  if (typeof input !== 'string' || input.trim() === '') {
    return DEFAULT_LANGUAGE;
  }

  const [baseLanguage] = input.trim().toLowerCase().split('-');

  if (baseLanguage === undefined) {
    return DEFAULT_LANGUAGE;
  }

  return SUPPORTED_LANGUAGES.includes(baseLanguage as LanguageCodeType)
    ? (baseLanguage as LanguageCodeType)
    : DEFAULT_LANGUAGE;
};

/**
 * Resolves a supported language code from an Accept-Language header.
 */
export const resolveLanguageFromHeader = ({
  acceptLanguage,
}: ResolveLanguageFromHeaderInputType): LanguageCodeType => {
  const [firstLanguageToken] = (acceptLanguage ?? '').split(',');
  const [languageWithRegion] = (firstLanguageToken ?? '').split(';');

  return resolveSupportedLanguage({ input: languageWithRegion });
};
