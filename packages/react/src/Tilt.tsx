'use client';

import { createTilt, type TiltOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface TiltProps extends TiltOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Tilt({ children, as, className, style, ...options }: TiltProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createTilt(el, options),
    [
      options.max,
      options.perspective,
      options.scale,
      options.duration,
      options.ease,
      options.reverse,
      options.glareSelector,
    ],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
