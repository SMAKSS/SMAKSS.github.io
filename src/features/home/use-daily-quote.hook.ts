import { useEffect, useState } from 'react';

import type { DailyQuoteStateType, UseDailyQuoteInputType } from './quote.type';
import { getTodayKey, readCachedQuote, writeCachedQuote } from './quote.utils';

/**
 * Resolves the daily quote state from route data and local cache without client-side API requests.
 */
export const useDailyQuote = ({
  language,
  initialValue,
}: UseDailyQuoteInputType): DailyQuoteStateType => {
  const [state, setState] = useState<DailyQuoteStateType>(() => {
    if (initialValue !== undefined && initialValue !== null) {
      return {
        hasError: false,
        isLoading: false,
        value: initialValue,
      };
    }

    return {
      hasError: false,
      isLoading: true,
      value: null,
    };
  });

  useEffect(() => {
    const dateKey = getTodayKey();

    if (initialValue !== undefined && initialValue !== null) {
      writeCachedQuote({ dateKey, language, value: initialValue });
      setState({ hasError: false, isLoading: false, value: initialValue });

      return;
    }

    const cachedQuote = readCachedQuote({ dateKey, language });

    if (cachedQuote !== null) {
      setState({ hasError: false, isLoading: false, value: cachedQuote });
      return;
    }

    setState({ hasError: true, isLoading: false, value: null });
  }, [initialValue, language]);

  return state;
};
