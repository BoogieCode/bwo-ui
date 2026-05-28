'use client';

import { createReveal, type RevealOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface RevealProps extends RevealOptions {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({ children, as, className, style, ...options }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createReveal(el, options),
    [options.direction, options.duration, options.ease, options.start, options.once, options.delay],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
