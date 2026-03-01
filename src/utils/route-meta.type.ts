/**
 * Input payload for standardized route metadata generation.
 */
export type CreateRouteMetaInputType = {
  /**
   * Canonical description for the route.
   */
  description: string;
  /**
   * Open Graph type for the route.
   */
  type?: 'profile' | 'website';
  /**
   * Canonical public URL for the route.
   */
  url: string;
  /**
   * Title tag and social preview title.
   */
  title: string;
};

/**
 * Single route metadata entry produced for React Router.
 */
export type RouteMetaEntryType =
  | {
      /**
       * Document title value.
       */
      title: string;
    }
  | {
      /**
       * Standard meta tag name.
       */
      name: string;
      /**
       * Meta content value.
       */
      content: string;
    }
  | {
      /**
       * Open Graph or other property-based meta key.
       */
      property: string;
      /**
       * Meta content value.
       */
      content: string;
    };

/**
 * Ordered route metadata array returned by helper utilities.
 */
export type CreateRouteMetaResultType = RouteMetaEntryType[];
