import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface ScrollVelocityOptions {
  /** Max absolute skew (deg) reached at peak scroll velocity. Default: `8`. */
  skew?: number;
  /** Max scale boost at peak velocity (1.0 = no scale). Default: `1.04`. */
  scale?: number;
  /** Velocity (px / tick) where the effect saturates. Default: `1200`. */
  saturate?: number;
  /** Idle smoothing back to rest, in seconds. Default: `0.4`. */
  ease?: number;
  /** Axis for skew. Default: `'y'`. */
  axis?: 'x' | 'y';
}

const DEFAULTS = {
  skew: 8,
  scale: 1.04,
  saturate: 1200,
  ease: 0.4,
  axis: 'y' as const,
};

/**
 * Distorts an element while the user scrolls — skews on one axis and slightly
 * scales the other. Reads `ScrollTrigger.getVelocity()` each tick, lerps the
 * applied transform back to rest when scrolling stops.
 */
export function createScrollVelocity(
  target: Target,
  options: ScrollVelocityOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);

  let current = 0;
  const setSkew = gsap.quickTo(el, opts.axis === 'y' ? 'skewY' : 'skewX', {
    duration: opts.ease,
    ease: 'power3.out',
  });
  const setScale = gsap.quickTo(el, opts.axis === 'y' ? 'scaleX' : 'scaleY', {
    duration: opts.ease,
    ease: 'power3.out',
  });

  const handler = ScrollTrigger.create({
    onUpdate: (self) => {
      const v = self.getVelocity();
      const clamped = Math.max(-1, Math.min(1, v / opts.saturate));
      current = clamped;
      setSkew(clamped * opts.skew);
      setScale(1 + Math.abs(clamped) * (opts.scale - 1));
    },
  });

  return {
    destroy() {
      handler.kill();
      gsap.set(el, {
        clearProps: opts.axis === 'y' ? 'skewY,scaleX' : 'skewX,scaleY',
      });
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
