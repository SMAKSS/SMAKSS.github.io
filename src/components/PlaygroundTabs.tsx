import { cn } from '../utils/cn.utils';
import { Box } from './Box';
import { Button } from './Button';
import type { PlaygroundTabsPropsType } from './playground-tabs.type';

/**
 * Shared horizontal tab navigation used by playground-style pages.
 */
export const PlaygroundTabs = ({ items, activeIndex, onSelect }: PlaygroundTabsPropsType) => {
  return (
    <Box as="div" className="-mx-2 mb-2 overflow-x-auto px-2 touch-pan-y" role="tablist">
      <Box
        as="div"
        className="flex w-max min-w-full flex-nowrap items-end border-b border-(--card-border)"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <Button
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
              role="tab"
              size="none"
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
