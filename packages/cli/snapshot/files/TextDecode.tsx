'use client';

import { createTextDecode, type TextDecodeOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface TextDecodeProps extends TextDecodeOptions {
  /** Text content to decode to. */
  children: ReactNode;
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function TextDecode({
  children,
  as,
  className,
  style,
  ...options
}: TextDecodeProps) {
  const Tag = (as ?? 'span') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createTextDecode(el, options),
    [options.duration, options.chars, options.speed, options.delay, options.loop],
  );
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
