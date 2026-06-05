import { gsap } from 'gsap';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface FloatOptions {
  /** Vertical travel in px (peak-to-peak the element rises by this much). Default: `12`. */
  distance?: number;
  /** Seconds per half-cycle (up, then down). Default: `3`. */
  duration?: number;
  /** Subtle rotational sway in degrees. Default: `0`. */
  rotate?: number;
  /** Subtle horizontal drift in px. Default: `0`. */
  drift?: number;
  /** GSAP ease. Default: `'sine.inOut'`. */
  ease?: string;
  /** Delay before the loop starts, in seconds. Default: `0`. */
  delay?: number;
}

const DEFAULTS = {
  distance: 12,
  duration: 3,
  rotate: 0,
  drift: 0,
  ease: 'sine.inOut',
  delay: 0,
};

/**
 * Gentle idle levitation — eases the element up and down forever (with optional
 * rotational sway and horizontal drift) to give hero images, cards, badges and
 * mockups a "hovering in air" feel. Built on a yoyo-ing, infinitely-repeating
 * GSAP timeline. No-op under `prefers-reduced-motion`.
 */
export function createFloat(target: Target, options: FloatOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  // Honor reduced-motion — leave the element perfectly static.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { destroy: () => {} };
  }

  const opts = mergeOptions(DEFAULTS, options);

  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    delay: opts.delay,
  });

  tl.to(el, {
    y: -opts.distance,
    x: opts.drift,
    rotation: opts.rotate,
    duration: opts.duration,
    ease: opts.ease,
  });

  return {
    destroy() {
      tl.kill();
      gsap.set(el, { clearProps: 'x,y,rotation,transform' });
    },
  };
}
