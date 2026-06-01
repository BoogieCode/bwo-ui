'use client';

import { createScrambleText, type ScrambleTextOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface ScrambleTextProps extends ScrambleTextOptions {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrambleText({
  children,
  as,
  className,
  style,
  ...options
}: ScrambleTextProps) {
  const Tag = (as ?? 'span') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createScrambleText(el, options),
    [options.text, options.chars, options.duration, options.trigger, options.speed, options.once],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
