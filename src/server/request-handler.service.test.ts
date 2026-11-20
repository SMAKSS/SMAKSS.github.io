import { describe, expect, it, vi } from 'vitest';
import { createServerResponseError } from './fetch-response.utils';
import { DAILY_CACHE_TTL_MS } from './request-handler.constants';
import { createDailyCacheKey, runServerRequest } from './request-handler.service';
import type { ServerRequestContextType } from './request-handler.type';

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

  it('returns a fallback at the deadline, aborts the fetch, and allows a fresh request', async () => {
    vi.useFakeTimers();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    try {
      const options = {
        cacheKey: 'request-handler-timeout-test',
        fallbackValue: 'fallback',
        requestName: 'timeout-test',
        timeoutMs: 100,
      };
      const fetcher = vi.fn<({ signal }: ServerRequestContextType) => Promise<string>>(
        () => new Promise<string>(() => undefined),
      );
      const pending = runServerRequest({ ...options, fetcher });

      await vi.advanceTimersByTimeAsync(100);

      await expect(pending).resolves.toBe('fallback');
      expect(fetcher.mock.calls[0]?.[0].signal?.aborted).toBe(true);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringMatching(/timeout-test failed/),
        expect.objectContaining({ reason: 'timeout' }),
      );
      await expect(
        runServerRequest({ ...options, fetcher: () => Promise.resolve('fresh response') }),
      ).resolves.toBe('fresh response');
    } finally {
      vi.useRealTimers();
      consoleErrorSpy.mockRestore();
    }
  });

  it('returns the fallback when reading an upstream error body exceeds the deadline', async () => {
    vi.useFakeTimers();
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    try {
      const response = new Response(new ReadableStream(), { status: 502 });
      const pending = runServerRequest({
        cacheKey: 'request-handler-slow-error-body-test',
        fallbackValue: 'fallback',
        fetcher: () =>
          Promise.reject(createServerResponseError({ message: 'Upstream error', response })),
        requestName: 'slow-error-body-test',
        timeoutMs: 100,
      });

      await vi.advanceTimersByTimeAsync(100);

      await expect(pending).resolves.toBe('fallback');
    } finally {
      vi.useRealTimers();
      consoleErrorSpy.mockRestore();
    }
  });
});
