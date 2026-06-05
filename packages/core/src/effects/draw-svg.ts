import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface DrawSvgOptions {
  /** Per-shape draw duration in seconds. Default: `1.2`. */
  duration?: number;
  /** Delay between successive shapes. Default: `0.15`. */
  stagger?: number;
  /** GSAP ease. Default: `'power1.inOut'`. */
  ease?: string;
  /** `'inview'` uses ScrollTrigger; `'immediate'` draws on mount. Default: `'inview'`. */
  trigger?: 'inview' | 'immediate';
  /** ScrollTrigger start (only when `trigger: 'inview'`). Default: `'top 80%'`. */
  start?: string;
  /** Trigger only once. Default: `true`. */
  once?: boolean;
  /** `'in'` draws strokes on; `'out'` erases them. Default: `'in'`. */
  draw?: 'in' | 'out';
}

const DEFAULTS = {
  duration: 1.2,
  stagger: 0.15,
  ease: 'power1.inOut',
  trigger: 'inview' as 'inview' | 'immediate',
  start: 'top 80%',
  once: true,
  draw: 'in' as 'in' | 'out',
};

const SHAPE_SELECTOR = 'path, line, circle, polyline';

type DrawableShape = SVGElement & { getTotalLength(): number };

function hasTotalLength(el: Element): el is DrawableShape {
  return typeof (el as Partial<DrawableShape>).getTotalLength === 'function';
}

/** Collect all stroked shapes inside the target, or the target itself if drawable. */
function collectShapes(el: Element): DrawableShape[] {
  const found = Array.from(el.querySelectorAll<SVGElement>(SHAPE_SELECTOR)).filter(
    hasTotalLength,
  );
  if (found.length) return found;
  if (hasTotalLength(el)) return [el];
  return [];
}

interface Restorable {
  shape: DrawableShape;
  dasharray: string;
  dashoffset: string;
}

/**
 * Animates SVG stroke drawing for animated underlines, dividers, icons,
 * signatures and connector lines. Each `<path>/<line>/<circle>/<polyline>`
 * gets its `stroke-dasharray`/`stroke-dashoffset` set to its total length,
 * then `dashoffset` is tweened toward (or away from) `0` to draw it on/off.
 * Scroll-triggered by default, or `'immediate'` on mount.
 */
export function createDrawSvg(
  target: Target,
  options: DrawSvgOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);
  const shapes = collectShapes(el);
  if (!shapes.length) return { destroy: () => {} };

  const restorables: Restorable[] = [];
  const tweens: gsap.core.Tween[] = [];

  shapes.forEach((shape, i) => {
    let length: number;
    try {
      length = shape.getTotalLength();
    } catch {
      return;
    }
    if (!Number.isFinite(length) || length <= 0) return;

    restorables.push({
      shape,
      dasharray: shape.style.strokeDasharray,
      dashoffset: shape.style.strokeDashoffset,
    });

    const drawn = length; // offset when fully un-drawn
    const from = opts.draw === 'out' ? 0 : drawn;
    const to = opts.draw === 'out' ? drawn : 0;

    gsap.set(shape, { strokeDasharray: length, strokeDashoffset: from });

    const tween = gsap.to(shape, {
      strokeDashoffset: to,
      duration: opts.duration,
      ease: opts.ease,
      delay: opts.stagger * i,
      paused: opts.trigger === 'inview',
      scrollTrigger:
        opts.trigger === 'inview'
          ? {
              trigger: el,
              start: opts.start,
              once: opts.once,
              toggleActions: opts.once
                ? 'play none none none'
                : 'play none none reverse',
            }
          : undefined,
    });
    tweens.push(tween);
  });

  if (!tweens.length) return { destroy: () => {} };

  return {
    destroy() {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
      restorables.forEach(({ shape, dasharray, dashoffset }) => {
        shape.style.strokeDasharray = dasharray;
        shape.style.strokeDashoffset = dashoffset;
      });
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
