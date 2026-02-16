import type { IsInteractivePointerTargetInputType } from './home-community-contribution-slider.type';

/**
 * Checks whether a pointer target is an interactive element that should keep
 * its native click behavior instead of starting slider drag capture.
 */
export const isInteractivePointerTarget = ({
  path,
  target,
}: IsInteractivePointerTargetInputType): boolean => {
  const interactiveSelector =
    'a[href], button, input, select, textarea, label, [role="button"], [role="link"], .home-slider-feed, .home-slider-card-header, .home-slider-title-link';

  const pathHasInteractiveElement = (path ?? []).some((entry) => {
    return entry instanceof Element && entry.closest(interactiveSelector) !== null;
  });

  if (pathHasInteractiveElement) {
    return true;
  }

  if (target instanceof Element) {
    return target.closest(interactiveSelector) !== null;
  }

  if (target instanceof Node) {
    return target.parentElement?.closest(interactiveSelector) !== null;
  }

  return false;
};
