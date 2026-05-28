'use client';

import { createMarquee, type MarqueeOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface MarqueeProps extends MarqueeOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Marquee({ children, as, className, style, ...options }: MarqueeProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createMarquee(el, options),
    [options.speed, options.direction, options.draggable, options.pauseOnHover],
  );

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ overflow: 'hidden', ...style }}
    >
      {children}
    </Tag>
  );
}
