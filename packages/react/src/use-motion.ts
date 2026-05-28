'use client';

import { useEffect, useRef } from 'react';
import type { MotionInstance } from '@bwo-ui/core';

/**
 * Runs a motion factory against a ref'd element and tears it down on unmount.
 * Re-runs when `deps` change.
 */
export function useMotion<T extends Element>(
  factory: (el: T) => MotionInstance | undefined,
  deps: ReadonlyArray<unknown> = [],
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const instance = factory(ref.current);
    return () => instance?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
