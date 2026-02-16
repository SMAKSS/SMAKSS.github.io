import type { SlideImageConfigType } from './home-destination-slider.type';
import type { HomeDestinationItemType } from './home-destination.type';

/**
 * Image source configuration for home destination slider illustrations.
 */
export const SLIDE_IMAGE_CONFIGS: Partial<
  Record<HomeDestinationItemType['id'], SlideImageConfigType>
> = {
  github: {
    alt: 'GitHub illustration',
    basePath: '/slides/github/github',
    isThemeCombined: true,
  },
  hackernoon: {
    alt: 'HackerNoon illustration',
    basePath: '/slides/hackernoon/hackernoon',
    isThemeCombined: true,
  },
  hashnode: {
    alt: 'Hashnode illustration',
    basePath: '/slides/hashnode/hashnode',
    isThemeCombined: true,
  },
  npm: {
    alt: 'npm illustration',
    basePath: '/slides/npm/npm',
    isThemeCombined: true,
  },
  stackoverflow: {
    alt: 'Stack Overflow illustration',
    basePath: '/slides/stackoverflow/stackoverflow',
    isThemeCombined: true,
  },
};
