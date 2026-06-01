'use client';

import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cn } from './utils';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
  /** Apply `border-radius: 9999px` (for circular avatars/buttons). */
  circle?: boolean;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { width, height, circle, className, style, ...props },
  ref,
) {
  const sizeStyle: CSSProperties = {
    width,
    height,
    ...(circle ? { borderRadius: '9999px' } : {}),
    ...style,
  };
  return <span ref={ref} className={cn('bwo-skeleton', className)} style={sizeStyle} {...props} />;
});
