import { gsap, registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface ScrambleTextOptions {
  /** The final text to settle on. Default: the element's current textContent. */
  text?: string;
  /** Character pool used during the scramble. Default: `'01'` (matrix). */
  chars?: string;
  /** Total duration in seconds. Default: `1.5`. */
  duration?: number;
  /**
   * Trigger mode. `'mount'` runs immediately, `'hover'` runs on mouseenter,
   * `'scroll'` runs when the element enters the viewport. Default: `'mount'`.
   */
  trigger?: 'mount' | 'hover' | 'scroll';
  /** Speed of the scramble (in seconds per character flip). Default: `0.04`. */
  speed?: number;
  /** Play only once. Default: `true`. */
  once?: boolean;
}

const DEFAULTS = {
  chars: '01',
  duration: 1.5,
  trigger: 'mount' as const,
  speed: 0.04,
  once: true,
};

/**
 * Custom scramble — works without GSAP's ScrambleTextPlugin (which is
 * available, but we keep this dep-free to limit the install surface).
 */
export function createScrambleText(
  target: Target,
  options: ScrambleTextOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };
  const finalText = opts.text ?? el.textContent ?? '';
  const charPool = opts.chars;
  let rafId: number | null = null;
  let played = false;

  const randChar = () => charPool[Math.floor(Math.random() * charPool.length)] ?? '·';

  const run = () => {
    if (opts.once && played) return;
    played = true;
    if (rafId) cancelAnimationFrame(rafId);

    const start = performance.now();
    const len = finalText.length;
    const total = opts.duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / total, 1);
      const resolveCount = Math.floor(progress * len);

      let out = '';
      for (let i = 0; i < len; i += 1) {
        if (i < resolveCount) {
          out += finalText[i];
        } else if (finalText[i] === ' ') {
          out += ' ';
        } else {
          out += randChar();
        }
      }
      el.textContent = out;

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        el.textContent = finalText;
        rafId = null;
      }
    };

    rafId = requestAnimationFrame(tick);
  };

  let cleanup: (() => void) | null = null;

  if (opts.trigger === 'mount') {
    run();
  } else if (opts.trigger === 'hover') {
    el.addEventListener('mouseenter', run);
    cleanup = () => el.removeEventListener('mouseenter', run);
  } else if (opts.trigger === 'scroll') {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            if (opts.once) observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    cleanup = () => observer.disconnect();
  }

  // touch gsap to avoid tree-shake removing it from the bundle when only this
  // effect is imported (in case the caller also wants to chain gsap.from etc.)
  void gsap;

  return {
    destroy() {
      if (rafId) cancelAnimationFrame(rafId);
      cleanup?.();
      el.textContent = finalText;
    },
  };
}
