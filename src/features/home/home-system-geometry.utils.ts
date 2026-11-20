import { CONNECTIONS, PLANE_Y, PORTS, SYSTEM_PROJECTION } from './home-system-geometry.constants';
import type { Connection, PlanePoint, SystemLayer } from './home-system.type';

const { x: origin, skewX, skewY, scaleY } = SYSTEM_PROJECTION;

/**
 * Projects one socket or bend into the SVG viewBox.
 */
export const projectPoint = ({ layer, x, y }: PlanePoint) => ({
  x: origin + x + skewX * y,
  y: PLANE_Y[layer] + skewY * x + scaleY * y,
});

/**
 * Applies the same projection to solid geometry and engraved details.
 */
export const planeTransform = (layer: SystemLayer) =>
  `matrix(1 ${String(skewY)} ${String(skewX)} ${String(scaleY)} ${String(origin)} ${String(PLANE_Y[layer])})`;

/**
 * Finds the center of a component for signal arrivals and departures.
 */
export const socketPosition = (port: keyof typeof PORTS) => {
  const [layer, x, y] = PORTS[port];
  return projectPoint({ layer, x, y });
};

/**
 * Precomputed projected routes shared by the quiet engravings and travelling pulses.
 */
export const TRACE_PATHS = Object.fromEntries(
  Object.entries(CONNECTIONS).map(([key, [start, end, bends]]) => {
    const points = [
      socketPosition(start),
      ...bends.map(([x, y]) => projectPoint({ layer: PORTS[start][0], x, y })),
      socketPosition(end),
    ];
    return [
      key,
      points
        .map(({ x, y }, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
        .join(' '),
    ];
  }),
) as Record<Connection, string>;
