import type { ReactNode, SelectHTMLAttributes } from 'react';

/**
 * Shared option payload consumed by the Select component.
 */
export type SelectOptionType = {
  /**
   * Option label rendered to the user.
   */
  label: ReactNode;
  /**
   * Option value submitted by the select element.
   */
  value: string;
};

/**
 * Props consumed by the shared Select component.
 */
export type SelectPropsType = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'id'> & {
  /**
   * Stable id used to connect label and select.
   */
  id: string;
  /**
   * Accessible label content for the select field.
   */
  label: ReactNode;
  /**
   * Option entries rendered by default.
   */
  options: SelectOptionType[];
  /**
   * Optional classes applied to the outer wrapper.
   */
  wrapperClassName?: string;
  /**
   * Optional classes appended to label classes.
   */
  labelClassName?: string;
  /**
   * Optional classes appended to select classes.
   */
  selectClassName?: string;
};
