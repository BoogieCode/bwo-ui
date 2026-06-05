'use client';

import { createFlipCard, type FlipCardOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface FlipCardProps extends FlipCardOptions {
  /** Content shown on the front face. */
  front: ReactNode;
  /** Content shown on the back face (revealed on flip). */
  back: ReactNode;
  /** Element to render as the container. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function FlipCard({
  front,
  back,
  as,
  className,
  style,
  ...options
}: FlipCardProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createFlipCard(el, options),
    [
      options.trigger,
      options.axis,
      options.duration,
      options.ease,
      options.perspective,
    ],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      <div>{front}</div>
      <div>{back}</div>
    </Tag>
  );
}
