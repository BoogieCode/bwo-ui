'use client';

import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from './utils';

export interface TextShimmerProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  /** Base colour for the text (CSS colour). Default: current `color`. */
  color?: string;
  /** Highlight colour that sweeps across. Default: `'#ffffff'`. */
  highlight?: string;
  /** Duration of one full sweep in seconds. Default: `1.8`. */
  duration?: number;
  /** Width of the highlight band, as a percentage. Default: `40`. */
  bandWidth?: number;
  /** Delay before the first sweep, in seconds. Default: `0`. */
  delay?: number;
  /** Pause the animation. Default: `false`. */
  paused?: boolean;
}

/**
 * Looping gradient shimmer over text. CSS-only — animates the
 * `background-position` of a linear-gradient clipped to the text.
 */
export const TextShimmer = forwardRef<HTMLElement, TextShimmerProps>(function TextShimmer(
  {
    as,
    color = 'currentColor',
    highlight = '#ffffff',
    duration = 1.8,
    bandWidth = 40,
    delay = 0,
    paused = false,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const Tag = (as ?? 'span') as ElementType;
  const half = bandWidth / 2;
  const a = 50 - half;
  const b = 50 + half;
  const gradient = `linear-gradient(110deg, ${color} 0%, ${color} ${a}%, ${highlight} 50%, ${color} ${b}%, ${color} 100%)`;
  return (
    <Tag
      ref={ref}
      className={cn('bwo-text-shimmer', className)}
      style={{
        display: 'inline-block',
        backgroundImage: gradient,
        backgroundSize: '300% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        animation: paused
          ? undefined
          : `bwo-text-shimmer ${duration}s linear ${delay}s infinite`,
        ...style,
      }}
      {...rest}
    >
      {children}
      <style>{`
        @keyframes bwo-text-shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </Tag>
  );
});
