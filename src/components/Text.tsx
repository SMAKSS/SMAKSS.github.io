import { createElement } from 'react';
import { cn } from '../utils/cn.utils';
import {
  TEXT_BASE_CLASSNAME,
  TEXT_DECORATION_CLASSNAMES,
  TEXT_SIZE_CLASSNAMES,
  TEXT_TONE_CLASSNAMES,
  TEXT_WEIGHT_CLASSNAMES,
} from './text.constants';
import type { TextPropsType } from './text.type';

/**
 * Shared text primitive for paragraph, span, and anchor rendering with unified style controls.
 */
export const Text = ({
  as = 'span',
  className,
  decoration,
  externalLink = false,
  size,
  tone,
  underlineOffset = false,
  weight,
  ...rest
}: TextPropsType) => {
  const computedClassName = cn(
    TEXT_BASE_CLASSNAME,
    size !== undefined ? TEXT_SIZE_CLASSNAMES[size] : undefined,
    weight !== undefined ? TEXT_WEIGHT_CLASSNAMES[weight] : undefined,
    tone !== undefined ? TEXT_TONE_CLASSNAMES[tone] : undefined,
    decoration !== undefined ? TEXT_DECORATION_CLASSNAMES[decoration] : undefined,
    decoration === 'underline' && underlineOffset ? 'underline-offset-[0.2em]' : undefined,
    className,
  );

  if (as === 'a' || 'href' in rest) {
    const { href, rel, target, ...anchorRest } = rest;
    const anchorClassName = cn(
      computedClassName,
      'focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-1 focus-visible:ring-offset-(--background)',
    );

    if (href === undefined) {
      return <span className={computedClassName}>{anchorRest.children}</span>;
    }

    return (
      <a
        className={anchorClassName}
        href={href}
        rel={externalLink ? (rel ?? 'noreferrer') : rel}
        target={externalLink ? (target ?? '_blank') : target}
        {...anchorRest}
      />
    );
  }

  return createElement(as, { className: computedClassName, ...rest });
};
