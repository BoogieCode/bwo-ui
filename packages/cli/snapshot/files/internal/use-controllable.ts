import { useCallback, useRef, useState } from 'react';

export interface UseControllableOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

/**
 * Bridge controlled/uncontrolled state.
 * If `value` is defined the component is controlled — internal state is unused.
 * Otherwise the internal state acts as the source of truth, seeded by `defaultValue`.
 * Either way, the returned setter calls `onChange` with the next value.
 */
export function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableOptions<T>): [T | undefined, (next: T) => void] {
  const [internal, setInternal] = useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [current, setValue];
}
