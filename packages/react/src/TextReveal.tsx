'use client';

import { createTextReveal, type TextRevealOptions } from '@bwo-ui/core';
import { type ElementType } from 'react';
import { useMotion } from './use-motion';

export interface TextRevealProps extends TextRevealOptions {
  children: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function TextReveal({ children, as, className, style, ...options }: TextRevealProps) {
  const Tag = (as ?? 'p') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createTextReveal(el, options),
    [options.dimOpacity, options.start, options.end, options.stagger, children],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
