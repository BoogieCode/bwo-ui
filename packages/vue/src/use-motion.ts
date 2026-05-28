import type { MotionInstance } from '@bwo-ui/core';
import { onBeforeUnmount, onMounted, shallowRef, type ShallowRef } from 'vue';

/**
 * Mounts a motion factory against a template ref and tears it down on unmount.
 *
 * Uses `shallowRef` (DOM nodes don't need deep reactivity). The explicit
 * two-slot `ShallowRef<T | null, T | null>` annotation is required because
 * Vue 3.5 introduced an invariant second type parameter on Ref.
 */
export function useMotion<T extends Element = HTMLElement>(
  factory: (el: T) => MotionInstance | undefined,
): ShallowRef<T | null, T | null> {
  const el = shallowRef(null) as ShallowRef<T | null, T | null>;
  let instance: MotionInstance | undefined;

  onMounted(() => {
    if (!el.value) return;
    instance = factory(el.value);
  });

  onBeforeUnmount(() => {
    instance?.destroy();
    instance = undefined;
  });

  return el;
}
