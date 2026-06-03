import { gsap } from 'gsap';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export type CircleRevealMode = 'open' | 'close';

export interface CircleRevealOrigin {
  /** Horizontal centre. Number → percent (e.g. 50 = 50%). String passed through verbatim (e.g. '120px'). */
  x?: number | string;
  /** Vertical centre. Number → percent. String passed through verbatim. */
  y?: number | string;
}

export interface CircleRevealOptions {
  /** `'open'` grows the visible circle from origin outward. `'close'` shrinks it back in. Default: `'open'`. */
  mode?: CircleRevealMode;
  /** Centre of the circle. Default: `{ x: '50%', y: '50%' }`. */
  origin?: CircleRevealOrigin;
  /** Animation duration in seconds. Default: `0.7`. */
  duration?: number;
  /** GSAP ease. Default: `'expo.inOut'`. */
  ease?: string;
  /** Initial delay before the tween starts. Default: `0`. */
  delay?: number;
  /** Fires when the animation finishes. */
  onComplete?: () => void;
  /** Initial state to set immediately (used by PageIris to avoid first-frame flash). */
  prime?: boolean;
}

const DEFAULTS = {
  mode: 'open' as CircleRevealMode,
  duration: 0.7,
  ease: 'expo.inOut',
  delay: 0,
  prime: true,
};

function formatPart(value: number | string | undefined, fallback: string): string {
  if (value == null) return fallback;
  if (typeof value === 'number') return `${value}%`;
  return value;
}

function clipAt(radius: string, ox: string, oy: string): string {
  return `circle(${radius} at ${ox} ${oy})`;
}

/**
 * Iris/circle wipe — animates a `clip-path: circle(...)` from a point outward
 * (open) or from full coverage back to a point (close). The full radius lands
 * at 150% so the circle still covers the element when the origin is off-centre.
 *
 *   open:  circle(0%)   → circle(150%)
 *   close: circle(150%) → circle(0%)
 */
export function createCircleReveal(
  target: Target,
  options: CircleRevealOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);
  const ox = formatPart(opts.origin?.x, '50%');
  const oy = formatPart(opts.origin?.y, '50%');

  const fromRadius = opts.mode === 'open' ? '0%' : '150%';
  const toRadius = opts.mode === 'open' ? '150%' : '0%';

  const fromClip = clipAt(fromRadius, ox, oy);
  const toClip = clipAt(toRadius, ox, oy);

  // Set the starting state synchronously so the open animation doesn't flash
  // a fully-visible frame before GSAP picks up the tween on the next tick.
  if (opts.prime) {
    el.style.clipPath = fromClip;
    el.style.setProperty('-webkit-clip-path', fromClip);
  }

  const tween = gsap.fromTo(
    el,
    { clipPath: fromClip, webkitClipPath: fromClip },
    {
      clipPath: toClip,
      webkitClipPath: toClip,
      duration: opts.duration,
      ease: opts.ease,
      delay: opts.delay,
      onComplete: opts.onComplete,
    },
  );

  return {
    destroy() {
      tween.kill();
      gsap.set(el, { clearProps: 'clipPath,webkitClipPath' });
    },
  };
}
