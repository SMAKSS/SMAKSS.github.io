import { SYSTEM_PROJECTION } from './home-system-geometry.constants';
import type { SystemEnclosureProps } from './home-system.type';

/**
 * Draws a housing in the stack's projection. Top markings sit on the lid,
 * while sockets, activity lights and drive bays sit on its vertical fascia.
 */
export const SystemEnclosure = ({
  width,
  depth,
  height,
  children,
  front,
}: SystemEnclosureProps) => {
  const { skewX, skewY, scaleY } = SYSTEM_PROJECTION;
  const left = -width / 2;
  const back = -depth / 2;
  const near = depth / 2;
  const leftX = left + skewX * back;
  const leftY = skewY * left + scaleY * back - height;
  const frontX = left + skewX * near;
  const frontY = skewY * left + scaleY * near - height;
  const surface = [1, skewY, skewX, scaleY, 0, -height].join(' ');
  return (
    <g className="system-enclosure">
      <g transform={`matrix(${[skewX, scaleY, 0, 1, leftX, leftY].join(' ')})`}>
        <rect width={depth} height={height} className="system-casing-side" />
      </g>
      <g transform={`matrix(${[1, skewY, 0, 1, frontX, frontY].join(' ')})`}>
        <rect width={width} height={height} className="system-casing-front" />
        {front}
      </g>
      <g transform={`matrix(${surface})`}>
        <rect x={left} y={back} width={width} height={depth} className="system-casing-lid" />
        {children}
      </g>
    </g>
  );
};
