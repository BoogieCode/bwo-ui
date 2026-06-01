'use client';

import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export interface LeanProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  /** Static rotation in degrees. Animates back to 0 on hover/focus. */
  angle: number;
}

/**
 * Static CSS rotation that snaps back to 0 on hover or focus-within. Used
 * for resting card tilts (different cards leaning slightly differently)
 * where the user "fixes" the angle by pointing at it.
 *
 * CSS-only — no GSAP needed. Respects `prefers-reduced-motion`.
 */
export function Lean({ as, angle, className, style, children, ...rest }: LeanProps) {
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag
      className={cn('bwo-lean', className)}
      style={{ ['--bwo-lean' as never]: `${angle}deg`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
