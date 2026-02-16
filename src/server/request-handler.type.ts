/**
 * Shared execution context passed into server request fetchers.
 */
export type ServerRequestContextType = {
  /**
   * Optional abort signal forwarded to the upstream fetch.
   */
  signal?: AbortSignal;
};

/**
 * Fetcher contract used by the server request runner.
 */
export type ServerRequestFetcherType<ResponseType> = ({
  signal,
}: ServerRequestContextType) => Promise<ResponseType>;

/**
 * Cached response entry used for in-memory request memoization.
 */
export type CachedServerResponseType = {
  /**
   * Expiration timestamp in milliseconds.
   */
  expiresAt: number;
  /**
   * Cached response payload.
   */
  value: unknown;
};

/**
 * Input payload for date-scoped cache key creation.
 */
export type CreateDailyCacheKeyInputType = {
  /**
   * Base cache key prefix.
   */
  baseKey: string;
};

/**
 * Input payload for structured server request logging.
 */
export type LogServerRequestErrorInputType = {
  /**
   * Stable cache key used for this request.
   */
  cacheKey: string;
  /**
   * Raw thrown error from the request execution.
   */
  error: unknown;
  /**
   * Human-readable operation name shown in logs.
   */
  requestName: string;
  /**
   * Fallback value returned after request failure.
   */
  fallbackValue: unknown;
  /**
   * Optional extra diagnostic context attached to error logs.
   */
  context?: Record<string, unknown>;
};

/**
 * Input payload for running a cached server request.
 */
export type RunServerRequestInputType<ResponseType> = {
  /**
   * Stable cache key for request result memoization.
   */
  cacheKey: string;
  /**
   * Optional custom cache TTL in milliseconds.
   */
  cacheTtlMs?: number;
  /**
   * Fallback value returned when request execution fails.
   */
  fallbackValue: ResponseType;
  /**
   * Async request fetcher that resolves a typed response.
   */
  fetcher: ServerRequestFetcherType<ResponseType>;
  /**
   * Human-readable operation name shown in logs.
   */
  requestName: string;
  /**
   * Optional abort signal forwarded to the upstream fetch.
   */
  signal?: AbortSignal;
};

/**
 * Input payload for extracting a textual preview from thrown HTTP responses.
 */
export type ExtractResponseBodyPreviewInputType = {
  /**
   * Unknown thrown value.
   */
  error: unknown;
};
