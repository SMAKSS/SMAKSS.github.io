import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';
import type { EntryContext } from 'react-router';
import { ServerRouter } from 'react-router';

/**
 * Timeout threshold (in milliseconds) before aborting SSR stream rendering.
 */
export const streamTimeout = 5_000;

/**
 * Handles document requests in Workers runtime using Web Streams SSR.
 */
const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
): Promise<Response> => {
  if (request.method.toUpperCase() === 'HEAD') {
    return new Response(null, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  }

  const userAgent = request.headers.get('user-agent');
  const shouldWaitForAllContent = Boolean(userAgent && isbot(userAgent)) || routerContext.isSpaMode;
  let shellRendered = false;
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, streamTimeout + 1_000);

  try {
    const stream = await renderToReadableStream(
      <ServerRouter context={routerContext} url={request.url} />,
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

    if (shouldWaitForAllContent) {
      await stream.allReady;
    }

    responseHeaders.set('Content-Type', 'text/html');

    return new Response(stream, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  } catch (error) {
    responseStatusCode = 500;
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export default handleRequest;
