import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export type ScrollSnapAxis = 'y' | 'x' | 'both';
export type ScrollSnapStrictness = 'mandatory' | 'proximity';

export interface ScrollSnapOptions {
  /** Axis to snap along. Default: `'y'`. */
  axis?: ScrollSnapAxis;
  /** How aggressively to snap. Default: `'mandatory'`. */
  strictness?: ScrollSnapStrictness;
  /** CSS selector for child snap targets. Default: `':scope > *'`. */
  childSelector?: string;
  /** Snap alignment applied to children. Default: `'start'`. */
  align?: 'start' | 'center' | 'end';
}

const DEFAULTS = {
  axis: 'y' as ScrollSnapAxis,
  strictness: 'mandatory' as ScrollSnapStrictness,
  childSelector: ':scope > *',
  align: 'start' as const,
};

const APPLIED = '__bwoScrollSnap';

/**
 * Pure-CSS snap-scroll container — sets `scroll-snap-type` on the host and
 * `scroll-snap-align` on direct children matching `childSelector`. Cleans up
 * everything it touched on destroy.
 */
export function createScrollSnap(
  target: Target,
  options: ScrollSnapOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);

  const prevSnap = el.style.scrollSnapType;
  const prevAlignFlag = (el as unknown as Record<string, boolean | undefined>)[APPLIED] ?? false;
  el.style.scrollSnapType =
    opts.axis === 'both'
      ? `both ${opts.strictness}`
      : `${opts.axis} ${opts.strictness}`;
  (el as unknown as Record<string, boolean>)[APPLIED] = true;

  const children = Array.from(el.querySelectorAll<HTMLElement>(opts.childSelector));
  const childPrevAlign: { el: HTMLElement; prev: string }[] = [];
  children.forEach((c) => {
    childPrevAlign.push({ el: c, prev: c.style.scrollSnapAlign });
    c.style.scrollSnapAlign = opts.align;
  });

  return {
    destroy() {
      el.style.scrollSnapType = prevSnap;
      childPrevAlign.forEach(({ el: c, prev }) => {
        c.style.scrollSnapAlign = prev;
      });
      if (!prevAlignFlag) {
        delete (el as unknown as Record<string, boolean>)[APPLIED];
      }
    },
  };
}
