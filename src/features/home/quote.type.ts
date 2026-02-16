import type { LanguageCodeType } from '../../types/language.type';

/**
 * Normalized quote payload used in UI and cache layers.
 */
export type DailyQuoteType = {
  /**
   * Quote author display label.
   */
  author: string;
  /**
   * Main quote text content.
   */
  content: string;
  /**
   * Origin marker for traceability.
   */
  source: 'api';
};

/**
 * Quote state model returned by the daily quote hook.
 */
export type DailyQuoteStateType = {
  /**
   * Whether quote resolution has failed.
   */
  hasError: boolean;
  /**
   * Whether quote resolution is still in progress.
   */
  isLoading: boolean;
  /**
   * Resolved quote value when available.
   */
  value: DailyQuoteType | null;
};

/**
 * Input payload for quote fetch requests.
 */
export type FetchQuoteInputType = {
  /**
   * Current language used for cache partitioning.
   */
  language: LanguageCodeType;
  /**
   * Optional abort signal for request cancellation.
   */
  signal?: AbortSignal;
};

/**
 * Quote payload stored in browser local storage.
 */
export type QuoteStoragePayloadType = {
  /**
   * Date key in YYYY-MM-DD format.
   */
  dateKey: string;
  /**
   * Language attached to stored quote value.
   */
  language: LanguageCodeType;
  /**
   * Stored quote value.
   */
  value: DailyQuoteType;
};

/**
 * Language input payload for quote helpers.
 */
export type QuoteLanguageInputType = {
  /**
   * Current language code.
   */
  language: LanguageCodeType;
};

/**
 * Input payload for reading quote values from local storage.
 */
export type ReadCachedQuoteInputType = {
  /**
   * Date key in YYYY-MM-DD format.
   */
  dateKey: string;
  /**
   * Language attached to the cached value.
   */
  language: LanguageCodeType;
};

/**
 * In-memory quote cache entry for a single language/day.
 */
export type DailyQuoteCacheEntryType = {
  /**
   * Date key in YYYY-MM-DD format.
   */
  dateKey: string;
  /**
   * Cached quote value.
   */
  value: DailyQuoteType;
};

/**
 * Input payload for the daily quote React hook.
 */
export type UseDailyQuoteInputType = {
  /**
   * Route-provided quote value, if already available.
   */
  initialValue?: DailyQuoteType | null;
  /**
   * Current language used for local cache partitioning.
   */
  language: LanguageCodeType;
};

/**
 * Raw quote shape returned by the upstream API.
 */
export type QuoteApiPayloadType = {
  /**
   * Alternative author field.
   */
  a?: string;
  /**
   * Author field.
   */
  author?: string;
  /**
   * Alternative quote content field.
   */
  content?: string;
  /**
   * Short quote content field.
   */
  q?: string;
  /**
   * Quote content field.
   */
  quote?: string;
};
