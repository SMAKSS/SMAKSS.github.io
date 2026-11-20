import { ROUTE_PATHS } from '@app/router/router.constants';
import { Box } from '@components/Box';
import { Select } from '@components/Select';
import { Text } from '@components/Text';
import type { UseDailyQuoteInputType } from '@features/home/quote.type';
import { useDailyQuote } from '@features/home/use-daily-quote.hook';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { Suspense } from 'react';
import { Await, Link, useFetcher } from 'react-router';
import type { AppFooterPropsType } from './app-layout.type';

const applyDocumentLanguage = ({ language }: { language: 'en' | 'fa' }): void => {
  document.documentElement.setAttribute('lang', language);
  document.documentElement.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
};

const FooterQuote = ({ initialValue }: UseDailyQuoteInputType) => {
  const { t } = useAppTranslation();
  const { value } = useDailyQuote({ initialValue });

  return (
    <>
      <Text as="p" className="site-footer-quote">
        {value === null ? t('quote.unavailable') : `“${value.content}”`}
      </Text>
      {value === null ? null : (
        <Text as="p" className="site-footer-author">
          — {value.author}
        </Text>
      )}
    </>
  );
};

/**
 * Persistent site footer with the daily signal and global identity controls.
 */
export const AppFooter = ({ quotePromise }: AppFooterPropsType) => {
  const { t, i18n, currentLanguage } = useAppTranslation();
  const preferencesFetcher = useFetcher();

  const handleLanguageChange = (language: 'en' | 'fa'): void => {
    applyDocumentLanguage({ language });
    void preferencesFetcher.submit(
      { intent: 'set-language', language },
      { action: ROUTE_PATHS.HOME, method: 'post' },
    );
    void i18n.changeLanguage(language);
  };

  return (
    <Box as="footer" aria-label={t('footer.label')} className="site-footer">
      <Box className="site-footer-inner mx-auto w-full max-w-6xl px-6 md:px-10">
        <Link className="site-footer-brand" to={ROUTE_PATHS.HOME}>
          {t('brand')}
        </Link>

        <Box aria-live="polite" className="site-footer-signal">
          <Suspense
            fallback={
              <Text as="p" className="site-footer-quote">
                {t('quote.loading')}
              </Text>
            }
          >
            <Await errorElement={<FooterQuote initialValue={null} />} resolve={quotePromise}>
              {(quote) => <FooterQuote initialValue={quote} />}
            </Await>
          </Suspense>
        </Box>

        <Box className="site-footer-tools">
          <Select
            id="site-language-picker"
            label={t('language.label')}
            labelClassName="sr-only"
            onChange={(event) => {
              handleLanguageChange(event.currentTarget.value as 'en' | 'fa');
            }}
            options={[
              { label: 'English', value: 'en' },
              { label: <span className="font-fa">فارسی</span>, value: 'fa' },
            ]}
            selectClassName="site-language-picker"
            value={currentLanguage}
            variant="compact"
          />
        </Box>
      </Box>
    </Box>
  );
};
