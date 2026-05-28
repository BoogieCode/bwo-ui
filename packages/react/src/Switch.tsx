'use client';

import * as RadixSwitch from '@radix-ui/react-switch';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { cn } from './utils';

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof RadixSwitch.Root> {}

export const Switch = forwardRef<ElementRef<typeof RadixSwitch.Root>, SwitchProps>(
  function Switch({ className, ...props }, ref) {
    return (
      <RadixSwitch.Root ref={ref} className={cn('bwo-switch', className)} {...props}>
        <RadixSwitch.Thumb className="bwo-switch-thumb" />
      </RadixSwitch.Root>
    );
  },
);
