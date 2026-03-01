import { AboutPage } from '@features/about/AboutPage';
import aboutRouteStylesheet from '@features/about/about.route.css?url';
import { createRouteMeta } from '@utils/route-meta.utils';

export const meta = () => {
  const title = 'Max Kazemi — Software Engineer | Frontend Platforms & Web Infrastructure';
  const description =
    'From backend services to scalable frontend systems — a narrative on platform architecture, product building, and durable engineering foundations.';
  const url = 'https://smakss.com/about';

  return createRouteMeta({ description, title, type: 'profile', url });
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
