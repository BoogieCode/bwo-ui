import { gsap, registerPlugins, ScrollTrigger } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface ScrollProgressOptions {
  /**
   * Trigger element. When omitted, the indicator tracks the whole document
   * (page scroll). When provided, it tracks scroll progress through that
   * element's range.
   */
  trigger?: Target;
  /** ScrollTrigger start. Default: `'top top'`. */
  start?: string;
  /** ScrollTrigger end. Default: `'bottom bottom'`. */
  end?: string;
  /** Axis the bar grows along. Default: `'x'`. */
  axis?: 'x' | 'y';
  /** Transform-origin for the scale tween. Default: `'left center'` (x) or `'top center'` (y). */
  origin?: string;
}

const DEFAULTS = {
  start: 'top top',
  end: 'bottom bottom',
  axis: 'x' as const,
};

/**
 * Binds the target's scale to scroll progress through the page (or a
 * specific section). Typically used on a fixed top bar.
 *
 * The target's initial scale is set to 0; use a background-color on the bar
 * to make it visible.
 */
export function createScrollProgress(
  target: Target,
  options: ScrollProgressOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };
  const axis = opts.axis;
  const origin = opts.origin ?? (axis === 'x' ? 'left center' : 'top center');
  const scaleProp = axis === 'x' ? 'scaleX' : 'scaleY';

  gsap.set(el, { [scaleProp]: 0, transformOrigin: origin });

  const triggerEl = opts.trigger ? resolveTarget(opts.trigger) : document.documentElement;

  const tween = gsap.to(el, {
    [scaleProp]: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerEl ?? undefined,
      start: opts.start,
      end: opts.end,
      scrub: true,
    },
  });

  return {
    destroy() {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: `${scaleProp},transformOrigin` });
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
