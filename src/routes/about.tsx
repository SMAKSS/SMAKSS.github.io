import { AboutPage } from '../features/about/AboutPage';
import aboutRouteStylesheet from '../features/about/about.route.css?url';

export const meta = () => {
  const title = 'About | SMAKSS';
  const description =
    'About Max Kazemi - systems-oriented software engineer building durable frontend and platform foundations.';

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'profile' },
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
 * Registers route-scoped assets for the about page.
 */
export const links = () => {
  return [{ href: aboutRouteStylesheet, rel: 'stylesheet' }];
};

const AboutRoute = () => {
  return <AboutPage />;
};

export default AboutRoute;
