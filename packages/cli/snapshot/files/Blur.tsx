'use client';

import { createBlur, type BlurOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface BlurProps extends BlurOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Blur({ children, as, className, style, ...options }: BlurProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createBlur(el, options),
    [
      options.from,
      options.to,
      options.fade,
      options.duration,
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
