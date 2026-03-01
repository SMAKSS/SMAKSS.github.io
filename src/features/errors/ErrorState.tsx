import { Box } from '@components/Box';
import { Text } from '@components/Text';
import { Link } from 'react-router';
import type { ErrorStatePropsType } from './error-state.type';

/**
 * Shared error-state surface used by route-level and root-level failures.
 */
export const ErrorState = ({
  actionLabel,
  actionTo,
  description,
  statusCode,
  title,
}: ErrorStatePropsType) => {
  return (
    <Box
      as="section"
      aria-live="polite"
      className="mx-auto w-full max-w-3xl px-6 py-16 md:px-10 md:py-24"
    >
      <Box
        background="surface"
        border="default"
        className="space-y-5 shadow-[0_14px_34px_rgba(24,36,59,0.08)]"
        padding="lg"
        radius="xl"
      >
        {statusCode !== undefined ? (
          <Text
            as="p"
            className="tracking-[0.18em] uppercase"
            size="sm"
            tone="muted"
            weight="semibold"
          >
            {statusCode}
          </Text>
        ) : null}

        <Text as="h1" className="text-3xl tracking-tight md:text-4xl" weight="semibold">
          {title}
        </Text>

        <Text as="p" className="leading-relaxed" tone="subtle">
          {description}
        </Text>

        <Link
          className="inline-flex rounded-lg border border-(--card-border) bg-(--picker-bg) px-4 py-2 text-sm font-semibold text-(--foreground) transition hover:border-(--accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)"
          to={actionTo}
        >
          {actionLabel}
        </Link>
      </Box>
    </Box>
  );
};
