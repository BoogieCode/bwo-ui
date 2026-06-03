'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './utils';

export type DotLoaderSize = 'sm' | 'md' | 'lg';

export interface DotLoaderProps extends HTMLAttributes<HTMLSpanElement> {
  size?: DotLoaderSize;
  color?: string;
  /** Number of dots. Default: `3`. */
  dots?: number;
  /** Total animation cycle length in seconds. Default: `1.2`. */
  duration?: number;
  label?: string;
}

const dotSize: Record<DotLoaderSize, { dot: number; gap: number }> = {
  sm: { dot: 4, gap: 4 },
  md: { dot: 6, gap: 5 },
  lg: { dot: 9, gap: 7 },
};

export const DotLoader = forwardRef<HTMLSpanElement, DotLoaderProps>(function DotLoader(
  {
    size = 'md',
    color,
    dots = 3,
    duration = 1.2,
    label = 'Loading',
    className,
    style,
    ...rest
  },
  ref,
) {
  const { dot, gap } = dotSize[size];
  const items = Array.from({ length: dots });
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn('bwo-dot-loader', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap,
        color: color ?? 'currentColor',
        ...style,
      }}
      {...rest}
    >
      {items.map((_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            width: dot,
            height: dot,
            borderRadius: '50%',
            background: 'currentColor',
            animation: `bwo-dot-bounce ${duration}s ${(i * duration) / (dots * 1.5)}s infinite ease-in-out`,
            display: 'inline-block',
          }}
        />
      ))}
      <style>{`
        @keyframes bwo-dot-bounce {
          0%, 70%, 100% { transform: translateY(0); opacity: 0.4; }
          35% { transform: translateY(-${dot * 1.2}px); opacity: 1; }
        }
      `}</style>
    </span>
  );
});
