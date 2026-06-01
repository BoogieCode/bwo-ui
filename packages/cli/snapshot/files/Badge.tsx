'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn, type Radius } from './utils';

export type BadgeVariant = 'default' | 'solid' | 'green' | 'yellow' | 'red' | 'soft';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Corner radius preset. Omit to inherit the global default (6px). */
  radius?: Radius;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', radius, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-radius={radius}
      className={cn('bwo-badge', variant !== 'default' && `bwo-badge--${variant}`, className)}
      {...props}
    />
  );
});
