'use client';

import { forwardRef, useId, type CSSProperties } from 'react';
import { cn } from './utils';

export interface DotPatternProps {
  /** Dot spacing in px (the grid pitch). Default: 24. */
  size?: number;
  /** Radius of each dot in px. Default: 1.5. */
  radius?: number;
  /** Dot colour. Default: `'currentColor'`. */
  color?: string;
  /** Pattern opacity, 0–1. Default: 0.15. */
  opacity?: number;
  /**
   * Edge fade applied via a CSS mask gradient. Default: `'none'`.
   * - `'edges'`  — fade out toward all four edges (radial-ish)
   * - `'top'`    — solid at bottom, fades toward the top
   * - `'bottom'` — solid at top, fades toward the bottom
   * - `'radial'` — fade out from centre to edges
   */
  fade?: 'none' | 'edges' | 'top' | 'bottom' | 'radial';
  className?: string;
  style?: CSSProperties;
}

function maskValue(fade: NonNullable<DotPatternProps['fade']>): string | undefined {
  switch (fade) {
    case 'top':
      return 'linear-gradient(to top, #000 0%, transparent 100%)';
    case 'bottom':
      return 'linear-gradient(to bottom, #000 0%, transparent 100%)';
    case 'edges':
      return 'radial-gradient(ellipse at center, #000 50%, transparent 100%)';
    case 'radial':
      return 'radial-gradient(circle at center, #000 0%, transparent 75%)';
    case 'none':
    default:
      return undefined;
  }
}

/**
 * Full-cover decorative dot-grid SVG background. Absolutely positioned
 * (`inset: 0`, `pointer-events: none`) so it sits behind content inside any
 * `position: relative` container — ideal for hero/section backdrops.
 *
 * SSR-safe: the pattern id is derived from React `useId()`.
 */
export const DotPattern = forwardRef<SVGSVGElement, DotPatternProps>(function DotPattern(
  {
    size = 24,
    radius = 1.5,
    color = 'currentColor',
    opacity = 0.15,
    fade = 'none',
    className,
    style,
  },
  ref,
) {
  const rawId = useId();
  const patternId = `bwo-dot-${rawId.replace(/[:]/g, '')}`;
  const mask = maskValue(fade);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={cn('bwo-dot-pattern', className)}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        ...(mask
          ? {
              maskImage: mask,
              WebkitMaskImage: mask,
            }
          : {}),
        ...style,
      }}
    >
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={size / 2} cy={size / 2} r={radius} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
});
