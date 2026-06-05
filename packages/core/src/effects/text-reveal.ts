import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface TextRevealOptions {
  /** Resting opacity of words not yet revealed. Default: `0.18`. */
  dimOpacity?: number;
  /** ScrollTrigger start. Default: `'top 80%'`. */
  start?: string;
  /** ScrollTrigger end. Default: `'bottom 60%'`. */
  end?: string;
  /** Stagger between words in the scrub timeline. Default: `0.4`. */
  stagger?: number;
}

const DEFAULTS = {
  dimOpacity: 0.18,
  start: 'top 80%',
  end: 'bottom 60%',
  stagger: 0.4,
};

/**
 * Scroll-driven, word-by-word opacity reveal — the popular "scroll-tell".
 * Splits the target's text into word spans and scrubs each word from
 * `dimOpacity` to full as the target scrolls through the viewport.
 */
export function createTextReveal(
  target: Target,
  options: TextRevealOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);

  let split: InstanceType<typeof SplitText> | null = null;
  let timeline: gsap.core.Timeline | null = null;

  split = SplitText.create(el, {
    type: 'words',
    wordsClass: 'bwo-text-reveal-word',
    onSplit(self) {
      const words = self.words;
      if (!words.length) return undefined;

      gsap.set(words, { opacity: opts.dimOpacity });

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: opts.start,
          end: opts.end,
          scrub: true,
        },
      });

      timeline.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: opts.stagger,
      });

      return timeline;
    },
  });

  return {
    destroy() {
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      timeline = null;
      split?.revert();
      split = null;
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
