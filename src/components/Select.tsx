import { cn } from '@utils/cn.utils';
import { Box } from './Box';
import type { SelectPropsType } from './select.type';

/**
 * Shared labelled select field with consistent accessibility and styling.
 */
export const Select = ({
  id,
  label,
  labelClassName,
  options,
  selectClassName,
  variant = 'default',
  wrapperClassName,
  ...rest
}: SelectPropsType) => {
  const isCompact = variant === 'compact';

  return (
    <Box className={cn(isCompact ? 'inline-flex flex-col' : 'space-y-2', wrapperClassName)}>
      <label
        className={cn(
          'block text-xs uppercase tracking-[0.14em] text-(--muted-foreground)',
          labelClassName,
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <Box className="relative">
        <select
          className={cn(
            isCompact
              ? 'min-h-9 w-auto appearance-none rounded-full border border-(--card-border) bg-(--picker-bg) px-3 font-[inherit] text-[0.8rem] text-(--foreground) outline-none focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-3 disabled:opacity-60'
              : 'h-9 w-full appearance-none rounded-lg border border-(--card-border) bg-(--background)/70 ps-2 pe-9 text-sm outline-none focus:border-(--accent) disabled:opacity-60',
            selectClassName,
          )}
          id={id}
          {...rest}
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        {!isCompact ? (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 end-3 my-auto size-3 text-(--muted-foreground)"
            fill="none"
            viewBox="0 0 12 12"
          >
            <path
              d="m2.5 4.5 3.5 3 3.5-3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
            />
          </svg>
        ) : null}
      </Box>
    </Box>
  );
};
