'use client';

import { createCircleReveal, type CircleRevealOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface CircleRevealProps extends CircleRevealOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function CircleReveal({
  children,
  as,
  className,
  style,
  ...options
}: CircleRevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createCircleReveal(el, options),
    [
      options.mode,
      options.duration,
      options.ease,
      options.delay,
      options.origin?.x,
      options.origin?.y,
    ],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
