import { gsap, registerPlugins, ScrollTrigger } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface ParallaxOptions {
  /**
   * Strength of the effect, in pixels of total travel across the scroll
   * range. Positive = element moves slower than scroll (drifts up).
   * Negative = element moves faster (drifts down). Default: `60`.
   */
  speed?: number;
  /** Axis to translate along. Default: `'y'`. */
  axis?: 'x' | 'y';
  /** ScrollTrigger element. Default: the target itself. */
  trigger?: Target;
  /** ScrollTrigger start. Default: `'top bottom'`. */
  start?: string;
  /** ScrollTrigger end. Default: `'bottom top'`. */
  end?: string;
  /** GSAP scrub value (true = 1, or pass a number for lag). Default: `true`. */
  scrub?: boolean | number;
}

const DEFAULTS = {
  speed: 60,
  axis: 'y' as const,
  start: 'top bottom',
  end: 'bottom top',
  scrub: true as boolean | number,
};

export function createParallax(
  target: Target,
  options: ParallaxOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };
  const triggerEl = (opts.trigger ? resolveTarget(opts.trigger) : el) ?? el;

  const tween = gsap.fromTo(
    el,
    { [opts.axis]: -opts.speed / 2 },
    {
      [opts.axis]: opts.speed / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerEl,
        start: opts.start,
        end: opts.end,
        scrub: opts.scrub === true ? true : opts.scrub,
      },
    },
  );

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: opts.axis });
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
