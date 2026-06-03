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
  /** Optional origin offset within the container (in px). Default: container centre. */
  origin?: { x: number; y: number };
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
  zIndex: 9999,
};

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Fires a confetti burst at the given target (the target becomes the origin
 * container). The particles are absolutely positioned inside an injected layer
 * so they don't disrupt page layout. The instance fires once per `play()`.
 */
export function createConfetti(
  target: Target,
  options: ConfettiOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);
  if (opts.colors.length === 0) opts.colors = DEFAULTS.colors;

  // Position the layer relative to the target.
  const prev = getComputedStyle(el).position;
  if (prev === 'static') el.style.position = 'relative';

  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: visible;
    z-index: ${opts.zIndex};
  `;
  el.appendChild(layer);

  const rect = el.getBoundingClientRect();
  const ox = opts.origin?.x ?? rect.width / 2;
  const oy = opts.origin?.y ?? rect.height / 2;

  const angleRad = (opts.angle * Math.PI) / 180;
  const spreadRad = (opts.spread * Math.PI) / 180;
  const minSize = opts.size[0];
  const maxSize = opts.size[1];

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
    if (prev === 'static') el.style.position = '';
  }, opts.duration * 1500);

  return {
    destroy() {
      if (cleaned) return;
      cleaned = true;
      tweens.forEach((t) => t.kill());
      particles.forEach((p) => p.remove());
      layer.remove();
      window.clearTimeout(cleanupTimer);
      if (prev === 'static') el.style.position = '';
    },
  };
}
