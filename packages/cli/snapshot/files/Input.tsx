'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn, type Radius } from './utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  /** Corner radius preset. Omit to inherit the global default (6px). */
  radius?: Radius;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, radius, className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn('bwo-input', className)}
      aria-invalid={invalid || undefined}
      data-radius={radius}
      {...props}
    />
  );
});
