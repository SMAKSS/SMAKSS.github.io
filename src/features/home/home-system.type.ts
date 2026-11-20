import type { ReactNode } from 'react';
import type { CONNECTIONS, PORTS } from './home-system-geometry.constants';
import type { REQUEST_STEPS, SYSTEM_LAYERS } from './home-system.constants';

/**
 * Physical layer and animation step of the illustrated read operation.
 */
export type SystemLayer = (typeof SYSTEM_LAYERS)[number];
/**
 * Idle is shared by the mixed feed and the filtered feed at rest.
 */
export type RequestPhase = 'idle' | keyof typeof REQUEST_STEPS;

/**
 * Drawing state. The selected view changes when a response reaches the browser.
 */
export type SystemStackProps = { phase: RequestPhase; mergedOnly: boolean };

/**
 * An address on a plane, in its unprojected local coordinate system.
 */
export type PlanePoint = { layer: SystemLayer; x: number; y: number };
/**
 * A component placed on its socket in the physical stack.
 */
export type SystemNodeProps = {
  port: keyof typeof PORTS;
  phase: RequestPhase;
  queryMerged: boolean;
};
/**
 * Timeline cue that drives signals and completion marks.
 */
export type SystemTrafficProps = { phase: Exclude<RequestPhase, 'idle'>; queryMerged: boolean };
/**
 * Names of reusable physical traces in the illustration.
 */
export type Connection = keyof typeof CONNECTIONS;

/**
 * Applied activity filter and transient playback position.
 */
export type FeedState = { phase: RequestPhase; mergedOnly: boolean; hasStarted: boolean };
/**
 * Events accepted by the activity filter timeline.
 */
export type FeedEvent =
  | { type: 'start'; reduced: boolean }
  | { type: 'advance'; from: Exclude<RequestPhase, 'idle'> }
  | { type: 'finish' };

/**
 * Dimensions in drawing units and the etched details for each visible face.
 */
export type SystemEnclosureProps = {
  width: number;
  depth: number;
  height: number;
  children?: ReactNode;
  front?: ReactNode;
};

/**
 * Delivered selection for the miniature activity feed.
 */
export type FeedWindowProps = { mergedOnly: boolean; busy: boolean };

/**
 * Contents of a service reply traveling along a trace.
 */
export type ServiceReplyProps = { kind: 'items' | 'count' | 'combined'; count: number };
