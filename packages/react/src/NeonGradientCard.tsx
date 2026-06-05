'use client';

import {
  forwardRef,
  useInsertionEffect,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';
import { cn } from './utils';

export interface NeonGradientCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Thickness of the glowing gradient border, in pixels. Default 2. */
  borderSize?: number;
  /** Corner radius, in pixels. Default 16. */
  borderRadius?: number;
  /** Gradient start color. Default `'#ff2975'`. */
  from?: string;
  /** Gradient end color. Default `'#00d4ff'`. */
  to?: string;
  /** Blur radius of the soft outer bloom, in pixels. Default 24. */
  glow?: number;
}

const STYLE_ID = 'bwo-neon-gradient-card-styles';

const STYLES = `
@keyframes bwo-neon-gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bwo-neon-gradient-card {
  position: relative;
  border-radius: var(--bwo-neon-radius, 16px);
  background: var(--bwo-neon-surface, #0a0a0a);
  color: inherit;
  isolation: isolate;
}

/* The animated gradient layer. Rendered twice via ::before (the visible border,
   clipped to a ring with the surface punched out) and ::after (a blurred copy
   sitting further back to read as a soft outer bloom). Both share the same
   animated linear gradient so they pulse in sync. */
.bwo-neon-gradient-card::before,
.bwo-neon-gradient-card::after {
  content: '';
  position: absolute;
  inset: calc(var(--bwo-neon-border, 2px) * -1);
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    var(--bwo-neon-from, #ff2975),
    var(--bwo-neon-to, #00d4ff),
    var(--bwo-neon-from, #ff2975)
  );
  background-size: 300% 300%;
  animation: bwo-neon-gradient-shift 6s ease infinite;
}

/* The crisp border ring: punch the surface out of the gradient so only the
   border thickness shows. */
.bwo-neon-gradient-card::before {
  padding: var(--bwo-neon-border, 2px);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

/* The soft outer bloom: a blurred, fainter copy sitting behind the ring. */
.bwo-neon-gradient-card::after {
  z-index: -2;
  filter: blur(var(--bwo-neon-glow, 24px));
  opacity: 0.65;
}

@media (prefers-reduced-motion: reduce) {
  .bwo-neon-gradient-card::before,
  .bwo-neon-gradient-card::after {
    animation: none;
    background-position: 0% 50%;
  }
}
`;

let injected = false;

function useNeonGradientCardStyles() {
  // useInsertionEffect runs before layout effects and is the correct place to
  // inject style rules. On the server it is a no-op (SSR-safe); the styles are
  // injected on the client during hydration. Guarded by id + module flag so the
  // <style> is added at most once regardless of how many cards mount.
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
 * A card wrapped in a glowing, slowly-animated neon gradient border with a soft
 * outer bloom. The border and bloom are drawn by two blurred/clipped gradient
 * pseudo-layers behind the surface, so children sit cleanly on top with no
 * masking artifacts.
 */
export const NeonGradientCard = forwardRef<HTMLDivElement, NeonGradientCardProps>(
  function NeonGradientCard(
    {
      borderSize = 2,
      borderRadius = 16,
      from = '#ff2975',
      to = '#00d4ff',
      glow = 24,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) {
    useNeonGradientCardStyles();

    const cssVars = {
      '--bwo-neon-border': `${borderSize}px`,
      '--bwo-neon-radius': `${borderRadius}px`,
      '--bwo-neon-from': from,
      '--bwo-neon-to': to,
      '--bwo-neon-glow': `${glow}px`,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        className={cn('bwo-neon-gradient-card', className)}
        style={{ ...cssVars, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
