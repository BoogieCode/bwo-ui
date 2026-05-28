'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from './utils';

export type IconButtonVariant = 'primary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Required for accessibility — describe the action. */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'primary', size = 'md', className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
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
