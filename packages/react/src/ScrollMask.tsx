'use client';

import { createScrollMask, type ScrollMaskOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface ScrollMaskProps extends ScrollMaskOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollMask({
  children,
  as,
  className,
  style,
  ...options
}: ScrollMaskProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createScrollMask(el, options),
    [options.direction, options.start, options.end, options.scrub, options.from],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
