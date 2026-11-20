import { ROUTE_PATHS } from '@app/router/router.constants';
import { Box } from '@components/Box';
import { ArrowIcon } from '@components/Icon';
import { Text } from '@components/Text';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { Link } from 'react-router';
import { HomeCommunityContributionSlider } from './HomeCommunityContributionSlider';
import { HomeSystemsIllustration } from './HomeSystemsIllustration';
import type { HomePagePropsType } from './home-page.type';

/**
 * Renders the landing page hero and discovery links.
 */
export const HomePage = ({ communityContributionFeeds }: HomePagePropsType) => {
  const { t } = useAppTranslation();

  return (
    <Box as="main" className="home-page mx-auto w-full max-w-6xl px-6 md:px-10">
      <Box as="section" className="home-intro" aria-labelledby="home-heading">
        <Box className="home-intro-main">
          <Text as="h1" id="home-heading" className="home-headline">
            {t('aboutContent.name')}
          </Text>
          <Text as="p" className="home-role">
            {t('hero.subtitle')}
          </Text>
          <Text as="p" className="home-statement">
            {t('hero.statement')}
          </Text>
          <Text as="p" className="home-intro-description">
            {t('hero.description')}
          </Text>
          <Link className="home-primary-link" to={ROUTE_PATHS.ABOUT}>
            {t('hero.secondaryCta')}
          </Link>
        </Box>
        <HomeSystemsIllustration />
      </Box>

      <HomeCommunityContributionSlider communityContributionFeeds={communityContributionFeeds} />

      <Box as="section" className="home-explore" aria-labelledby="home-explore-title">
        <Box className="home-explore-intro">
          <Text as="h2" id="home-explore-title" className="home-section-title">
            {t('hero.exploreTitle')}
          </Text>
          <Text as="p" className="home-explore-summary">
            {t('hero.exploreDescription')}
          </Text>
        </Box>
        <Box className="home-explore-links">
          <Link className="home-explore-link" to={ROUTE_PATHS.TOOLS}>
            <Box>
              <Text as="span" className="home-explore-name">
                {t('nav.tools')}
              </Text>
              <Text as="span" className="home-explore-description">
                {t('hero.routeSelector.toolsDescription')}
              </Text>
            </Box>
            <ArrowIcon direction="right" />
          </Link>
          <Link className="home-explore-link" to={ROUTE_PATHS.PLAYGROUND}>
            <Box>
              <Text as="span" className="home-explore-name">
                {t('nav.playground')}
              </Text>
              <Text as="span" className="home-explore-description">
                {t('hero.routeSelector.playgroundDescription')}
              </Text>
            </Box>
            <ArrowIcon direction="right" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
