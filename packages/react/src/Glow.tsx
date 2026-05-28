'use client';

import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cn } from './utils';

export interface GlowProps extends HTMLAttributes<HTMLDivElement> {
  /** Three colour stops for the radial gradient. */
  colors?: [string, string, string];
  /** Position of the gradient center as CSS percentages. */
  x?: string;
  y?: string;
  /** Base background colour rendered below the gradient. */
  base?: string;
  /** Pin the gradient to the viewport instead of the parent. */
  fixed?: boolean;
}

/**
 * Tri-color radial gradient backdrop. Sized to fill its positioned ancestor
 * (or the viewport if `fixed` is true). Drop it as a sibling at the top of a
 * positioned container, then layer real content on top.
 */
export const Glow = forwardRef<HTMLDivElement, GlowProps>(function Glow(
  { colors, x, y, base, fixed, className, style, ...props },
  ref,
) {
  const vars: CSSProperties = {
    ...(colors ? {
      ['--bwo-glow-c1' as never]: colors[0],
      ['--bwo-glow-c2' as never]: colors[1],
      ['--bwo-glow-c3' as never]: colors[2],
    } : {}),
    ...(x ? { ['--bwo-glow-x' as never]: x } : {}),
    ...(y ? { ['--bwo-glow-y' as never]: y } : {}),
    ...(base ? { ['--bwo-glow-base' as never]: base } : {}),
    ...style,
  };
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn('bwo-glow', fixed && 'bwo-glow--fixed', className)}
      style={vars}
      {...props}
    />
  );
});
