import { gsap } from 'gsap';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface ShakeOptions {
  /** Axis to shake along. Default: `'x'`. */
  axis?: 'x' | 'y';
  /** Total shake duration in seconds. Default: `0.5`. */
  duration?: number;
  /** Number of full oscillations during the duration. Default: `6`. */
  cycles?: number;
  /** Max displacement in pixels. Default: `8`. */
  intensity?: number;
  /** GSAP ease. Default: `'power1.out'`. */
  ease?: string;
  /** Fires when the shake finishes. */
  onComplete?: () => void;
}

const DEFAULTS = {
  axis: 'x' as const,
  duration: 0.5,
  cycles: 6,
  intensity: 8,
  ease: 'power1.out',
};

/**
 * Single-shot shake. Each cycle decays so the motion settles back to centre
 * smoothly rather than cutting off mid-swing. Pair with form validation
 * errors, "wrong password" feedback, etc.
 */
export function createShake(target: Target, options: ShakeOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);
  const prop = opts.axis === 'y' ? 'y' : 'x';
  const cycles = Math.max(1, Math.floor(opts.cycles));
  const stepDuration = opts.duration / (cycles * 2);

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(el, { [prop]: 0 });
      opts.onComplete?.();
    },
  });

  for (let i = 0; i < cycles; i++) {
    const decay = 1 - i / cycles;
    const offset = opts.intensity * decay;
    tl.to(el, {
      [prop]: i % 2 === 0 ? offset : -offset,
      duration: stepDuration,
      ease: opts.ease,
    });
    tl.to(el, {
      [prop]: i % 2 === 0 ? -offset : offset,
      duration: stepDuration,
      ease: opts.ease,
    });
  }
  tl.to(el, { [prop]: 0, duration: stepDuration, ease: opts.ease });

  return {
    destroy() {
      tl.kill();
      gsap.set(el, { clearProps: prop });
    },
  };
}
