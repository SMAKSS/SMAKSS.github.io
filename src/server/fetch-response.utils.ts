import type {
  CreateServerResponseErrorInputType,
  EnsureOkResponseInputType,
  ServerResponseErrorType,
} from './fetch-response.type';

/**
 * Creates an Error object with the original failed response attached.
 */
export const createServerResponseError = ({
  message,
  response,
}: CreateServerResponseErrorInputType): ServerResponseErrorType => {
  const error = new Error(message) as ServerResponseErrorType;
  error.name = 'ServerResponseError';
  error.response = response;
  return error;
};

/**
 * Ensures upstream fetch responses are successful; throws a response-backed Error otherwise.
 */
export const ensureOkResponse = ({ response }: EnsureOkResponseInputType): void => {
  if (!response.ok) {
    throw createServerResponseError({
      message: `Upstream request failed with status ${String(response.status)} (${response.statusText || 'unknown'}).`,
      response,
    });
  }
};
