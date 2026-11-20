import { resolveRequestLanguage } from '@/root.utils';
import { HomePage } from '@features/home/HomePage';
import { fetchCommunityContributionFeeds } from '@features/home/home-community-contribution.server';
import homeRouteStylesheet from '@features/home/home.route.css?url';
import { createRouteMeta } from '@utils/route-meta.utils';
import type { LoaderFunctionArgs } from 'react-router';

export const meta = () => {
  const title = 'Max Kazemi — Software Engineer Building Web Platforms';
  const description =
    'Software engineer building web platforms, from frontend foundations to reliable infrastructure. Founder, open-source contributor, and technical writer.';
  const url = 'https://smakss.com/';

  return createRouteMeta({ description, title, url });
};

/**
 * Registers route-scoped assets for the home page.
 */
export const links = () => {
  return [{ href: homeRouteStylesheet, rel: 'stylesheet' }];
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  const language = resolveRequestLanguage({ request });
  const communityContributionFeeds = fetchCommunityContributionFeeds({
    signal: request.signal,
  });
  return {
    communityContributionFeeds,
    language,
  };
};

const HomeRoute = ({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) => {
  return <HomePage communityContributionFeeds={loaderData.communityContributionFeeds} />;
};

export default HomeRoute;
