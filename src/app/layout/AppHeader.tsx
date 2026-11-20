import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { MobileMenuIcon, SocialIcon, ThemeToggleIcon } from '@components/Icon';
import { Text } from '@components/Text';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { THEME_STORAGE_KEY } from '@theme/theme.constants';
import type { ThemeModeType } from '@theme/theme.type';
import { resolveNextTheme } from '@theme/theme.utils';
import { cn } from '@utils/cn.utils';
import { useEffect, useState } from 'react';
import { NavLink, useFetcher, useLocation } from 'react-router';
import { ROUTE_PATHS } from '../router/router.constants';
import type { AppHeaderNavItemType, AppHeaderPropsType } from './app-header.type';
import { SOCIAL_LINKS } from './social.constants';

const NAV_ITEMS: AppHeaderNavItemType[] = [
  { key: 'home', to: ROUTE_PATHS.HOME, end: true },
  { key: 'about', to: ROUTE_PATHS.ABOUT },
  { key: 'playground', to: ROUTE_PATHS.PLAYGROUND },
  { key: 'tools', to: ROUTE_PATHS.TOOLS, prefetch: 'intent' },
];

/**
 * Applies the resolved theme to the root document.
 */
const applyDocumentTheme = ({ theme }: { theme: ThemeModeType }) => {
  document.documentElement.setAttribute('data-theme', theme);
};

/**
 * Global header with primary navigation, social links, and the theme toggle.
 */
export const AppHeader = ({
  initialPreferences,
  hidePageNavigation = false,
}: AppHeaderPropsType) => {
  const { t } = useAppTranslation();
  const preferencesFetcher = useFetcher();
  const location = useLocation();
  const [theme, setTheme] = useState<ThemeModeType>(initialPreferences.theme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const hasThemeCookie = document.cookie
      .split(';')
      .some((item) => item.trim().startsWith(`${THEME_STORAGE_KEY}=`));

    if (hasThemeCookie || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (event: MediaQueryListEvent | MediaQueryList): void => {
      const nextTheme = event.matches ? 'dark' : 'light';

      applyDocumentTheme({ theme: nextTheme });
      setTheme(nextTheme);
    };

    handleThemeChange(mediaQueryList);
    mediaQueryList.addEventListener('change', handleThemeChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleThemeToggle = (): void => {
    const nextTheme = resolveNextTheme({ currentTheme: theme });

    applyDocumentTheme({ theme: nextTheme });
    setTheme(nextTheme);
    void preferencesFetcher.submit(
      { intent: 'set-theme', theme: nextTheme },
      { action: ROUTE_PATHS.HOME, method: 'post' },
    );
  };

  const navLabelClassName =
    'pointer-events-none absolute left-1/2 -top-7 -translate-x-1/2 whitespace-nowrap rounded-full border border-(--card-border) bg-(--card-bg) px-2 py-0.5 text-[11px] font-medium tracking-wide text-(--foreground) shadow-sm transition duration-300';
  const navPillClassName =
    'h-2.5 w-24 rounded-full border border-(--card-border) transition md:w-28';
  const mobileMenuLabel = isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu');

  return (
    <Box as="header" className="mx-auto w-full max-w-6xl px-6 pt-10 md:px-10">
      <Box
        aria-hidden={hidePageNavigation}
        className={cn(
          'origin-top transition-all duration-500 ease-in-out',
          hidePageNavigation
            ? 'max-h-0 -translate-y-2 overflow-hidden opacity-0'
            : 'max-h-28 translate-y-0 overflow-visible opacity-100',
        )}
      >
        <Box
          as="nav"
          aria-label={t('nav.label')}
          className="hidden min-h-10 items-end justify-center gap-1.5 overflow-visible pb-1 md:flex md:gap-2.5"
          role="navigation"
        >
          {NAV_ITEMS.map((item) => {
            const label = t(`nav.${item.key}`);

            return (
              <NavLink
                aria-label={label}
                className="group relative inline-flex shrink-0 items-center"
                end={item.end}
                key={item.key}
                prefetch={item.prefetch}
                to={item.to}
              >
                {({ isActive }) => (
                  <>
                    <Text
                      as="span"
                      className={cn(
                        navLabelClassName,
                        isActive
                          ? 'opacity-100 -translate-y-0.5'
                          : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:-translate-y-0.5 group-focus-within:opacity-100 group-focus-within:-translate-y-0.5',
                      )}
                    >
                      {label}
                    </Text>
                    <Box
                      as="span"
                      className={cn(
                        navPillClassName,
                        isActive
                          ? 'border-(--foreground) bg-(--foreground)'
                          : 'bg-transparent group-hover:border-(--accent)',
                      )}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </Box>
      </Box>

      <Box
        className={cn(
          'flex items-center justify-between gap-4',
          hidePageNavigation ? 'mt-1' : 'mt-4',
        )}
      >
        <Box className="flex items-center gap-3">
          {!hidePageNavigation ? (
            <Button
              aria-controls="mobile-primary-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={mobileMenuLabel}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-(--card-border) bg-(--card-bg) px-3 text-xs font-medium text-(--foreground) shadow-sm md:hidden"
              onClick={() => {
                setIsMobileMenuOpen((currentValue) => !currentValue);
              }}
              size="none"
              variant="unstyled"
            >
              <MobileMenuIcon isOpen={isMobileMenuOpen} />
              <Text as="span">{mobileMenuLabel}</Text>
            </Button>
          ) : null}
        </Box>

        <Box className="flex items-center justify-end gap-2">
          {SOCIAL_LINKS.map((item) => (
            <Button
              aria-label={t(item.labelKey)}
              className="size-9 p-0"
              href={item.href}
              key={item.id}
              rel="noreferrer"
              size="none"
              target="_blank"
              title={t(item.labelKey)}
              variant="icon"
            >
              <SocialIcon id={item.id} />
            </Button>
          ))}
          <Box className="group relative inline-flex">
            <Button
              aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
              className="size-9 p-0"
              onClick={() => {
                handleThemeToggle();
              }}
              size="none"
              title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
              variant="icon"
            >
              <ThemeToggleIcon theme={theme} />
            </Button>
          </Box>
        </Box>
      </Box>

      {!hidePageNavigation ? (
        <Box
          inert={!isMobileMenuOpen}
          className={cn(
            'overflow-hidden transition-all duration-300 md:hidden',
            isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <Box
            as="nav"
            aria-label={t('nav.label')}
            className="mt-4 rounded-3xl border border-(--card-border) bg-(--card-bg) px-4 py-3 shadow-sm backdrop-blur-sm"
            id="mobile-primary-navigation"
            role="navigation"
          >
            <Box className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const label = t(`nav.${item.key}`);

                return (
                  <NavLink end={item.end} key={item.key} prefetch={item.prefetch} to={item.to}>
                    {({ isActive }) => (
                      <Box
                        className={cn(
                          'flex items-center justify-between border-b border-(--card-border)/70 py-3 text-sm transition last:border-b-0',
                          isActive ? 'text-(--foreground)' : 'text-(--muted-foreground)',
                        )}
                      >
                        <Text as="span" weight="medium">
                          {label}
                        </Text>
                        <Box
                          as="span"
                          className={cn(
                            'h-1.5 w-6 rounded-full transition',
                            isActive ? 'bg-(--foreground)' : 'bg-(--card-border)',
                          )}
                        />
                      </Box>
                    )}
                  </NavLink>
                );
              })}
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
