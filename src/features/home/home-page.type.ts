import type { DestinationFeedsByIdType } from './home-destination.type';
import type { DailyQuoteType } from './quote.type';

/**
 * Props consumed by the home page view.
 */
export type HomePagePropsType = {
  /**
   * Server-provided quote snapshot used as initial client state.
   */
  initialQuote?: DailyQuoteType | null;
  /**
   * Deferred server-resolved feeds for slider destinations.
   */
  destinationFeedsPromise: Promise<DestinationFeedsByIdType>;
};
