'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from './utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn('bwo-textarea', className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});
