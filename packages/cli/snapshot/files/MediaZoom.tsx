'use client';

import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export interface MediaZoomProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Final scale factor on hover. Default: `1.06`. */
  scale?: number;
}

/**
 * Wraps an `<img>`/`<video>` so it scales up on parent hover. Designed to
 * sit inside `<CardMedia>` — when the card is hovered, the media zooms.
 * Pure CSS, GPU-accelerated transform, respects reduced-motion.
 */
export function MediaZoom({ scale, className, style, children, ...rest }: MediaZoomProps) {
  const vars: CSSProperties =
    scale !== undefined
      ? { ['--bwo-media-zoom-scale' as never]: String(scale), ...style }
      : style ?? {};
  return (
    <div className={cn('bwo-media-zoom', className)} style={vars} {...rest}>
      {children}
    </div>
  );
}
