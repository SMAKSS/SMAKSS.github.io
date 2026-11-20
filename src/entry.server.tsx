import { resolveRequestLanguage } from '@/root.utils';
import { i18n } from '@i18n/index';
import { renderToReadableStream } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import type { EntryContext } from 'react-router';
import { ServerRouter } from 'react-router';

/**
 * Timeout threshold (in milliseconds) before aborting SSR stream rendering.
 */
export const streamTimeout = 5_000;

/**
 * Keeps intermediary compression from buffering streamed navigation data.
 */
export const handleDataRequest = (response: Response): Response => {
  const streamedResponse = new Response(response.body, response);
  streamedResponse.headers.append('Cache-Control', 'no-transform');
  return streamedResponse;
};

/**
 * Handles document requests in Workers runtime using Web Streams SSR.
 */
const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
): Promise<Response> => {
  responseHeaders.append('Cache-Control', 'no-transform');

  if (request.method.toUpperCase() === 'HEAD') {
    return new Response(null, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  }

  const requestI18n = i18n.cloneInstance({ lng: resolveRequestLanguage({ request }) });
  let shellRendered = false;
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, streamTimeout + 1_000);

  try {
    const stream = await renderToReadableStream(
      <I18nextProvider i18n={requestI18n}>
        <ServerRouter context={routerContext} url={request.url} />
      </I18nextProvider>,
      {
        signal: abortController.signal,
        onError(error: unknown): void {
          responseStatusCode = 500;

          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    shellRendered = true;
    const clearRenderTimeout = () => clearTimeout(timeoutId);
    void stream.allReady.then(clearRenderTimeout, clearRenderTimeout);

    if (routerContext.isSpaMode) {
      await stream.allReady;
    }

    responseHeaders.set('Content-Type', 'text/html');

    return new Response(stream, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export default handleRequest;
