import type { ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from 'react-router';
import { AppLayout } from './app/layout/AppLayout';
import { GtmNoScript, GtmScript } from './components/Gtm';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from './constants/language.constants';
import { ErrorState } from './features/errors/ErrorState';
import { i18n } from './i18n';
import { useAppTranslation } from './i18n/use-app-translation.hook';
import stylesheet from './styles/globals.css?url';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from './theme/theme.constants';
import type { ThemeModeType } from './theme/theme.type';
import type { LanguageCodeType } from './types/language.type';
import { resolveLanguageFromHeader } from './utils/language.utils';

type PreferencesType = {
  language: LanguageCodeType;
  theme: ThemeModeType;
};

const parseCookies = ({
  cookieHeader,
}: {
  cookieHeader: string | null;
}): Record<string, string> => {
  if (cookieHeader === null || cookieHeader.trim() === '') {
    return {};
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((accumulator, part) => {
    const [rawKey, ...rawValueParts] = part.trim().split('=');

    if (rawKey === undefined || rawKey === '') {
      return accumulator;
    }

    const value = rawValueParts.join('=');
    accumulator[decodeURIComponent(rawKey)] = decodeURIComponent(value);

    return accumulator;
  }, {});
};

const resolveThemeFromRequest = ({
  cookieValue,
  prefersColorSchemeHeader,
}: {
  cookieValue: string | undefined;
  prefersColorSchemeHeader: string | null;
}): ThemeModeType => {
  if (cookieValue === 'dark' || cookieValue === 'light') {
    return cookieValue;
  }

  if (prefersColorSchemeHeader === 'dark' || prefersColorSchemeHeader === 'light') {
    return prefersColorSchemeHeader;
  }

  return DEFAULT_THEME;
};

const resolveLanguageFromCookie = ({
  value,
}: {
  value: string | undefined;
}): LanguageCodeType | null => {
  if (value === undefined) {
    return null;
  }

  return SUPPORTED_LANGUAGES.includes(value as LanguageCodeType)
    ? (value as LanguageCodeType)
    : null;
};

const serializeCookie = ({ key, value }: { key: string; value: string }): string => {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

const initialThemeScript = `
(() => {
  const hasThemeCookie = document.cookie.split(';').some((item) => item.trim().startsWith('${THEME_STORAGE_KEY}='));

  if (hasThemeCookie) {
    return;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
})();
`;

export const loader = async ({ request }: { request: Request }) => {
  const cookieValues = parseCookies({ cookieHeader: request.headers.get('cookie') });
  const resolvedLanguage =
    resolveLanguageFromCookie({ value: cookieValues[LANGUAGE_STORAGE_KEY] }) ??
    resolveLanguageFromHeader({ acceptLanguage: request.headers.get('accept-language') });
  const resolvedTheme = resolveThemeFromRequest({
    cookieValue: cookieValues[THEME_STORAGE_KEY],
    prefersColorSchemeHeader: request.headers.get('sec-ch-prefers-color-scheme'),
  });

  await i18n.changeLanguage(resolvedLanguage);

  return {
    preferences: {
      language: resolvedLanguage,
      theme: resolvedTheme,
    } satisfies PreferencesType,
  };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const headers = new Headers();

  if (intent === 'set-theme') {
    const nextTheme = formData.get('theme');

    if (nextTheme === 'light' || nextTheme === 'dark') {
      headers.append('Set-Cookie', serializeCookie({ key: THEME_STORAGE_KEY, value: nextTheme }));
    }
  }

  if (intent === 'set-language') {
    const nextLanguage = formData.get('language');

    if (nextLanguage === 'en' || nextLanguage === 'fa') {
      headers.append(
        'Set-Cookie',
        serializeCookie({ key: LANGUAGE_STORAGE_KEY, value: nextLanguage }),
      );
    }
  }

  return new Response(null, { headers, status: 204 });
};

export const links = () => {
  return [
    { href: stylesheet, rel: 'stylesheet' },
    { href: '/site.webmanifest', rel: 'manifest' },
    { href: '/favicon.ico', rel: 'icon' },
    { href: '/favicon-32x32.png', rel: 'icon', sizes: '32x32', type: 'image/png' },
    { href: '/favicon-16x16.png', rel: 'icon', sizes: '16x16', type: 'image/png' },
    { href: '/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180' },
  ];
};

export const meta = () => {
  return [
    { title: 'SMAKSS' },
    {
      name: 'description',
      content:
        'Personal website of Max Kazemi - software engineer focused on frontend platforms and web infrastructure.',
    },
    { name: 'theme-color', content: '#18243b' },
    { property: 'og:site_name', content: 'SMAKSS' },
    { property: 'og:image', content: '/icon.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const loaderData = useRouteLoaderData<typeof loader>('root');
  const language = loaderData?.preferences.language ?? DEFAULT_LANGUAGE;
  const theme = loaderData?.preferences.theme ?? DEFAULT_THEME;
  const gtmContainerId =
    typeof import.meta.env.VITE_GTM_ID === 'string' ? import.meta.env.VITE_GTM_ID : '';
  const hasGtm = import.meta.env.PROD && gtmContainerId !== '';

  return (
    <html
      data-theme={theme}
      dir={language === 'fa' ? 'rtl' : 'ltr'}
      lang={language}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} />
        {hasGtm ? <GtmScript containerId={gtmContainerId} /> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {hasGtm ? <GtmNoScript containerId={gtmContainerId} /> : null}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const Root = ({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) => {
  return <AppLayout initialPreferences={loaderData.preferences} />;
};

/**
 * Handles uncaught route errors with a user-facing fallback surface.
 */
export const ErrorBoundary = () => {
  const error = useRouteError();
  const { t } = useAppTranslation();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <ErrorState
          actionLabel={t('errors.notFound.action')}
          actionTo="/"
          description={t('errors.notFound.description')}
          statusCode={404}
          title={t('errors.notFound.title')}
        />
      );
    }

    return (
      <ErrorState
        actionLabel={t('errors.boundary.action')}
        actionTo="/"
        description={error.statusText || t('errors.boundary.description')}
        statusCode={error.status}
        title={t('errors.boundary.title')}
      />
    );
  }

  return (
    <ErrorState
      actionLabel={t('errors.boundary.action')}
      actionTo="/"
      description={t('errors.boundary.description')}
      title={t('errors.boundary.title')}
    />
  );
};

export default Root;
