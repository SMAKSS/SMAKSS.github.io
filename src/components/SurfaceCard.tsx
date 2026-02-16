import { Box } from './Box';
import type { SurfaceCardPropsType } from './surface-card.type';

/**
 * Shared bordered surface used for grouped content sections.
 */
export const SurfaceCard = ({ as = 'section', children, className }: SurfaceCardPropsType) => {
  return (
    <Box
      as={as}
      background="surface"
      border="default"
      className={className}
      padding="none"
      radius="xxl"
    >
      <Box as="div" className="p-5 md:p-6">
        {children}
      </Box>
    </Box>
  );
};
