export interface MotionInstance {
  destroy: () => void;
  refresh?: () => void;
}

export type Target = Element | string;

export function resolveTarget(target: Target): Element | null {
  if (typeof target === 'string') return document.querySelector(target);
  return target;
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Result of merging defaults with overrides:
 * - keys in both: union of the default's type and the non-null override type
 *   (so a wider option type like `'a' | 'b' | 'c'` is preserved instead of
 *   being narrowed to the default's literal)
 * - keys only in overrides: override's type (may include `undefined`)
 * - keys only in defaults: default's type
 */
type MergedOptions<D, O> = {
  [K in keyof D | keyof O]: K extends keyof O
    ? K extends keyof D
      ? NonNullable<O[K]> | D[K]
      : O[K]
    : K extends keyof D
      ? D[K]
      : never;
};

/**
 * Like `{ ...defaults, ...overrides }` but never lets an explicit `undefined`
 * in `overrides` overwrite a default value. Critical for options that get
 * interpolated as strings — otherwise an undefined prop turns into the literal
 * "undefined" in the output.
 */
export function mergeOptions<D, O>(defaults: D, overrides: O): MergedOptions<D, O> {
  const merged: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
  for (const key in overrides) {
    const value = (overrides as Record<string, unknown>)[key];
    if (value !== undefined) merged[key] = value;
  }
  return merged as MergedOptions<D, O>;
}
