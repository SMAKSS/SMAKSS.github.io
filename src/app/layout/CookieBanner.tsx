import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { useEffect, useState } from 'react';
import { COOKIE_BANNER_STORAGE_KEY } from './cookie-banner.constants';

/**
 * Displays a dismissible cookie notice and persists acceptance in local storage.
 */
export const CookieBanner = () => {
  const { t } = useAppTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissedValue = window.localStorage.getItem(COOKIE_BANNER_STORAGE_KEY);

    if (dismissedValue !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = (): void => {
    window.localStorage.setItem(COOKIE_BANNER_STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      as="section"
      className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[min(92vw,48rem)] rounded-2xl border border-(--card-border) bg-(--picker-bg)/95 p-4 shadow-lg backdrop-blur"
    >
      <Box className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Text as="p" className="text-sm leading-relaxed text-(--foreground)/90">
          {t('cookieBanner.message')}
        </Text>
        <Button className="h-9 px-4" onClick={handleDismiss} variant="outline">
          {t('cookieBanner.dismiss')}
        </Button>
      </Box>
    </Box>
  );
};
