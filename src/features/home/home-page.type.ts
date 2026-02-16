import type { CommunityContributionFeedsByIdType } from './home-community-contribution.type';
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
   * Deferred server-resolved feeds for the community contribution slider.
   */
  communityContributionFeedsPromise: Promise<CommunityContributionFeedsByIdType>;
};
