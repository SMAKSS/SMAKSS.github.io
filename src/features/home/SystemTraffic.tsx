import type { CSSProperties } from 'react';
import { CONNECTIONS } from './home-system-geometry.constants';
import { TRACE_PATHS, socketPosition } from './home-system-geometry.utils';
import { ACTIVITY_VIEWS, REQUEST_STEPS } from './home-system.constants';
import type { ServiceReplyProps, SystemTrafficProps } from './home-system.type';

/**
 * The two row strokes and round total keep their shapes when packed into one response.
 */
const ServiceReply = ({ kind, count }: ServiceReplyProps) => (
  <g className="system-reply" data-payload={kind}>
    {kind === 'combined' && <rect x="-15" y="-7" width="30" height="14" rx="5" />}
    {kind !== 'count' && (
      <g transform={kind === 'combined' ? 'translate(-7 0)' : undefined}>
        {kind === 'items' && <rect x="-8" y="-6" width="16" height="12" rx="2.5" />}
        <path d="M-4-2H4M-4 2H2" />
      </g>
    )}
    {kind !== 'items' && (
      <g transform={kind === 'combined' ? 'translate(7 0)' : undefined}>
        <circle r="6.5" />
        <text y="3.5" textAnchor="middle" direction="ltr">
          {count}
        </text>
      </g>
    )}
  </g>
);

/**
 * Requests follow the engraved routes. Each result retraces its own route
 * and docks at the router until both can leave as one reply.
 */
export const SystemTraffic = ({ phase, queryMerged }: SystemTrafficProps) => {
  const { signals, returning } = REQUEST_STEPS[phase];
  const count = ACTIVITY_VIEWS[queryMerged ? 'merged' : 'all'].length;
  const mergeSignals = REQUEST_STEPS.merge.signals;
  const joinTime = Math.max(...mergeSignals.map(([, delay, duration]) => delay + duration));
  const router = socketPosition('router');
  return (
    <g className="system-traffic" data-returning={returning}>
      {signals.map(([route, delay, duration]) => {
        const [from, to] = CONNECTIONS[route];
        const end = socketPosition(returning ? from : to);
        const branch =
          route === 'items' || route === 'itemQuery' || route === 'records'
            ? 'items'
            : route === 'count' || route === 'countQuery' || route === 'index'
              ? 'count'
              : undefined;
        const payload = returning ? (branch ?? 'combined') : undefined;
        return (
          <g
            data-branch={branch}
            key={route}
            style={
              {
                '--delay': `${String(delay)}ms`,
                '--trace': `path("${TRACE_PATHS[route]}")`,
                '--travel': `${String(duration)}ms`,
              } as CSSProperties
            }
          >
            <path className="system-live-wire" d={TRACE_PATHS[route]} />
            {payload ? (
              <g className="system-moving-reply">
                <g className={phase === 'merge' ? 'system-dock-' + payload : undefined}>
                  <ServiceReply kind={payload} count={count} />
                </g>
              </g>
            ) : (
              <path className="system-packet" d={TRACE_PATHS[route]} pathLength="1" />
            )}
            <circle className="system-arrival" cx={end.x} cy={end.y} r="6" />
          </g>
        );
      })}
      {(phase === 'merge' || phase === 'respond') && (
        <g transform={`translate(${String(router.x)} ${String(router.y)})`}>
          <g
            className="system-joined-reply"
            style={
              {
                '--join': String(joinTime) + 'ms',
                '--release': String(REQUEST_STEPS.respond.signals[0][1]) + 'ms',
              } as CSSProperties
            }
          >
            <ServiceReply kind="combined" count={count} />
          </g>
        </g>
      )}
    </g>
  );
};
