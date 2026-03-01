import { createRequestHandler } from '@react-router/cloudflare';

/**
 * Cloudflare Worker entry that serves static assets first and falls back to
 * React Router SSR for document/data requests.
 */
const handleRequest = createRequestHandler({
  build: () => {
    if (import.meta.env.DEV) {
      return import('virtual:react-router/server-build');
    }

    return import('../build/server/index.js');
  },
  mode: import.meta.env.DEV ? 'development' : 'production',
});

/**
 * Matches requests that should be resolved from the static asset bundle.
 */
const isAssetRequest = (request) => {
  const { pathname } = new URL(request.url);

  return /\/[^/]+\.[a-z0-9]+$/i.test(pathname);
};

/**
 * Worker module export.
 */
export default {
  /**
   * Handles incoming requests in the Cloudflare Worker runtime.
   */
  async fetch(request, env, context) {
    if (env.ASSETS !== undefined && env.ASSETS !== null && isAssetRequest(request)) {
      const assetResponse = await env.ASSETS.fetch(request);

      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    return handleRequest({
      context,
      env,
      passThroughOnException() {},
      request,
      waitUntil: context.waitUntil.bind(context),
    });
  },
};
