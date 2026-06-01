'use client';

import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export interface SpinProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  /** Seconds for one full rotation. Default: `6`. */
  duration?: number;
}

/**
 * Continuously rotates its child at a constant speed (CSS-only). Respects
 * `prefers-reduced-motion`. Use for sparkles, loaders, accent glyphs.
 */
export function Spin({ as, duration, className, style, children, ...rest }: SpinProps) {
  const Tag = (as ?? 'span') as ElementType;
  return (
    <Tag
      className={cn('bwo-spin', className)}
      style={
        duration !== undefined
          ? { ['--bwo-spin-duration' as never]: `${duration}s`, ...style }
          : style
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}

export interface PulseProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  /** Seconds per pulse cycle. Default: `1.8`. */
  duration?: number;
}

/**
 * Breathing pulse — fades opacity and shrinks slightly on each beat. Good for
 * "live"/"recording" indicators or notification dots.
 */
export function Pulse({ as, duration, className, style, children, ...rest }: PulseProps) {
  const Tag = (as ?? 'span') as ElementType;
  return (
    <Tag
      className={cn('bwo-pulse', className)}
      style={
        duration !== undefined
          ? { ['--bwo-pulse-duration' as never]: `${duration}s`, ...style }
          : style
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
