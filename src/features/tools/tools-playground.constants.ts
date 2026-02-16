/**
 * npm maintainer handle used to fetch published package list.
 */
export const NPM_MAINTAINER = 'smakss';

/**
 * Page size used for paginated npm maintainer search requests.
 */
export const TOOL_PLAYGROUND_PAGE_SIZE = 250;

/**
 * Known package-to-sandbox URL mappings for tools playground previews.
 */
export const TOOL_PLAYGROUND_SANDBOXES: Record<string, string> = {
  '@smakss/react-scroll-direction':
    'https://codesandbox.io/embed/tclwvp?view=preview&hidenavigation=1',
  '@smakss/random-string': 'https://codesandbox.io/embed/xlf6d2?view=preview&hidenavigation=1',
  '@smakss/uuid': 'https://codesandbox.io/embed/x5cqpb?view=preview&hidenavigation=1',
  '@smakss/search': 'https://codesandbox.io/embed/zlqtu3?view=preview&hidenavigation=1',
  '@smakss/random-array-element':
    'https://codesandbox.io/embed/7yizos?view=preview&hidenavigation=1',
  '@smakss/convert-numbers': 'https://codesandbox.io/embed/bstmfj?view=preview&hidenavigation=1',
  '@smakss/password-generator': 'https://codesandbox.io/embed/o9ev4k?view=preview&hidenavigation=1',
};
