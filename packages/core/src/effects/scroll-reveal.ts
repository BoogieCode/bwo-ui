import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export type ScrollRevealFlavor = 'lift' | 'glide' | 'pop' | 'slide' | 'mist';

export interface ScrollRevealOptions {
  /** Animation flavor. Default: `'lift'`. */
  flavor?: ScrollRevealFlavor;
  /** ScrollTrigger start. Default: `'top 88%'`. */
  start?: string;
  /** Duration in seconds. Default: `0.9`. */
  duration?: number;
  /** Initial delay before tweening. Default: `0`. */
  delay?: number;
  /** Trigger only once. Default: `true`. */
  once?: boolean;
  /** GSAP ease override. */
  ease?: string;
}

const DEFAULTS = {
  flavor: 'lift' as ScrollRevealFlavor,
  start: 'top 88%',
  duration: 0.9,
  delay: 0,
  once: true,
};

interface FlavorSpec {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  ease: string;
}

function flavorSpec(flavor: ScrollRevealFlavor): FlavorSpec {
  switch (flavor) {
    case 'glide':
      return {
        from: { opacity: 0, y: 24, x: -32 },
        to: { opacity: 1, y: 0, x: 0 },
        ease: 'expo.out',
      };
    case 'pop':
      return {
        from: { opacity: 0, scale: 0.92, y: 14 },
        to: { opacity: 1, scale: 1, y: 0 },
        ease: 'back.out(1.6)',
      };
    case 'slide':
      return {
        from: { opacity: 0, x: 64 },
        to: { opacity: 1, x: 0 },
        ease: 'power3.out',
      };
    case 'mist':
      return {
        from: { opacity: 0, filter: 'blur(14px)', y: 8 },
        to: { opacity: 1, filter: 'blur(0px)', y: 0 },
        ease: 'power2.out',
      };
    case 'lift':
    default:
      return {
        from: { opacity: 0, y: 32 },
        to: { opacity: 1, y: 0 },
        ease: 'expo.out',
      };
  }
}

/**
 * Replacement for the legacy `createReveal` clip-path reveal. Five named
 * flavors built on `opacity + transform`. Scroll-triggered, optional replay
 * on re-entry.
 */
export function createScrollReveal(
  target: Target,
  options: ScrollRevealOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);
  const spec = flavorSpec(opts.flavor);

  const tween = gsap.fromTo(el, spec.from, {
    ...spec.to,
    duration: opts.duration,
    ease: opts.ease ?? spec.ease,
    delay: opts.delay,
    scrollTrigger: {
      trigger: el,
      start: opts.start,
      once: opts.once,
      toggleActions: opts.once ? 'play none none none' : 'play none none reverse',
    },
  });

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: 'opacity,transform,filter' });
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
