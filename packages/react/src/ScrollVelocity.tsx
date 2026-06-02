'use client';

import { createScrollVelocity, type ScrollVelocityOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface ScrollVelocityProps extends ScrollVelocityOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollVelocity({
  children,
  as,
  className,
  style,
  ...options
}: ScrollVelocityProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createScrollVelocity(el, options),
    [options.skew, options.scale, options.saturate, options.ease, options.axis],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
