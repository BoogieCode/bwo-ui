import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface TextGlitchOptions {
  /** The final text. Default: the element's current textContent. */
  text?: string;
  /** Frames per second of glitch updates. Default: `12`. */
  fps?: number;
  /** Total duration in seconds. Default: `1.2`. */
  duration?: number;
  /** Trigger mode. Default: `'hover'`. */
  trigger?: 'mount' | 'hover' | 'scroll';
  /** Character pool used for glitches. Default: a mix of digits, latin, symbols. */
  chars?: string;
  /** Probability per-frame that any given character glitches (0–1). Default: `0.4`. */
  intensity?: number;
  /** Play only once. Default: `true` for scroll/mount, `false` for hover (re-plays). */
  once?: boolean;
}

const DEFAULT_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';

const DEFAULTS = {
  fps: 12,
  duration: 1.2,
  trigger: 'hover' as const,
  chars: DEFAULT_CHARS,
  intensity: 0.4,
};

/**
 * Quick, jittery character corruption — faster + denser than ScrambleText.
 * Each frame, a percentage of characters are replaced with random glyphs;
 * over the duration, the percentage decays linearly to zero, so the original
 * text emerges.
 */
export function createTextGlitch(
  target: Target,
  options: TextGlitchOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };
  const finalText = opts.text ?? el.textContent ?? '';
  const once = options.once ?? (opts.trigger !== 'hover');
  let played = false;
  let intervalId: number | null = null;

  const randChar = () =>
    opts.chars[Math.floor(Math.random() * opts.chars.length)] ?? '·';

  const run = () => {
    if (once && played) return;
    played = true;
    if (intervalId) window.clearInterval(intervalId);

    const start = performance.now();
    const totalMs = opts.duration * 1000;
    const frameMs = 1000 / opts.fps;

    intervalId = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / totalMs, 1);
      const noise = opts.intensity * (1 - progress);

      if (progress >= 1) {
        el.textContent = finalText;
        if (intervalId) window.clearInterval(intervalId);
        intervalId = null;
        return;
      }

      let out = '';
      for (let i = 0; i < finalText.length; i += 1) {
        if (finalText[i] === ' ') {
          out += ' ';
        } else if (Math.random() < noise) {
          out += randChar();
        } else {
          out += finalText[i];
        }
      }
      el.textContent = out;
    }, frameMs);
  };

  let cleanup: (() => void) | null = null;

  if (opts.trigger === 'mount') {
    run();
  } else if (opts.trigger === 'hover') {
    const onEnter = () => {
      played = false;
      run();
    };
    el.addEventListener('mouseenter', onEnter);
    cleanup = () => el.removeEventListener('mouseenter', onEnter);
  } else if (opts.trigger === 'scroll') {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            if (once) observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    cleanup = () => observer.disconnect();
  }

  return {
    destroy() {
      if (intervalId) window.clearInterval(intervalId);
      cleanup?.();
      el.textContent = finalText;
    },
  };
}
