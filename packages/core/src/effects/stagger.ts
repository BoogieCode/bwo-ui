import { gsap, registerPlugins, ScrollTrigger } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface StaggerOptions {
  /** Selector for children to animate. Default: `':scope > *'`. */
  itemSelector?: string;
  /** Initial offset on each axis (px) + opacity. */
  from?: { y?: number; x?: number; opacity?: number; scale?: number; rotate?: number };
  /** Per-item duration. Default: `0.8`. */
  duration?: number;
  /** Stagger between items in seconds. Default: `0.08`. */
  stagger?: number;
  /** GSAP ease. Default: `'power3.out'`. */
  ease?: string;
  /** ScrollTrigger start. Default: `'top 85%'`. */
  start?: string;
  /** ScrollTrigger end (used with scrub). Default: `'bottom 60%'`. */
  end?: string;
  /** Optional scrub (true / number). */
  scrub?: boolean | number;
  /** Play only once. Default: `true`. */
  once?: boolean;
  /** Delay before the first tween. Default: `0`. */
  delay?: number;
}

const DEFAULTS = {
  itemSelector: ':scope > *',
  duration: 0.8,
  stagger: 0.08,
  ease: 'power3.out',
  start: 'top 85%',
  end: 'bottom 60%',
  once: true,
  delay: 0,
  from: { y: 32, opacity: 0 },
};

/**
 * Stagger-in a container's direct children when the container enters the
 * viewport. Useful for cards, lists, grid items.
 */
export function createStagger(target: Target, options: StaggerOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const container = resolveTarget(target);
  if (!container || !(container instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options, from: { ...DEFAULTS.from, ...(options.from ?? {}) } };
  const items = container.querySelectorAll<HTMLElement>(opts.itemSelector);
  if (!items.length) return { destroy: () => {} };

  const tween = gsap.from(items, {
    ...opts.from,
    duration: opts.duration,
    stagger: opts.stagger,
    ease: opts.ease,
    delay: opts.scrub ? 0 : opts.delay,
    scrollTrigger: {
      trigger: container,
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
  });

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(items, {
        clearProps: 'opacity,x,y,scale,rotate,transform',
      });
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
