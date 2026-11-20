import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { useId } from 'react';
import { SystemStack } from './SystemStack';
import { SYSTEM_VIEWBOX } from './home-system-geometry.constants';
import { socketPosition } from './home-system-geometry.utils';
import { ACTIVITY_VIEWS, REQUEST_STEPS, SYSTEM_LAYERS } from './home-system.constants';
import { useActivityFilter } from './use-activity-filter.hook';

const filterPort = socketPosition('filter');
const buttonPosition = {
  left: String((filterPort.x / SYSTEM_VIEWBOX.width) * 100) + '%',
  top: String((filterPort.y / SYSTEM_VIEWBOX.height) * 100) + '%',
};

/**
 * A filterable activity feed and the layers responsible for its contents.
 */
export const HomeSystemsIllustration = () => {
  const { t } = useAppTranslation();
  const { phase, mergedOnly, hasStarted, toggleFilter } = useActivityFilter();
  const descriptionId = useId();
  const activeLayer = phase === 'idle' ? undefined : REQUEST_STEPS[phase].layer;
  const busy = phase !== 'idle' && phase !== 'success';
  const view = mergedOnly ? 'merged' : 'all';
  const summary = t(`hero.system.views.${view}`, { count: ACTIVITY_VIEWS[view].length });
  const action = mergedOnly ? 'showAll' : 'showMerged';
  return (
    <figure
      className="system-figure"
      aria-label={t('hero.system.title')}
      data-phase={phase}
      data-focus={activeLayer}
    >
      <SystemStack phase={phase} mergedOnly={mergedOnly} />
      <button
        type="button"
        className="system-sync"
        style={buttonPosition}
        onClick={toggleFilter}
        aria-label={t(`hero.system.actions.${action}`)}
        aria-disabled={phase !== 'idle'}
        aria-describedby={descriptionId}
      >
        <span className="system-filter-face">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mergedOnly ? (
              <path d="M3 4h10M3 8h10M3 12h10" />
            ) : (
              <path d="M2 3h12L9.5 8v4l-3 1V8Z" />
            )}
          </svg>
          {t(`hero.system.buttons.${action}`)}
        </span>
      </button>
      <figcaption>
        <p id={descriptionId} className="sr-only">
          {t('hero.system.description')}
        </p>
        <ul className="sr-only">
          {ACTIVITY_VIEWS[view].slice(0, 2).map(({ kind, id }) => (
            <li key={id}>{t(`hero.system.events.${kind}`, { id })}</li>
          ))}
        </ul>
        <ol>
          {SYSTEM_LAYERS.map((layer) => (
            <li
              key={layer}
              aria-current={layer === activeLayer ? 'step' : undefined}
              className={`system-label system-label--${layer}`}
            >
              {t(`hero.system.${layer}`)}
            </li>
          ))}
        </ol>
        {!hasStarted && (
          <p className="system-operation system-invitation">
            {t('hero.system.invitation', { filter: t('hero.system.buttons.showMerged') })}
          </p>
        )}
        {busy && (
          <p className="system-operation" aria-hidden="true">
            {t(`hero.system.steps.${phase}`)}
          </p>
        )}
        <span className="sr-only" role="status">
          {busy ? t('hero.system.loading') : summary}
        </span>
      </figcaption>
    </figure>
  );
};
