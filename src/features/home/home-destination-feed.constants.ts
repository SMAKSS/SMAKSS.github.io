/**
 * Page size used for home destination feeds.
 */
export const HOME_DESTINATION_FEED_PAGE_SIZE = 2;

/**
 * Stack Overflow user id used for feed requests.
 */
export const HOME_DESTINATION_STACKOVERFLOW_USER_ID = process.env.STACKOVERFLOW_USER_ID ?? '';

/**
 * GitHub username used for feed requests.
 */
export const HOME_DESTINATION_GITHUB_USERNAME = process.env.GH_USERNAME ?? '';

/**
 * npm maintainer handle used for feed requests.
 */
export const HOME_DESTINATION_NPM_MAINTAINER = process.env.NPM_MAINTAINER ?? '';

/**
 * Hashnode publication host used for feed requests.
 */
export const HOME_DESTINATION_HASHNODE_HOST = process.env.HASHNODE_HOST ?? '';

/**
 * Hashnode publication query used for home destination feed requests.
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
