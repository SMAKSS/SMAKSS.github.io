import { Box } from '@components/Box';
import { PlaygroundTabs } from '@components/PlaygroundTabs';
import { SurfaceCard } from '@components/SurfaceCard';
import { Text } from '@components/Text';
import type {
  PlaygroundPageShellItemType,
  PlaygroundPageShellOutputType,
  PlaygroundPageShellPropsType,
} from '@components/playground-page-shell.type';
import { cn } from '@utils/cn.utils';
import { useEffect, useState } from 'react';

/**
 * Renders the shared section, intro copy, tabs, and active panel for playground routes.
 */
export const PlaygroundPageShell = <ItemType extends PlaygroundPageShellItemType>({
  emptyState = null,
  intro,
  items,
  panelClassName,
  renderPanel,
  sectionId,
}: PlaygroundPageShellPropsType<ItemType>): PlaygroundPageShellOutputType => {
  const [activeIndex, setActiveIndex] = useState(0);
  const introParagraphs = intro.split('\n\n');
  const activeItem = items[activeIndex] ?? null;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    if (activeIndex > items.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, items.length]);

  return (
    <Box as="section" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-8 md:px-10">
      <Box as="section" className="space-y-5" id={sectionId}>
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
          emptyState
        ) : (
          <SurfaceCard className="space-y-4">
            <PlaygroundTabs
              activeIndex={activeIndex}
              baseId={sectionId}
              items={items}
              onSelect={({ index }) => {
                setActiveIndex(index);
              }}
            />

            <Box
              as="article"
              aria-labelledby={`${sectionId}-tab-${activeItem.id}`}
              className={cn('mt-4 space-y-4', panelClassName)}
              id={`${sectionId}-panel-${activeItem.id}`}
              role="tabpanel"
            >
              {renderPanel(activeItem)}
            </Box>
          </SurfaceCard>
        )}
      </Box>
    </Box>
  );
};
