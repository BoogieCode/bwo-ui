'use client';

import { type CSSProperties, type ElementType, type ReactNode } from 'react';
import { cn } from './utils';

export interface AnimatedGradientTextProps {
  children: ReactNode;
  /** Gradient stop colours. Default: a 3-colour set. */
  colors?: string[];
  /** Duration of one full gradient sweep, in seconds. Default: `6`. */
  speed?: number;
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_COLORS = ['#6366f1', '#ec4899', '#22d3ee'];

const STYLE_ID = 'bwo-animated-gradient-text-style';
const STYLE_CONTENT = `
@keyframes bwo-animated-gradient-text {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .bwo-animated-gradient-text { animation: none !important; }
}
`;

/**
 * Injects the keyframes once into <head>, id-guarded so repeated mounts (or
 * multiple instances) never duplicate them. No-op during SSR.
 */
function ensureStyle() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = STYLE_CONTENT;
  document.head.appendChild(el);
}

/**
 * Inline text with an animated moving gradient fill. CSS-only — animates the
 * `background-position` of a multi-stop linear-gradient clipped to the text.
 *
 * Self-contained: injects its keyframes once via an id-guarded `<style>`.
 * SSR-safe and respects `prefers-reduced-motion`.
 */
export function AnimatedGradientText({
  children,
  colors = DEFAULT_COLORS,
  speed = 6,
  as,
  className,
  style,
}: AnimatedGradientTextProps) {
  ensureStyle();
  const Tag = (as ?? 'span') as ElementType;
  const stops = colors.length > 0 ? colors : DEFAULT_COLORS;
  // Repeat the first colour so the looping background-position has no seam.
  const gradient = `linear-gradient(90deg, ${[...stops, stops[0]].join(', ')})`;

  return (
    <Tag
      className={cn('bwo-animated-gradient-text', className)}
      style={{
        display: 'inline-block',
        backgroundImage: gradient,
        backgroundSize: '300% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        animation: `bwo-animated-gradient-text ${speed}s linear infinite`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
