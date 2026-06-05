'use client';

import { type CSSProperties, type ElementType, type ReactNode } from 'react';
import { cn } from './utils';

export interface AuroraTextProps {
  children: ReactNode;
  /** Aurora gradient colours. Default: a soft 4-colour set. */
  colors?: string[];
  /** Duration of one full aurora drift cycle, in seconds. Default: `8`. */
  speed?: number;
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_COLORS = ['#7c3aed', '#2dd4bf', '#3b82f6', '#ec4899'];

const STYLE_ID = 'bwo-aurora-text-style';
const STYLE_CONTENT = `
@keyframes bwo-aurora-text {
  0% { background-position: 0% 50%, 100% 50%, 50% 0%; }
  50% { background-position: 100% 50%, 0% 50%, 50% 100%; }
  100% { background-position: 0% 50%, 100% 50%, 50% 0%; }
}
@media (prefers-reduced-motion: reduce) {
  .bwo-aurora-text { animation: none !important; }
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
 * Text with a soft animated aurora gradient flowing through the glyphs.
 * CSS-only — layers several large radial gradients clipped to the text and
 * drifts their `background-position` for a blurred, aurora-like wash.
 *
 * Self-contained: injects its keyframes once via an id-guarded `<style>`.
 * SSR-safe and respects `prefers-reduced-motion`.
 */
export function AuroraText({
  children,
  colors = DEFAULT_COLORS,
  speed = 8,
  as,
  className,
  style,
}: AuroraTextProps) {
  ensureStyle();
  const Tag = (as ?? 'span') as ElementType;
  const stops = colors.length > 0 ? colors : DEFAULT_COLORS;
  const c = (i: number) => stops[i % stops.length];

  // Three overlapping soft radial gradients give the aurora its blurred,
  // multi-hue depth; each layer drifts independently via the keyframes.
  const gradient = [
    `radial-gradient(60% 120% at 20% 30%, ${c(0)} 0%, transparent 60%)`,
    `radial-gradient(60% 120% at 80% 40%, ${c(1)} 0%, transparent 60%)`,
    `radial-gradient(70% 130% at 50% 70%, ${c(2)} 0%, transparent 65%)`,
  ].join(', ');

  return (
    <Tag
      className={cn('bwo-aurora-text', className)}
      style={{
        display: 'inline-block',
        backgroundColor: c(3),
        backgroundImage: gradient,
        backgroundSize: '200% 200%, 200% 200%, 200% 200%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        animation: `bwo-aurora-text ${speed}s ease-in-out infinite`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
