'use client';

import { createScrollProgress, type ScrollProgressOptions } from '@bwo-ui/core';
import { type ElementType } from 'react';
import { useMotion } from './use-motion';

export interface ScrollProgressProps extends ScrollProgressOptions {
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function ScrollProgress({
  as,
  className,
  style,
  children,
  ...options
}: ScrollProgressProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createScrollProgress(el, options),
    [options.start, options.end, options.axis, options.origin],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
