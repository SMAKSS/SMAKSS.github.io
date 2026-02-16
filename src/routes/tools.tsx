import type { LoaderFunctionArgs } from 'react-router';
import { ToolsPlaygroundPage } from '../features/tools/ToolsPlaygroundPage';

export const meta = () => {
  const title = 'Tools — npm Packages & Engineering Utilities';
  const description =
    'A curated collection of npm packages and focused engineering utilities — practical abstractions shaped by real-world system constraints.';
  const url = 'https://smakss.com/tools';

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { fetchToolsPlaygroundItems } = await import('../features/tools/tools-playground.server');
  const items = await fetchToolsPlaygroundItems({ signal: request.signal });

  return {
    items,
  };
};

const ToolsRoute = ({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) => {
  return <ToolsPlaygroundPage items={loaderData.items} />;
};

export default ToolsRoute;
