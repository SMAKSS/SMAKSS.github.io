import { Box } from '@components/Box';
import { Outlet } from 'react-router';
import type { InitialPreferencesType } from './app-header.type';
import { AppHeader } from './AppHeader';
import { ConsoleWelcome } from './ConsoleWelcome';
import { CookieBanner } from './CookieBanner';

/**
 * Root app shell that renders persistent layout chrome and routed content.
 */
export const AppLayout = ({
  initialPreferences,
}: {
  initialPreferences: InitialPreferencesType;
}) => {
  return (
    <Box as="main" className="theme-shell relative min-h-screen text-(--foreground)">
      <Box aria-hidden className="shape-layer shape-layer-fixed">
        <Box as="span" className="shape shape-1" />
        <Box as="span" className="shape shape-2" />
        <Box as="span" className="shape shape-3" />
        <Box as="span" className="shape shape-4" />
      </Box>

      <Box className="relative pb-20">
        <ConsoleWelcome language={initialPreferences.language} theme={initialPreferences.theme} />
        <AppHeader initialPreferences={initialPreferences} />
        <Outlet />
      </Box>
      <CookieBanner />
    </Box>
  );
};
