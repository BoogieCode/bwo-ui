'use client';

import { createConfetti, type ConfettiOptions } from '@bwo-ui/core';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react';
import { cn } from './utils';

export interface ConfettiHandle {
  /** Fire a single burst. Each call mounts a fresh particle layer. */
  fire: (overrides?: ConfettiOptions) => void;
}

export interface ConfettiProps extends ConfettiOptions {
  /**
   * Reference element the burst launches FROM. Point it at a hero/section/any
   * div to detonate from there regardless of what triggered `fire()`. Defaults
   * to this component's own anchor span.
   */
  originRef?: RefObject<HTMLElement | null>;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Anchor for confetti bursts. Particles render in a fixed, full-viewport layer
 * and launch from the centre of `originRef` (or this anchor), so a burst fired
 * by a small button flies across the screen instead of being trapped under it.
 *
 *   const ref = useRef<ConfettiHandle>(null);
 *   const hero = useRef<HTMLDivElement>(null);
 *   <div ref={hero}>…</div>
 *   <Confetti ref={ref} originRef={hero} colors={[...]} />
 *   <Button onClick={() => ref.current?.fire()}>🎉</Button>
 */
export const Confetti = forwardRef<ConfettiHandle, ConfettiProps>(function Confetti(
  { originRef, children, className, style, ...defaults },
  ref,
) {
  const anchorRef = useRef<HTMLSpanElement | null>(null);

  const fire = useCallback(
    (overrides?: ConfettiOptions) => {
      const originEl = overrides?.originElement
        ? null // explicit override wins; let core resolve it
        : originRef?.current ?? anchorRef.current;
      const launch = originEl ?? anchorRef.current;
      if (!launch && !overrides?.originElement) return;
      createConfetti(launch ?? anchorRef.current!, { ...defaults, ...overrides });
    },
    [defaults, originRef],
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
