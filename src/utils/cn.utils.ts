/**
 * Joins class name tokens while filtering out falsy values.
 */
export const cn = (...classNames: (string | false | null | undefined)[]): string => {
  return classNames.filter(Boolean).join(' ');
};
