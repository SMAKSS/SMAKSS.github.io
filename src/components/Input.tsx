import { forwardRef } from 'react';

import { cn } from '../utils/cn.utils';
import { INPUT_BASE_CLASSNAME } from './input.constants';
import type { InputPropsType } from './input.type';

/**
 * Shared input field primitive with consistent base styling and accessibility behavior.
 */
export const Input = forwardRef<HTMLInputElement, InputPropsType>(
  ({ className, ...rest }: InputPropsType, ref) => {
    return <input className={cn(INPUT_BASE_CLASSNAME, className)} ref={ref} {...rest} />;
  },
);

Input.displayName = 'Input';
