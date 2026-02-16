/**
 * Input payload for validating fetch responses.
 */
export type EnsureOkResponseInputType = {
  /**
   * Raw fetch response that must have an OK status.
   */
  response: Response;
};

/**
 * Error type carrying upstream response details for diagnostics.
 */
export type ServerResponseErrorType = Error & {
  /**
   * Upstream response that failed.
   */
  response: Response;
};

/**
 * Input payload for constructing response-backed server errors.
 */
export type CreateServerResponseErrorInputType = {
  /**
   * Human-readable error message.
   */
  message: string;
  /**
   * Upstream response that failed.
   */
  response: Response;
};
