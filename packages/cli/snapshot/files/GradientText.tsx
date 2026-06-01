'use client';

import { createGradientText, type GradientTextOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface GradientTextProps extends GradientTextOptions {
  children: ReactNode;
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function GradientText({
  children,
  as,
  className,
  style,
  ...options
}: GradientTextProps) {
  const Tag = (as ?? 'span') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createGradientText(el, options),
    [options.gradient, options.duration, options.angle, options.size, options.direction, options.animate],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
