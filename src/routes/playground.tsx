import { GamesPlaygroundPage } from '../features/games/GamesPlaygroundPage';

export const meta = () => {
  const title = 'Playground — Experimental Systems & Solo Games';
  const description =
    'A collection of lightweight solo games exploring mechanics, interaction design, and system behaviour outside production constraints.';
  const url = 'https://smakss.com/playground';

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

const PlaygroundRoute = () => {
  return <GamesPlaygroundPage />;
};

export default PlaygroundRoute;
