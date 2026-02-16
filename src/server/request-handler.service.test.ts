import { describe, expect, it, vi } from 'vitest';

import { createServerResponseError } from './fetch-response.utils';
import { DAILY_CACHE_TTL_MS } from './request-handler.constants';
import { createDailyCacheKey, runServerRequest } from './request-handler.service';

describe('request-handler.service', () => {
  it('createDailyCacheKey appends UTC date suffix', () => {
    const cacheKey = createDailyCacheKey({ baseKey: 'example' });

    expect(cacheKey).toMatch(/^example:\d{4}-\d{2}-\d{2}$/);
  });

  it('runServerRequest reuses cached value within ttl', async () => {
    let callCount = 0;

    const fetcher = (): Promise<string> => {
      callCount += 1;
      return Promise.resolve('cached-response');
    };

    const first = await runServerRequest({
      cacheKey: 'request-handler-cache-test',
      cacheTtlMs: DAILY_CACHE_TTL_MS,
      fallbackValue: 'fallback',
      fetcher,
      requestName: 'cache-test',
    });

    const second = await runServerRequest({
      cacheKey: 'request-handler-cache-test',
      cacheTtlMs: DAILY_CACHE_TTL_MS,
      fallbackValue: 'fallback',
      fetcher,
      requestName: 'cache-test',
    });

    expect(first).toBe('cached-response');
    expect(second).toBe('cached-response');
    expect(callCount).toBe(1);
  });

  it('runServerRequest returns fallback value when fetcher fails', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      return;
    });

    const response = await runServerRequest({
      cacheKey: 'request-handler-failure-test',
      fallbackValue: 'fallback',
      fetcher: () => {
        return Promise.reject(new Error('boom'));
      },
      requestName: 'failure-test',
    });

    expect(response).toBe('fallback');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(/failure-test failed/),
      expect.objectContaining({
        cacheKey: 'request-handler-failure-test',
        fallbackPreview: 'fallback',
        reason: 'unknown',
        requestName: 'failure-test',
      }),
    );
    const firstCall = consoleErrorSpy.mock.calls.at(0) as [unknown, { hint?: unknown }] | undefined;
    const hintValue = typeof firstCall?.[1]?.hint === 'string' ? firstCall[1].hint : '';
    expect(hintValue.length).toBeGreaterThan(0);

    consoleErrorSpy.mockRestore();
  });

  it('runServerRequest logs response details when fetcher throws Response', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
      return;
    });

    const response = await runServerRequest({
      cacheKey: 'request-handler-http-failure-test',
      fallbackValue: 'fallback',
      fetcher: () => {
        return Promise.reject(
          createServerResponseError({
            message: 'Upstream request failed.',
            response: new Response(JSON.stringify({ detail: 'upstream exploded' }), {
              headers: { 'content-type': 'application/json' },
              status: 502,
              statusText: 'Bad Gateway',
            }),
          }),
        );
      },
      requestName: 'http-failure-test',
    });

    expect(response).toBe('fallback');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(/http-failure-test failed/),
      expect.objectContaining({
        reason: 'http',
        requestName: 'http-failure-test',
        responseBodyPreview: JSON.stringify({ detail: 'upstream exploded' }),
        status: 502,
        statusText: 'Bad Gateway',
      }),
    );

    consoleErrorSpy.mockRestore();
  });
});
