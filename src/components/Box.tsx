import { cn } from '@utils/cn.utils';
import { createElement, forwardRef, type Ref } from 'react';
import {
  BOX_BACKGROUND_CLASSNAMES,
  BOX_BORDER_CLASSNAMES,
  BOX_PADDING_CLASSNAMES,
  BOX_RADIUS_CLASSNAMES,
} from './box.constants';
import type { BoxPropsType } from './box.type';

/**
 * Shared layout primitive for semantic containers such as sections, asides, and articles.
 */
export const Box = forwardRef<HTMLElement, BoxPropsType>((props: BoxPropsType, ref) => {
  const { as = 'div', background, border, className, padding, radius, ...rest } = props;

  return createElement(as, {
    className: cn(
      background !== undefined ? BOX_BACKGROUND_CLASSNAMES[background] : undefined,
      border !== undefined ? BOX_BORDER_CLASSNAMES[border] : undefined,
      padding !== undefined ? BOX_PADDING_CLASSNAMES[padding] : undefined,
      radius !== undefined ? BOX_RADIUS_CLASSNAMES[radius] : undefined,
      className,
    ),
    ...rest,
    ref: ref as Ref<HTMLElement>,
  });
});

Box.displayName = 'Box';
