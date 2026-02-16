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
 * Reads a cached quote value for a specific date/language pair.
 */
export const readCachedQuote = ({
  dateKey,
  language,
}: ReadCachedQuoteInputType): DailyQuoteType | null => {
  const storedValue = window.localStorage.getItem(QUOTE_STORAGE_KEY);

  if (storedValue === null) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as QuoteStoragePayloadType;

    if (parsedValue.dateKey !== dateKey || parsedValue.language !== language) {
      return null;
    }

    return parsedValue.value;
  } catch {
    return null;
  }
};

/**
 * Writes a quote value into local storage for the current date/language.
 */
export const writeCachedQuote = ({ dateKey, language, value }: QuoteStoragePayloadType): void => {
  window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify({ dateKey, language, value }));
};
