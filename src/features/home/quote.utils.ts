import { QUOTE_STORAGE_KEY } from './quote.constants';
import type {
  DailyQuoteType,
  QuoteStoragePayloadType,
  ReadCachedQuoteInputType,
} from './quote.type';

/**
 * Returns a UTC date key in YYYY-MM-DD format for daily cache checks.
 */
export const getTodayKey = (): string => {
  return new Date().toISOString().slice(0, 10);
};

/**
 * Reads a cached quote value for the current date.
 */
export const readCachedQuote = ({ dateKey }: ReadCachedQuoteInputType): DailyQuoteType | null => {
  const storedValue = window.localStorage.getItem(QUOTE_STORAGE_KEY);

  if (storedValue === null) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as QuoteStoragePayloadType;

    if (parsedValue.dateKey !== dateKey) {
      return null;
    }

    return parsedValue.value;
  } catch {
    return null;
  }
};

/**
 * Writes a quote value into local storage for the current date.
 */
export const writeCachedQuote = ({ dateKey, value }: QuoteStoragePayloadType): void => {
  window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify({ dateKey, value }));
};
