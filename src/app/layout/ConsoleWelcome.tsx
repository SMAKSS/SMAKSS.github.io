import { useEffect } from 'react';
import type { ConsoleWelcomePropsType } from './console-welcome.type';

/**
 * Prints a compact welcome message in the browser console once per tab session.
 */
export const ConsoleWelcome = ({ language, theme }: ConsoleWelcomePropsType) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const modeLabel = import.meta.env.DEV ? 'development' : 'production';
    const logStyle = 'font-size: 12px;';
    console.info(
      '%c👋 Welcome to SMAKSS. Curiosity shipped you here; great engineering will take you further. mode=%s | lang=%s | theme=%s | path=%s',
      logStyle,
      modeLabel,
      language,
      theme,
      window.location.pathname,
    );
  }, [language, theme]);

  return null;
};
