'use client';

import { createSplitReveal, type SplitRevealOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface SplitRevealProps extends SplitRevealOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function SplitReveal({
  children,
  as,
  className,
  style,
  ...options
}: SplitRevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createSplitReveal(el, options),
    [
      options.type,
      options.stagger,
      options.duration,
      options.ease,
      options.delay,
      options.scrub,
      options.once,
      options.start,
      options.end,
      options.mask,
    ],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
