'use client';

import { createSpotlight, type SpotlightOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface SpotlightProps extends SpotlightOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Spotlight({ children, as, className, style, ...options }: SpotlightProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createSpotlight(el, options),
    [options.size, options.color, options.duration, options.ease, options.hideOnLeave],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
