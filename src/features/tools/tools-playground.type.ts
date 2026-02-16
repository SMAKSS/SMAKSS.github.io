/**
 * Normalized tool card payload shown in the tools route.
 */
export type ToolPlaygroundItemType = {
  /**
   * Human-readable package summary.
   */
  description: string;
  /**
   * Package keyword list.
   */
  keywords: string[];
  /**
   * Package license identifier, if available.
   */
  license: string | null;
  /**
   * Package name.
   */
  name: string;
  /**
   * npm package URL.
   */
  npmUrl: string;
  /**
   * Package publish timestamp.
   */
  publishedAt: string | null;
  /**
   * Optional sandbox URL mapped by package name.
   */
  sandboxUrl: string | null;
  /**
   * Package version.
   */
  version: string | null;
};

/**
 * Props consumed by the tools playground page component.
 */
export type ToolsPlaygroundPagePropsType = {
  /**
   * Tool entries resolved by the server route loader.
   */
  items: ToolPlaygroundItemType[];
};

/**
 * Input payload for npm search URL builder.
 */
export type GetToolPlaygroundNpmUrlInputType = {
  /**
   * Zero-based result offset.
   */
  from: number;
};

/**
 * Input payload for package description fallback handling.
 */
export type WithDefaultDescriptionInputType = {
  /**
   * Optional package description from npm.
   */
  description: string | undefined;
};

/**
 * Input payload for sandbox URL lookup by package name.
 */
export type GetSandboxUrlForPackageInputType = {
  /**
   * npm package name.
   */
  packageName: string;
};

/**
 * Input payload for fetching tools playground items.
 */
export type FetchToolsPlaygroundItemsInputType = {
  /**
   * Optional abort signal for request cancellation.
   */
  signal?: AbortSignal;
};

/**
 * Input payload for normalizing npm response entries into UI models.
 */
export type NormalizeToolsPayloadInputType = {
  /**
   * Raw npm search objects gathered from paginated responses.
   */
  allObjects: NpmToolSearchObjectApiType[];
};

/**
 * npm package metadata payload returned by npm search API.
 */
export type NpmToolSearchPackageApiType = {
  /**
   * Optional package summary.
   */
  description?: string;
  /**
   * Optional package tags.
   */
  keywords?: string[];
  /**
   * Optional package license.
   */
  license?: string;
  /**
   * Optional package links object.
   */
  links?: {
    /**
     * npm package URL.
     */
    npm?: string;
  };
  /**
   * Package name.
   */
  name?: string;
  /**
   * Package publish date.
   */
  date?: string;
  /**
   * Package version.
   */
  version?: string;
};

/**
 * npm search object payload.
 */
export type NpmToolSearchObjectApiType = {
  /**
   * Package metadata payload.
   */
  package: NpmToolSearchPackageApiType;
};

/**
 * npm search API response payload.
 */
export type NpmToolSearchResponseApiType = {
  /**
   * Search result entries.
   */
  objects?: NpmToolSearchObjectApiType[];
};
