import type { CreateRouteMetaInputType, CreateRouteMetaResultType } from './route-meta.type';

const DEFAULT_OG_IMAGE = '/icon.png';
const DEFAULT_SITE_NAME = 'SMAKSS';
const DEFAULT_TWITTER_CARD = 'summary_large_image';
const DEFAULT_TWITTER_CREATOR = '@sma_kss';

/**
 * Builds route metadata with shared Open Graph and Twitter defaults.
 */
export const createRouteMeta = ({
  description,
  title,
  type = 'website',
  url,
}: CreateRouteMetaInputType): CreateRouteMetaResultType => {
  return [
    { title },
    { name: 'description', content: description },
    { name: 'canonical', content: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: DEFAULT_SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { name: 'twitter:card', content: DEFAULT_TWITTER_CARD },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
    { name: 'twitter:creator', content: DEFAULT_TWITTER_CREATOR },
  ];
};
