/**
 * The four physical planes, ordered from the browser down.
 */
export const SYSTEM_LAYERS = ['interface', 'logic', 'services', 'infrastructure'] as const;

/**
 * Each row is a focus cue. Parallel signals share a clock and the return
 * traverses the same connections in reverse.
 */
export const REQUEST_STEPS = {
  dispatch: {
    layer: 'interface',
    ms: 500,
    next: 'logic',
    returning: false,
    signals: [['send', 0, 500]],
  },
  logic: {
    layer: 'logic',
    ms: 1250,
    next: 'route',
    returning: false,
    signals: [
      ['prepare', 0, 380],
      ['validate', 380, 440],
      ['call', 820, 430],
    ],
  },
  route: {
    layer: 'services',
    ms: 1000,
    next: 'fanout',
    returning: false,
    signals: [
      ['edge', 0, 440],
      ['plan', 440, 560],
    ],
  },
  fanout: {
    layer: 'services',
    ms: 1200,
    next: 'read',
    returning: false,
    signals: [
      ['items', 0, 640],
      ['count', 0, 640],
      ['itemQuery', 640, 560],
      ['countQuery', 640, 560],
    ],
  },
  read: {
    layer: 'infrastructure',
    ms: 900,
    next: 'retrieve',
    returning: false,
    signals: [
      ['records', 0, 650],
      ['index', 0, 580],
    ],
  },
  retrieve: {
    layer: 'infrastructure',
    ms: 1040,
    next: 'merge',
    returning: true,
    signals: [
      ['records', 0, 550],
      ['index', 0, 550],
      ['itemQuery', 550, 490],
      ['countQuery', 550, 490],
    ],
  },
  merge: {
    layer: 'services',
    ms: 1650,
    next: 'respond',
    returning: true,
    signals: [
      ['items', 0, 840],
      ['count', 220, 1030],
    ],
  },
  respond: {
    layer: 'services',
    ms: 1500,
    next: 'apply',
    returning: true,
    signals: [
      ['plan', 180, 450],
      ['edge', 630, 410],
      ['call', 1040, 460],
    ],
  },
  apply: {
    layer: 'logic',
    ms: 1200,
    next: 'success',
    returning: true,
    signals: [
      ['validate', 0, 430],
      ['prepare', 430, 420],
      ['send', 850, 350],
    ],
  },
  success: { layer: 'interface', ms: 750, next: 'idle', returning: true, signals: [] },
} as const;

/**
 * Repository activity in descending order. Both views retain the same event identities.
 */
const activity = [
  { id: 48, kind: 'review' },
  { id: 46, kind: 'merge' },
  { id: 44, kind: 'opened' },
  { id: 42, kind: 'merge' },
] as const;

/**
 * Only the first two results fit on screen. The count includes every match.
 */
export const ACTIVITY_VIEWS = {
  all: activity,
  merged: activity.filter((entry) => entry.kind === 'merge'),
};
