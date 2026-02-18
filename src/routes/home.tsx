import type { LoaderFunctionArgs } from 'react-router';
import { HomePage } from '../features/home/HomePage';
import { fetchCommunityContributionFeeds } from '../features/home/home-community-contribution.server';
import homeRouteStylesheet from '../features/home/home.route.css?url';
import { fetchDailyQuote } from '../features/home/quote.server';
import { resolveLanguageFromHeader } from '../utils/language.utils';

export const meta = () => {
  const title = 'SMAKSS — Software Engineer | Frontend Platforms & Web Infrastructure';
  const description =
    'Software engineer specialising in frontend platforms, web infrastructure, and durable system design. Founder, open-source contributor, and technical writer.';
  const url = 'https://smakss.com/';

  return [
    { title },
    { name: 'description', content: description },
    { name: 'canonical', content: url },

    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'SMAKSS' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: '/icon.png' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: '/icon.png' },
    { name: 'twitter:creator', content: '@sma_kss' },
  ];
};

/**
 * Registers route-scoped assets for the home page.
 */
export const links = () => {
  return [{ href: homeRouteStylesheet, rel: 'stylesheet' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const language = resolveLanguageFromHeader({
    acceptLanguage: request.headers.get('accept-language'),
  });
  const communityContributionFeedsPromise = fetchCommunityContributionFeeds({
    signal: request.signal,
  });
  const dailyQuote = await fetchDailyQuote({ language, signal: request.signal }).catch(() => {
    return null;
  });

  return {
    dailyQuote,
    communityContributionFeedsPromise,
  };
};

const HomeRoute = ({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) => {
  return (
    <HomePage
      communityContributionFeedsPromise={loaderData.communityContributionFeedsPromise}
      initialQuote={loaderData.dailyQuote}
    />
  );
};

export default HomeRoute;
