import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useFetcher, useLocation } from 'react-router';
import { Box } from '../../components/Box';
import { Button } from '../../components/Button';
import { MobileMenuIcon, SocialIcon, ThemeToggleIcon } from '../../components/Icon';
import { Text } from '../../components/Text';
import '../../i18n';
import { useAppTranslation } from '../../i18n/use-app-translation.hook';
import { THEME_STORAGE_KEY } from '../../theme/theme.constants';
import type { ThemeModeType } from '../../theme/theme.type';
import { resolveNextTheme } from '../../theme/theme.utils';
import { cn } from '../../utils/cn.utils';
import { ROUTE_PATHS } from '../router/router.constants';
import type {
  AppHeaderNavItemType,
  AppHeaderPropsType,
  ChangeLanguageInputType,
} from './app-header.type';
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
 * Applies language and direction metadata to the root document.
 */
const applyDocumentLanguage = ({ language }: ChangeLanguageInputType) => {
  document.documentElement.setAttribute('lang', language);
  document.documentElement.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
};

/**
 * Global header with navigation, social links, theme toggle, and language switcher.
 */
export const AppHeader = ({
  initialPreferences,
  hidePageNavigation = false,
}: AppHeaderPropsType) => {
  const { t, i18n, currentLanguage } = useAppTranslation();
  const preferencesFetcher = useFetcher();
  const location = useLocation();
  const [theme, setTheme] = useState<ThemeModeType>(() => {
    if (typeof document === 'undefined') {
      return initialPreferences.theme;
    }

    const themeFromDom = document.documentElement.getAttribute('data-theme');

    if (themeFromDom === 'light' || themeFromDom === 'dark') {
      return themeFromDom;
    }

    return initialPreferences.theme;
  });
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pinnedLabelId, setPinnedLabelId] = useState<string | null>(null);
  const languageMenuRef = useRef<HTMLElement | null>(null);
  const controlsRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (languageMenuRef.current?.contains(event.target as Node) !== true) {
        setIsLanguageMenuOpen(false);
      }

      if (controlsRef.current?.contains(event.target as Node) !== true) {
        setPinnedLabelId(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLanguageChange = ({ language }: ChangeLanguageInputType): void => {
    applyDocumentLanguage({ language });
    void preferencesFetcher.submit(
      { intent: 'set-language', language },
      { action: ROUTE_PATHS.HOME, method: 'post' },
    );
    void i18n.changeLanguage(language);
  };

  const handleThemeToggle = (): void => {
    const nextTheme = resolveNextTheme({ currentTheme: theme });

    applyDocumentTheme({ theme: nextTheme });
    setTheme(nextTheme);
    void preferencesFetcher.submit(
      { intent: 'set-theme', theme: nextTheme },
      { action: ROUTE_PATHS.HOME, method: 'post' },
    );
  };

  const handleLanguageMenuToggle = (): void => {
    setIsLanguageMenuOpen((currentValue) => !currentValue);
  };

  const handleLanguageSelect = ({ language }: ChangeLanguageInputType): void => {
    handleLanguageChange({ language });
    setIsLanguageMenuOpen(false);
  };

  const nextLanguage = currentLanguage === 'en' ? 'fa' : 'en';

  const handleBrandClick = (): void => {
    if (location.pathname === ROUTE_PATHS.HOME) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
          'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
          hidePageNavigation ? 'mt-1' : 'mt-4',
        )}
      >
        <Box className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
          <Link
            className="font-medium tracking-tight"
            onClick={handleBrandClick}
            to={ROUTE_PATHS.HOME}
          >
            {t('brand')}
          </Link>

          {!hidePageNavigation ? (
            <Button
              aria-controls="mobile-primary-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={mobileMenuLabel}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-(--card-border) bg-(--card-bg) px-3 text-xs font-medium text-(--foreground) shadow-sm sm:hidden"
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

        <Box
          className="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto md:flex-nowrap md:gap-3"
          ref={controlsRef}
        >
          <Box className="flex flex-wrap items-center justify-end gap-1.5">
            {SOCIAL_LINKS.map((item) => {
              const tooltipId = `social-${item.id}`;
              const isPinned = pinnedLabelId === tooltipId;

              return (
                <Box as="div" className="group relative inline-flex" key={item.id}>
                  <Text
                    as="span"
                    className={`pointer-events-none absolute left-1/2 -top-7 -translate-x-1/2 whitespace-nowrap rounded-full border border-(--card-border) bg-(--card-bg) px-2 py-0.5 text-[11px] font-medium tracking-wide text-(--foreground) shadow-sm transition duration-300 ${
                      isPinned
                        ? 'opacity-100 -translate-y-0.5'
                        : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:-translate-y-0.5'
                    }`}
                  >
                    {t(item.labelKey)}
                  </Text>
                  <Button
                    aria-label={t(item.labelKey)}
                    className="size-9 p-0"
                    href={item.href}
                    rel="noreferrer"
                    size="none"
                    target="_blank"
                    title={t(item.labelKey)}
                    variant="icon"
                    onClick={() => {
                      setPinnedLabelId(tooltipId);
                    }}
                  >
                    <SocialIcon id={item.id} />
                  </Button>
                </Box>
              );
            })}
          </Box>

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

          <Box className="group relative min-w-24" ref={languageMenuRef}>
            <Button
              aria-expanded={isLanguageMenuOpen}
              aria-haspopup="listbox"
              aria-label={t('language.label')}
              className={`relative z-10 inline-flex h-9 w-full items-center justify-center border border-(--card-border) bg-(--picker-bg) px-4 text-xs font-medium text-(--foreground) transition ${
                isLanguageMenuOpen
                  ? 'rounded-t-[1.25rem] rounded-b-[0.6rem]'
                  : 'rounded-full shadow-sm'
              }`}
              onClick={() => {
                handleLanguageMenuToggle();
              }}
              size="none"
              variant="unstyled"
            >
              {currentLanguage === 'fa' ? (
                <Text as="span" className="font-fa">
                  فارسی
                </Text>
              ) : (
                'English'
              )}
            </Button>

            <Box
              className={`absolute left-0 top-[calc(100%-0.95rem)] z-0 w-full rounded-b-[1.25rem] rounded-t-none bg-(--picker-bg) px-2 pb-2 pt-4 shadow-sm transition ${
                isLanguageMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
              }`}
              role="listbox"
            >
              <Box className="mx-3 mb-1.5 h-px bg-(--card-border)/70" />
              <Button
                aria-selected={false}
                className="w-full rounded-xl border-none px-2 py-2.5 text-center text-xs text-(--muted-foreground) transition hover:font-semibold hover:text-(--foreground)"
                onClick={() => {
                  handleLanguageSelect({ language: nextLanguage });
                }}
                role="option"
                size="none"
                variant="unstyled"
              >
                {nextLanguage === 'fa' ? (
                  <Text as="span" className="font-fa text-base">
                    فارسی
                  </Text>
                ) : (
                  <Text as="span" className="text-base">
                    English
                  </Text>
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {!hidePageNavigation ? (
        <Box
          className={cn(
            'overflow-hidden transition-all duration-300 sm:hidden',
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
