'use client';

import { createBlur, type BlurDirection, type BlurOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export type BlurIntensity = 'subtle' | 'medium' | 'strong';

const INTENSITY_PX: Record<BlurIntensity, number> = {
  subtle: 8,
  medium: 16,
  strong: 28,
};

export interface BlurProps extends BlurOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  /**
   * Preset blur amount — `subtle` (8 px), `medium` (16 px, default), `strong` (28 px).
   * Shorthand for setting `from`. Ignored if `from` is set explicitly.
   */
  intensity?: BlurIntensity;
  className?: string;
  style?: React.CSSProperties;
}

export function Blur({
  children,
  as,
  intensity,
  from,
  className,
  style,
  ...options
}: BlurProps) {
  const Tag = (as ?? 'div') as ElementType;
  const resolvedFrom = from ?? (intensity ? INTENSITY_PX[intensity] : undefined);
  const ref = useMotion<HTMLElement>(
    (el) => createBlur(el, { ...options, from: resolvedFrom }),
    [
      resolvedFrom,
      options.to,
      options.direction,
      options.fade,
      options.duration,
      options.ease,
      options.start,
      options.end,
      options.scrub,
      options.once,
      options.delay,
    ],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

export type { BlurDirection };
