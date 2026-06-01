'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn, type Radius } from './utils';

export type IconButtonVariant = 'primary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Corner radius preset. Omit to inherit the global default (6px). */
  radius?: Radius;
  /** Required for accessibility — describe the action. */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'primary', size = 'md', radius, className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      data-radius={radius}
      className={cn(
        'bwo-icon-btn',
        variant !== 'primary' && `bwo-icon-btn--${variant}`,
        size !== 'md' && `bwo-icon-btn--${size}`,
        className,
      )}
      {...props}
    />
  );
});
