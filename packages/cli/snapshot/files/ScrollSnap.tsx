'use client';

import { createScrollSnap, type ScrollSnapOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface ScrollSnapProps extends ScrollSnapOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollSnap({
  children,
  as,
  className,
  style,
  ...options
}: ScrollSnapProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createScrollSnap(el, options),
    [options.axis, options.strictness, options.childSelector, options.align],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
