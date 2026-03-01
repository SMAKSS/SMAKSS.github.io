import type { LanguageCodeType } from '@/types/language.type';

/**
 * Input payload for language normalization helpers.
 */
export type ResolveSupportedLanguageInputType = {
  /**
   * Raw language value (header or i18n token).
   */
  input: string | null | undefined;
};

/**
 * Input payload for Accept-Language header parsing.
 */
export type ResolveLanguageFromHeaderInputType = {
  /**
   * Raw Accept-Language header value.
   */
  acceptLanguage: string | null;
};

/**
 * Parsed Accept-Language entry with quality weight and source order.
 */
export type ParsedLanguagePreferenceType = {
  /**
   * Zero-based position within the raw header list.
   */
  index: number;
  /**
   * Parsed quality value between 0 and 1.
   */
  quality: number;
  /**
   * Raw language token before support normalization.
   */
  token: string;
};

/**
 * Input payload for internal language normalization that may fail.
 */
export type NormalizeSupportedLanguageInputType = {
  /**
   * Raw language token from headers or i18n state.
   */
  input: string | null | undefined;
};

/**
 * Supported normalized language token or `null` when unsupported.
 */
export type NormalizeSupportedLanguageResultType = LanguageCodeType | null;

/**
 * Input payload for parsing a single Accept-Language entry.
 */
export type ParseLanguagePreferenceInputType = {
  /**
   * Zero-based source order from the raw header.
   */
  index: number;
  /**
   * Raw header token including optional parameters.
   */
  token: string;
};

/**
 * Parsed language preference entry or `null` when the token is empty.
 */
export type ParseLanguagePreferenceResultType = ParsedLanguagePreferenceType | null;

/**
 * Resolved supported language result used by app-level callers.
 */
export type ResolveSupportedLanguageResultType = LanguageCodeType;

/**
 * Resolved request language from `Accept-Language`.
 */
export type ResolveLanguageFromHeaderResultType = LanguageCodeType;
