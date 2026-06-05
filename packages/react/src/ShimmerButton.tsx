'use client';

import {
  forwardRef,
  useInsertionEffect,
  type ButtonHTMLAttributes,
  type CSSProperties,
} from 'react';
import { cn } from './utils';

export interface ShimmerButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color of the traveling shimmer highlight. */
  shimmerColor?: string;
  /** Button surface (behind the shimmer border). Defaults to a dark token. */
  background?: string;
  /** Duration of one full shimmer sweep, in seconds. */
  shimmerDuration?: number;
  /** Corner radius. Numbers are treated as pixels. */
  borderRadius?: number | string;
  /**
   * Size of the shimmer band as a fraction of a full turn (0–1). Smaller
   * values give a tighter, brighter highlight. Default 0.1.
   */
  shimmerWidth?: number;
}

const STYLE_ID = 'bwo-shimmer-button-styles';

const STYLES = `
@property --bwo-shimmer-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes bwo-shimmer-spin {
  to {
    --bwo-shimmer-angle: 360deg;
  }
}

.bwo-shimmer-btn {
  position: relative;
  z-index: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 0.75em 1.5em;
  border: none;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  color: #fff;
  background: var(--bwo-shimmer-bg);
  border-radius: var(--bwo-shimmer-radius);
  font: inherit;
  font-weight: 600;
  line-height: 1.2;
  isolation: isolate;
  transition: transform 0.12s ease;
}

/* Rotating conic-gradient ring that forms the traveling border highlight. */
.bwo-shimmer-btn::before {
  content: '';
  position: absolute;
  z-index: -2;
  inset: 0;
  border-radius: inherit;
  padding: var(--bwo-shimmer-border, 1.5px);
  background: conic-gradient(
    from var(--bwo-shimmer-angle),
    transparent 0%,
    var(--bwo-shimmer-color) var(--bwo-shimmer-band),
    transparent calc(var(--bwo-shimmer-band) * 2)
  );
  /* Mask so the gradient only paints the 1.5px border ring. */
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: bwo-shimmer-spin var(--bwo-shimmer-duration) linear infinite;
}

/* Solid inner surface so only the ring shows the shimmer. */
.bwo-shimmer-btn::after {
  content: '';
  position: absolute;
  z-index: -1;
  inset: var(--bwo-shimmer-border, 1.5px);
  border-radius: inherit;
  background: var(--bwo-shimmer-bg);
}

.bwo-shimmer-btn:hover {
  transform: translateY(-1px);
}

.bwo-shimmer-btn:active {
  transform: translateY(0);
}

.bwo-shimmer-btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .bwo-shimmer-btn::before {
    animation: none;
    /* Static, fully visible ring when motion is reduced. */
    background: var(--bwo-shimmer-color);
  }
}
`;

let injected = false;

function useShimmerStyles() {
  // useInsertionEffect runs before layout effects and is the correct place to
  // inject style rules. On the server it is a no-op (SSR-safe); the styles are
  // injected on the client during hydration. Guarded by id + module flag so the
  // <style> is added at most once regardless of how many buttons mount.
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

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  function ShimmerButton(
    {
      shimmerColor = 'rgba(255,255,255,0.9)',
      background = 'var(--bwo-text, #141414)',
      shimmerDuration = 2.5,
      borderRadius = 999,
      shimmerWidth = 0.1,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) {
    useShimmerStyles();

    const radius =
      typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
    // Convert the band fraction (0–1 of a turn) into a percentage of the
    // conic-gradient sweep, clamped to a sane range.
    const bandPct = `${Math.min(Math.max(shimmerWidth, 0.01), 0.5) * 100}%`;

    const cssVars = {
      '--bwo-shimmer-color': shimmerColor,
      '--bwo-shimmer-bg': background,
      '--bwo-shimmer-duration': `${shimmerDuration}s`,
      '--bwo-shimmer-radius': radius,
      '--bwo-shimmer-band': bandPct,
    } as CSSProperties;

    return (
      <button
        ref={ref}
        className={cn('bwo-shimmer-btn', className)}
        style={{ ...cssVars, ...style }}
        {...props}
      >
        {children}
      </button>
    );
  },
);
