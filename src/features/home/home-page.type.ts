import type { CommunityContributionFeedsByIdType } from './home-community-contribution.type';

/**
 * Props consumed by the home page view.
 */
export type HomePagePropsType = {
  /**
   * Deferred server-resolved feeds for the community contribution slider.
   */
  communityContributionFeeds: CommunityContributionFeedsByIdType;
};
