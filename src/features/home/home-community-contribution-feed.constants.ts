/**
 * Page size used for home community contribution feeds.
 */
export const HOME_COMMUNITY_CONTRIBUTION_FEED_PAGE_SIZE = 2;

/**
 * Stack Overflow user id used for feed requests.
 */
export const HOME_COMMUNITY_CONTRIBUTION_STACKOVERFLOW_USER_ID =
  process.env.STACKOVERFLOW_USER_ID ?? '';

/**
 * GitHub username used for feed requests.
 */
export const HOME_COMMUNITY_CONTRIBUTION_GITHUB_USERNAME = process.env.GH_USERNAME ?? '';

/**
 * npm maintainer handle used for feed requests.
 */
export const HOME_COMMUNITY_CONTRIBUTION_NPM_MAINTAINER = process.env.NPM_MAINTAINER ?? '';

/**
 * Hashnode publication host used for feed requests.
 */
export const HOME_COMMUNITY_CONTRIBUTION_HASHNODE_HOST = process.env.HASHNODE_HOST ?? '';

/**
 * Common outbound headers for third-party community contribution feed requests.
 */
export const HOME_COMMUNITY_CONTRIBUTION_REQUEST_HEADERS = {
  accept: 'application/json',
  'user-agent': 'smakss-website/1.0 (+https://smakss.me)',
} as const;

/**
 * Hashnode publication query used for home community contribution feed requests.
 */
export const HASHNODE_PUBLICATION_QUERY = `#graphql
  query Publication($host: String!, $first: Int!) {
    publication(host: $host) {
      id
      isTeam
      title
      posts(first: $first) {
        edges {
          node {
            id
            title
            url
          }
        }
      }
    }
  }
`;
