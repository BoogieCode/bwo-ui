import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface NumberTickerOptions {
  /** Target value. Default: parsed from the element's text content. */
  value?: number;
  /** Duration in seconds. Default: `1.4`. */
  duration?: number;
  /** GSAP ease. Default: `'power2.out'`. */
  ease?: string;
  /** Decimal places. Default: `0`. */
  decimals?: number;
  /** Prefix (e.g. '$'). */
  prefix?: string;
  /** Suffix (e.g. '%'). */
  suffix?: string;
  /** Thousands separator. Default: `''` (none). */
  separator?: string;
  /** Decimal separator. Default: `'.'`. */
  decimal?: string;
  /** When to start: on scroll into view or right away. Default: `'inview'`. */
  trigger?: 'inview' | 'immediate';
  /** ScrollTrigger start (only when `trigger` is `'inview'`). Default: `'top 85%'`. */
  start?: string;
}

const DEFAULTS = {
  duration: 1.4,
  ease: 'power2.out',
  decimals: 0,
  prefix: '',
  suffix: '',
  separator: '',
  decimal: '.',
  trigger: 'inview' as 'inview' | 'immediate',
  start: 'top 85%',
};

const STYLE_ID = 'bwo-number-ticker-style';

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
[data-bwo-ticker] {
  display: inline-flex;
  align-items: baseline;
  font-variant-numeric: tabular-nums;
}
[data-bwo-ticker-reel] {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
}
[data-bwo-ticker-strip] {
  display: flex;
  flex-direction: column;
  will-change: transform;
}
[data-bwo-ticker-strip] > span {
  display: block;
  text-align: center;
}
  `.trim();
  document.head.appendChild(style);
}

/**
 * Formats `value` into the digit string (without prefix/suffix) used to drive
 * the reels, e.g. `1234.5` -> `'1,234.5'`.
 */
function formatNumeric(value: number, opts: typeof DEFAULTS): string {
  const fixed = Math.abs(value).toFixed(opts.decimals);
  const [intPart, decPart] = fixed.split('.');
  const withSeparators = opts.separator
    ? (intPart ?? '0').replace(/\B(?=(\d{3})+(?!\d))/g, opts.separator)
    : (intPart ?? '0');
  const sign = value < 0 ? '-' : '';
  return decPart ? `${sign}${withSeparators}${opts.decimal}${decPart}` : `${sign}${withSeparators}`;
}

/**
 * Renders a number as odometer-style rolling digit reels and animates each
 * reel to its target digit when the element scrolls into view (or immediately).
 * Reads the target from the `value` option or the element's current text.
 *
 * Each numeric digit becomes a vertical strip of 0-9 (plus a 10th cell wrapping
 * back to 0) inside an `overflow: hidden` window; the strip is translated up so
 * the target digit sits in the window. Non-digit characters (separators,
 * decimal point) render as static cells.
 */
export function createNumberTicker(
  target: Target,
  options: NumberTickerOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);

  // Resolve target value.
  let value = opts.value;
  if (value === undefined) {
    const fromText = (el.textContent ?? '').replace(/[^\d.-]/g, '');
    value = Number(fromText);
  }
  if (!Number.isFinite(value)) return { destroy: () => {} };

  ensureStyle();

  const originalText = el.textContent ?? '';
  const numeric = formatNumeric(value, opts);
  const digitChars = `${opts.prefix}${numeric}${opts.suffix}`.split('');

  el.textContent = '';
  el.dataset.bwoTicker = '';

  // Build per-character DOM. Digit chars get a rolling reel; everything else
  // (prefix, suffix, separators, sign, decimal) renders as a static cell.
  const strips: HTMLElement[] = [];
  const targetDigits: number[] = [];

  for (const ch of digitChars) {
    if (ch >= '0' && ch <= '9') {
      const reel = document.createElement('span');
      reel.dataset.bwoTickerReel = '';

      const strip = document.createElement('span');
      strip.dataset.bwoTickerStrip = '';
      // 0..9 then a trailing 0 so the wrap-around cell exists if ever needed.
      for (let d = 0; d <= 10; d++) {
        const cell = document.createElement('span');
        cell.textContent = String(d % 10);
        strip.appendChild(cell);
      }
      reel.appendChild(strip);
      el.appendChild(reel);
      strips.push(strip);
      targetDigits.push(Number(ch));
    } else {
      const cell = document.createElement('span');
      cell.textContent = ch;
      el.appendChild(cell);
    }
  }

  // Each reel cell is one line tall; translate up by (digit / 11) of the strip
  // height. Using percentage of the strip keeps it font-size independent.
  const cellPercent = 100 / 11;

  // Start all reels at 0.
  for (const strip of strips) {
    gsap.set(strip, { yPercent: 0 });
  }

  let scrollTrigger: ScrollTrigger | undefined;

  const tweens = strips.map((strip, i) =>
    gsap.to(strip, {
      yPercent: -cellPercent * (targetDigits[i] ?? 0),
      duration: opts.duration,
      ease: opts.ease,
      paused: true,
    }),
  );

  const play = () => {
    for (const t of tweens) t.play();
  };

  if (opts.trigger === 'immediate') {
    play();
  } else {
    scrollTrigger = ScrollTrigger.create({
      trigger: el,
      start: opts.start,
      once: true,
      onEnter: play,
    });
  }

  return {
    destroy() {
      scrollTrigger?.kill();
      for (const t of tweens) t.kill();
      delete el.dataset.bwoTicker;
      el.textContent = originalText;
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
