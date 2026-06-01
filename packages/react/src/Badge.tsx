'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn, type Radius } from './utils';

export type BadgeVariant = 'default' | 'solid' | 'green' | 'yellow' | 'red' | 'soft';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Corner radius preset. Omit to inherit the global default (6px). */
  radius?: Radius;
  /** Render a small leading dot in the badge's foreground colour — for status indicators. */
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'default', size = 'md', radius, dot, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-radius={radius}
      data-dot={dot ? '' : undefined}
      className={cn(
        'bwo-badge',
        variant !== 'default' && `bwo-badge--${variant}`,
        size !== 'md' && `bwo-badge--${size}`,
        className,
      )}
      {...props}
    />
  );
});
