import { GamesPlaygroundPage } from '@features/games/GamesPlaygroundPage';
import { createRouteMeta } from '@utils/route-meta.utils';

export const meta = () => {
  const title = 'Playground — Experimental Systems & Solo Games';
  const description =
    'A collection of lightweight solo games exploring mechanics, interaction design, and system behaviour outside production constraints.';
  const url = 'https://smakss.com/playground';

  return createRouteMeta({ description, title, url });
};

const PlaygroundRoute = () => {
  return <GamesPlaygroundPage />;
};

export default PlaygroundRoute;
