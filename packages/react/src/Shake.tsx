'use client';

import { createShake, type ShakeOptions } from '@bwo-ui/core';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type ElementType,
  type ReactNode,
} from 'react';

export interface ShakeHandle {
  /** Fire a shake immediately. */
  shake: (overrides?: ShakeOptions) => void;
}

export interface ShakeProps extends ShakeOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  /**
   * When this value changes, fires the shake automatically. Pair with form
   * validation errors — bump the key whenever the user submits invalid input.
   */
  trigger?: unknown;
  className?: string;
  style?: React.CSSProperties;
}

export const Shake = forwardRef<ShakeHandle, ShakeProps>(function Shake(
  { children, as, trigger, className, style, ...options },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;
  const elRef = useRef<HTMLElement | null>(null);
  const firstRender = useRef(true);

  const shake = useCallback(
    (overrides?: ShakeOptions) => {
      const el = elRef.current;
      if (!el) return;
      createShake(el, { ...options, ...overrides });
    },
    [options],
  );

  useImperativeHandle(ref, () => ({ shake }), [shake]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (trigger === undefined) return;
    shake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <Tag ref={elRef} className={className} style={style}>
      {children}
    </Tag>
  );
});
