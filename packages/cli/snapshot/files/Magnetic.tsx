'use client';

import { createMagnetic, type MagneticOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface MagneticProps extends MagneticOptions {
  children: ReactNode;
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function Magnetic({ children, as, className, style, ...options }: MagneticProps) {
  const Tag = (as ?? 'span') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createMagnetic(el, options),
    [options.strength, options.radius, options.duration, options.ease, options.child],
  );

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </Tag>
  );
}
