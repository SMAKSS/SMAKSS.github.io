import { ensureOkResponse } from '../../server/fetch-response.utils';
import { createDailyCacheKey, runServerRequest } from '../../server/request-handler.service';
import {
  NPM_MAINTAINER,
  TOOL_PLAYGROUND_PAGE_SIZE,
  TOOL_PLAYGROUND_SANDBOXES,
} from './tools-playground.constants';
import type {
  FetchToolsPlaygroundItemsInputType,
  GetSandboxUrlForPackageInputType,
  GetToolPlaygroundNpmUrlInputType,
  NormalizeToolsPayloadInputType,
  NpmToolSearchObjectApiType,
  NpmToolSearchResponseApiType,
  ToolPlaygroundItemType,
  WithDefaultDescriptionInputType,
} from './tools-playground.type';

const getToolPlaygroundNpmUrl = ({ from }: GetToolPlaygroundNpmUrlInputType): string => {
  return `https://registry.npmjs.org/-/v1/search?text=maintainer:${NPM_MAINTAINER}&size=${String(TOOL_PLAYGROUND_PAGE_SIZE)}&from=${String(from)}`;
};

const withDefaultDescription = ({ description }: WithDefaultDescriptionInputType): string => {
  if (typeof description === 'string' && description.trim().length > 0) {
    return description;
  }

  return 'Reusable package for production-facing web platform workflows.';
};

const getSandboxUrlForPackage = ({
  packageName,
}: GetSandboxUrlForPackageInputType): string | null => {
  const normalizedName = packageName.trim().toLowerCase();
  const unscopedName = normalizedName.split('/').at(-1) ?? normalizedName;
  const scopedName = normalizedName.startsWith('@')
    ? normalizedName
    : `@${NPM_MAINTAINER}/${unscopedName}`;

  return (
    TOOL_PLAYGROUND_SANDBOXES[normalizedName] ??
    TOOL_PLAYGROUND_SANDBOXES[unscopedName] ??
    TOOL_PLAYGROUND_SANDBOXES[scopedName] ??
    null
  );
};

const normalizeToolsPayload = ({
  allObjects,
}: NormalizeToolsPayloadInputType): ToolPlaygroundItemType[] => {
  const seenPackages = new Set<string>();

  return allObjects.flatMap((entry) => {
    const packageName = entry.package.name;
    const npmUrl = entry.package.links?.npm;

    if (typeof packageName !== 'string' || typeof npmUrl !== 'string') {
      return [];
    }

    if (seenPackages.has(packageName)) {
      return [];
    }

    seenPackages.add(packageName);

    return [
      {
        description: withDefaultDescription({ description: entry.package.description }),
        keywords: Array.isArray(entry.package.keywords)
          ? entry.package.keywords.filter((keyword) => typeof keyword === 'string')
          : [],
        license: typeof entry.package.license === 'string' ? entry.package.license : null,
        name: packageName,
        npmUrl,
        publishedAt: typeof entry.package.date === 'string' ? entry.package.date : null,
        sandboxUrl: getSandboxUrlForPackage({ packageName }),
        version: typeof entry.package.version === 'string' ? entry.package.version : null,
      },
    ];
  });
};

/**
 * Fetches tools for the playground page from npm and caches the result for one day.
 */
export const fetchToolsPlaygroundItems = async ({
  signal,
}: FetchToolsPlaygroundItemsInputType): Promise<ToolPlaygroundItemType[]> => {
  return runServerRequest<ToolPlaygroundItemType[]>({
    cacheKey: createDailyCacheKey({ baseKey: 'tools-playground:npm' }),
    fallbackValue: [],
    fetcher: async ({ signal: requestSignal }) => {
      const allObjects: NpmToolSearchObjectApiType[] = [];
      let from = 0;

      for (;;) {
        const response = await fetch(getToolPlaygroundNpmUrl({ from }), { signal: requestSignal });
        ensureOkResponse({ response });

        const payload = (await response.json()) as NpmToolSearchResponseApiType;
        const objects = payload.objects ?? [];

        allObjects.push(...objects);

        if (objects.length < TOOL_PLAYGROUND_PAGE_SIZE) {
          break;
        }

        from += TOOL_PLAYGROUND_PAGE_SIZE;
      }

      return normalizeToolsPayload({ allObjects });
    },
    requestName: 'fetchToolsPlaygroundItems',
    signal,
  });
};
