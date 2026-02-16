import { GamesPlaygroundPage } from '../features/games/GamesPlaygroundPage';

export const meta = () => {
  const title = 'Playground | SMAKSS';
  const description =
    'Interactive solo game playground featuring reaction, memory, timing, and math mini-games.';

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

const PlaygroundRoute = () => {
  return <GamesPlaygroundPage />;
};

export default PlaygroundRoute;
