import { ensureOkResponse } from '@server/fetch-response.utils';
import { createDailyCacheKey, runServerRequest } from '@server/request-handler.service';
import {
  HASHNODE_PUBLICATION_QUERY,
  HOME_COMMUNITY_CONTRIBUTION_FEED_PAGE_SIZE,
  HOME_COMMUNITY_CONTRIBUTION_GITHUB_USERNAME,
  HOME_COMMUNITY_CONTRIBUTION_HASHNODE_HOST,
  HOME_COMMUNITY_CONTRIBUTION_NPM_MAINTAINER,
  HOME_COMMUNITY_CONTRIBUTION_REQUEST_HEADERS,
  HOME_COMMUNITY_CONTRIBUTION_STACKOVERFLOW_USER_ID,
} from './home-community-contribution-feed.constants';
import { HOME_COMMUNITY_CONTRIBUTION_ITEMS } from './home-community-contribution.constants';
import type {
  CommunityContributionFeedItemType,
  CommunityContributionFeedsByIdType,
  FetchBySignalInputType,
  FetchCommunityContributionFeedInputType,
  FetchCommunityContributionFeedsInputType,
  GithubRepositoryApiType,
  HashnodePublicationResponseApiType,
  NpmSearchResponseApiType,
  StackOverflowFeedResponseType,
} from './home-community-contribution.type';

/**
 * Fetches latest Stack Overflow answers for the configured profile.
 */
const fetchStackOverflowFeed = async ({
  signal,
}: FetchBySignalInputType): Promise<CommunityContributionFeedItemType[]> => {
  const response = await fetch(
    `https://api.stackexchange.com/2.3/users/${encodeURIComponent(HOME_COMMUNITY_CONTRIBUTION_STACKOVERFLOW_USER_ID)}/answers?order=desc&sort=creation&site=stackoverflow&pagesize=${String(HOME_COMMUNITY_CONTRIBUTION_FEED_PAGE_SIZE)}`,
    {
      headers: HOME_COMMUNITY_CONTRIBUTION_REQUEST_HEADERS,
      signal,
    },
  );
  ensureOkResponse({ response });

  const payload = (await response.json()) as StackOverflowFeedResponseType;

  return (payload.items ?? []).map((item, index) => {
    const answerLabel =
      typeof item.title === 'string' && item.title.trim().length > 0
        ? item.title
        : `Answer on question #${String(item.question_id ?? index + 1)}`;

    return {
      id: `so-${String(item.answer_id ?? index)}`,
      title: answerLabel,
      url: item.link,
    };
  });
};

/**
 * Fetches latest updated public repositories for the configured GitHub profile.
 */
const fetchGithubFeed = async ({
  signal,
}: FetchBySignalInputType): Promise<CommunityContributionFeedItemType[]> => {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(HOME_COMMUNITY_CONTRIBUTION_GITHUB_USERNAME)}/repos?sort=updated&per_page=${String(HOME_COMMUNITY_CONTRIBUTION_FEED_PAGE_SIZE)}`,
    {
      headers: HOME_COMMUNITY_CONTRIBUTION_REQUEST_HEADERS,
      signal,
    },
  );
  ensureOkResponse({ response });

  const payload = (await response.json()) as GithubRepositoryApiType[];

  return payload
    .filter((item) => typeof item.full_name === 'string' && item.full_name.trim().length > 0)
    .map((item, index) => {
      return {
        id: `gh-${String(item.id ?? index)}`,
        title: item.full_name ?? '',
        url: item.html_url,
      };
    });
};

/**
 * Fetches latest packages for the configured npm maintainer profile.
 */
const fetchNpmFeed = async ({
  signal,
}: FetchBySignalInputType): Promise<CommunityContributionFeedItemType[]> => {
  const response = await fetch(
    `https://registry.npmjs.org/-/v1/search?text=maintainer:${encodeURIComponent(HOME_COMMUNITY_CONTRIBUTION_NPM_MAINTAINER)}&size=${String(HOME_COMMUNITY_CONTRIBUTION_FEED_PAGE_SIZE)}&from=0`,
    {
      headers: HOME_COMMUNITY_CONTRIBUTION_REQUEST_HEADERS,
      signal,
    },
  );
  ensureOkResponse({ response });

  const payload = (await response.json()) as NpmSearchResponseApiType;

  return (payload.objects ?? [])
    .filter((entry) => typeof entry.package?.name === 'string')
    .map((entry, index) => {
      const packageName = entry.package?.name ?? `package-${String(index)}`;
      const packageVersion =
        typeof entry.package?.version === 'string' ? `v${entry.package.version}` : '';

      return {
        id: `npm-${String(index)}`,
        title: `${packageName} ${packageVersion}`.trim(),
        url: entry.package?.links?.npm,
      };
    });
};

/**
 * Fetches latest Hashnode publication posts via GraphQL.
 */
const fetchHashnodeFeed = async ({
  signal,
}: FetchBySignalInputType): Promise<CommunityContributionFeedItemType[]> => {
  const response = await fetch('https://gql.hashnode.com', {
    body: JSON.stringify({
      operationName: 'Publication',
      query: HASHNODE_PUBLICATION_QUERY,
      variables: {
        first: HOME_COMMUNITY_CONTRIBUTION_FEED_PAGE_SIZE,
        host: HOME_COMMUNITY_CONTRIBUTION_HASHNODE_HOST,
      },
    }),
    headers: {
      ...HOME_COMMUNITY_CONTRIBUTION_REQUEST_HEADERS,
      'content-type': 'application/json',
    },
    method: 'POST',
    signal,
  });
  ensureOkResponse({ response });

  const payload = (await response.json()) as HashnodePublicationResponseApiType;
  const edges = payload.data?.publication?.posts?.edges ?? [];

  return edges.reduce<CommunityContributionFeedItemType[]>((accumulator, edge, index) => {
    const node = edge.node;

    if (node === undefined || typeof node.title !== 'string' || node.title.trim().length === 0) {
      return accumulator;
    }

    accumulator.push({
      id: node.id ?? `hashnode-${String(index)}`,
      title: node.title,
      url: node.url,
    });

    return accumulator;
  }, []);
};

/**
 * Resolves dynamic feed items for a single provider.
 */
export const fetchCommunityContributionFeed = async ({
  provider,
  signal,
}: FetchCommunityContributionFeedInputType): Promise<CommunityContributionFeedItemType[]> => {
  const cacheKey = createDailyCacheKey({ baseKey: `home-community-contribution-feed:${provider}` });

  return runServerRequest<CommunityContributionFeedItemType[]>({
    cacheKey,
    fallbackValue: [],
    fetcher: async ({ signal: requestSignal }) => {
      if (provider === 'stackoverflow') {
        return fetchStackOverflowFeed({ signal: requestSignal });
      }

      if (provider === 'github') {
        return fetchGithubFeed({ signal: requestSignal });
      }

      if (provider === 'npm') {
        return fetchNpmFeed({ signal: requestSignal });
      }

      if (provider === 'hashnode') {
        return fetchHashnodeFeed({ signal: requestSignal });
      }

      return [];
    },
    requestName: `fetchCommunityContributionFeed(${provider})`,
    signal,
  });
};

/**
 * Fetches all configured community contribution feeds for the home slider.
 */
export const fetchCommunityContributionFeeds = async ({
  signal,
}: FetchCommunityContributionFeedsInputType): Promise<CommunityContributionFeedsByIdType> => {
  const slidesWithFeed = HOME_COMMUNITY_CONTRIBUTION_ITEMS.filter(
    (slide) => slide.feedProvider !== 'none',
  );

  const settledEntries = await Promise.all(
    slidesWithFeed.map(async (slide) => {
      const items = await fetchCommunityContributionFeed({
        provider: slide.feedProvider,
        signal,
      });

      return [slide.id, items] as const;
    }),
  );

  return settledEntries.reduce<CommunityContributionFeedsByIdType>(
    (accumulator, [communityContributionId, items]) => {
      accumulator[communityContributionId] = items;
      return accumulator;
    },
    {},
  );
};
