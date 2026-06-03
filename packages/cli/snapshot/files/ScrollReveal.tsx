'use client';

import { createScrollReveal, type ScrollRevealOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface ScrollRevealProps extends ScrollRevealOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  as,
  className,
  style,
  ...options
}: ScrollRevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createScrollReveal(el, options),
    [options.flavor, options.start, options.duration, options.delay, options.once, options.ease],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
