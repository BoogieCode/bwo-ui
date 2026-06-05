import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export type ShineTrigger = 'hover' | 'loop' | 'inview';

export interface ShineOptions {
  /** What kicks off the sweep. Default: `'hover'`. */
  trigger?: ShineTrigger;
  /** Sweep duration in seconds. Default: `0.8`. */
  duration?: number;
  /** Tilt of the highlight band in degrees. Default: `20`. */
  angle?: number;
  /** Highlight color (any value a `linear-gradient` accepts). Default: `'rgba(255,255,255,0.35)'`. */
  color?: string;
  /** Width of the highlight band as a percent of the element. Default: `16`. */
  width?: number;
  /** Pause between sweeps for `'loop'`, in seconds. Default: `2.5`. */
  delay?: number;
  /** GSAP ease. Default: `'power2.inOut'`. */
  ease?: string;
}

const DEFAULTS = {
  trigger: 'hover' as ShineTrigger,
  duration: 0.8,
  angle: 20,
  color: 'rgba(255,255,255,0.35)',
  width: 16,
  delay: 2.5,
  ease: 'power2.inOut',
};

function prefersReducedMotion(): boolean {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Light-sweep / glint. Drags a diagonal glossy highlight across the element —
 * great for cards, buttons and images. Works by appending an aria-hidden layer
 * (a tilted `linear-gradient` band) and translating it from off-left to
 * off-right with GSAP.
 *
 * The element is forced to `overflow: hidden` + `position: relative` while the
 * effect is mounted (both restored on destroy). Respects
 * `prefers-reduced-motion` (no-op). SSR-safe.
 */
export function createShine(target: Target, options: ShineOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  if (prefersReducedMotion()) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);

  const previousPosition = el.style.position;
  const previousOverflow = el.style.overflow;
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative';
  }
  el.style.overflow = 'hidden';

  // The band layer is wider than 100% so the tilt never exposes a gap, and it
  // travels from fully off the left edge to fully off the right edge.
  const layer = document.createElement('span');
  layer.dataset.bwoShine = '';
  layer.setAttribute('aria-hidden', 'true');
  Object.assign(layer.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: `linear-gradient(${90 + opts.angle}deg, transparent 0%, ${opts.color} 50%, transparent 100%)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${opts.width}% 100%`,
    backgroundPosition: '-50% 0',
  } satisfies Partial<CSSStyleDeclaration>);
  el.appendChild(layer);

  // Drive the gradient via background-position so we never need to measure the
  // element. -50% keeps the band off the left edge; 150% pushes it off the right.
  gsap.set(layer, { backgroundPosition: '-50% 0' });

  let tween: gsap.core.Tween | undefined;
  let timeline: gsap.core.Timeline | undefined;
  let scrollTrigger: ScrollTrigger | undefined;

  const sweep = (): gsap.core.Tween =>
    gsap.fromTo(
      layer,
      { backgroundPosition: '-50% 0' },
      {
        backgroundPosition: '150% 0',
        duration: opts.duration,
        ease: opts.ease,
      },
    );

  const onEnter = () => {
    tween?.kill();
    tween = sweep();
  };

  if (opts.trigger === 'hover') {
    el.addEventListener('pointerenter', onEnter);
  } else if (opts.trigger === 'loop') {
    timeline = gsap.timeline({ repeat: -1, repeatDelay: opts.delay });
    timeline.add(sweep());
  } else {
    // inview — sweep once when the element scrolls into view.
    const created = gsap.fromTo(
      layer,
      { backgroundPosition: '-50% 0' },
      {
        backgroundPosition: '150% 0',
        duration: opts.duration,
        ease: opts.ease,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      },
    );
    tween = created;
    scrollTrigger = created.scrollTrigger;
  }

  return {
    destroy() {
      if (opts.trigger === 'hover') {
        el.removeEventListener('pointerenter', onEnter);
      }
      scrollTrigger?.kill();
      tween?.kill();
      timeline?.kill();
      layer.remove();
      el.style.position = previousPosition;
      el.style.overflow = previousOverflow;
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
