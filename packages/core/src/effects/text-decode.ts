import { gsap } from 'gsap';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface TextDecodeOptions {
  /** Total duration in seconds. Default: `1.4`. */
  duration?: number;
  /** Pool of characters used for the scramble. Default: alphanumerics + symbols. */
  chars?: string;
  /** How fast each character cycles, in seconds per swap. Default: `0.04`. */
  speed?: number;
  /** Delay before the decode starts, in seconds. Default: `0`. */
  delay?: number;
  /** Replay on every call rather than only once. Default: `false`. */
  loop?: boolean;
  /** Fires when every character has settled. */
  onComplete?: () => void;
}

const DEFAULT_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

const DEFAULTS = {
  duration: 1.4,
  chars: DEFAULT_CHARS,
  speed: 0.04,
  delay: 0,
  loop: false,
};

/**
 * Character-by-character decode/scramble — each glyph cycles through a pool of
 * random characters before settling on its target. The element's text content
 * is captured on mount and treated as the target string.
 */
export function createTextDecode(
  target: Target,
  options: TextDecodeOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);
  const final = el.textContent ?? '';
  const chars = opts.chars || DEFAULT_CHARS;
  if (chars.length === 0) return { destroy: () => {} };

  const finalChars = Array.from(final);
  const settleAt = finalChars.map((_, i) =>
    Math.max(0, opts.delay + opts.duration * (i / Math.max(1, finalChars.length - 1))),
  );

  const state = { t: 0 };

  const tween = gsap.fromTo(
    state,
    { t: 0 },
    {
      t: opts.delay + opts.duration,
      duration: opts.delay + opts.duration,
      ease: 'none',
      repeat: opts.loop ? -1 : 0,
      onComplete: opts.onComplete,
      onUpdate: () => {
        let s = '';
        for (let i = 0; i < finalChars.length; i++) {
          const target = finalChars[i]!;
          if (target === ' ' || target === '\n') {
            s += target;
            continue;
          }
          if (state.t >= settleAt[i]!) {
            s += target;
          } else {
            const idx = Math.floor((state.t + i * 13.37) / opts.speed) % chars.length;
            s += chars.charAt(Math.abs(idx));
          }
        }
        el.textContent = s;
      },
    },
  );

  return {
    destroy() {
      tween.kill();
      el.textContent = final;
    },
  };
}
