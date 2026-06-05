import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface ParticlesOptions {
  /** Number of particles to render. Default: `60`. */
  quantity?: number;
  /** Particle color (any CSS color). Default: `'#64748b'`. */
  color?: string;
  /** Max particle radius in px. Default: `1.6`. */
  size?: number;
  /** Drift speed multiplier. Default: `0.4`. */
  speed?: number;
  /** Cursor easing factor — higher = particles react less to the cursor. Default: `50`. */
  staticity?: number;
  /** Ease factor for the parallax translation. Default: `50`. */
  ease?: number;
}

const DEFAULTS = {
  quantity: 60,
  color: '#64748b',
  size: 1.6,
  speed: 0.4,
  staticity: 50,
  ease: 50,
};

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

/** Parse a CSS color string into an `r, g, b` triple usable in `rgba()`. */
function hexToRgb(color: string): [number, number, number] {
  let hex = color.replace('#', '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  // Fallback slate-500 if the color isn't a hex string.
  return [100, 116, 139];
}

/**
 * Floating interactive particle-field background for hero sections.
 *
 * Appends an absolutely positioned `<canvas>` (inset:0, pointer-events:none)
 * sized to the target via a `ResizeObserver`, then draws N drifting dots that
 * gently parallax toward the cursor.
 *
 * The target should be positioned (relative/absolute/fixed) so the canvas
 * overlays it correctly.
 *
 * Respects `prefers-reduced-motion`: renders a single static frame and skips
 * the animation loop / cursor tracking. SSR-safe (no-op outside the browser).
 */
export function createParticles(
  target: Target,
  options: ParticlesOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };

  const resolved = resolveTarget(target);
  if (!resolved || !(resolved instanceof HTMLElement)) return { destroy: () => {} };
  const el: HTMLElement = resolved;

  const opts = mergeOptions(DEFAULTS, options);
  const [r, g, b] = hexToRgb(opts.color);

  const reducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.createElement('canvas');
  canvas.dataset.bwoParticles = '';
  Object.assign(canvas.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  } satisfies Partial<CSSStyleDeclaration>);
  el.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return { destroy: () => {} };
  }

  const dpr = window.devicePixelRatio || 1;
  let width = 0;
  let height = 0;
  let circles: Circle[] = [];

  // Cursor position relative to the canvas center, plus the eased parallax offset.
  const mouse = { x: 0, y: 0 };
  const offset = { x: 0, y: 0 };

  function clear() {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function createCircle(): Circle {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      translateX: 0,
      translateY: 0,
      size: Math.random() * opts.size + 0.1,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1 * opts.speed,
      dy: (Math.random() - 0.5) * 0.1 * opts.speed,
      magnetism: 0.1 + Math.random() * 4,
    };
  }

  function drawCircle(circle: Circle) {
    if (!ctx) return;
    const { x, y, translateX, translateY, size, alpha } = circle;
    ctx.save();
    ctx.translate(translateX, translateY);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function resize() {
    const rect = el.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    circles = [];
    for (let i = 0; i < opts.quantity; i++) {
      circles.push(createCircle());
    }

    if (reducedMotion) {
      // Single static frame: snap every particle to full target alpha.
      clear();
      for (const circle of circles) {
        circle.alpha = circle.targetAlpha;
        drawCircle(circle);
      }
    }
  }

  // Eases a value from `start` toward `end`, normalized into the `[0,1]` range.
  function remapAlpha(value: number, edge: number): number {
    const remapped = ((value - 0) * (1 - 0)) / (edge - 0);
    return remapped > 1 ? 1 : remapped;
  }

  function animate() {
    clear();
    for (const circle of circles) {
      // Fade in toward the target alpha, fading out near the edges.
      const edge = [
        circle.x + circle.translateX - circle.size, // left
        width - circle.x - circle.translateX - circle.size, // right
        circle.y + circle.translateY - circle.size, // top
        height - circle.y - circle.translateY - circle.size, // bottom
      ];
      const closestEdge = Math.min(...edge);
      const remapClosestEdge = remapAlpha(closestEdge, 20);
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }

      circle.x += circle.dx;
      circle.y += circle.dy;

      // Parallax toward the eased cursor offset, scaled by staticity/magnetism.
      circle.translateX +=
        (mouse.x / (opts.staticity / circle.magnetism) - circle.translateX) /
        opts.ease;
      circle.translateY +=
        (mouse.y / (opts.staticity / circle.magnetism) - circle.translateY) /
        opts.ease;

      // Recycle particles that drift off-canvas.
      if (
        circle.x < -circle.size ||
        circle.x > width + circle.size ||
        circle.y < -circle.size ||
        circle.y > height + circle.size
      ) {
        const fresh = createCircle();
        fresh.translateX = circle.translateX;
        fresh.translateY = circle.translateY;
        Object.assign(circle, fresh);
      }

      drawCircle(circle);
    }
    rafId = window.requestAnimationFrame(animate);
  }

  function onMouseMove(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    const inside = x < width / 2 && x > -width / 2 && y < height / 2 && y > -height / 2;
    if (inside) {
      // Ease the raw cursor delta into the offset used by the parallax.
      offset.x += (x - offset.x) / 10;
      offset.y += (y - offset.y) / 10;
      mouse.x = offset.x;
      mouse.y = offset.y;
    }
  }

  const observer = new ResizeObserver(() => resize());
  observer.observe(el);
  resize();

  let rafId = 0;
  if (!reducedMotion) {
    window.addEventListener('mousemove', onMouseMove);
    rafId = window.requestAnimationFrame(animate);
  }

  return {
    destroy() {
      if (rafId) window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      canvas.remove();
    },
    refresh() {
      resize();
    },
  };
}
