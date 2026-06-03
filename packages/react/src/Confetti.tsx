'use client';

import { createConfetti, type ConfettiOptions } from '@bwo-ui/core';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface ConfettiHandle {
  /** Fire a single burst. Each call mounts a fresh particle layer. */
  fire: (overrides?: ConfettiOptions) => void;
}

export interface ConfettiProps extends ConfettiOptions {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Anchor for confetti bursts. Renders a `<span>` whose bounding box is used as
 * the origin container — call `fire()` via the imperative ref to detonate.
 *
 *   const ref = useRef<ConfettiHandle>(null);
 *   <Confetti ref={ref} colors={[...]} />
 *   <Button onClick={() => ref.current?.fire()}>🎉</Button>
 */
export const Confetti = forwardRef<ConfettiHandle, ConfettiProps>(function Confetti(
  { children, className, style, ...defaults },
  ref,
) {
  const anchorRef = useRef<HTMLSpanElement | null>(null);

  const fire = useCallback(
    (overrides?: ConfettiOptions) => {
      const el = anchorRef.current;
      if (!el) return;
      createConfetti(el, { ...defaults, ...overrides });
    },
    [defaults],
  );

  useImperativeHandle(ref, () => ({ fire }), [fire]);

  return (
    <span
      ref={anchorRef}
      className={cn('bwo-confetti-anchor', className)}
      style={{ display: 'inline-block', position: 'relative', ...style }}
    >
      {children}
    </span>
  );
});
