import type { DailyQuoteType } from '@features/home/quote.type';
import type { InitialPreferencesType } from './app-header.type';

/**
 * Deferred quote data used by the persistent footer.
 */
export type AppFooterPropsType = {
  quotePromise: Promise<DailyQuoteType | null>;
};

/**
 * Root preferences and footer data used by the app shell.
 */
export type AppLayoutPropsType = AppFooterPropsType & {
  initialPreferences: InitialPreferencesType;
};
