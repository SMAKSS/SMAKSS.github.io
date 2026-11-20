import { logServerError, summarizePayload } from './logger.service';
import { DAILY_CACHE_TTL_MS, DEFAULT_SERVER_REQUEST_TIMEOUT_MS } from './request-handler.constants';
import type {
  CachedServerResponseType,
  CreateDailyCacheKeyInputType,
  ExtractResponseBodyPreviewInputType,
  LogServerRequestErrorInputType,
  RunServerRequestInputType,
} from './request-handler.type';

const serverRequestCache = new Map<string, CachedServerResponseType>();

const resolveResponseFromError = ({ error }: { error: unknown }): Response | null => {
  if (error instanceof Response) {
    return error;
  }

  if (typeof error === 'object' && error !== null && 'response' in error) {
    const responseValue = (error as { response?: unknown }).response;
    return responseValue instanceof Response ? responseValue : null;
  }

  return null;
};

/**
 * Builds a date-scoped cache key using UTC day boundaries.
 */
export const createDailyCacheKey = ({ baseKey }: CreateDailyCacheKeyInputType): string => {
  const currentDateKey = new Date().toISOString().slice(0, 10);
  return `${baseKey}:${currentDateKey}`;
};

/**
 * Logs structured details for server request failures.
 */
export const logServerRequestError = ({
  cacheKey,
  context,
  error,
  fallbackValue,
  requestName,
}: LogServerRequestErrorInputType): void => {
  logServerError({
    context: {
      cacheKey,
      fallbackPreview: summarizePayload({ value: fallbackValue }),
      requestName,
      ...context,
    },
    error,
    message: `[server-request] ${requestName} failed`,
  });
};

/**
 * Extracts a small response body preview from thrown fetch responses.
 */
const extractResponseBodyPreview = async ({
  error,
}: ExtractResponseBodyPreviewInputType): Promise<string | null> => {
  const response = resolveResponseFromError({ error });

  if (response === null) {
    return null;
  }

  try {
    const bodyText = await response.clone().text();

    if (bodyText.trim().length === 0) {
      return null;
    }

    return bodyText.length > 280 ? `${bodyText.slice(0, 280)}…` : bodyText;
  } catch {
    return null;
  }
};

/**
 * Executes a server request with in-memory caching, a deadline, and a failure fallback.
 */
export const runServerRequest = async <ResponseType>({
  cacheKey,
  cacheTtlMs = DAILY_CACHE_TTL_MS,
  fallbackValue,
  fetcher,
  requestName,
  signal,
  timeoutMs = DEFAULT_SERVER_REQUEST_TIMEOUT_MS,
}: RunServerRequestInputType<ResponseType>): Promise<ResponseType> => {
  const now = Date.now();
  const cachedResponse = serverRequestCache.get(cacheKey);

  if (cachedResponse !== undefined && cachedResponse.expiresAt > now) {
    return cachedResponse.value as ResponseType;
  }

  const timeoutController = new AbortController();
  const requestSignal =
    signal === undefined
      ? timeoutController.signal
      : AbortSignal.any([signal, timeoutController.signal]);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      const error = new Error('Upstream request timed out.');
      error.name = 'TimeoutError';
      reject(error);
      timeoutController.abort(error);
    }, timeoutMs);
  });

  try {
    requestSignal.throwIfAborted();
    const response = await Promise.race([fetcher({ signal: requestSignal }), deadline]);

    if (!requestSignal.aborted) {
      serverRequestCache.set(cacheKey, {
        expiresAt: now + cacheTtlMs,
        value: response,
      });
    }

    return response;
  } catch (error) {
    const responseBodyPreview = await Promise.race([
      extractResponseBodyPreview({ error }),
      deadline,
    ]).catch(() => null);

    logServerRequestError({
      cacheKey,
      context:
        responseBodyPreview === null
          ? undefined
          : {
              responseBodyPreview,
            },
      error,
      fallbackValue,
      requestName,
    });
    return fallbackValue;
  } finally {
    clearTimeout(timeoutId);
  }
};
