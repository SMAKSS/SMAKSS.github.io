import { cn } from '../utils/cn.utils';
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
  wrapperClassName,
  ...rest
}: SelectPropsType) => {
  return (
    <Box className={cn('space-y-2', wrapperClassName)}>
      <label
        className={cn(
          'block text-xs uppercase tracking-[0.14em] text-(--muted-foreground)',
          labelClassName,
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className={cn(
          'h-9 w-full rounded-lg border border-(--card-border) bg-(--background)/70 px-2 text-sm outline-none focus:border-(--accent) disabled:opacity-60',
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
    </Box>
  );
};
