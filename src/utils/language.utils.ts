import type { LanguageCodeType } from '@/types/language.type';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@constants/language.constants';
import type {
  NormalizeSupportedLanguageInputType,
  NormalizeSupportedLanguageResultType,
  ParseLanguagePreferenceInputType,
  ParseLanguagePreferenceResultType,
  ParsedLanguagePreferenceType,
  ResolveLanguageFromHeaderInputType,
  ResolveLanguageFromHeaderResultType,
  ResolveSupportedLanguageInputType,
  ResolveSupportedLanguageResultType,
} from './language.utils.type';

/**
 * Normalizes a language token and returns `null` when it is unsupported.
 */
const normalizeSupportedLanguage = ({
  input,
}: NormalizeSupportedLanguageInputType): NormalizeSupportedLanguageResultType => {
  if (typeof input !== 'string' || input.trim() === '') {
    return null;
  }

  const [baseLanguage] = input.trim().toLowerCase().split('-');

  if (baseLanguage === undefined) {
    return null;
  }

  return SUPPORTED_LANGUAGES.includes(baseLanguage as LanguageCodeType)
    ? (baseLanguage as LanguageCodeType)
    : null;
};

/**
 * Parses one `Accept-Language` entry into a weighted preference model.
 */
const parseLanguagePreference = ({
  index,
  token,
}: ParseLanguagePreferenceInputType): ParseLanguagePreferenceResultType => {
  const [rawLanguageToken, ...parameterTokens] = token.split(';');
  const normalizedToken = rawLanguageToken?.trim().toLowerCase();

  if (normalizedToken === undefined || normalizedToken === '') {
    return null;
  }

  const qualityParameter = parameterTokens.find((parameterToken) => {
    return parameterToken.trim().startsWith('q=');
  });
  const qualityValue = qualityParameter?.split('=')[1]?.trim();
  const parsedQuality = qualityValue === undefined ? 1 : Number.parseFloat(qualityValue);
  const quality =
    Number.isFinite(parsedQuality) && parsedQuality >= 0 && parsedQuality <= 1 ? parsedQuality : 0;

  return {
    index,
    quality,
    token: normalizedToken,
  };
};

/**
 * Normalizes a raw language token into one of the supported language codes.
 */
export const resolveSupportedLanguage = ({
  input,
}: ResolveSupportedLanguageInputType): ResolveSupportedLanguageResultType => {
  return normalizeSupportedLanguage({ input }) ?? DEFAULT_LANGUAGE;
};

/**
 * Resolves a supported language code from an Accept-Language header.
 */
export const resolveLanguageFromHeader = ({
  acceptLanguage,
}: ResolveLanguageFromHeaderInputType): ResolveLanguageFromHeaderResultType => {
  const parsedPreferences = (acceptLanguage ?? '')
    .split(',')
    .map((token, index) => {
      return parseLanguagePreference({ index, token });
    })
    .filter((value): value is ParsedLanguagePreferenceType => value !== null)
    .sort((leftValue, rightValue) => {
      if (rightValue.quality === leftValue.quality) {
        return leftValue.index - rightValue.index;
      }

      return rightValue.quality - leftValue.quality;
    });

  for (const preference of parsedPreferences) {
    if (preference.token === '*') {
      return DEFAULT_LANGUAGE;
    }

    const supportedLanguage = normalizeSupportedLanguage({ input: preference.token });

    if (supportedLanguage !== null) {
      return supportedLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
};
