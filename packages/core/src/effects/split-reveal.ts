import { gsap, registerPlugins, ScrollTrigger, SplitText } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export type SplitRevealType = 'chars' | 'words' | 'lines' | 'words,chars' | 'chars,words,lines';

export interface SplitRevealOptions {
  /** What to split the text into. Default: `'words'`. */
  type?: SplitRevealType;
  /** Stagger between units in seconds. Default: `0.04`. */
  stagger?: number;
  /** Per-unit duration. Default: `0.6`. */
  duration?: number;
  /** Starting transform/opacity for each unit. */
  from?: { y?: number; x?: number; opacity?: number; rotate?: number; scale?: number };
  /** GSAP ease. Default: `'power3.out'`. */
  ease?: string;
  /** Delay before the tween starts (only when `scrub` is falsy). */
  delay?: number;
  /** ScrollTrigger element or selector. Default: the target itself. */
  trigger?: Target;
  /** ScrollTrigger start. Default: `'top 85%'`. */
  start?: string;
  /** ScrollTrigger end (only used when scrubbing). Default: `'bottom 60%'`. */
  end?: string;
  /** When true (or a number), animation scrubs with scroll. */
  scrub?: boolean | number;
  /** Play only once. Default: `true`. */
  once?: boolean;
  /** Wrap each unit in an overflow-clip mask for clean reveals. */
  mask?: 'lines' | 'words' | 'chars' | false;
}

const DEFAULTS = {
  type: 'words' as SplitRevealType,
  stagger: 0.04,
  duration: 0.6,
  ease: 'power3.out',
  start: 'top 85%',
  end: 'bottom 60%',
  once: true,
  delay: 0,
  from: { y: 24, opacity: 0 },
};

export function createSplitReveal(
  target: Target,
  options: SplitRevealOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options, from: { ...DEFAULTS.from, ...(options.from ?? {}) } };
  const triggerEl = (opts.trigger ? resolveTarget(opts.trigger) : el) ?? el;

  let split: InstanceType<typeof SplitText> | null = null;

  split = SplitText.create(el, {
    type: opts.type,
    mask: opts.mask || undefined,
    autoSplit: true,
    onSplit(self) {
      const units = self.chars.length
        ? self.chars
        : self.words.length
          ? self.words
          : self.lines;
      if (!units.length) return undefined;

      // Inline scrollTrigger config — GSAP handles the tween-trigger lifecycle
      // itself, including the case where the element is already past the start
      // threshold at page load (fires onEnter on initial refresh).
      return gsap.from(units, {
        ...opts.from,
        duration: opts.duration,
        stagger: opts.stagger,
        ease: opts.ease,
        delay: opts.scrub ? 0 : opts.delay,
        scrollTrigger: {
          trigger: triggerEl,
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
    },
  });

  return {
    destroy() {
      split?.revert();
      split = null;
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
