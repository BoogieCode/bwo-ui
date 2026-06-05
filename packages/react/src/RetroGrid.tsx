'use client';

import {
  forwardRef,
  useInsertionEffect,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';
import { cn } from './utils';

export interface RetroGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Perspective tilt of the grid plane, in degrees. Default 65. */
  angle?: number;
  /** Grid cell size, in pixels. Default 60. */
  cellSize?: number;
  /** Overall opacity of the grid layer (0–1). Default 0.5. */
  opacity?: number;
  /** Line color. Default `'var(--bwo-accent,#7c3aed)'`. */
  color?: string;
  /** Seconds per scroll loop. Default 12. */
  speed?: number;
}

const STYLE_ID = 'bwo-retro-grid-styles';

const STYLES = `
@keyframes bwo-retro-grid-scroll {
  to {
    transform: translateY(var(--bwo-retro-cell));
  }
}

.bwo-retro-grid {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: var(--bwo-retro-opacity, 0.5);
  /* Establishes the perspective vanishing point near the top (horizon). */
  perspective: 200px;
}

/* The tilted, scrolling grid plane. */
.bwo-retro-grid__plane {
  position: absolute;
  /* Oversized and pushed below so the tilted plane fills the viewport. */
  inset: 0% -50% 0% -50%;
  transform: rotateX(var(--bwo-retro-angle, 65deg));
  transform-origin: 100% 0%;
}

.bwo-retro-grid__plane::before {
  content: '';
  position: absolute;
  inset: -200% 0% 0% 0%;
  background-image:
    linear-gradient(
      to right,
      var(--bwo-retro-color, #7c3aed) 1px,
      transparent 0
    ),
    linear-gradient(
      to bottom,
      var(--bwo-retro-color, #7c3aed) 1px,
      transparent 0
    );
  background-size: var(--bwo-retro-cell, 60px) var(--bwo-retro-cell, 60px);
  background-repeat: repeat;
  animation: bwo-retro-grid-scroll var(--bwo-retro-speed, 12s) linear infinite;
}

/* Fade the grid toward the top (horizon). */
.bwo-retro-grid::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    transparent 0%,
    var(--bwo-bg, #fff) 90%
  );
}

@media (prefers-reduced-motion: reduce) {
  .bwo-retro-grid__plane::before {
    animation: none;
  }
}
`;

let injected = false;

function useRetroGridStyles() {
  // useInsertionEffect runs before layout effects and is the correct place to
  // inject style rules. On the server it is a no-op (SSR-safe); the styles are
  // injected on the client during hydration. Guarded by id + module flag so the
  // <style> is added at most once regardless of how many grids mount.
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

export const RetroGrid = forwardRef<HTMLDivElement, RetroGridProps>(
  function RetroGrid(
    {
      angle = 65,
      cellSize = 60,
      opacity = 0.5,
      color = 'var(--bwo-accent,#7c3aed)',
      speed = 12,
      className,
      style,
      ...props
    },
    ref,
  ) {
    useRetroGridStyles();

    const cssVars = {
      '--bwo-retro-angle': `${angle}deg`,
      '--bwo-retro-cell': `${cellSize}px`,
      '--bwo-retro-opacity': opacity,
      '--bwo-retro-color': color,
      '--bwo-retro-speed': `${speed}s`,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn('bwo-retro-grid', className)}
        style={{ ...cssVars, ...style }}
        {...props}
      >
        <div className="bwo-retro-grid__plane" />
      </div>
    );
  },
);
