import { ROUTE_PATHS } from '@app/router/router.constants';
import { Box } from '@components/Box';
import { Select } from '@components/Select';
import { Text } from '@components/Text';
import type { DailyQuoteType } from '@features/home/quote.type';
import { useDailyQuote } from '@features/home/use-daily-quote.hook';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { Link, useFetcher } from 'react-router';

const applyDocumentLanguage = ({ language }: { language: 'en' | 'fa' }): void => {
  document.documentElement.setAttribute('lang', language);
  document.documentElement.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
};

/**
 * Persistent site footer with the daily signal and global identity controls.
 */
export const AppFooter = ({ initialQuote }: { initialQuote: DailyQuoteType | null }) => {
  const { t, i18n, currentLanguage } = useAppTranslation();
  const preferencesFetcher = useFetcher();
  const quote = useDailyQuote({ initialValue: initialQuote });
  const quoteValue = quote.value;
  const hasQuoteDetails = !quote.isLoading && !quote.hasError && quoteValue !== null;

  const handleLanguageChange = (language: 'en' | 'fa'): void => {
    applyDocumentLanguage({ language });
    void preferencesFetcher.submit(
      { intent: 'set-language', language },
      { action: ROUTE_PATHS.HOME, method: 'post' },
    );
    void i18n.changeLanguage(language);
  };

  let quoteContent = t('quote.unavailable');

  if (quote.isLoading) {
    quoteContent = t('quote.loading');
  } else if (hasQuoteDetails) {
    quoteContent = `“${quoteValue.content}”`;
  }

  return (
    <Box as="footer" aria-label={t('footer.label')} className="site-footer">
      <Box className="site-footer-inner mx-auto w-full max-w-6xl px-6 md:px-10">
        <Link className="site-footer-brand" to={ROUTE_PATHS.HOME}>
          {t('brand')}
        </Link>

        <Box className="site-footer-signal">
          <Text as="p" className="site-footer-quote">
            {quoteContent}
          </Text>
          {hasQuoteDetails ? (
            <Text as="p" className="site-footer-author">
              — {quoteValue.author}
            </Text>
          ) : null}
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
