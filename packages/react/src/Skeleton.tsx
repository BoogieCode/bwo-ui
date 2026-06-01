'use client';

import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cn } from './utils';

export type SkeletonVariant = 'rect' | 'circle' | 'text';
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  /** Custom border-radius override (CSS value — e.g. `'12px'` or `'50%'`). */
  radius?: string;
  /**
   * For `variant="text"` only — renders a stacked group of N lines. The last line is
   * shortened to ~70 % width to read as a natural paragraph end. Ignored otherwise.
   */
  lines?: number;
  /** @deprecated Use `variant="circle"` instead. Kept for back-compat with 0.4.x. */
  circle?: boolean;
}

function formatSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  {
    width,
    height,
    variant: variantProp,
    animation = 'shimmer',
    radius,
    lines,
    circle,
    className,
    style,
    ...props
  },
  ref,
) {
  const variant: SkeletonVariant = variantProp ?? (circle ? 'circle' : 'rect');
  const animationAttr = animation !== 'shimmer' ? animation : undefined;
  const widthCss = formatSize(width);
  const heightCss = formatSize(height);

  if (variant === 'text' && lines && lines > 1) {
    const groupStyle: CSSProperties = { width: widthCss, ...style };
    return (
      <span
        ref={ref}
        className={cn('bwo-skeleton-text-group', className)}
        style={groupStyle}
        {...props}
      >
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            data-animation={animationAttr}
            className={cn('bwo-skeleton', 'bwo-skeleton--text')}
            style={{
              width: i === lines - 1 ? '70%' : '100%',
              height: heightCss,
              borderRadius: radius,
            }}
          />
        ))}
      </span>
    );
  }

  const sizeStyle: CSSProperties = {
    width: widthCss,
    height: heightCss,
    borderRadius: radius,
    ...style,
  };
  return (
    <span
      ref={ref}
      data-animation={animationAttr}
      className={cn(
        'bwo-skeleton',
        variant !== 'rect' && `bwo-skeleton--${variant}`,
        className,
      )}
      style={sizeStyle}
      {...props}
    />
  );
});
