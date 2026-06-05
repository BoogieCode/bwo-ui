'use client';

import {
  forwardRef,
  useInsertionEffect,
  type HTMLAttributes,
  type CSSProperties,
} from 'react';
import { cn } from './utils';

export interface BorderBeamProps extends HTMLAttributes<HTMLDivElement> {
  /** Length of the traveling beam, in pixels. Default 80. */
  size?: number;
  /** Duration of one full lap around the border, in seconds. Default 8. */
  duration?: number;
  /** Delay before the beam starts, in seconds. Default 0. */
  delay?: number;
  /** Beam gradient start color. Default `var(--bwo-accent,#7c3aed)`. */
  colorFrom?: string;
  /** Beam gradient end color. Default `#2563eb`. */
  colorTo?: string;
  /** Thickness of the border the beam travels along, in pixels. Default 1.5. */
  borderWidth?: number;
  /** Corner radius. Numbers are pixels; defaults to `'inherit'`. */
  borderRadius?: number | string;
}

const STYLE_ID = 'bwo-border-beam-styles';

const STYLES = `
@property --bwo-beam-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes bwo-border-beam-spin {
  to {
    --bwo-beam-angle: 360deg;
  }
}

.bwo-border-beam {
  position: relative;
  border-radius: var(--bwo-beam-radius);
}

/* The rotating conic gradient masked to the border ring. The beam is a short
   bright band on an otherwise transparent ring, so it reads as a light
   traveling around the perimeter. */
.bwo-border-beam::after {
  content: '';
  position: absolute;
  z-index: 0;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  padding: var(--bwo-beam-border, 1.5px);
  background: conic-gradient(
    from var(--bwo-beam-angle),
    transparent 0%,
    var(--bwo-beam-from) var(--bwo-beam-band),
    var(--bwo-beam-to) calc(var(--bwo-beam-band) * 2),
    transparent calc(var(--bwo-beam-band) * 2 + 0.1%)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: bwo-border-beam-spin var(--bwo-beam-duration) linear infinite;
  animation-delay: var(--bwo-beam-delay, 0s);
}

/* Children sit above the beam ring. */
.bwo-border-beam > * {
  position: relative;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .bwo-border-beam::after {
    animation: none;
    /* Static, full gradient border when motion is reduced. */
    background: linear-gradient(
      to right,
      var(--bwo-beam-from),
      var(--bwo-beam-to)
    );
  }
}
`;

let injected = false;

function useBorderBeamStyles() {
  // useInsertionEffect runs before layout effects and is the correct place to
  // inject style rules. On the server it is a no-op (SSR-safe); the styles are
  // injected on the client during hydration. Guarded by id + module flag so the
  // <style> is added at most once regardless of how many beams mount.
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

export const BorderBeam = forwardRef<HTMLDivElement, BorderBeamProps>(
  function BorderBeam(
    {
      size = 80,
      duration = 8,
      delay = 0,
      colorFrom = 'var(--bwo-accent,#7c3aed)',
      colorTo = '#2563eb',
      borderWidth = 1.5,
      borderRadius = 'inherit',
      className,
      children,
      style,
      ...props
    },
    ref,
  ) {
    useBorderBeamStyles();

    const radius =
      typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
    // Approximate the beam length (in px) as a fraction of one conic turn.
    // The perimeter scales with the element, so we map `size` to a band width
    // relative to a nominal turn and clamp to a sane visible range.
    const bandPct = `${Math.min(Math.max(size / 360, 0.01), 0.5) * 100}%`;

    const cssVars = {
      '--bwo-beam-from': colorFrom,
      '--bwo-beam-to': colorTo,
      '--bwo-beam-duration': `${duration}s`,
      '--bwo-beam-delay': `${delay}s`,
      '--bwo-beam-border': `${borderWidth}px`,
      '--bwo-beam-radius': radius,
      '--bwo-beam-band': bandPct,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        className={cn('bwo-border-beam', className)}
        style={{ ...cssVars, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
