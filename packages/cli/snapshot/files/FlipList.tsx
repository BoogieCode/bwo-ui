'use client';

import {
  createFlipList,
  type FlipListInstance,
  type FlipListOptions,
} from '@bwo-ui/core';
import {
  type ElementType,
  type ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';

export interface FlipListProps extends FlipListOptions {
  children: ReactNode;
  /** A value that, when changed, triggers a Flip animation between renders. */
  flipKey: string | number;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export interface FlipListHandle {
  flip: (mutate: () => void) => void;
  capture: () => void;
  commit: () => void;
}

/**
 * Wraps a list of items. When `flipKey` changes, captures the previous DOM
 * state and animates to the new one with GSAP's Flip plugin.
 */
export const FlipList = forwardRef<FlipListHandle, FlipListProps>(function FlipList(
  { children, flipKey, as, className, style, ...options },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;
  const containerRef = useRef<HTMLElement | null>(null);
  const instanceRef = useRef<FlipListInstance | null>(null);
  const prevKey = useRef(flipKey);

  // Capture BEFORE the DOM updates (only when flipKey changed).
  if (prevKey.current !== flipKey && containerRef.current) {
    instanceRef.current?.capture();
  }

  useEffect(() => {
    if (!containerRef.current) return;
    instanceRef.current = createFlipList(containerRef.current, options);
    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.itemSelector, options.duration, options.ease, options.stagger, options.absolute]);

  // Commit AFTER the DOM updated.
  useLayoutEffect(() => {
    if (prevKey.current !== flipKey) {
      instanceRef.current?.commit();
      prevKey.current = flipKey;
    }
  }, [flipKey]);

  useImperativeHandle(
    ref,
    () => ({
      flip: (mutate) => instanceRef.current?.flip(mutate),
      capture: () => instanceRef.current?.capture(),
      commit: () => instanceRef.current?.commit(),
    }),
    [],
  );

  return (
    <Tag ref={containerRef} className={className} style={style}>
      {children}
    </Tag>
  );
});
