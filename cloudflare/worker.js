import { createRequestHandler } from 'react-router';
import * as build from '../build/server/index.js';

/**
 * Cloudflare Worker entry that serves static assets first and falls back to
 * React Router SSR for document/data requests.
 */
const handleRequest = createRequestHandler(build, 'production');

/**
 * Worker module export.
 */
export default {
  /**
   * Handles incoming requests in the Cloudflare Worker runtime.
   */
  async fetch(request, env, context) {
    if (env.ASSETS !== undefined && env.ASSETS !== null) {
      const assetResponse = await env.ASSETS.fetch(request);

      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    }

    return handleRequest(request, {
      cloudflare: {
        context,
        env,
      },
    });
  },
};

