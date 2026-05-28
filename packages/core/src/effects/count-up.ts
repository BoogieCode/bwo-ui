import { gsap, registerPlugins, ScrollTrigger } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface CountUpOptions {
  /** End value. Default: parsed from element textContent. */
  to?: number;
  /** Start value. Default: `0`. */
  from?: number;
  /** Duration in seconds. Default: `2`. */
  duration?: number;
  /** GSAP ease. Default: `'power2.out'`. */
  ease?: string;
  /** Decimal places. Default: `0`. */
  decimals?: number;
  /** Thousands separator. Default: `','`. Set to `''` for none. */
  separator?: string;
  /** Decimal separator. Default: `'.'`. */
  decimal?: string;
  /** Prefix (e.g. '$'). */
  prefix?: string;
  /** Suffix (e.g. '%'). */
  suffix?: string;
  /** When the element enters the viewport. Default: `'top 85%'`. */
  start?: string;
  /** Trigger only once. Default: `true`. */
  once?: boolean;
}

const DEFAULTS = {
  from: 0,
  duration: 2,
  ease: 'power2.out',
  decimals: 0,
  separator: ',',
  decimal: '.',
  prefix: '',
  suffix: '',
  start: 'top 85%',
  once: true,
};

function format(value: number, opts: typeof DEFAULTS): string {
  const fixed = value.toFixed(opts.decimals);
  const [intPart, decPart] = fixed.split('.');
  const withSeparators = opts.separator
    ? (intPart ?? '0').replace(/\B(?=(\d{3})+(?!\d))/g, opts.separator)
    : (intPart ?? '0');
  const numeric = decPart ? `${withSeparators}${opts.decimal}${decPart}` : withSeparators;
  return `${opts.prefix}${numeric}${opts.suffix}`;
}

/**
 * Animates a number counting up to a target value when the element scrolls
 * into view. Reads the target from the `to` option, the `data-count-to`
 * attribute, or the element's current text content.
 */
export function createCountUp(target: Target, options: CountUpOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };

  // Resolve target value.
  let to = opts.to;
  if (to === undefined) {
    const dataAttr = el.dataset.countTo;
    const fromText = (el.textContent ?? '').replace(/[^\d.-]/g, '');
    to = dataAttr ? Number(dataAttr) : Number(fromText);
  }
  if (!Number.isFinite(to)) return { destroy: () => {} };

  const obj = { value: opts.from };
  el.textContent = format(obj.value, opts);

  const tween = gsap.to(obj, {
    value: to,
    duration: opts.duration,
    ease: opts.ease,
    onUpdate: () => {
      el.textContent = format(obj.value, opts);
    },
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
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
