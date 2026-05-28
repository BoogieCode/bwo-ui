import { gsap, registerPlugins, ScrollTrigger } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface BlurOptions {
  /** Initial blur in px. Default: `16`. */
  from?: number;
  /** Final blur in px. Default: `0`. */
  to?: number;
  /** Pair the blur with an opacity fade (0 → 1). Default: `true`. */
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
  fade: true,
  duration: 1.0,
  ease: 'power3.out',
  start: 'top 85%',
  end: 'bottom 60%',
  once: true,
  delay: 0,
};

/**
 * Scroll-driven blur reveal — the element starts blurred and resolves into
 * focus as it enters the viewport. Optionally fades opacity at the same time.
 */
export function createBlur(target: Target, options: BlurOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };

  const tween = gsap.fromTo(
    el,
    {
      filter: `blur(${opts.from}px)`,
      opacity: opts.fade ? 0 : 1,
    },
    {
      filter: `blur(${opts.to}px)`,
      opacity: 1,
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
