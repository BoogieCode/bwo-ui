'use client';

import * as RadixProgress from '@radix-ui/react-progress';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from './utils';

export interface ProgressProps extends ComponentPropsWithoutRef<typeof RadixProgress.Root> {
  /** 0–100. */
  value?: number;
}

export const Progress = forwardRef<ElementRef<typeof RadixProgress.Root>, ProgressProps>(
  function Progress({ value = 0, className, ...props }, ref) {
    return (
      <RadixProgress.Root
        ref={ref}
        className={cn('bwo-progress', className)}
        value={value}
        {...props}
      >
        <RadixProgress.Indicator
          className="bwo-progress-indicator"
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </RadixProgress.Root>
    );
  },
);
