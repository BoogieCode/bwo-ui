'use client';

import * as RadixRadio from '@radix-ui/react-radio-group';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from './utils';

export const RadioGroupRoot = forwardRef<
  ElementRef<typeof RadixRadio.Root>,
  ComponentPropsWithoutRef<typeof RadixRadio.Root>
>(function RadioGroupRoot({ className, ...props }, ref) {
  return (
    <RadixRadio.Root ref={ref} className={cn('bwo-radio-group', className)} {...props} />
  );
});

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadixRadio.Item>,
  ComponentPropsWithoutRef<typeof RadixRadio.Item>
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadixRadio.Item ref={ref} className={cn('bwo-radio', className)} {...props}>
      <RadixRadio.Indicator className="bwo-radio-indicator" />
    </RadixRadio.Item>
  );
});

export const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
};
