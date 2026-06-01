'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn, type Radius } from './utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  /** Corner radius preset. Omit to inherit the global default (6px). */
  radius?: Radius;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, radius, className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn('bwo-textarea', className)}
      aria-invalid={invalid || undefined}
      data-radius={radius}
      {...props}
    />
  );
});
