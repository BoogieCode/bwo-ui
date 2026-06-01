'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './utils';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  /** When true, hide from screen readers (purely decorative). Default: `true`. */
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', decorative = true, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role={decorative ? undefined : 'separator'}
      aria-orientation={orientation}
      {...(decorative ? { 'aria-hidden': true } : {})}
      className={cn('bwo-separator', `bwo-separator--${orientation}`, className)}
      {...props}
    />
  );
});
