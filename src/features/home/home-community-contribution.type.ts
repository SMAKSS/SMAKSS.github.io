/**
 * Feed provider type used by a community contribution slide.
 */
export type CommunityContributionFeedProviderType =
  | 'github'
  | 'hashnode'
  | 'none'
  | 'npm'
  | 'stackoverflow';

/**
 * Dynamic feed item rendered within a community contribution slide.
 */
export type CommunityContributionFeedItemType = {
  /**
   * Stable item identifier.
   */
  id: string;
  /**
   * Feed entry title.
   */
  title: string;
  /**
   * Optional deep link to the feed entry.
   */
  url?: string;
};

/**
 * A single community contribution slide rendered in the home slider section.
 */
export type HomeCommunityContributionItemType = {
  /**
   * Stable id used for rendering and state transitions.
   */
  id: string;
  /**
   * i18n key for the contribution title.
   */
  titleKey: string;
  /**
   * i18n key for the contribution subtitle.
   */
  subtitleKey: string;
  /**
   * i18n key for placeholder illustration text.
   */
  illustrationLabelKey: string;
  /**
   * Provider used for fetching dynamic feed items.
   */
  feedProvider: CommunityContributionFeedProviderType;
  /**
   * Internal route for React Router navigation.
   */
  to?: string;
  /**
   * External URL target.
   */
  href?: string;
  /**
   * Whether the link opens in a new tab.
   */
  external?: boolean;
};

/**
 * Input payload for fetch helpers that only need an abort signal.
 */
export type FetchBySignalInputType = {
  /**
   * Abort signal for request cancellation.
   */
  signal?: AbortSignal;
};

/**
 * Input payload for fetching community contribution feed items.
 */
export type FetchCommunityContributionFeedInputType = {
  /**
   * Feed provider identifier.
   */
  provider: CommunityContributionFeedProviderType;
  /**
   * Abort signal for request cancellation.
   */
  signal?: AbortSignal;
};

/**
 * Feed map keyed by contribution id.
 */
export type CommunityContributionFeedsByIdType = Partial<
  Record<HomeCommunityContributionItemType['id'], CommunityContributionFeedItemType[]>
>;

/**
 * Input payload for resolving all community contribution feeds.
 */
export type FetchCommunityContributionFeedsInputType = {
  /**
   * Abort signal for request cancellation.
   */
  signal?: AbortSignal;
};

/**
 * Partial Stack Overflow answer payload used for feed mapping.
 */
export type StackOverflowAnswerApiType = {
  /**
   * Answer id used for stable item ids.
   */
  answer_id?: number;
  /**
   * Public answer URL.
   */
  link?: string;
  /**
   * Related question id.
   */
  question_id?: number;
  /**
   * Related question title.
   */
  title?: string;
};

/**
 * Stack Overflow API response payload for answers endpoint.
 */
export type StackOverflowFeedResponseType = {
  /**
   * Collection of latest answer records.
   */
  items?: StackOverflowAnswerApiType[];
};

/**
 * GitHub repository payload used for mapping slider feed items.
 */
export type GithubRepositoryApiType = {
  /**
   * Repository full display name.
   */
  full_name?: string;
  /**
   * Public repository URL.
   */
  html_url?: string;
  /**
   * Repository id.
   */
  id?: number;
};

/**
 * npm package entry payload used by the maintainer search endpoint.
 */
export type NpmPackageApiType = {
  /**
   * Optional package links object.
   */
  links?: {
    /**
     * Public npm package URL.
     */
    npm?: string;
  };
  /**
   * Package display name.
   */
  name?: string;
  /**
   * Package version.
   */
  version?: string;
};

/**
 * npm search object payload for a package result entry.
 */
export type NpmSearchObjectApiType = {
  /**
   * Package metadata payload.
   */
  package?: NpmPackageApiType;
};

/**
 * npm maintainer search response payload.
 */
export type NpmSearchResponseApiType = {
  /**
   * Search result entries.
   */
  objects?: NpmSearchObjectApiType[];
};

/**
 * Hashnode post node payload used for feed mapping.
 */
export type HashnodePostNodeApiType = {
  /**
   * Stable post identifier.
   */
  id?: string;
  /**
   * Post title.
   */
  title?: string;
  /**
   * Public post URL.
   */
  url?: string;
};

/**
 * Hashnode publication query response payload.
 */
export type HashnodePublicationResponseApiType = {
  /**
   * GraphQL data section.
   */
  data?: {
    /**
     * Publication payload for the configured host.
     */
    publication?: {
      /**
       * Posts edge list.
       */
      posts?: {
        /**
         * Post edge entries.
         */
        edges?: {
          /**
           * Post node payload.
           */
          node?: HashnodePostNodeApiType;
        }[];
      };
    };
  };
};
