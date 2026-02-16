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
