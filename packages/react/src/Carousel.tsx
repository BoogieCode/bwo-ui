'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface CarouselHandle {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Show prev/next navigation buttons. Default: true. */
  showArrows?: boolean;
  /** Show pagination dots. Default: true. */
  showDots?: boolean;
  /** Loop back to the start after the last slide / to the end before the first. Default: true. */
  loop?: boolean;
  /** Auto-advance interval in ms. Omit / 0 to disable. */
  autoplay?: number;
  /** Pause autoplay on hover. Default: true. */
  pauseOnHover?: boolean;
  /** Controlled active index (0-based). */
  index?: number;
  /** Initial uncontrolled index. */
  defaultIndex?: number;
  /** Called when the active index changes. */
  onIndexChange?: (index: number) => void;
  /** Accessible label for the region. */
  label?: string;
  /** Aspect ratio for slides (e.g. `'16 / 9'`). Sets `aspect-ratio` on the viewport. */
  aspectRatio?: string;
}

interface CarouselComponent
  extends React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<CarouselHandle>> {
  Item: typeof CarouselItem;
}

const _Carousel = forwardRef<CarouselHandle, CarouselProps>(function Carousel(
  {
    showArrows = true,
    showDots = true,
    loop = true,
    autoplay,
    pauseOnHover = true,
    index: controlledIndex,
    defaultIndex = 0,
    onIndexChange,
    label = 'Carousel',
    aspectRatio,
    className,
    children,
    style,
    onMouseEnter,
    onMouseLeave,
    ...props
  },
  ref,
) {
  const slides = Array.isArray(children) ? children.flat() : [children];
  const slideCount = slides.filter(Boolean).length;

  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const activeIndex = controlledIndex ?? internalIndex;
  const setActive = useCallback(
    (next: number) => {
      const clamped = loop
        ? ((next % slideCount) + slideCount) % slideCount
        : Math.max(0, Math.min(slideCount - 1, next));
      if (controlledIndex === undefined) setInternalIndex(clamped);
      onIndexChange?.(clamped);
    },
    [controlledIndex, loop, slideCount, onIndexChange],
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      next: () => setActive(activeIndex + 1),
      prev: () => setActive(activeIndex - 1),
      goTo: (i: number) => setActive(i),
    }),
    [activeIndex, setActive],
  );

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const target = vp.children[activeIndex] as HTMLElement | undefined;
    if (!target) return;
    vp.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  }, [activeIndex]);

  useEffect(() => {
    if (!autoplay || autoplay <= 0 || paused || slideCount <= 1) return;
    const id = window.setInterval(() => {
      setActive(activeIndex + 1);
    }, autoplay);
    return () => window.clearInterval(id);
  }, [autoplay, paused, activeIndex, setActive, slideCount]);

  return (
    <div
      className={cn('bwo-carousel', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (pauseOnHover) setPaused(true);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        if (pauseOnHover) setPaused(false);
      }}
      style={style}
      {...props}
    >
      <div
        ref={viewportRef}
        className="bwo-carousel-viewport"
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="bwo-carousel-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${slideCount}`}
            data-active={i === activeIndex || undefined}
          >
            {slide}
          </div>
        ))}
      </div>
      {showArrows && slideCount > 1 && (
        <>
          <button
            type="button"
            className="bwo-carousel-arrow bwo-carousel-arrow--prev"
            aria-label="Previous slide"
            disabled={!loop && activeIndex === 0}
            onClick={() => setActive(activeIndex - 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="bwo-carousel-arrow bwo-carousel-arrow--next"
            aria-label="Next slide"
            disabled={!loop && activeIndex === slideCount - 1}
            onClick={() => setActive(activeIndex + 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </>
      )}
      {showDots && slideCount > 1 && (
        <div className="bwo-carousel-dots" role="tablist" aria-label="Slide indicators">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}`}
              data-active={i === activeIndex || undefined}
              className="bwo-carousel-dot"
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {}

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(function CarouselItem(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn('bwo-carousel-item', className)} {...props} />;
});

export const Carousel = _Carousel as CarouselComponent;
Carousel.Item = CarouselItem;
