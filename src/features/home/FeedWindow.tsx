import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { ACTIVITY_VIEWS } from './home-system.constants';
import type { FeedWindowProps } from './home-system.type';

/**
 * Shows the first two results of the applied query inside the same window.
 */
export const FeedWindow = ({ mergedOnly, busy }: FeedWindowProps) => {
  const { t, isRtl } = useAppTranslation();
  const view = mergedOnly ? 'merged' : 'all';
  const rows = ACTIVITY_VIEWS[view].slice(0, 2);
  return (
    <>
      <path d="M1 25h246M18 73h211" stroke="var(--plate-outline)" opacity=".6" />
      <g fill="var(--plate-ink)" opacity=".55">
        <circle cx="15" cy="13" r="2.3" />
        <circle cx="24" cy="13" r="2.3" />
        <circle cx="33" cy="13" r="2.3" />
      </g>
      <path d="M211 10h13v6h-13Z" stroke="var(--plate-outline)" strokeWidth="1.4" />
      <text
        x={isRtl ? 91 : 19}
        y="54"
        direction={isRtl ? 'rtl' : 'ltr'}
        className="system-toolbar-title"
      >
        {busy
          ? t('hero.system.loading')
          : t(`hero.system.views.${view}`, { count: ACTIVITY_VIEWS[view].length })}
      </text>
      <g key={view} data-view={view} className="system-feed-content">
        {rows.map(({ id, kind }, index) => (
          <g
            key={id}
            transform={`translate(19 ${String(84 + index * 25)})`}
            opacity={index === 0 ? 1 : 0.72}
          >
            <rect width="18" height="18" rx="4" className="system-feed-tile" />
            <g className="system-feed-icon">
              {kind === 'review' ? (
                <path d="M4 4h10v7H8l-3 3v-3H4Z" />
              ) : kind === 'merge' ? (
                <>
                  <path d="M5 7v6m8 0v-1q0-3-4-3H5m-2-1 2-3 2 3" />
                  <circle cx="5" cy="4" r="1.5" />
                  <circle cx="5" cy="14" r="1.5" />
                  <circle cx="13" cy="14" r="1.5" />
                </>
              ) : (
                <>
                  <circle cx="9" cy="9" r="5" />
                  <path d="M9 7v3" />
                </>
              )}
            </g>
            <text
              x={isRtl ? 112 : 24}
              y="11.5"
              direction={isRtl ? 'rtl' : 'ltr'}
              className="system-event-title"
            >
              {t(`hero.system.events.${kind}`, { id })}
            </text>
            <path
              d={isRtl ? 'M111 17H90m-4 0H76' : 'M24 17h21m4 0h10'}
              stroke="var(--plate-outline)"
              strokeWidth="1.6"
            />
          </g>
        ))}
      </g>
    </>
  );
};
