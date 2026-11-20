import { useAppTranslation } from '@i18n/use-app-translation.hook';
import type { CSSProperties } from 'react';
import { CONNECTIONS } from './home-system-geometry.constants';
import { socketPosition } from './home-system-geometry.utils';
import { ACTIVITY_VIEWS, REQUEST_STEPS } from './home-system.constants';
import type { SystemNodeProps } from './home-system.type';
import { SystemEnclosure } from './SystemEnclosure';

/** A feed store with a vertical drum and three visible storage bands. */
const RecordStore = () => (
  <g className="system-record-store">
    <ellipse className="system-foot" cx="1" cy="2" rx="22" ry="8" />
    <path className="system-drum" d="M-18-21c0-4 8-7 18-7s18 3 18 7V-2c0 4-8 7-18 7s-18-3-18-7Z" />
    <g className="system-band">
      <path d="M-18-15c0 9 36 9 36 0M-18-8c0 9 36 9 36 0" />
    </g>
    <ellipse className="system-casing-lid" cy="-21" rx="18" ry="7" />
    <ellipse className="system-engraving" cy="-21" rx="10" ry="3.4" />
    <path className="system-read-band" d="M-17-16c3 7 30 7 34 0" />
  </g>
);

/** Physical miniatures share their ground contacts with the signal paths. */
export const SystemNode = ({ port, phase, queryMerged }: SystemNodeProps) => {
  const { t, isRtl } = useAppTranslation();
  const { x, y } = socketPosition(port);
  const cue = phase === 'idle' ? undefined : REQUEST_STEPS[phase];
  const arrival = cue?.signals.find(
    ([route]) => CONNECTIONS[route][cue.returning ? 0 : 1] === port,
  );
  const departure = cue?.signals.find(
    ([route]) => CONNECTIONS[route][cue.returning ? 1 : 0] === port,
  );
  const activation = arrival ? Math.max(0, arrival[1] + arrival[2] - 120) : departure?.[1];
  let model;
  switch (port) {
    case 'client':
      model = (
        <SystemEnclosure width={38} depth={26} height={5}>
          <rect x="-15" y="-10" width="30" height="20" rx="2" className="system-inset" />
          <g className="system-feed-buffer">
            <path className="system-fascia-mark" d="M-10-4h2m4 0H10M-10 4h2m4 0H6" />
          </g>
        </SystemEnclosure>
      );
      break;
    case 'gate':
      model = (
        <SystemEnclosure width={29} depth={24} height={5}>
          <rect x="-10" y="-8" width="20" height="16" rx="2" className="system-inset" />
          <path className="system-validation-mark" d="m-6 0 4 4 8-9" />
        </SystemEnclosure>
      );
      break;
    case 'request':
      model = (
        <SystemEnclosure
          width={40}
          depth={16}
          height={18}
          front={
            <>
              <rect x="2" y="1" width="36" height="16" rx="2" className="system-recess" />
              <text
                x="20"
                y="13"
                textAnchor="middle"
                direction="ltr"
                className="system-http-readout"
              >
                {phase === 'apply' || phase === 'success' ? '200' : 'GET'}
              </text>
            </>
          }
        >
          <path className="system-engraving" d="M-6-4v8m-4-4 4 4 4-4m6-1 4-4 4 4m-4-4v8" />
        </SystemEnclosure>
      );
      break;
    case 'api':
      // An open gateway makes the entry point visually different from a worker.
      model = (
        <g className="system-gateway">
          <path className="system-casing-side" d="m-16 1 7 4V-9l-7-4Zm22-5 6 4v-13l-6-3Z" />
          <path className="system-casing-front" d="M-10 5v-19l26-6V0l-6 1v-13L-4-9V4Z" />
          <path className="system-casing-lid" d="m-10-14-7-5 26-6 7 5Z" />
          <path className="system-engraving" d="m-6-12 16-4" />
        </g>
      );
      break;
    case 'predicate':
      model = (
        <SystemEnclosure
          width={24}
          depth={19}
          height={9}
          front={<path className="system-fascia-mark" d="M3 3h17M3 6h14" />}
        >
          <path className="system-engraving" d="M-9-5h4m-4 5h4m-4 5h4M-2-6l5 4v4l-5 4Z" />
          <path className="system-engraving" d={queryMerged ? 'M5 0h5' : 'M5-5h5M5 0h5M5 5h5'} />
        </SystemEnclosure>
      );
      break;
    case 'router':
      model = (
        <SystemEnclosure
          width={24}
          depth={20}
          height={6}
          front={<path className="system-vent" d="M5 3h3m4 0h3m4 0h2" />}
        >
          <path className="system-engraving" d="M-8 0h6l5-5h5M-2 0l5 5h5" />
        </SystemEnclosure>
      );
      break;
    case 'itemService':
    case 'countService':
      model = (
        <SystemEnclosure
          width={34}
          depth={22}
          height={12}
          front={
            <>
              <rect x="3" y="1" width="18" height="10" rx="1" className="system-recess" />
              {port === 'countService' &&
              (phase === 'idle' ||
                phase === 'success' ||
                (cue?.returning && phase !== 'retrieve')) ? (
                <text
                  x="12"
                  y="9"
                  textAnchor="middle"
                  direction="ltr"
                  className="system-count-readout"
                >
                  {ACTIVITY_VIEWS[queryMerged ? 'merged' : 'all'].length}
                </text>
              ) : (
                <path className="system-fascia-mark" d="M7 6h10" />
              )}
              <circle cx="28" cy="6" r="2" className="system-work-light" />
            </>
          }
        >
          {port === 'itemService' ? (
            <>
              <path className="system-engraving" d="M-11-5h2m3 0H9M-11 0h2m3 0H6M-11 5h2m3 0H9" />
              <path className="system-service-scan" d="M-11 0H10" />
            </>
          ) : (
            <path className="system-engraving" d="m-4-7-3 14m12-14L2 7M-10-3H9M-11 3H8" />
          )}
        </SystemEnclosure>
      );
      break;
    case 'records':
      model = <RecordStore />;
      break;
    case 'index':
      model = (
        <SystemEnclosure
          width={39}
          depth={23}
          height={19}
          front={
            <>
              {[2, 10].map((y) => (
                <g key={y} transform={`translate(3 ${String(y)})`}>
                  <rect width="33" height="6.5" rx="1.3" className="system-recess" />
                  <path className="system-fascia-mark" d="M3 3h12" />
                  <circle cx="28" cy="3" r="1.3" className="system-work-light" />
                </g>
              ))}
            </>
          }
        >
          <path
            className="system-engraving"
            d="M-3-8h6v4h-6ZM0-4v3m-10 5v-5h20v5M-13 4h6v4h-6ZM7 4h6v4H7Z"
          />
          <path className="system-index-read" d="M0-4v3h10v5" />
        </SystemEnclosure>
      );
      break;
    case 'itemReader':
    case 'countReader':
      model = (
        <g>
          <ellipse rx="6" ry="3.5" className="system-inset" />
          <ellipse rx="2.5" ry="1.4" className="system-pin" />
        </g>
      );
      break;
    case 'filter':
      return null;
  }
  return (
    <g
      key={phase}
      data-port={port}
      data-working={activation !== undefined || undefined}
      style={
        activation === undefined
          ? undefined
          : ({ '--work-delay': String(activation) + 'ms' } as CSSProperties)
      }
      transform={`translate(${String(x)} ${String(y)})`}
    >
      {model}
      {(phase === 'fanout' || phase === 'merge' || phase === 'respond') &&
        (port === 'itemService' || port === 'countService') && (
          <g>
            <path d="M27-12h7" stroke="var(--plate-outline)" />
            <text
              className="system-branch-name"
              x="41"
              y="-8"
              direction={isRtl ? 'rtl' : 'ltr'}
              textAnchor={isRtl ? 'end' : 'start'}
            >
              {t(
                port === 'countService'
                  ? 'hero.system.paths.count'
                  : queryMerged
                    ? 'hero.system.paths.prs'
                    : 'hero.system.paths.activity',
              )}
            </text>
          </g>
        )}
    </g>
  );
};
