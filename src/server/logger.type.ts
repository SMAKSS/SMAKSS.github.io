/**
 * Known server failure reason categories for diagnostics.
 */
export type ServerFailureReasonType = 'aborted' | 'http' | 'network' | 'timeout' | 'unknown';

/**
 * Structured diagnostics extracted from unknown error values.
 */
export type ServerErrorDetailsType = {
  /**
   * Original error name when available.
   */
  errorName: string | null;
  /**
   * Original error message when available.
   */
  message: string | null;
  /**
   * Suggested remediation hint based on error classification.
   */
  hint: string;
  /**
   * Classified failure reason.
   */
  reason: ServerFailureReasonType;
  /**
   * Upstream HTTP status when available.
   */
  status: number | null;
  /**
   * Upstream HTTP status text when available.
   */
  statusText: string | null;
};

/**
 * Input payload for compact value summarization in logs.
 */
export type SummarizePayloadInputType = {
  /**
   * Value to summarize.
   */
  value: unknown;
};

/**
 * Input payload for extracting structured error diagnostics.
 */
export type ExtractServerErrorDetailsInputType = {
  /**
   * Raw thrown error value.
   */
  error: unknown;
};

/**
 * Input payload for generic structured server error logging.
 */
export type LogServerErrorInputType = {
  /**
   * Optional diagnostic context.
   */
  context?: Record<string, unknown>;
  /**
   * Raw thrown error value.
   */
  error: unknown;
  /**
   * Human-readable log message.
   */
  message: string;
};

/**
 * Input payload for deriving a compact error summary string.
 */
export type ResolveErrorSummaryInputType = {
  /**
   * Raw thrown error value.
   */
  error: unknown;
};
