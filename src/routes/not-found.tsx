import { ErrorState } from '@features/errors/ErrorState';
import { useAppTranslation } from '@i18n/use-app-translation.hook';

/**
 * Builds SEO metadata for the not-found route.
 */
export const meta = () => {
  const title = '404 | SMAKSS';
  const description = 'The requested page was not found.';

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'SMAKSS' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: '/icon.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: '/icon.png' },
  ];
};

/**
 * Renders the application not-found route.
 */
const NotFoundRoute = () => {
  const { t } = useAppTranslation();

  return (
    <ErrorState
      actionLabel={t('errors.notFound.action')}
      actionTo="/"
      description={t('errors.notFound.description')}
      statusCode={404}
      title={t('errors.notFound.title')}
    />
  );
};

export default NotFoundRoute;
