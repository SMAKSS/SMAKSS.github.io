import {
  type ActionFunctionArgs,
  isRouteErrorResponse,
  Links,
  type LoaderFunctionArgs,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from 'react-router';
import { AppLayout } from './app/layout/AppLayout';
import { GtmNoScript, GtmScript } from './components/Gtm';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from './constants/language.constants';
import { ErrorState } from './features/errors/ErrorState';
import { i18n } from './i18n';
import { useAppTranslation } from './i18n/use-app-translation.hook';
import type { PreferencesType, RootLayoutPropsType, RootRoutePropsType } from './root.type';
import {
  parseCookies,
  resolveLanguageFromCookie,
  resolveThemeFromRequest,
  serializeCookie,
} from './root.utils';
import stylesheet from './styles/globals.css?url';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from './theme/theme.constants';
import { resolveLanguageFromHeader } from './utils/language.utils';

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

const initialThemeStyle = `
:root {
  color-scheme: light dark;
  --initial-background: #ffffff;
  --initial-foreground: #18243b;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --initial-background: #18243b;
    --initial-foreground: #f2f5fb;
  }
}

:root[data-theme='dark'] {
  --initial-background: #18243b;
  --initial-foreground: #f2f5fb;
}

:root[data-theme='light'] {
  --initial-background: #ffffff;
  --initial-foreground: #18243b;
}

html,
body {
  background: var(--initial-background);
  color: var(--initial-foreground);
}
`;

/**
 * Resolves root-level language/theme preferences and syncs i18n state.
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieValues = parseCookies({ cookieHeader: request.headers.get('cookie') });
  const cookieLanguage = resolveLanguageFromCookie({
    value: cookieValues[LANGUAGE_STORAGE_KEY],
  });
  const resolvedLanguage =
    cookieLanguage ??
    resolveLanguageFromHeader({ acceptLanguage: request.headers.get('accept-language') });
  const resolvedTheme = resolveThemeFromRequest({
    cookieValue: cookieValues[THEME_STORAGE_KEY],
    prefersColorSchemeHeader: request.headers.get('sec-ch-prefers-color-scheme'),
  });

  await i18n.changeLanguage(resolvedLanguage);

  return {
    preferences: {
      language: resolvedLanguage,
      theme: resolvedTheme ?? DEFAULT_THEME,
    } satisfies PreferencesType,
    documentTheme: resolvedTheme,
  };
};

/**
 * Persists root-level preference changes sent from interactive controls.
 */
export const action = async ({ request }: ActionFunctionArgs) => {
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

/**
 * Requests the browser color-scheme client hint for server-side theme resolution.
 */
export const headers = () => {
  return {
    'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
    'Critical-CH': 'Sec-CH-Prefers-Color-Scheme',
    Vary: 'Sec-CH-Prefers-Color-Scheme',
  };
};

/**
 * Registers global assets loaded by the root document.
 */
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

/**
 * Defines baseline SEO metadata for all routes.
 */
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

/**
 * Renders the shared HTML document shell.
 */
export const Layout = ({ children }: RootLayoutPropsType) => {
  const loaderData = useRouteLoaderData<typeof loader>('root');
  const language = loaderData?.preferences.language ?? DEFAULT_LANGUAGE;
  const theme = loaderData?.documentTheme;
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
        <meta content="light dark" name="color-scheme" />
        <style dangerouslySetInnerHTML={{ __html: initialThemeStyle }} />
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

const Root = ({ loaderData }: RootRoutePropsType) => {
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
