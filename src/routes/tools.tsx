import { ToolsPlaygroundPage } from '@features/tools/ToolsPlaygroundPage';
import { createRouteMeta } from '@utils/route-meta.utils';
import type { LoaderFunctionArgs } from 'react-router';

export const meta = () => {
  const title = 'Tools — npm Packages & Engineering Utilities';
  const description =
    'A curated collection of npm packages and focused engineering utilities — practical abstractions shaped by real-world system constraints.';
  const url = 'https://smakss.com/tools';

  return createRouteMeta({ description, title, url });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { fetchToolsPlaygroundItems } = await import('@features/tools/tools-playground.server');
  const items = await fetchToolsPlaygroundItems({ signal: request.signal });

  return {
    items,
  };
};

const ToolsRoute = ({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) => {
  return <ToolsPlaygroundPage items={loaderData.items} />;
};

export default ToolsRoute;
