import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export type BlurDirection = 'in' | 'out';

export interface BlurOptions {
  /** Initial blur in px. Default: `16`. */
  from?: number;
  /** Final blur in px. Default: `0`. */
  to?: number;
  /**
   * `in` (default) animates from blurred to sharp — sharpens on enter.
   * `out` animates from sharp to blurred — blurs on leave. When you set this,
   * `from` and `to` are swapped automatically unless you specify them yourself.
   */
  direction?: BlurDirection;
  /** Pair the blur with an opacity fade. For `direction: 'in'` fades 0 → 1; for `'out'` fades 1 → 0. Default: `true`. */
  fade?: boolean;
  /** Tween duration. Default: `1.0`. */
  duration?: number;
  /** GSAP ease. Default: `'power3.out'`. */
  ease?: string;
  /** ScrollTrigger start. Default: `'top 85%'`. */
  start?: string;
  /** ScrollTrigger end (only with scrub). Default: `'bottom 60%'`. */
  end?: string;
  /** Scrub the blur with scroll progress. Default: `false`. */
  scrub?: boolean | number;
  /** Play only once. Default: `true`. */
  once?: boolean;
  /** Delay. */
  delay?: number;
}

const DEFAULTS = {
  from: 16,
  to: 0,
  direction: 'in' as BlurDirection,
  fade: true,
  duration: 1.0,
  ease: 'power3.out',
  start: 'top 85%',
  end: 'bottom 60%',
  once: true,
  delay: 0,
};

function prefersReducedMotion(): boolean {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll-driven blur reveal. By default an element starts blurred and resolves into focus
 * as it enters the viewport. With `direction: 'out'` it inverts — sharp on enter, blurs as
 * it leaves. Optionally pairs with an opacity fade. Respects `prefers-reduced-motion`.
 */
export function createBlur(target: Target, options: BlurOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);

  // For direction:'out', swap from/to if the caller didn't pin them. The user-facing
  // mental model: "from" = how blurred at the start of the reveal. With 'out', the start
  // IS sharp, so the resting blur amount is the larger value.
  const start = opts.direction === 'out' ? opts.to : opts.from;
  const end = opts.direction === 'out' ? opts.from : opts.to;
  const fadeStart = opts.fade ? (opts.direction === 'out' ? 1 : 0) : 1;
  const fadeEnd = opts.fade ? (opts.direction === 'out' ? 0 : 1) : 1;

  // Reduced motion — snap to the resolved state, no animation.
  if (prefersReducedMotion()) {
    gsap.set(el, { filter: `blur(${end}px)`, opacity: fadeEnd });
    return { destroy: () => gsap.set(el, { clearProps: 'filter,opacity' }) };
  }

  const tween = gsap.fromTo(
    el,
    {
      filter: `blur(${start}px)`,
      opacity: fadeStart,
    },
    {
      filter: `blur(${end}px)`,
      opacity: fadeEnd,
      duration: opts.duration,
      ease: opts.ease,
      delay: opts.scrub ? 0 : opts.delay,
      scrollTrigger: {
        trigger: el,
        start: opts.start,
        end: opts.end,
        scrub: opts.scrub === true ? true : opts.scrub || false,
        once: opts.scrub ? false : opts.once,
        toggleActions: opts.scrub
          ? undefined
          : opts.once
            ? 'play none none none'
            : 'play none none reverse',
      },
    },
  );

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: 'filter,opacity' });
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
