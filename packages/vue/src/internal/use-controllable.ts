import { computed, ref, type Ref, type WritableComputedRef } from 'vue';

/**
 * Vue equivalent of useControllable — bridges a `modelValue` prop with internal
 * state. When `modelValue` is provided the component is controlled; otherwise
 * the internal ref drives the value.
 */
export function useControllable<T>(
  modelValue: Ref<T | undefined>,
  defaultValue: T,
  emitUpdate: (value: T) => void,
): WritableComputedRef<T> {
  const internal = ref<T>(defaultValue) as Ref<T>;
  return computed<T>({
    get: () => (modelValue.value !== undefined ? (modelValue.value as T) : internal.value),
    set: (next: T) => {
      if (modelValue.value === undefined) internal.value = next;
      emitUpdate(next);
    },
  });
}
