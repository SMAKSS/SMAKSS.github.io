import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useFetcher, useLocation } from 'react-router';
import { Box } from '../../components/Box';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import '../../i18n';
import { useAppTranslation } from '../../i18n/use-app-translation.hook';
import type { ThemeModeType } from '../../theme/theme.type';
import { resolveNextTheme } from '../../theme/theme.utils';
import { cn } from '../../utils/cn.utils';
import { ROUTE_PATHS } from '../router/router.constants';
import type {
  AppHeaderPropsType,
  ChangeLanguageInputType,
  SocialLinkType,
  ThemeToggleIconPropsType,
} from './app-header.type';
import { SOCIAL_LINKS } from './social.constants';

/**
 * Renders the icon used by the theme toggle based on active mode.
 */
const ThemeToggleIcon = ({ theme }: ThemeToggleIconPropsType) => {
  if (theme === 'dark') {
    return (
      <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 4V2M12 22v-2M4 12H2M22 12h-2M6.34 6.34 4.93 4.93M19.07 19.07l-1.41-1.41M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3c-.1.65-.16 1.31-.16 2a9 9 0 0 0 9 9c.69 0 1.35-.06 2-.21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
};

/**
 * Resolves the social icon associated with a social link identifier.
 */
const SocialIcon = ({ id }: Pick<SocialLinkType, 'id'>) => {
  if (id === 'github') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.91c-2.78.61-3.37-1.34-3.37-1.34a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83 2.13 2.13 0 0 1 .64-1.34c-2.22-.25-4.55-1.11-4.55-4.95a3.88 3.88 0 0 1 1.03-2.69 3.61 3.61 0 0 1 .1-2.65s.84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02a3.61 3.61 0 0 1 .1 2.65 3.88 3.88 0 0 1 1.03 2.69c0 3.85-2.34 4.7-4.57 4.95a2.4 2.4 0 0 1 .68 1.86V21c0 .27.18.58.69.49A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (id === 'linkedin') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5A2.5 2.5 0 0 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V21h-4v-5.48c0-1.31-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21h-4V9Z" />
      </svg>
    );
  }

  if (id === 'stackoverflow') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.57 20.2v-5.75h1.92V22H4.26v-7.55h1.92v5.75h11.4Zm-9.47-1.91h7.53v-1.91H8.1v1.9Zm.1-4.34 7.38 1.55.4-1.88-7.4-1.56-.38 1.9Zm.97-3.52 6.85 3.2.82-1.74L9.99 8.7l-.82 1.73Zm1.9-3.35 5.8 4.83 1.23-1.48-5.8-4.84-1.23 1.5Zm3.74-3.82-1.56 1.12 4.43 6.14 1.56-1.12-4.43-6.14Z" />
      </svg>
    );
  }

  if (id === 'npm') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2 8v8h10v2h10V8H2Zm2 2h6v4H4v-4Zm8 0h4v6h-4v-6Zm6 0h2v6h-2v-6Z" />
      </svg>
    );
  }

  if (id === 'hackernoon') {
    return (
      <svg aria-hidden className="size-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h3.3l4.4 7.3V4H15v16h-3.2L7.2 12.4V20H4V4Zm12.6 0H20c0 5-3.1 8-7.8 8V8.8c2.5-.2 4.4-1.8 4.4-4.8Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 7.5 12 13l8-5.5M5 18h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
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
  const [theme, setTheme] = useState<ThemeModeType>(initialPreferences.theme);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [pinnedLabelId, setPinnedLabelId] = useState<string | null>(null);
  const languageMenuRef = useRef<HTMLElement | null>(null);
  const controlsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const themeFromDom = document.documentElement.getAttribute('data-theme');

    if (themeFromDom === 'light' || themeFromDom === 'dark') {
      setTheme(themeFromDom);
    }
  }, []);

  useEffect(() => {
    if (initialPreferences.language !== currentLanguage) {
      void i18n.changeLanguage(initialPreferences.language);
    }
  }, [currentLanguage, i18n, initialPreferences.language]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLanguage);
    document.documentElement.setAttribute('dir', currentLanguage === 'fa' ? 'rtl' : 'ltr');
  }, [currentLanguage]);

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
    void preferencesFetcher.submit(
      { intent: 'set-language', language },
      { action: ROUTE_PATHS.HOME, method: 'post' },
    );
    void i18n.changeLanguage(language);
  };

  const handleThemeToggle = (): void => {
    const nextTheme = resolveNextTheme({ currentTheme: theme });

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
          className="flex min-h-10 items-end justify-center gap-1.5 overflow-visible pb-1 md:gap-2.5"
          role="navigation"
        >
          <NavLink
            aria-label={t('nav.home')}
            className="group relative inline-flex shrink-0 items-center"
            end
            to={ROUTE_PATHS.HOME}
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
                  {t('nav.home')}
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

          <NavLink
            aria-label={t('nav.about')}
            className="group relative inline-flex shrink-0 items-center"
            to={ROUTE_PATHS.ABOUT}
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
                  {t('nav.about')}
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

          <NavLink
            aria-label={t('nav.playground')}
            className="group relative inline-flex shrink-0 items-center"
            to={ROUTE_PATHS.PLAYGROUND}
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
                  {t('nav.playground')}
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

          <NavLink
            aria-label={t('nav.tools')}
            className="group relative inline-flex shrink-0 items-center"
            prefetch="intent"
            to={ROUTE_PATHS.TOOLS}
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
                  {t('nav.tools')}
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
        </Box>
      </Box>

      <Box
        className={cn('flex items-center justify-between', hidePageNavigation ? 'mt-1' : 'mt-4')}
      >
        <Link
          className="font-medium tracking-tight"
          onClick={handleBrandClick}
          to={ROUTE_PATHS.HOME}
        >
          {t('brand')}
        </Link>

        <Box className="flex items-center gap-2 md:gap-3" ref={controlsRef}>
          <Box className="flex items-center gap-1.5">
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
    </Box>
  );
};
