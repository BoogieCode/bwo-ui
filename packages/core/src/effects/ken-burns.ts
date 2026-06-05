import { gsap } from 'gsap';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface KenBurnsOptions {
  /** Maximum zoom scale at the far end of the cycle. Default: `1.15`. */
  scale?: number;
  /** Seconds for one full cycle (start → end of the ease). Default: `14`. */
  duration?: number;
  /**
   * Zoom behaviour:
   * - `'in'` — slowly zooms in, then snaps back and repeats.
   * - `'out'` — slowly zooms out, then snaps back and repeats.
   * - `'alternate'` — zooms in, then out, forever (yoyo). Default.
   */
  direction?: 'in' | 'out' | 'alternate';
  /** Maximum drift (pan) in px at the far end of the cycle. Default: a small diagonal. */
  pan?: { x: number; y: number };
  /** GSAP ease. Default: `'sine.inOut'`. */
  ease?: string;
  /** CSS `transform-origin` the zoom pivots around. Default: `'center'`. */
  origin?: string;
}

const DEFAULTS = {
  scale: 1.15,
  duration: 14,
  direction: 'alternate' as 'in' | 'out' | 'alternate',
  pan: { x: 24, y: -16 },
  ease: 'sine.inOut',
  origin: 'center',
};

/**
 * Slow cinematic zoom + pan ("Ken Burns") on a background image — ideal for hero
 * sections and cards. The target is the image element itself (or a container
 * whose child `img` / `background` should pan). The element is scaled and
 * translated over a long, eased, infinitely-repeating GSAP timeline.
 *
 * `overflow: hidden` is forced onto the element's parent (or the element itself
 * when it has no parent) so the zoom never spills outside its frame.
 *
 * No-op under `prefers-reduced-motion`. SSR-safe.
 */
export function createKenBurns(
  target: Target,
  options: KenBurnsOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  // Honor reduced-motion — leave the image perfectly static.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { destroy: () => {} };
  }

  const opts = mergeOptions(DEFAULTS, options);

  // Clip the zoom to its frame. Prefer the parent so the image can pan within
  // a fixed container; fall back to the element itself when it has no parent.
  const clip = (el.parentElement ?? el) as HTMLElement;
  const prevOverflow = clip.style.overflow;
  clip.style.overflow = 'hidden';

  gsap.set(el, { transformOrigin: opts.origin });

  const zoomedIn = { scale: opts.scale, x: opts.pan.x, y: opts.pan.y };
  const zoomedOut = { scale: 1, x: 0, y: 0 };

  let tl: gsap.core.Timeline;

  if (opts.direction === 'alternate') {
    gsap.set(el, zoomedOut);
    tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(el, { ...zoomedIn, duration: opts.duration, ease: opts.ease });
  } else {
    const from = opts.direction === 'out' ? zoomedIn : zoomedOut;
    const to = opts.direction === 'out' ? zoomedOut : zoomedIn;
    gsap.set(el, from);
    tl = gsap.timeline({ repeat: -1 });
    tl.to(el, { ...to, duration: opts.duration, ease: opts.ease });
  }

  return {
    destroy() {
      tl.kill();
      gsap.set(el, { clearProps: 'scale,x,y,transform,transformOrigin' });
      clip.style.overflow = prevOverflow;
    },
  };
}
