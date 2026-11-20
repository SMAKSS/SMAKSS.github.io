/**
 * Shared affine projection retains the original placement and physical footprint.
 */
export const SYSTEM_PROJECTION = { x: 16, skewX: 0.66, skewY: -0.24, scaleY: 0.56 } as const;

/**
 * Elevation of each face in the drawing's viewBox.
 */
export const PLANE_Y = { interface: 90, logic: 154, services: 218, infrastructure: 282 } as const;

/**
 * Coordinate space shared by the drawing and the native feed control.
 */
export const SYSTEM_VIEWBOX = { width: 500, height: 400 } as const;

/**
 * Socket locations on each face. Vertically paired sockets align between layers.
 */
export const PORTS = {
  filter: ['interface', 165, 49],
  client: ['logic', 165, 49],
  gate: ['logic', 121, 72],
  request: ['logic', 56, 105],
  api: ['services', 56, 105],
  predicate: ['services', 92, 77],
  router: ['services', 125, 88],
  itemService: ['services', 188, 39],
  countService: ['services', 185, 118],
  itemReader: ['infrastructure', 188, 39],
  countReader: ['infrastructure', 185, 118],
  records: ['infrastructure', 51, 100],
  index: ['infrastructure', 125, 120],
} as const;

/**
 * Named connections, with optional bends in the source plane's coordinates.
 * Etched lines, outgoing signals and replies all use these exact routes.
 */
export const CONNECTIONS = {
  send: ['filter', 'client', []],
  prepare: [
    'client',
    'gate',
    [
      [154, 57],
      [139, 72],
    ],
  ],
  validate: [
    'gate',
    'request',
    [
      [99, 72],
      [70, 105],
    ],
  ],
  call: ['request', 'api', []],
  edge: ['api', 'predicate', [[70, 105]]],
  plan: ['predicate', 'router', [[108, 77]]],
  items: [
    'router',
    'itemService',
    [
      [147, 54],
      [167, 39],
    ],
  ],
  count: [
    'router',
    'countService',
    [
      [140, 108],
      [165, 118],
    ],
  ],
  itemQuery: ['itemService', 'itemReader', []],
  countQuery: ['countService', 'countReader', []],
  records: [
    'itemReader',
    'records',
    [
      [169, 54],
      [147, 79],
      [99, 79],
      [78, 100],
    ],
  ],
  index: [
    'countReader',
    'index',
    [
      [165, 118],
      [149, 102],
      [140, 102],
    ],
  ],
} as const satisfies Record<
  string,
  readonly [keyof typeof PORTS, keyof typeof PORTS, readonly (readonly [number, number])[]]
>;
