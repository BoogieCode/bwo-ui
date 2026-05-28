'use client';

import { createParallax, type ParallaxOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface ParallaxProps extends ParallaxOptions {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Parallax({ children, as, className, style, ...options }: ParallaxProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createParallax(el, options),
    [options.speed, options.axis, options.start, options.end, options.scrub],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
