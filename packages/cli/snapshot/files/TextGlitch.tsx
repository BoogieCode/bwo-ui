'use client';

import { createTextGlitch, type TextGlitchOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface TextGlitchProps extends TextGlitchOptions {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function TextGlitch({ children, as, className, style, ...options }: TextGlitchProps) {
  const Tag = (as ?? 'span') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createTextGlitch(el, options),
    [
      options.text,
      options.fps,
      options.duration,
      options.trigger,
      options.chars,
      options.intensity,
      options.once,
    ],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
