import type { LoaderFunctionArgs } from 'react-router';

import { HomePage } from '../features/home/HomePage';
import { fetchDestinationFeeds } from '../features/home/home-destination.server';
import homeRouteStylesheet from '../features/home/home.route.css?url';
import { fetchDailyQuote } from '../features/home/quote.server';
import { resolveLanguageFromHeader } from '../utils/language.utils';

export const meta = () => {
  const title = 'Home | SMAKSS';
  const description =
    'Max Kazemi - Software Engineer focused on frontend platforms, web infrastructure, and developer tooling.';

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'SMAKSS' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: '/icon.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: '/icon.png' },
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
  const destinationFeedsPromise = fetchDestinationFeeds({ signal: request.signal });
  const dailyQuote = await fetchDailyQuote({ language, signal: request.signal }).catch(() => {
    return null;
  });

  return {
    dailyQuote,
    destinationFeedsPromise,
  };
};

const HomeRoute = ({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) => {
  return (
    <HomePage
      destinationFeedsPromise={loaderData.destinationFeedsPromise}
      initialQuote={loaderData.dailyQuote}
    />
  );
};

export default HomeRoute;
