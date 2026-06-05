'use client';

import {
  Children,
  forwardRef,
  useInsertionEffect,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface OrbitingCirclesProps extends HTMLAttributes<HTMLDivElement> {
  /** Orbit radius in pixels — distance from center to each child. Default 120. */
  radius?: number;
  /** Seconds for one full orbit. Default 20. */
  duration?: number;
  /** Animation delay in seconds. Default 0. */
  delay?: number;
  /** Orbit counter-clockwise when true. Default false. */
  reverse?: boolean;
  /** Draw the circular orbit ring. Default true. */
  path?: boolean;
  /** Size (width/height) of each orbiting child in pixels. Default 40. */
  iconSize?: number;
  children?: ReactNode;
}

const STYLE_ID = 'bwo-orbiting-circles-styles';

const STYLES = `
@keyframes bwo-orbit {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bwo-orbit-reverse {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes bwo-orbit-counter {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes bwo-orbit-counter-reverse {
  to {
    transform: rotate(360deg);
  }
}

.bwo-orbit {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--bwo-orbit-size);
  height: var(--bwo-orbit-size);
}

.bwo-orbit__ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--bwo-orbit-size);
  height: var(--bwo-orbit-size);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.bwo-orbit__ring circle {
  fill: none;
  stroke: var(--bwo-orbit-ring-color, rgba(0, 0, 0, 0.1));
  stroke-width: var(--bwo-orbit-ring-width, 1);
  stroke-dasharray: var(--bwo-orbit-ring-dash, 4 4);
}

/* Slot wrapper holds each child's static starting angle around the circle.
   The spinning lives on the inner __item so the keyframe transform here is
   never clobbered. */
.bwo-orbit__slot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--bwo-orbit-icon-size);
  height: var(--bwo-orbit-icon-size);
  transform: translate(-50%, -50%) rotate(var(--bwo-orbit-angle, 0deg));
}

/* Continuous orbit spin. transform-origin at center keeps the rotation about
   the shared center point. */
.bwo-orbit__item {
  width: 100%;
  height: 100%;
  transform-origin: center center;
  animation: bwo-orbit var(--bwo-orbit-duration) linear infinite;
  animation-delay: var(--bwo-orbit-delay);
}

.bwo-orbit__item--reverse {
  animation-name: bwo-orbit-reverse;
}

/* Static radial offset — pushes the icon out to the orbit radius. Kept on its
   own element so the counter-rotation animation below never clobbers it. */
.bwo-orbit__offset {
  width: 100%;
  height: 100%;
  transform: translateY(calc(var(--bwo-orbit-radius) * -1));
}

/* Counter-rotates against the orbit spin so the icon stays visually upright. */
.bwo-orbit__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  animation: bwo-orbit-counter var(--bwo-orbit-duration) linear infinite;
  animation-delay: var(--bwo-orbit-delay);
}

.bwo-orbit__icon--reverse {
  animation-name: bwo-orbit-counter-reverse;
}

@media (prefers-reduced-motion: reduce) {
  .bwo-orbit__item,
  .bwo-orbit__icon {
    animation: none;
  }
}
`;

let injected = false;

function useOrbitStyles() {
  // useInsertionEffect runs before layout effects and is the correct place to
  // inject style rules. On the server it is a no-op (SSR-safe); the styles are
  // injected on the client during hydration. Guarded by id + module flag so the
  // <style> is added at most once regardless of how many instances mount.
  useInsertionEffect(() => {
    if (injected || typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) {
      injected = true;
      return;
    }
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = STYLES;
    document.head.appendChild(el);
    injected = true;
  }, []);
}

export const OrbitingCircles = forwardRef<HTMLDivElement, OrbitingCirclesProps>(
  function OrbitingCircles(
    {
      radius = 120,
      duration = 20,
      delay = 0,
      reverse = false,
      path = true,
      iconSize = 40,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) {
    useOrbitStyles();

    const items = Children.toArray(children);
    const count = items.length;
    // Container spans the full orbit diameter plus one icon so children never
    // clip at the edges.
    const size = radius * 2 + iconSize;

    const cssVars = {
      '--bwo-orbit-size': `${size}px`,
      '--bwo-orbit-radius': `${radius}px`,
      '--bwo-orbit-icon-size': `${iconSize}px`,
      '--bwo-orbit-duration': `${duration}s`,
      '--bwo-orbit-delay': `${delay}s`,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        className={cn('bwo-orbit', className)}
        style={{ ...cssVars, ...style }}
        {...props}
      >
        {path && (
          <svg
            className="bwo-orbit__ring"
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden="true"
          >
            <circle cx={size / 2} cy={size / 2} r={radius} />
          </svg>
        )}
        {items.map((child, i) => {
          // Evenly distribute slots around the circle. Each item rotates to its
          // angle; the inner icon is offset outward by the radius and
          // counter-rotates so it stays upright.
          const angle = count > 0 ? (360 / count) * i : 0;
          return (
            <div
              key={i}
              className="bwo-orbit__slot"
              style={{ ['--bwo-orbit-angle' as never]: `${angle}deg` }}
            >
              <div
                className={cn(
                  'bwo-orbit__item',
                  reverse && 'bwo-orbit__item--reverse',
                )}
              >
                <div className="bwo-orbit__offset">
                  <div
                    className={cn(
                      'bwo-orbit__icon',
                      reverse && 'bwo-orbit__icon--reverse',
                    )}
                  >
                    {child}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
