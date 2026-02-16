import type { LoaderFunctionArgs } from 'react-router';
import { ToolsPlaygroundPage } from '../features/tools/ToolsPlaygroundPage';

export const meta = () => {
  const title = 'Tools | SMAKSS';
  const description =
    "Explore Max Kazemi's public npm tools with sandbox previews, package details, and practical utility-focused libraries.";

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
