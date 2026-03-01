import { Box } from '@components/Box';
import { PlaygroundPageShell } from '@components/PlaygroundPageShell';
import { Text } from '@components/Text';
import type { ToolsPlaygroundPagePropsType } from '@features/tools/tools-playground.type';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { useMemo } from 'react';

/**
 * Renders the tools playground with per-package metadata and optional sandbox previews.
 */
export const ToolsPlaygroundPage = ({ items }: ToolsPlaygroundPagePropsType) => {
  const { t, currentLocale } = useAppTranslation();
  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(currentLocale, {
      dateStyle: 'medium',
    });
  }, [currentLocale]);
  const tabItems = items.map((item) => ({ ...item, id: item.npmUrl, label: item.name }));

  return (
    <PlaygroundPageShell
      emptyState={
        <Text as="p" className="text-sm text-(--muted-foreground)">
          {t('playground.unavailable')}
        </Text>
      }
      intro={t('playground.intro')}
      items={tabItems}
      renderPanel={(item) => {
        return (
          <>
            <Box className="space-y-2 border-b border-(--card-border) pb-4">
              <Text as="p" className="text-sm text-(--muted-foreground)">
                {item.description}
              </Text>
              <Box className="flex flex-wrap items-center gap-2 text-xs text-(--muted-foreground)">
                {item.version === null ? null : (
                  <Box as="span" className="rounded-full bg-(--picker-bg) px-2.5 py-1">
                    {t('playground.version')}: {item.version}
                  </Box>
                )}
                {item.publishedAt === null ? null : (
                  <Box as="span" className="rounded-full bg-(--picker-bg) px-2.5 py-1">
                    {t('playground.published')}: {dateFormatter.format(new Date(item.publishedAt))}
                  </Box>
                )}
                {item.license === null ? null : (
                  <Box as="span" className="rounded-full bg-(--picker-bg) px-2.5 py-1">
                    {t('playground.license')}: {item.license}
                  </Box>
                )}
              </Box>
            </Box>

            {item.sandboxUrl === null ? (
              <Text as="p" className="text-sm text-(--muted-foreground)">
                {t('playground.sandboxUnavailable')}
              </Text>
            ) : (
              <iframe
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                className="h-[32rem] w-full rounded-xl border border-(--card-border) bg-white"
                loading="lazy"
                src={item.sandboxUrl}
                title={`Sandbox for ${item.name}`}
              />
            )}
          </>
        );
      }}
      sectionId="tools-playground"
    />
  );
};
