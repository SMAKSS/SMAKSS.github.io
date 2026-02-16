import type { HomeCommunityContributionItemType } from './home-community-contribution.type';

/**
 * Community contribution slides used by the home slider section.
 */
export const HOME_COMMUNITY_CONTRIBUTION_ITEMS: HomeCommunityContributionItemType[] = [
  {
    external: true,
    feedProvider: 'stackoverflow',
    href: 'https://stackoverflow.com/users/11908502/smakss',
    id: 'stackoverflow',
    illustrationLabelKey: 'hero.slider.slides.stackoverflow.illustration',
    subtitleKey: 'hero.slider.slides.stackoverflow.subtitle',
    titleKey: 'social.stackoverflow',
  },
  {
    external: true,
    feedProvider: 'hashnode',
    href: 'https://hashnode.com/@smakss',
    id: 'hashnode',
    illustrationLabelKey: 'hero.slider.slides.hashnode.illustration',
    subtitleKey: 'hero.slider.slides.hashnode.subtitle',
    titleKey: 'social.hashnode',
  },
  {
    external: true,
    feedProvider: 'github',
    href: 'https://github.com/smakss',
    id: 'github',
    illustrationLabelKey: 'hero.slider.slides.github.illustration',
    subtitleKey: 'hero.slider.slides.github.subtitle',
    titleKey: 'social.github',
  },
  {
    external: true,
    feedProvider: 'npm',
    href: 'https://www.npmjs.com/~smakss',
    id: 'npm',
    illustrationLabelKey: 'hero.slider.slides.npm.illustration',
    subtitleKey: 'hero.slider.slides.npm.subtitle',
    titleKey: 'social.npm',
  },
  {
    external: true,
    feedProvider: 'none',
    href: 'https://hackernoon.com/u/smakss',
    id: 'hackernoon',
    illustrationLabelKey: 'hero.slider.slides.hackernoon.illustration',
    subtitleKey: 'hero.slider.slides.hackernoon.subtitle',
    titleKey: 'social.hackernoon',
  },
];
