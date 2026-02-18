import { AboutPage } from '../features/about/AboutPage';
import aboutRouteStylesheet from '../features/about/about.route.css?url';

export const meta = () => {
  const title = 'Max Kazemi — Software Engineer | Frontend Platforms & Web Infrastructure';
  const description =
    'From backend services to scalable frontend systems — a narrative on platform architecture, product building, and durable engineering foundations.';
  const url = 'https://smakss.com/about';

  return [
    { title },
    { name: 'description', content: description },
    { name: 'canonical', content: url },

    { property: 'og:type', content: 'profile' },
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
