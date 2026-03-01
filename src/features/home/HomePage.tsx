import { ROUTE_PATHS } from '@app/router/router.constants';
import { Box } from '@components/Box';
import { Text } from '@components/Text';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { Link } from 'react-router';
import { HomeCommunityContributionSlider } from './HomeCommunityContributionSlider';
import type { HomePagePropsType } from './home-page.type';
import { useDailyQuote } from './use-daily-quote.hook';

/**
 * Renders the landing page hero and daily quote module.
 */
export const HomePage = ({
  communityContributionFeedsPromise,
  initialQuote,
}: HomePagePropsType) => {
  const { t } = useAppTranslation();
  const quote = useDailyQuote({ initialValue: initialQuote });
  const quoteValue = quote.value;
  const hasQuoteDetails = !quote.isLoading && !quote.hasError && quoteValue !== null;

  let quoteContent = t('quote.unavailable');

  if (quote.isLoading) {
    quoteContent = t('quote.loading');
  } else if (hasQuoteDetails) {
    quoteContent = `“${quoteValue.content}”`;
  }

  return (
    <Box as="main" className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pt-8 md:px-10">
      <Box as="section" className="grid gap-10 md:grid-cols-[1.25fr_0.95fr] md:items-end">
        <Box>
          <Text
            as="h1"
            className="max-w-5xl text-5xl leading-[1.06] tracking-tight md:text-7xl"
            tone="muted"
            weight="medium"
          >
            {t('hero.intro')}{' '}
            <Text as="span" className="text-(--foreground)" weight="medium">
              {t('hero.name')}
            </Text>
          </Text>
          <Text
            as="p"
            className="mt-8 max-w-3xl text-xl leading-relaxed md:text-3xl"
            tone="muted"
            weight="semibold"
          >
            {t('hero.subtitle')}
          </Text>
          <Box className="mt-8">
            <Link
              className="rounded-full border border-(--card-border) px-6 py-3 text-sm font-medium transition hover:border-(--accent) hover:text-(--accent)"
              to={ROUTE_PATHS.ABOUT}
            >
              {t('hero.secondaryCta')}
            </Link>
          </Box>
        </Box>

        <Box
          as="aside"
          aria-label={t('quote.eyebrow')}
          className="relative border-s-2 border-(--card-border) ps-6"
        >
          <Text as="p" className="uppercase tracking-[0.16em] text-(--accent)" size="xs">
            {t('quote.eyebrow')}
          </Text>
          <Text as="p" className="mt-3 leading-relaxed md:text-sm" size="xs">
            {quoteContent}
          </Text>
          {hasQuoteDetails ? (
            <Text as="p" className="mt-3" size="xs" tone="muted">
              — {quoteValue.author} · {t('quote.sourceApi')}
            </Text>
          ) : null}
        </Box>
      </Box>

      <HomeCommunityContributionSlider
        communityContributionFeedsPromise={communityContributionFeedsPromise}
      />
    </Box>
  );
};
