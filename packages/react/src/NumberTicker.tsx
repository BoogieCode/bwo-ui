'use client';

import { createNumberTicker, type NumberTickerOptions } from '@bwo-ui/core';
import { type ElementType } from 'react';
import { useMotion } from './use-motion';

export interface NumberTickerProps extends NumberTickerOptions {
  /** Target value to roll to. */
  value: number;
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function NumberTicker({ as, className, style, ...options }: NumberTickerProps) {
  const Tag = (as ?? 'span') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createNumberTicker(el, options),
    [
      options.value,
      options.duration,
      options.ease,
      options.decimals,
      options.prefix,
      options.suffix,
      options.separator,
      options.decimal,
      options.trigger,
      options.start,
    ],
  );

  return <Tag ref={ref} className={className} style={style} />;
}
