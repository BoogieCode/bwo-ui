'use client';

import {
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';
import { cn } from './utils';

export interface AnimatedBeamProps {
  /** The relatively-positioned container the beam is drawn inside. */
  containerRef: RefObject<HTMLElement | null>;
  /** Element the beam starts from. */
  fromRef: RefObject<HTMLElement | null>;
  /** Element the beam ends at. */
  toRef: RefObject<HTMLElement | null>;
  /**
   * Bow of the curve in px. `0` is a straight line; positive values bow the
   * path upward (negative bows downward). Default: `0`.
   */
  curvature?: number;
  /** Reverse the direction the gradient travels along the path. */
  reverse?: boolean;
  /** Travel duration in seconds. Default: `3`. */
  duration?: number;
  /** Gradient leading colour. Default: `'#7c3aed'`. */
  gradientStartColor?: string;
  /** Gradient trailing colour. Default: `'#2563eb'`. */
  gradientStopColor?: string;
  /** Colour of the static base path. Default: `'rgba(0,0,0,.1)'`. */
  pathColor?: string;
  /** Stroke width of the path in px. Default: `2`. */
  pathWidth?: number;
  className?: string;
}

interface Geometry {
  width: number;
  height: number;
  path: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Draws an animated gradient beam (an SVG path) connecting two referenced
 * elements inside a shared container — ideal for "how it works" and
 * integration diagrams.
 *
 * The path is measured from the live element rects in an effect, so it is
 * SSR-safe (nothing is drawn until the refs resolve on the client) and it
 * recomputes on container resize and window resize.
 *
 * Respects `prefers-reduced-motion`: when reduced motion is requested the
 * gradient is anchored statically instead of travelling along the path.
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  gradientStartColor = '#7c3aed',
  gradientStopColor = '#2563eb',
  pathColor = 'rgba(0,0,0,.1)',
  pathWidth = 2,
  className,
}: AnimatedBeamProps) {
  const rawId = useId();
  const gradientId = `bwo-beam-${rawId.replace(/[:]/g, '')}`;

  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Track the reduced-motion preference (client only).
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Measure the geometry from the live element rects.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const from = fromRef.current;
      const to = toRef.current;
      if (!from || !to) return;

      const containerRect = container.getBoundingClientRect();
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();

      const width = containerRect.width;
      const height = containerRect.height;

      const startX = fromRect.left - containerRect.left + fromRect.width / 2;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2;
      const endX = toRect.left - containerRect.left + toRect.width / 2;
      const endY = toRect.top - containerRect.top + toRect.height / 2;

      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 - curvature;

      const path = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;

      setGeometry((prev) => {
        if (
          prev &&
          prev.width === width &&
          prev.height === height &&
          prev.path === path
        ) {
          return prev;
        }
        return { width, height, path };
      });
    };

    measure();

    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(container);
    window.addEventListener('resize', measure);

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  // Nothing measured yet (SSR / first paint before refs resolve).
  if (!geometry) return null;

  const animate = !reducedMotion && !prefersReducedMotion();

  // The gradient is a short window that travels across the bounding box.
  // Animating x1/x2 of an objectBoundingBox gradient sweeps it along the path.
  const startOffsets = reverse ? [1.1, 1, 0, -0.1] : [-0.1, 0, 1, 1.1];

  const svgStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    transform: 'translateZ(0)',
  };

  return (
    <svg
      aria-hidden="true"
      className={cn('bwo-animated-beam', className)}
      width={geometry.width}
      height={geometry.height}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      fill="none"
      style={svgStyle}
    >
      {/* Static base path. */}
      <path
        d={geometry.path}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        fill="none"
      />
      {/* Animated gradient overlay. */}
      <path
        d={geometry.path}
        stroke={`url(#${gradientId})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        strokeOpacity={1}
        fill="none"
      />
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="objectBoundingBox"
          x1={animate ? undefined : reverse ? '1' : '0'}
          x2={animate ? undefined : reverse ? '0.9' : '0.1'}
          y1="0"
          y2="0"
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="0.5" stopColor={gradientStartColor} />
          <stop offset="1" stopColor={gradientStopColor} stopOpacity="0" />
          {animate && (
            <>
              <animate
                attributeName="x1"
                values={startOffsets.map((o) => `${o}`).join(';')}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values={startOffsets.map((o) => `${o + 0.1}`).join(';')}
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </>
          )}
        </linearGradient>
      </defs>
    </svg>
  );
}
