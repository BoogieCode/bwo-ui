import { gsap } from 'gsap';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface AuroraOptions {
  /** Colors used for the drifting gradient blobs. Default: a tasteful 4-color set. */
  colors?: string[];
  /** Blur applied to the aurora layer, in px. Default: `40`. */
  blur?: number;
  /** Seconds per drift cycle. Default: `12`. */
  speed?: number;
  /** Opacity of the aurora layer (0-1). Default: `0.6`. */
  opacity?: number;
  /** `mix-blend-mode` of the aurora layer. Default: `'normal'`. */
  blend?: string;
}

const DEFAULTS = {
  colors: ['#7c3aed', '#2563eb', '#06b6d4', '#ec4899'],
  blur: 40,
  speed: 12,
  opacity: 0.6,
  blend: 'normal',
};

/**
 * Animated gradient-mesh background for hero/section backgrounds.
 *
 * Injects an absolutely-positioned, `aria-hidden` layer inside the target with
 * several blurred radial-gradient "blobs" that slowly drift. The target is set
 * to `position: relative` if it is currently `static`, so the layer sits behind
 * the target's own content (the layer is appended first and uses `z-index: 0`;
 * give your content `position: relative`/`z-index` to keep it above).
 *
 * Respects `prefers-reduced-motion`: the static gradient is kept but no tween
 * runs. SSR-safe. `destroy()` removes the layer, restores `position`, and kills
 * every tween.
 */
const STYLE_ID = 'bwo-aurora-style';

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
[data-bwo-aurora] {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
[data-bwo-aurora] > [data-bwo-aurora-blob] {
  position: absolute;
  width: 70%;
  height: 70%;
  border-radius: 9999px;
  will-change: transform;
}
  `.trim();
  document.head.appendChild(style);
}

export function createAurora(target: Target, options: AuroraOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  ensureStyle();
  const opts = mergeOptions(DEFAULTS, options);
  const colors = opts.colors.length > 0 ? opts.colors : DEFAULTS.colors;

  const previousPosition = el.style.position;
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative';
  }

  // The aurora layer sits behind the target's own content.
  const layer = document.createElement('div');
  layer.dataset.bwoAurora = '';
  layer.setAttribute('aria-hidden', 'true');
  layer.style.filter = `blur(${opts.blur}px)`;
  layer.style.opacity = `${opts.opacity}`;
  layer.style.mixBlendMode = opts.blend;

  // Anchor positions spread across the layer so blobs cover the mesh evenly.
  const anchors: ReadonlyArray<{ top: string; left: string }> = [
    { top: '-10%', left: '-10%' },
    { top: '-10%', left: '50%' },
    { top: '40%', left: '-5%' },
    { top: '30%', left: '45%' },
  ];
  const fallbackAnchor = { top: '0%', left: '0%' };

  const blobs: HTMLDivElement[] = [];
  for (let i = 0; i < colors.length; i += 1) {
    const blob = document.createElement('div');
    blob.dataset.bwoAuroraBlob = '';
    const anchor = anchors[i % anchors.length] ?? fallbackAnchor;
    blob.style.top = anchor.top;
    blob.style.left = anchor.left;
    blob.style.background = `radial-gradient(circle at center, ${colors[i]} 0%, transparent 70%)`;
    layer.appendChild(blob);
    blobs.push(blob);
  }

  // Append first so it renders beneath later DOM children of the target.
  el.insertBefore(layer, el.firstChild);

  const tweens: gsap.core.Tween[] = [];
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    blobs.forEach((blob, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      tweens.push(
        gsap.to(blob, {
          xPercent: 20 * dir,
          yPercent: -15 * dir,
          scale: 1.25,
          duration: opts.speed,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: (i / blobs.length) * opts.speed * -1,
        }),
      );
    });
  }

  return {
    destroy() {
      tweens.forEach((tween) => tween.kill());
      layer.remove();
      el.style.position = previousPosition;
    },
  };
}
