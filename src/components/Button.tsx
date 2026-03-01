import { cn } from '@utils/cn.utils';
import {
  BUTTON_BASE_CLASSNAME,
  BUTTON_SIZE_CLASSNAMES,
  BUTTON_VARIANT_CLASSNAMES,
} from './button.constants';
import './button.css';
import type {
  ButtonAsAnchorPropsType,
  ButtonAsNativePropsType,
  ButtonPropsType,
} from './button.type';

/**
 * Shared button primitive with variant-based styling.
 */
export const Button = ({
  className,
  size = 'md',
  variant = 'primary',
  ...rest
}: ButtonPropsType) => {
  const computedClassName = cn(
    BUTTON_BASE_CLASSNAME,
    BUTTON_VARIANT_CLASSNAMES[variant],
    BUTTON_SIZE_CLASSNAMES[size],
    className,
  );

  if ('href' in rest) {
    const anchorProps = rest as Omit<ButtonAsAnchorPropsType, 'className' | 'size' | 'variant'>;

    return <a className={computedClassName} {...anchorProps} />;
  }

  const buttonProps = rest as Omit<ButtonAsNativePropsType, 'className' | 'size' | 'variant'>;

  return (
    <button className={computedClassName} type={buttonProps.type ?? 'button'} {...buttonProps} />
  );
};
