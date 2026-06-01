'use client';

import { createCountUp, type CountUpOptions } from '@bwo-ui/core';
import { type ElementType } from 'react';
import { useMotion } from './use-motion';

export interface CountUpProps extends CountUpOptions {
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** Optional fallback text shown before hydration (e.g. the target value as a string). */
  children?: React.ReactNode;
}

export function CountUp({ as, className, style, children, ...options }: CountUpProps) {
  const Tag = (as ?? 'span') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createCountUp(el, options),
    [
      options.to,
      options.from,
      options.duration,
      options.ease,
      options.decimals,
      options.separator,
      options.decimal,
      options.prefix,
      options.suffix,
      options.start,
      options.once,
    ],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children ?? options.to ?? ''}
    </Tag>
  );
}
