'use client';

import * as RadixSlider from '@radix-ui/react-slider';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { cn } from './utils';

export interface SliderProps
  extends ComponentPropsWithoutRef<typeof RadixSlider.Root> {}

/**
 * Slider — renders one thumb per value. For a range slider, pass an array of
 * two values to `defaultValue` or `value`.
 */
export const Slider = forwardRef<ElementRef<typeof RadixSlider.Root>, SliderProps>(
  function Slider({ className, defaultValue, value, ...props }, ref) {
    const resolved = value ?? defaultValue ?? [50];
    return (
      <RadixSlider.Root
        ref={ref}
        className={cn('bwo-slider', className)}
        defaultValue={defaultValue}
        value={value}
        {...props}
      >
        <RadixSlider.Track className="bwo-slider-track">
          <RadixSlider.Range className="bwo-slider-range" />
        </RadixSlider.Track>
        {resolved.map((_, i) => (
          <RadixSlider.Thumb key={i} className="bwo-slider-thumb" aria-label={`Value ${i + 1}`} />
        ))}
      </RadixSlider.Root>
    );
  },
);
