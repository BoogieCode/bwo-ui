'use client';

import {
  forwardRef,
  useInsertionEffect,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';
import { cn } from './utils';

export interface MeteorsProps extends HTMLAttributes<HTMLDivElement> {
  /** How many meteor streaks to render. Default 20. */
  number?: number;
  /** Streak color — head glow and tail gradient. Default the accent token. */
  color?: string;
  /** Shortest fall duration, in seconds. Default 2. */
  minDuration?: number;
  /** Longest fall duration, in seconds. Default 10. */
  maxDuration?: number;
  /** Travel direction in degrees. Default 215 (down-and-to-the-left). */
  angle?: number;
}

const STYLE_ID = 'bwo-meteors-styles';

const STYLES = `
@keyframes bwo-meteor-fall {
  0% {
    transform: rotate(var(--bwo-meteor-angle)) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(var(--bwo-meteor-angle)) translateX(var(--bwo-meteor-distance, -180vmax));
    opacity: 0;
  }
}

.bwo-meteors {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

/* The head — a small glowing dot. */
.bwo-meteor {
  position: absolute;
  top: var(--bwo-meteor-top);
  left: var(--bwo-meteor-left);
  width: 2px;
  height: 2px;
  border-radius: 9999px;
  background: var(--bwo-meteor-color, var(--bwo-accent, #64748b));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--bwo-meteor-color, #64748b) 20%, transparent),
    0 0 6px 1px var(--bwo-meteor-color, #64748b);
  transform: rotate(var(--bwo-meteor-angle));
  animation: bwo-meteor-fall var(--bwo-meteor-duration) linear infinite;
  animation-delay: var(--bwo-meteor-delay);
}

/* The tail — a thin gradient streak trailing behind the head. */
.bwo-meteor::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: var(--bwo-meteor-tail, 60px);
  height: 1px;
  transform: translateY(-50%);
  background: linear-gradient(
    90deg,
    var(--bwo-meteor-color, var(--bwo-accent, #64748b)),
    transparent
  );
}

@media (prefers-reduced-motion: reduce) {
  .bwo-meteor {
    animation: none;
    opacity: 0.5;
  }
}
`;

let injected = false;

function useMeteorStyles() {
  // useInsertionEffect runs before layout effects and is the correct place to
  // inject style rules. On the server it is a no-op (SSR-safe); the styles are
  // injected on the client during hydration. Guarded by id + module flag so the
  // <style> is added at most once regardless of how many layers mount.
  useInsertionEffect(() => {
    if (injected || typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) {
      injected = true;
      return;
    }
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = STYLES;
    document.head.appendChild(el);
    injected = true;
  }, []);
}

/**
 * Small deterministic PRNG (mulberry32). Seeded so the per-meteor randomness is
 * stable across renders and SSR/client (no Math.random at module scope, no
 * hydration mismatch). Each meteor mixes the count seed with its index.
 */
function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Decorative falling-meteor-streak layer for hero / section backdrops. Renders
 * an absolutely-positioned, `aria-hidden`, non-interactive layer of N animated
 * streaks (a glowing head plus a thin trailing tail) falling diagonally with
 * randomized delay, duration and start position.
 */
export const Meteors = forwardRef<HTMLDivElement, MeteorsProps>(function Meteors(
  {
    number = 20,
    color = 'var(--bwo-accent,#64748b)',
    minDuration = 2,
    maxDuration = 10,
    angle = 215,
    className,
    style,
    ...props
  },
  ref,
) {
  useMeteorStyles();

  const count = Math.max(0, Math.floor(number));
  const lo = Math.min(minDuration, maxDuration);
  const hi = Math.max(minDuration, maxDuration);

  // Stable per-meteor values: recomputed only when the inputs change, varied by
  // index via a seed derived from the count and the duration range.
  const meteors = useMemo(() => {
    const rand = seeded((count * 2654435761) ^ Math.round((lo + hi) * 1000));
    return Array.from({ length: count }, () => {
      const top = `${rand() * -20}%`;
      const left = `${rand() * 110 - 5}%`;
      const delay = `${rand() * 5}s`;
      const duration = `${lo + rand() * (hi - lo)}s`;
      const tail = `${40 + rand() * 60}px`;
      return { top, left, delay, duration, tail };
    });
  }, [count, lo, hi]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('bwo-meteors', className)}
      style={style}
      {...props}
    >
      {meteors.map((m, i) => (
        <span
          key={i}
          className="bwo-meteor"
          style={
            {
              '--bwo-meteor-color': color,
              '--bwo-meteor-angle': `${angle}deg`,
              '--bwo-meteor-top': m.top,
              '--bwo-meteor-left': m.left,
              '--bwo-meteor-delay': m.delay,
              '--bwo-meteor-duration': m.duration,
              '--bwo-meteor-tail': m.tail,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
});
