import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './utils';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Axis to scroll on. `'auto'` lets both axes scroll on overflow. Default: `'y'`. */
  axis?: 'x' | 'y' | 'both' | 'auto';
  /** Max height. Pass a number for px, a string passes through. */
  maxHeight?: number | string;
  /** Max width. */
  maxWidth?: number | string;
  /** Show subtle fade at the bounds where scroll is available. Default: `true`. */
  fade?: boolean;
}

function toLen(value: number | string | undefined): string | undefined {
  if (value == null) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { axis = 'y', maxHeight, maxWidth, fade = true, className, style, children, ...rest },
  ref,
) {
  const overflowX =
    axis === 'x' || axis === 'both' || axis === 'auto' ? 'auto' : 'hidden';
  const overflowY =
    axis === 'y' || axis === 'both' || axis === 'auto' ? 'auto' : 'hidden';
  const fadeMask =
    fade && (axis === 'y' || axis === 'auto')
      ? 'linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)'
      : undefined;
  return (
    <div
      ref={ref}
      className={cn('bwo-scroll-area', className)}
      style={{
        position: 'relative',
        overflowX,
        overflowY,
        maxHeight: toLen(maxHeight),
        maxWidth: toLen(maxWidth),
        scrollbarWidth: 'thin',
        WebkitOverflowScrolling: 'touch',
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});
