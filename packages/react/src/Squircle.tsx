'use client';

import { forwardRef, useMemo, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export interface SquircleProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  /**
   * Smoothness of the corners. 2 = circle, 4 = iOS-style squircle, 6+ = squarer.
   * Default: `4`.
   */
  smoothness?: number;
  /** Number of points used to render the path. Higher = smoother edge. Default: `48`. */
  resolution?: number;
  children?: ReactNode;
}

/**
 * Superellipse / squircle clip-path container. Uses an SVG path rendered via
 * `clip-path: path(...)` so the corners follow the superellipse equation
 * |x|^n + |y|^n = 1, where n = `smoothness`. Defaults to n=4 — the same
 * curve Apple uses for app icons.
 *
 * The clip is computed against a fixed 100×100 unit box and stretched to the
 * element's actual size via SVG's `preserveAspectRatio: none` path semantics,
 * so it works at any aspect ratio.
 */
export const Squircle = forwardRef<HTMLElement, SquircleProps>(function Squircle(
  { as, smoothness = 4, resolution = 48, className, style, children, ...rest },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;
  const path = useMemo(() => buildPath(smoothness, resolution), [smoothness, resolution]);
  return (
    <Tag
      ref={ref}
      className={cn('bwo-squircle', className)}
      style={{
        clipPath: `path('${path}')`,
        WebkitClipPath: `path('${path}')`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

function buildPath(n: number, resolution: number): string {
  const exp = 2 / Math.max(2, n);
  const steps = Math.max(8, Math.floor(resolution));
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    const x = Math.sign(cosT) * Math.pow(Math.abs(cosT), exp);
    const y = Math.sign(sinT) * Math.pow(Math.abs(sinT), exp);
    // Map from [-1, 1] to [0%, 100%].
    points.push([(x + 1) * 50, (y + 1) * 50]);
  }
  return points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(3)}% ${y.toFixed(3)}%`)
    .concat(['Z'])
    .join(' ');
}
