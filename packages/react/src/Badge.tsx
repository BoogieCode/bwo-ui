'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './utils';

export type BadgeVariant = 'default' | 'solid' | 'green' | 'yellow' | 'red' | 'soft';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn('bwo-badge', variant !== 'default' && `bwo-badge--${variant}`, className)}
      {...props}
    />
  );
});
