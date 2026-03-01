import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Picture } from '@components/Picture';
import { Text } from '@components/Text';
import { useAppTranslation } from '@i18n/use-app-translation.hook';
import { Suspense, useRef, useState, type CSSProperties } from 'react';
import { Await, Link } from 'react-router';
import { SLIDE_IMAGE_CONFIGS } from './home-community-contribution-slider.constants';
import type {
  HandleSliderPointerDownInputType,
  HandleSliderPointerPositionInputType,
  HomeCommunityContributionSliderPropsType,
  RenderFeedContentInputType,
  RenderSlideIllustrationInputType,
  RenderSlideTitleInputType,
} from './home-community-contribution-slider.type';
import { isInteractivePointerTarget } from './home-community-contribution-slider.utils';
import { HOME_COMMUNITY_CONTRIBUTION_ITEMS } from './home-community-contribution.constants';

/**
 * Home slider section inspired by product showcase carousels.
 */
export const HomeCommunityContributionSlider = ({
  communityContributionFeedsPromise,
}: HomeCommunityContributionSliderPropsType) => {
  const { t, currentLanguage } = useAppTranslation();
  const isRtl = currentLanguage === 'fa';
  const slideCount = HOME_COMMUNITY_CONTRIBUTION_ITEMS.length;
  const hasMultipleSlides = slideCount > 1;
  const pointerStartXRef = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const pointerThreshold = 36;
  const pointerDragStartThreshold = 10;
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(
    Math.floor(HOME_COMMUNITY_CONTRIBUTION_ITEMS.length / 2),
  );
  const activeSlide = HOME_COMMUNITY_CONTRIBUTION_ITEMS[activeTrackIndex];

  const moveToPreviousSlide = (): void => {
    if (!hasMultipleSlides) {
      return;
    }

    setActiveTrackIndex((currentValue) => (currentValue === 0 ? slideCount - 1 : currentValue - 1));
  };

  const moveToNextSlide = (): void => {
    if (!hasMultipleSlides) {
      return;
    }

    setActiveTrackIndex((currentValue) => (currentValue === slideCount - 1 ? 0 : currentValue + 1));
  };

  const slides = HOME_COMMUNITY_CONTRIBUTION_ITEMS.map((slide, index) => {
    return {
      index,
      slide,
    };
  });

  const renderSlideTitle = ({ slide }: RenderSlideTitleInputType) => {
    if (slide.to !== undefined) {
      return (
        <Link className="home-slider-title-link" prefetch="intent" to={slide.to}>
          <Text as="span" weight="semibold">
            {t(slide.titleKey)}
          </Text>
        </Link>
      );
    }

    if (slide.href === undefined) {
      return (
        <Text as="span" className="home-slider-title-link" weight="semibold">
          {t(slide.titleKey)}
        </Text>
      );
    }

    return (
      <Text as="a" className="home-slider-title-link" externalLink href={slide.href}>
        {t(slide.titleKey)}
      </Text>
    );
  };

  const renderFeedContent = ({ items }: RenderFeedContentInputType) => {
    if (items.length === 0) {
      return (
        <Text as="p" className="home-slider-feed-unavailable">
          {t('hero.slider.feedUnavailable')}
        </Text>
      );
    }

    return (
      <ul className="home-slider-feed-list">
        {items.slice(0, 2).map((item) => {
          return (
            <li key={item.id}>
              {item.url === undefined ? (
                <Text>{item.title}</Text>
              ) : (
                <Text as="a" externalLink href={item.url}>
                  {item.title}
                </Text>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderSlideIllustration = ({ slide }: RenderSlideIllustrationInputType) => {
    const imageConfig = SLIDE_IMAGE_CONFIGS[slide.id];

    if (imageConfig === undefined) {
      return <Text>{t(slide.illustrationLabelKey)}</Text>;
    }

    const sources = [
      {
        srcSet: `${imageConfig.basePath}.avif`,
        type: 'image/avif',
      },
      {
        srcSet: `${imageConfig.basePath}.webp`,
        type: 'image/webp',
      },
    ];

    if (imageConfig.isThemeCombined === true) {
      return (
        <Box as="div" className="home-slider-picture-combined">
          <Picture
            className="home-slider-picture-combined-layer home-slider-picture-combined-layer-light"
            image={{
              alt: `${imageConfig.alt} light`,
              decoding: 'async',
              loading: 'lazy',
              src: `${imageConfig.basePath}.jpg`,
            }}
            imageClassName="home-slider-picture-combined-image home-slider-picture-combined-image-light"
            sources={sources}
          />
          <Picture
            className="home-slider-picture-combined-layer home-slider-picture-combined-layer-dark"
            image={{
              alt: `${imageConfig.alt} dark`,
              decoding: 'async',
              loading: 'lazy',
              src: `${imageConfig.basePath}.jpg`,
            }}
            imageClassName="home-slider-picture-combined-image home-slider-picture-combined-image-dark"
            sources={sources}
          />
        </Box>
      );
    }

    return (
      <Picture
        className="home-slider-picture"
        image={{
          alt: imageConfig.alt,
          decoding: 'async',
          loading: 'lazy',
          src: `${imageConfig.basePath}.jpg`,
        }}
        imageClassName="home-slider-picture-image"
        sources={sources}
      />
    );
  };

  const handlePointerDown = ({ clientX, pointerId }: HandleSliderPointerDownInputType): void => {
    pointerStartXRef.current = clientX;
    pointerIdRef.current = pointerId;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handlePointerMove = ({ clientX }: HandleSliderPointerPositionInputType): void => {
    const startX = pointerStartXRef.current;

    if (startX === null) {
      return;
    }

    const nextDragOffset = clientX - startX;

    if (Math.abs(nextDragOffset) >= pointerDragStartThreshold) {
      setIsDragging(true);
    }

    setDragOffset(nextDragOffset);
  };

  const handlePointerUp = ({ clientX }: HandleSliderPointerPositionInputType): void => {
    setIsDragging(false);

    if (!hasMultipleSlides) {
      pointerStartXRef.current = null;
      pointerIdRef.current = null;
      setDragOffset(0);
      return;
    }

    const startX = pointerStartXRef.current;

    if (startX === null) {
      return;
    }

    const deltaX = clientX - startX;
    pointerStartXRef.current = null;
    pointerIdRef.current = null;
    setDragOffset(0);

    if (Math.abs(deltaX) < pointerThreshold) {
      return;
    }

    const didSwipeLeft = deltaX < 0;

    if (isRtl) {
      if (didSwipeLeft) {
        moveToNextSlide();
        return;
      }

      moveToPreviousSlide();
      return;
    }

    if (didSwipeLeft) {
      moveToNextSlide();
      return;
    }

    moveToPreviousSlide();
  };

  return (
    <Box as="section" className="pt-8">
      <Box className="mb-3">
        <Text as="h2" className="text-2xl tracking-tight md:text-3xl" weight="medium">
          {t('hero.slider.title')}
        </Text>
      </Box>

      <Text as="p" className="max-w-4xl leading-relaxed md:text-base" size="sm" tone="muted">
        {t('hero.slider.description')}
      </Text>

      <Box
        className={`home-slider-stage mt-6 ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={(event) => {
          if (!hasMultipleSlides) {
            return;
          }

          if (
            isInteractivePointerTarget({
              path: event.nativeEvent.composedPath(),
              target: event.target,
            })
          ) {
            return;
          }

          handlePointerDown({ clientX: event.clientX, pointerId: event.pointerId });
        }}
        onPointerMove={(event) => {
          if (pointerIdRef.current !== event.pointerId) {
            return;
          }

          handlePointerMove({ clientX: event.clientX });
        }}
        onPointerUp={(event) => {
          if (pointerIdRef.current !== event.pointerId) {
            return;
          }

          handlePointerUp({ clientX: event.clientX });
        }}
        onPointerCancel={() => {
          pointerStartXRef.current = null;
          pointerIdRef.current = null;
          setDragOffset(0);
          setIsDragging(false);
        }}
        style={
          {
            '--drag-offset': `${String(dragOffset)}px`,
            '--track-index': String(activeTrackIndex),
          } as CSSProperties
        }
      >
        <Box className="home-slider-track">
          {slides.map(({ slide, index }) => {
            const isActive = index === activeTrackIndex;
            const shouldShowFeed = isActive && slide.feedProvider !== 'none';
            const shouldExpandIllustration = !shouldShowFeed;

            return (
              <Box
                as="article"
                className={`home-slider-card ${isActive ? 'is-active' : ''}`}
                key={slide.id}
              >
                <Box as="header" className="home-slider-card-header">
                  {renderSlideTitle({ slide })}
                </Box>
                <Text as="p" className="home-slider-subtitle" tone="muted" size="sm">
                  {t(slide.subtitleKey)}
                </Text>

                <Box
                  aria-hidden
                  className={`home-slider-illustration ${shouldExpandIllustration ? 'home-slider-illustration--expanded' : ''}`}
                >
                  {renderSlideIllustration({ slide })}
                </Box>

                {shouldShowFeed ? (
                  <Box className="home-slider-feed">
                    <Text as="p" className="home-slider-feed-title">
                      {t('hero.slider.feedTitle')}
                    </Text>
                    <Suspense
                      fallback={
                        <ul className="home-slider-feed-list home-slider-feed-list-skeleton">
                          <li />
                          <li />
                        </ul>
                      }
                    >
                      <Await resolve={communityContributionFeedsPromise}>
                        {(feeds) => {
                          const activeItems =
                            activeSlide === undefined ? [] : (feeds[activeSlide.id] ?? []);

                          return renderFeedContent({ items: activeItems });
                        }}
                      </Await>
                    </Suspense>
                  </Box>
                ) : null}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box className="mt-4 flex items-center justify-center gap-2">
        <Button
          aria-label={t('hero.slider.previous')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--card-border) bg-(--background)/55 text-sm transition hover:border-(--accent) hover:text-(--accent)"
          disabled={!hasMultipleSlides}
          onClick={isRtl ? moveToNextSlide : moveToPreviousSlide}
          size="none"
          variant="unstyled"
        >
          {isRtl ? '→' : '←'}
        </Button>
        <Button
          aria-label={t('hero.slider.next')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--card-border) bg-(--background)/55 text-sm transition hover:border-(--accent) hover:text-(--accent)"
          disabled={!hasMultipleSlides}
          onClick={isRtl ? moveToPreviousSlide : moveToNextSlide}
          size="none"
          variant="unstyled"
        >
          {isRtl ? '←' : '→'}
        </Button>
      </Box>
    </Box>
  );
};
