import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('playground', 'routes/playground.tsx'),
  route('tools', 'routes/tools.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
