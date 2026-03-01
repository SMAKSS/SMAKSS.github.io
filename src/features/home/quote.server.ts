import { createServerResponseError, ensureOkResponse } from '@server/fetch-response.utils';
import { createDailyCacheKey, runServerRequest } from '@server/request-handler.service';
import { QUOTE_API_URL } from './quote.constants';
import type { DailyQuoteType, FetchQuoteInputType, QuoteApiPayloadType } from './quote.type';

/**
 * Fetches the quote of the day on the server with one-day in-memory caching.
 */
export const fetchDailyQuote = async ({
  signal,
}: FetchQuoteInputType): Promise<DailyQuoteType | null> => {
  return runServerRequest<DailyQuoteType | null>({
    cacheKey: createDailyCacheKey({ baseKey: 'daily-quote' }),
    fallbackValue: null,
    fetcher: async ({ signal: requestSignal }) => {
      const response = await fetch(QUOTE_API_URL, { signal: requestSignal });
      ensureOkResponse({ response });

      const payload = (await response.json()) as QuoteApiPayloadType[] | QuoteApiPayloadType;
      const normalizedPayload = Array.isArray(payload) ? payload[0] : payload;
      const quoteContent =
        normalizedPayload?.q ?? normalizedPayload?.quote ?? normalizedPayload?.content;
      const quoteAuthor = normalizedPayload?.a ?? normalizedPayload?.author ?? 'Unknown';

      if (typeof quoteContent !== 'string' || quoteContent.length === 0) {
        throw createServerResponseError({
          message: 'Quote payload missing content.',
          response: new Response('Quote payload missing content.', {
            status: 502,
            statusText: 'Bad Gateway',
          }),
        });
      }

      return {
        author: quoteAuthor,
        content: quoteContent,
        source: 'api',
      };
    },
    requestName: 'fetchDailyQuote',
    signal,
  });
};
