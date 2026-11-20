/**
 * Local storage key used for persisting daily quote payloads in the browser.
 */
export const QUOTE_STORAGE_KEY = 'smakss-daily-quote';

/**
 * Upstream quote API URL used by server-side quote resolution.
 */
export const QUOTE_API_URL = 'https://zenquotes.io/api/today';

/**
 * Time budget for loading the footer quote from ZenQuotes.
 */
export const QUOTE_REQUEST_TIMEOUT_MS = 1_500;
