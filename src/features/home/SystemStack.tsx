import { useId, type CSSProperties } from 'react';
import { FeedWindow } from './FeedWindow';
import { CONNECTIONS, PORTS, SYSTEM_VIEWBOX } from './home-system-geometry.constants';
import { TRACE_PATHS, planeTransform } from './home-system-geometry.utils';
import { REQUEST_STEPS, SYSTEM_LAYERS } from './home-system.constants';
import type { Connection, SystemStackProps } from './home-system.type';
import { SystemNode } from './SystemNode';
import { SystemTraffic } from './SystemTraffic';

/**
 * One fixed feed window over three sectional views. Only the light, signal
 * and markings change focus, keeping every connector physically aligned.
 */
export const SystemStack = ({ phase, mergedOnly }: SystemStackProps) => {
  const id = useId();
  const ref = (name: string) => `#${id}-${name}`;
  const paint = (name: string) => `url(${ref(name)})`;
  const focus = phase === 'idle' ? -1 : SYSTEM_LAYERS.indexOf(REQUEST_STEPS[phase].layer);

  const queryMerged = phase === 'idle' || phase === 'success' ? mergedOnly : !mergedOnly;

  return (
    <svg
      className="system-drawing"
      aria-hidden="true"
      focusable="false"
      style={{ '--device-metal': paint('metal') } as CSSProperties}
      viewBox={`0 0 ${String(SYSTEM_VIEWBOX.width)} ${String(SYSTEM_VIEWBOX.height)}`}
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <defs>
        <linearGradient id={`${id}-glass`} x2=".75" y2="1">
          <stop stopColor="var(--plate-light)" />
          <stop offset=".65" stopColor="var(--plate)" />
          <stop offset="1" stopColor="var(--plate-edge)" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x2="1" y2=".1">
          <stop stopColor="var(--plate-rim)" />
          <stop offset=".44" stopColor="var(--plate-edge)" />
          <stop offset="1" stopColor="var(--plate-rim)" />
        </linearGradient>
        <linearGradient id={`${id}-metal`}>
          <stop stopColor="var(--plate-rim)" />
          <stop offset=".28" stopColor="var(--plate-edge)" />
          <stop offset=".52" stopColor="var(--plate-light)" />
          <stop offset="1" stopColor="var(--plate-rim)" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop stopColor="var(--plate-rim)" stopOpacity=".7" />
          <stop offset="1" stopColor="var(--plate-rim)" stopOpacity="0" />
        </radialGradient>
        <path
          id={`${id}-wall`}
          d="M0 10v122q0 10 10 10h228q10 0 10-10l-12 18q0 10-10 10H-2q-10 0-10-10V28Z"
        />
        <g id={`${id}-sheet`}>
          <use href={ref('wall')} fill={paint('side')} stroke="var(--plate-rim)" strokeWidth=".9" />
          <path
            d="M0 10v122q0 10 10 10l-12 18q-10 0-10-10V28Z"
            fill="var(--plate-rim)"
            opacity=".65"
          />
          <path
            d="M1 138q3 7 11 7h224"
            transform="translate(-8 10)"
            stroke="var(--plate-light)"
            opacity=".45"
          />
          <rect
            width="248"
            height="142"
            rx="10"
            fill={paint('glass')}
            fillOpacity=".92"
            stroke="var(--plate-outline)"
            strokeWidth="1.5"
          />
          <rect
            x="4"
            y="4"
            width="240"
            height="134"
            rx="7"
            stroke="var(--plate-light)"
            strokeOpacity=".8"
          />
        </g>
      </defs>
      <ellipse cx="180" cy="360" rx="165" ry="24" fill={paint('shadow')} opacity=".52" />
      <g className="system-vertical-wires">
        {Object.entries(CONNECTIONS).map(
          ([name, [from, to]]) =>
            PORTS[from][0] !== PORTS[to][0] && (
              <path key={name} data-route={name} d={TRACE_PATHS[name as Connection]} />
            ),
        )}
      </g>
      {SYSTEM_LAYERS.slice()
        .reverse()
        .map((layer) => {
          const index = SYSTEM_LAYERS.indexOf(layer);
          const position =
            focus < 0 ? undefined : index === focus ? 'active' : index < focus ? 'above' : 'below';
          return (
            <g key={layer} className="system-layer" data-layer={layer} data-position={position}>
              <g transform={planeTransform(layer)}>
                {layer === 'infrastructure' && (
                  <use
                    href={ref('wall')}
                    transform="translate(-5.5 8.5)"
                    fill="var(--plate-rim)"
                    stroke="var(--plate-outline)"
                  />
                )}
                <use href={ref('sheet')} />
                <rect className="system-rim-light" x="2" y="2" width="244" height="138" rx="8" />
              </g>
              <g className="system-traces">
                {Object.entries(CONNECTIONS).map(
                  ([name, [from, to]]) =>
                    PORTS[from][0] === layer &&
                    PORTS[to][0] === layer && (
                      <path key={name} data-route={name} d={TRACE_PATHS[name as Connection]} />
                    ),
                )}
              </g>
              {layer === 'interface' ? (
                <g transform={planeTransform(layer)}>
                  <FeedWindow
                    mergedOnly={mergedOnly}
                    busy={phase !== 'idle' && phase !== 'success'}
                  />
                </g>
              ) : (
                (Object.keys(PORTS) as (keyof typeof PORTS)[])
                  .filter((port) => PORTS[port][0] === layer)
                  .map((port) => (
                    <SystemNode key={port} port={port} phase={phase} queryMerged={queryMerged} />
                  ))
              )}
            </g>
          );
        })}
      <g className="system-leaders">
        {[110, 174, 238, 302].map((y) => (
          <path key={y} d={`M359 ${String(y)}h19`} />
        ))}
      </g>
      {phase !== 'idle' && <SystemTraffic key={phase} phase={phase} queryMerged={queryMerged} />}
    </svg>
  );
};
