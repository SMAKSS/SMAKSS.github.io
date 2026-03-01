import { Box } from '@components/Box';
import { Button } from '@components/Button';
import type {
  FocusTabButtonInputType,
  HandlePlaygroundTabKeyDownInputType,
  PlaygroundTabsOutputType,
  PlaygroundTabsPropsType,
} from '@components/playground-tabs.type';
import { cn } from '@utils/cn.utils';
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

  return (
    <Box
      as="div"
      aria-orientation="horizontal"
      className="playground-tabs-scroll -mx-2 mb-2 overflow-x-auto px-2 touch-pan-x"
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
