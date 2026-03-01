import { resolveRequestLanguage } from '@/root.utils';
import { HomePage } from '@features/home/HomePage';
import { fetchCommunityContributionFeeds } from '@features/home/home-community-contribution.server';
import homeRouteStylesheet from '@features/home/home.route.css?url';
import { fetchDailyQuote } from '@features/home/quote.server';
import { createRouteMeta } from '@utils/route-meta.utils';
import type { LoaderFunctionArgs } from 'react-router';

export const meta = () => {
  const title = 'SMAKSS — Software Engineer | Frontend Platforms & Web Infrastructure';
  const description =
    'Software engineer specialising in frontend platforms, web infrastructure, and durable system design. Founder, open-source contributor, and technical writer.';
  const url = 'https://smakss.com/';

  return createRouteMeta({ description, title, url });
};

/**
 * Registers route-scoped assets for the home page.
 */
export const links = () => {
  return [{ href: homeRouteStylesheet, rel: 'stylesheet' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const language = resolveRequestLanguage({ request });
  const communityContributionFeedsPromise = fetchCommunityContributionFeeds({
    signal: request.signal,
  });
  const dailyQuote = await fetchDailyQuote({ signal: request.signal }).catch(() => {
    return null;
  });

  return {
    dailyQuote,
    communityContributionFeedsPromise,
    language,
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
