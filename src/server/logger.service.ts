import type {
  ExtractServerErrorDetailsInputType,
  LogServerErrorInputType,
  ResolveErrorSummaryInputType,
  ServerErrorDetailsType,
  ServerFailureReasonType,
  SummarizePayloadInputType,
} from './logger.type';

/**
 * Creates a compact preview payload for console logging.
 */
export const summarizePayload = ({ value }: SummarizePayloadInputType): unknown => {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string') {
    return value.length > 180 ? `${value.slice(0, 180)}…` : value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (Array.isArray(value)) {
    return {
      length: value.length,
      sample: value.slice(0, 2),
      type: 'array',
    };
  }

  if (typeof value === 'object') {
    const objectValue = value as Record<string, unknown>;
    const keys = Object.keys(objectValue);
    const previewEntries = keys.slice(0, 4).reduce<Record<string, unknown>>((accumulator, key) => {
      accumulator[key] = objectValue[key];
      return accumulator;
    }, {});

    return {
      keys,
      preview: previewEntries,
      type: 'object',
    };
  }

  return Object.prototype.toString.call(value);
};

const toRecord = ({ value }: { value: unknown }): Record<string, unknown> | null => {
  return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : null;
};

const toStringOrNull = ({ value }: { value: unknown }): string | null => {
  return typeof value === 'string' && value.trim() !== '' ? value : null;
};

const toNumberOrNull = ({ value }: { value: unknown }): number | null => {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
};

const summarizeResponse = ({ response }: { response: Response }): Record<string, unknown> => {
  return {
    ok: response.ok,
    redirected: response.redirected,
    status: response.status,
    statusText: response.statusText,
    type: response.type,
    url: response.url,
  };
};

const resolveResponseFromError = ({ error }: { error: unknown }): Response | null => {
  if (error instanceof Response) {
    return error;
  }

  const errorRecord = toRecord({ value: error });
  const responseValue = errorRecord?.response;
  return responseValue instanceof Response ? responseValue : null;
};

const resolveErrorSummary = ({ error }: ResolveErrorSummaryInputType): string | null => {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }

  return null;
};

const resolveHintByReason = ({ reason }: { reason: ServerFailureReasonType }): string => {
  if (reason === 'aborted') {
    return 'Request was aborted before completion. This is usually expected during route changes.';
  }

  if (reason === 'network') {
    return 'Network-level failure detected. Check upstream service availability and DNS/connectivity.';
  }

  if (reason === 'timeout') {
    return 'Request timed out. Consider retry/backoff or increasing upstream timeout settings.';
  }

  if (reason === 'http') {
    return 'Upstream responded with an HTTP failure status. Check API credentials, limits, and response body.';
  }

  return 'Unexpected failure captured. Returning fallback payload to keep the UI stable.';
};

const classifyReason = ({
  errorName,
  message,
  status,
}: {
  errorName: string | null;
  message: string | null;
  status: number | null;
}): ServerFailureReasonType => {
  const normalizedMessage = message?.toLowerCase() ?? '';
  const normalizedName = errorName?.toLowerCase() ?? '';

  if (
    normalizedName.includes('abort') ||
    normalizedMessage.includes('aborted') ||
    normalizedMessage.includes('aborterror')
  ) {
    return 'aborted';
  }

  if (
    normalizedMessage.includes('timeout') ||
    normalizedMessage.includes('timed out') ||
    normalizedMessage.includes('etimedout')
  ) {
    return 'timeout';
  }

  if (status !== null && status >= 400) {
    return 'http';
  }

  if (
    normalizedName === 'typeerror' ||
    normalizedMessage.includes('network') ||
    normalizedMessage.includes('fetch failed') ||
    normalizedMessage.includes('getaddrinfo') ||
    normalizedMessage.includes('econn') ||
    normalizedMessage.includes('enotfound')
  ) {
    return 'network';
  }

  return 'unknown';
};

/**
 * Extracts structured diagnostics from unknown server errors.
 */
export const extractServerErrorDetails = ({
  error,
}: ExtractServerErrorDetailsInputType): ServerErrorDetailsType => {
  const directResponse = resolveResponseFromError({ error });

  if (directResponse !== null) {
    const reason = classifyReason({
      errorName: 'Response',
      message: directResponse.statusText,
      status: directResponse.status,
    });

    return {
      errorName: 'Response',
      hint: resolveHintByReason({ reason }),
      message: directResponse.statusText || `HTTP ${String(directResponse.status)}`,
      reason,
      status: directResponse.status,
      statusText: directResponse.statusText || null,
    };
  }

  const errorRecord = toRecord({ value: error });
  const responseRecord = toRecord({ value: errorRecord?.response });

  const fallbackErrorName = toStringOrNull({ value: errorRecord?.name });
  const fallbackMessage = toStringOrNull({ value: errorRecord?.message });
  const fallbackStatus = toNumberOrNull({ value: errorRecord?.status });
  const fallbackStatusText = toStringOrNull({ value: errorRecord?.statusText });

  const errorName = error instanceof Error ? error.name : fallbackErrorName;
  const message = error instanceof Error ? error.message : fallbackMessage;
  const status =
    toNumberOrNull({ value: responseRecord?.status }) ??
    fallbackStatus ??
    toNumberOrNull({ value: errorRecord?.code });
  const statusText = toStringOrNull({ value: responseRecord?.statusText }) ?? fallbackStatusText;

  const reason = classifyReason({ errorName, message, status });

  return {
    errorName,
    hint: resolveHintByReason({ reason }),
    message,
    reason,
    status,
    statusText,
  };
};

/**
 * Logs structured server errors with normalized diagnostics.
 */
export const logServerError = ({ context = {}, error, message }: LogServerErrorInputType): void => {
  const details = extractServerErrorDetails({ error });
  const directResponse = resolveResponseFromError({ error });
  const responseSummary =
    directResponse === null
      ? null
      : summarizePayload({ value: summarizeResponse({ response: directResponse }) });
  const errorSummary = resolveErrorSummary({ error });

  console.error(message, {
    ...context,
    ...details,
    ...(errorSummary === null ? {} : { errorSummary }),
    ...(responseSummary === null ? {} : { responseSummary }),
  });
};
