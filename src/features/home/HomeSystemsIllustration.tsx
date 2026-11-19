import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { useState } from 'react';

/**
 * Lets visitors explore the layers behind an interface.
 */
export const HomeSystemsIllustration = () => {
  const { t } = useAppTranslation();
  const layers = ['interface', 'platform', 'services'] as const;
  const [activeLayer, setActiveLayer] = useState<(typeof layers)[number]>('interface');

  return (
    <div className="home-system-explorer" aria-label={t('hero.system.caption')}>
      <div className="home-system-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="home-system-layers" aria-label={t('hero.system.caption')}>
        {layers.map((layer) => (
          <button
            aria-pressed={activeLayer === layer}
            className="home-system-layer"
            key={layer}
            onClick={() => setActiveLayer(layer)}
            type="button"
          >
            <span className="home-system-layer-dot" />
            <span>{t(`hero.system.${layer}`)}</span>
            <span className="home-system-layer-line" aria-hidden="true" />
          </button>
        ))}
      </div>
      <p className="home-system-explanation" aria-live="polite">
        {t(`hero.system.details.${activeLayer}`)}
      </p>
    </div>
  );
};
