'use client';

import { createStagger, type StaggerOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface StaggerProps extends StaggerOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Stagger({ children, as, className, style, ...options }: StaggerProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createStagger(el, options),
    [
      options.itemSelector,
      options.duration,
      options.stagger,
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
