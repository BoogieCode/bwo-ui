import { gsap } from 'gsap';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface ConfettiOptions {
  /** Number of particles to fire. Default: `60`. */
  count?: number;
  /** Spread arc in degrees. 360 = burst in all directions. Default: `90`. */
  spread?: number;
  /** Origin angle in degrees (0 = up, 90 = right, 180 = down, 270 = left). Default: `0`. */
  angle?: number;
  /** Initial velocity in pixels per second. Default: `560`. */
  velocity?: number;
  /** How much gravity pulls particles down (px / s²). Default: `1400`. */
  gravity?: number;
  /** Particle lifetime in seconds. Default: `1.6`. */
  duration?: number;
  /** Particle size range in pixels [min, max]. Default: `[6, 12]`. */
  size?: [number, number];
  /** Palette to randomise from. */
  colors?: string[];
  /**
   * Reference element the burst ORIGINATES from — its centre (in viewport
   * coordinates) becomes the launch point. Lets you trigger from a button but
   * launch from a hero/section/anywhere. Defaults to the `target` element.
   */
  originElement?: Target;
  /**
   * Explicit launch point. In `portal` mode (default) these are VIEWPORT
   * coordinates; in non-portal mode they are offsets within the target box.
   * Overrides `originElement`.
   */
  origin?: { x: number; y: number };
  /**
   * Render particles in a fixed, full-viewport layer appended to `<body>` so
   * they fly freely and are never clipped by (or trapped under) a small trigger
   * element. The old behaviour — a layer absolutely positioned inside the
   * target — is `portal: false`. Default: `true`.
   */
  portal?: boolean;
  /** Z-index applied to the particle layer. Default: `9999`. */
  zIndex?: number;
}

const DEFAULTS = {
  count: 60,
  spread: 90,
  angle: 0,
  velocity: 560,
  gravity: 1400,
  duration: 1.6,
  size: [6, 12] as [number, number],
  colors: ['#ff481f', '#ffc446', '#16a34a', '#0ea5e9', '#7463ff', '#ec4899'],
  portal: true,
  zIndex: 9999,
};

const noop: MotionInstance = { destroy: () => {} };

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Fires a confetti burst. By default particles render in a fixed, full-viewport
 * layer and launch from the centre of `originElement` (or the `target`), so a
 * burst triggered by a small button still flies across the screen instead of
 * being trapped under the button. Pass `portal: false` for the legacy
 * inside-the-target behaviour. The instance fires once per creation.
 */
export function createConfetti(
  target: Target,
  options: ConfettiOptions = {},
): MotionInstance {
  if (!isBrowser()) return noop;

  const opts = mergeOptions(DEFAULTS, options);
  if (opts.colors.length === 0) opts.colors = DEFAULTS.colors;

  // The element the burst launches FROM (reference div, else the target).
  const originEl =
    (options.originElement ? resolveTarget(options.originElement) : null) ?? resolveTarget(target);

  const angleRad = (opts.angle * Math.PI) / 180;
  const spreadRad = (opts.spread * Math.PI) / 180;
  const minSize = opts.size[0];
  const maxSize = opts.size[1];

  // ── set up the particle layer + resolve the launch point (ox, oy) ──────────
  let layer: HTMLDivElement;
  let ox: number;
  let oy: number;
  let restorePosition: (() => void) | null = null;

  if (opts.portal) {
    // Fixed, full-viewport layer on <body> — particles never get clipped.
    layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = `position: fixed; inset: 0; pointer-events: none; overflow: visible; z-index: ${opts.zIndex};`;
    document.body.appendChild(layer);

    if (opts.origin) {
      ox = opts.origin.x;
      oy = opts.origin.y;
    } else if (originEl instanceof HTMLElement) {
      const r = originEl.getBoundingClientRect();
      ox = r.left + r.width / 2;
      oy = r.top + r.height / 2;
    } else {
      ox = window.innerWidth / 2;
      oy = window.innerHeight / 2;
    }
  } else {
    // Legacy: layer absolutely positioned inside the origin element.
    const el = originEl;
    if (!(el instanceof HTMLElement)) return noop;
    const prev = getComputedStyle(el).position;
    if (prev === 'static') {
      el.style.position = 'relative';
      restorePosition = () => { el.style.position = ''; };
    }
    layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = `position: absolute; inset: 0; pointer-events: none; overflow: visible; z-index: ${opts.zIndex};`;
    el.appendChild(layer);
    const rect = el.getBoundingClientRect();
    ox = opts.origin?.x ?? rect.width / 2;
    oy = opts.origin?.y ?? rect.height / 2;
  }

  const tweens: gsap.core.Tween[] = [];
  const particles: HTMLElement[] = [];

  for (let i = 0; i < opts.count; i++) {
    const size = rand(minSize, maxSize);
    const colour = opts.colors[Math.floor(Math.random() * opts.colors.length)]!;
    const angle = angleRad + (Math.random() - 0.5) * spreadRad;
    const speed = opts.velocity * (0.6 + Math.random() * 0.7);
    // 0 = up, so use -sin and -cos.
    const vx = Math.sin(angle) * speed;
    const vy = -Math.cos(angle) * speed;

    const p = document.createElement('span');
    p.style.cssText = `
      position: absolute;
      left: ${ox}px;
      top: ${oy}px;
      width: ${size}px;
      height: ${size * (0.4 + Math.random() * 0.8)}px;
      background: ${colour};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
      opacity: 1;
    `;
    layer.appendChild(p);
    particles.push(p);

    const dur = opts.duration * (0.8 + Math.random() * 0.4);
    const tx = vx * dur;
    const ty = vy * dur + 0.5 * opts.gravity * dur * dur;

    const tween = gsap.to(p, {
      duration: dur,
      x: tx,
      y: ty,
      rotation: `+=${(Math.random() - 0.5) * 720}`,
      opacity: 0,
      ease: 'power1.out',
    });
    tweens.push(tween);
  }

  let cleaned = false;
  const cleanupTimer = window.setTimeout(() => {
    if (cleaned) return;
    cleaned = true;
    layer.remove();
    restorePosition?.();
  }, opts.duration * 1500);

  return {
    destroy() {
      if (cleaned) return;
      cleaned = true;
      tweens.forEach((t) => t.kill());
      particles.forEach((p) => p.remove());
      layer.remove();
      window.clearTimeout(cleanupTimer);
      restorePosition?.();
    },
  };
}
