import { gsap, registerPlugins, ScrollTrigger } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export type RevealDirection = 'left' | 'right' | 'top' | 'bottom';

export interface RevealOptions {
  /** Direction the content emerges from. Default: `'bottom'`. */
  direction?: RevealDirection;
  /** Tween duration. Default: `1.0`. */
  duration?: number;
  /** GSAP ease. Default: `'expo.out'`. */
  ease?: string;
  /** ScrollTrigger start. Default: `'top 85%'`. */
  start?: string;
  /** Trigger only once. Default: `true`. */
  once?: boolean;
  /** Delay before the tween. */
  delay?: number;
}

const DEFAULTS = {
  direction: 'bottom' as RevealDirection,
  duration: 1.0,
  ease: 'expo.out',
  start: 'top 85%',
  once: true,
  delay: 0,
};

function clipFrom(direction: RevealDirection): string {
  switch (direction) {
    case 'left':
      return 'inset(0 100% 0 0)';
    case 'right':
      return 'inset(0 0 0 100%)';
    case 'top':
      return 'inset(0 0 100% 0)';
    case 'bottom':
    default:
      return 'inset(100% 0 0 0)';
  }
}

/**
 * Clip-path reveal — the element is hidden behind a mask that opens in the
 * requested direction when it scrolls into view. Good for image and section
 * reveals.
 */
export function createReveal(target: Target, options: RevealOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };

  const tween = gsap.fromTo(
    el,
    { clipPath: clipFrom(opts.direction), webkitClipPath: clipFrom(opts.direction) },
    {
      clipPath: 'inset(0 0 0 0)',
      webkitClipPath: 'inset(0 0 0 0)',
      duration: opts.duration,
      ease: opts.ease,
      delay: opts.delay,
      scrollTrigger: {
        trigger: el,
        start: opts.start,
        once: opts.once,
        toggleActions: opts.once ? 'play none none none' : 'play none none reverse',
      },
    },
  );

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: 'clipPath,webkitClipPath' });
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
