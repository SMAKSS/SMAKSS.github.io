import { useEffect, useMemo, useState } from 'react';

import { Box } from '../../components/Box';
import { PlaygroundTabs } from '../../components/PlaygroundTabs';
import { SurfaceCard } from '../../components/SurfaceCard';
import { Text } from '../../components/Text';
import { useAppTranslation } from '../../i18n/use-app-translation.hook';
import type { ToolsPlaygroundPagePropsType } from './tools-playground.type';

/**
 * Renders the tools playground with per-package metadata and optional sandbox previews.
 */
export const ToolsPlaygroundPage = ({ items }: ToolsPlaygroundPagePropsType) => {
  const { t, currentLocale } = useAppTranslation();
  const introParagraphs = t('playground.intro').split('\n\n');
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(currentLocale, {
      dateStyle: 'medium',
    });
  }, [currentLocale]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    if (activeToolIndex > items.length - 1) {
      setActiveToolIndex(0);
    }
  }, [activeToolIndex, items.length]);

  const activeItem = items[activeToolIndex] ?? null;

  return (
    <Box as="section" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-8 md:px-10">
      <Box as="section" className="space-y-5" id="tools-playground">
        <Box className="space-y-4 text-base leading-relaxed text-(--muted-foreground) md:text-lg">
          {introParagraphs.map((paragraph) => {
            return (
              <Text as="p" key={paragraph}>
                {paragraph}
              </Text>
            );
          })}
        </Box>

        {items.length === 0 || activeItem === null ? (
          <Text as="p" className="text-sm text-(--muted-foreground)">
            {t('playground.unavailable')}
          </Text>
        ) : (
          <SurfaceCard className="space-y-4">
            <PlaygroundTabs
              activeIndex={activeToolIndex}
              items={items.map((item) => ({ id: item.npmUrl, label: item.name }))}
              onSelect={({ index }) => {
                setActiveToolIndex(index);
              }}
            />

            <Box as="article" className="space-y-4 mt-4" role="tabpanel">
              <Box className="space-y-2 border-b border-(--card-border) pb-4">
                <Text as="p" className="text-sm text-(--muted-foreground)">
                  {activeItem.description}
                </Text>
                <Box className="flex flex-wrap items-center gap-2 text-xs text-(--muted-foreground)">
                  {activeItem.version === null ? null : (
                    <Box as="span" className="rounded-full bg-(--picker-bg) px-2.5 py-1">
                      {t('playground.version')}: {activeItem.version}
                    </Box>
                  )}
                  {activeItem.publishedAt === null ? null : (
                    <Box as="span" className="rounded-full bg-(--picker-bg) px-2.5 py-1">
                      {t('playground.published')}:{' '}
                      {dateFormatter.format(new Date(activeItem.publishedAt))}
                    </Box>
                  )}
                  {activeItem.license === null ? null : (
                    <Box as="span" className="rounded-full bg-(--picker-bg) px-2.5 py-1">
                      {t('playground.license')}: {activeItem.license}
                    </Box>
                  )}
                </Box>
              </Box>

              {activeItem.sandboxUrl === null ? (
                <Text as="p" className="text-sm text-(--muted-foreground)">
                  {t('playground.sandboxUnavailable')}
                </Text>
              ) : (
                <iframe
                  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                  className="h-[32rem] w-full rounded-xl border border-(--card-border) bg-white"
                  loading="lazy"
                  src={activeItem.sandboxUrl}
                  title={`Sandbox for ${activeItem.name}`}
                />
              )}
            </Box>
          </SurfaceCard>
        )}
      </Box>
    </Box>
  );
};
