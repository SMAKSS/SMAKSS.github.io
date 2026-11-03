import { Box } from '@components/Box';
import { Button } from '@components/Button';
import type {
  FocusTabButtonInputType,
  HandlePlaygroundTabKeyDownInputType,
  PlaygroundTabsOutputType,
  PlaygroundTabsPropsType,
} from '@components/playground-tabs.type';
import { cn } from '@utils/cn.utils';
import type { WheelEvent } from 'react';
import './playground-tabs.css';

/**
 * Moves focus to a rendered tab button after keyboard-driven selection changes.
 */
const focusTabButton = ({ baseId, itemId }: FocusTabButtonInputType): void => {
  const nextTab = document.getElementById(`${baseId}-tab-${itemId}`);

  if (nextTab instanceof HTMLButtonElement) {
    nextTab.focus();
  }
};

/**
 * Shared horizontal tab navigation used by playground-style pages.
 */
export const PlaygroundTabs = ({
  activeIndex,
  baseId,
  items,
  onSelect,
}: PlaygroundTabsPropsType): PlaygroundTabsOutputType => {
  /**
   * Applies roving-tabindex keyboard navigation across the tab strip.
   */
  const handleKeyDown = ({ event, index }: HandlePlaygroundTabKeyDownInputType): void => {
    if (items.length === 0) {
      return;
    }

    const lastIndex = items.length - 1;
    let nextIndex = index;

    if (event.key === 'ArrowRight') {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    onSelect({ index: nextIndex });

    const nextItem = items[nextIndex];

    if (nextItem !== undefined) {
      focusTabButton({ baseId, itemId: nextItem.id });
    }
  };

  const handleWheel = (event: WheelEvent<HTMLElement>): void => {
    if (event.ctrlKey || event.deltaY === 0 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }

    const tabList = event.currentTarget;
    const scrollDistance = tabList.scrollWidth - tabList.clientWidth;

    if (scrollDistance <= 0) {
      return;
    }

    const isRightToLeft = getComputedStyle(tabList).direction === 'rtl';
    const scrollDelta = isRightToLeft ? -event.deltaY : event.deltaY;
    const minScrollOffset = isRightToLeft ? -scrollDistance : 0;
    const maxScrollOffset = isRightToLeft ? 0 : scrollDistance;
    const nextScrollOffset = Math.max(
      minScrollOffset,
      Math.min(maxScrollOffset, tabList.scrollLeft + scrollDelta),
    );

    if (nextScrollOffset === tabList.scrollLeft) {
      return;
    }

    event.preventDefault();
    tabList.scrollLeft = nextScrollOffset;
  };

  return (
    <Box
      as="div"
      aria-orientation="horizontal"
      className="playground-tabs-scroll -mx-2 mb-2 overflow-x-auto px-2"
      onWheel={handleWheel}
      role="tablist"
    >
      <Box
        as="div"
        className="flex w-max min-w-full flex-nowrap items-end border-b border-(--card-border)"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <Button
              aria-controls={`${baseId}-panel-${item.id}`}
              aria-selected={isActive}
              className={cn(
                'relative -mb-px shrink-0 px-4 py-2 text-sm transition',
                isActive
                  ? 'font-medium text-(--accent)'
                  : 'text-(--muted-foreground) hover:text-(--accent)',
              )}
              key={item.id}
              onClick={() => {
                onSelect({ index });
              }}
              onKeyDown={(event) => {
                handleKeyDown({ event, index });
              }}
              role="tab"
              size="none"
              id={`${baseId}-tab-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              variant="unstyled"
            >
              {item.label}
              {isActive ? (
                <Box
                  as="span"
                  aria-hidden
                  className="pointer-events-none absolute bottom-px left-1/2 h-0.75 w-[72%] -translate-x-1/2 rounded-full bg-(--accent)"
                />
              ) : null}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
