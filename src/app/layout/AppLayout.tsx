import { Box } from '@components/Box';
import type { DailyQuoteType } from '@features/home/quote.type';
import { Outlet } from 'react-router';
import type { InitialPreferencesType } from './app-header.type';
import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';
import { ConsoleWelcome } from './ConsoleWelcome';
import { CookieBanner } from './CookieBanner';

/**
 * Root app shell that renders persistent layout chrome and routed content.
 */
export const AppLayout = ({
  initialPreferences,
  initialQuote,
}: {
  initialPreferences: InitialPreferencesType;
  initialQuote: DailyQuoteType | null;
}) => {
  return (
    <Box as="div" className="theme-shell relative flex min-h-screen flex-col text-(--foreground)">
      <Box aria-hidden className="shape-layer shape-layer-fixed">
        <Box as="span" className="shape shape-1" />
        <Box as="span" className="shape shape-2" />
        <Box as="span" className="shape shape-3" />
        <Box as="span" className="shape shape-4" />
      </Box>

      <Box className="relative z-[1] flex flex-1 flex-col">
        <ConsoleWelcome language={initialPreferences.language} theme={initialPreferences.theme} />
        <AppHeader initialPreferences={initialPreferences} />
        <Outlet />
      </Box>
      <AppFooter initialQuote={initialQuote} />
      <CookieBanner />
    </Box>
  );
};
