import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export type ScrollMaskDirection = 'left' | 'right' | 'top' | 'bottom' | 'center';

export interface ScrollMaskOptions {
  /** Where the mask opens from. Default: `'center'`. */
  direction?: ScrollMaskDirection;
  /** ScrollTrigger element. Default: the target itself. */
  trigger?: Target;
  /** ScrollTrigger start. Default: `'top 80%'`. */
  start?: string;
  /** ScrollTrigger end. Default: `'bottom 40%'`. */
  end?: string;
  /** Scrub lag (true = 1, or pass a number). Default: `0.6`. */
  scrub?: boolean | number;
  /** Initial fold percentage (0-50). Default: `50`. */
  from?: number;
}

const DEFAULTS = {
  direction: 'center' as ScrollMaskDirection,
  start: 'top 80%',
  end: 'bottom 40%',
  scrub: 0.6 as boolean | number,
  from: 50,
};

function clipForDirection(direction: ScrollMaskDirection, pct: number): string {
  const p = Math.max(0, Math.min(50, pct));
  switch (direction) {
    case 'left':
      return `inset(0 ${p * 2}% 0 0)`;
    case 'right':
      return `inset(0 0 0 ${p * 2}%)`;
    case 'top':
      return `inset(${p * 2}% 0 0 0)`;
    case 'bottom':
      return `inset(0 0 ${p * 2}% 0)`;
    case 'center':
    default:
      return `inset(${p}% ${p}% ${p}% ${p}%)`;
  }
}

/**
 * Clip-path reveal scrubbed by scroll progress. Use for image / video reveals
 * where you want the viewer to "open" the media as they scroll past.
 */
export function createScrollMask(
  target: Target,
  options: ScrollMaskOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);
  const triggerEl = (opts.trigger ? resolveTarget(opts.trigger) : el) ?? el;

  const fromClip = clipForDirection(opts.direction, opts.from);
  const toClip = clipForDirection(opts.direction, 0);

  const tween = gsap.fromTo(
    el,
    { clipPath: fromClip, webkitClipPath: fromClip },
    {
      clipPath: toClip,
      webkitClipPath: toClip,
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
      gsap.set(el, { clearProps: 'clipPath,webkitClipPath' });
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
