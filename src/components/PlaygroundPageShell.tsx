import { Box } from '@components/Box';
import { PlaygroundTabs } from '@components/PlaygroundTabs';
import { SurfaceCard } from '@components/SurfaceCard';
import { Text } from '@components/Text';
import type {
  PlaygroundPageShellItemType,
  PlaygroundPageShellOutputType,
  PlaygroundPageShellPropsType,
  PlaygroundPanelsPropsType,
} from '@components/playground-page-shell.type';
import { cn } from '@utils/cn.utils';
import { Suspense, useEffect, useState } from 'react';
import { Await } from 'react-router';

const PlaygroundPanels = <ItemType extends PlaygroundPageShellItemType>({
  emptyState = null,
  items,
  panelClassName,
  renderPanel,
  sectionId,
}: PlaygroundPanelsPropsType<ItemType>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? null;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    if (activeIndex > items.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, items.length]);

  if (activeItem === null) {
    return emptyState;
  }

  return (
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
  );
};

/**
 * Renders the playground intro immediately and lets deferred tabs load separately.
 */
export const PlaygroundPageShell = <ItemType extends PlaygroundPageShellItemType>({
  intro,
  items,
  loadingState,
  ...panelProps
}: PlaygroundPageShellPropsType<ItemType>): PlaygroundPageShellOutputType => {
  const introParagraphs = intro.split('\n\n');

  return (
    <Box as="section" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-8 md:px-10">
      <Box as="section" className="space-y-5" id={panelProps.sectionId}>
        <Box className="space-y-4 text-base leading-relaxed text-(--muted-foreground) md:text-lg">
          {introParagraphs.map((paragraph) => {
            return (
              <Text as="p" key={paragraph}>
                {paragraph}
              </Text>
            );
          })}
        </Box>

        <Suspense fallback={loadingState}>
          <Await errorElement={panelProps.emptyState ?? null} resolve={items}>
            {(resolvedItems) => <PlaygroundPanels {...panelProps} items={resolvedItems} />}
          </Await>
        </Suspense>
      </Box>
    </Box>
  );
};
