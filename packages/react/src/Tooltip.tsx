'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export const TooltipProvider = RadixTooltip.Provider;
export const TooltipRoot = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = forwardRef<
  ElementRef<typeof RadixTooltip.Content>,
  ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(function TooltipContent({ className, sideOffset = 6, children, ...props }, ref) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn('bwo-tooltip', className)}
        {...props}
      >
        {children}
        <RadixTooltip.Arrow className="bwo-tooltip-arrow" />
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  );
});

/**
 * Shorthand — wrap an element to give it a tooltip.
 *
 * ```tsx
 * <Tooltip content="Save to clipboard">
 *   <IconButton aria-label="Copy"><CopyIcon /></IconButton>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  content,
  children,
  delayDuration = 200,
  side,
}: {
  content: ReactNode;
  children: ReactNode;
  delayDuration?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
