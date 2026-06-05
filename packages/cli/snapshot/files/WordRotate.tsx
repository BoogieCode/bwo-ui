'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from 'react';
import { cn } from './utils';

export type WordRotateTransition = 'fade' | 'slide-up' | 'flip';

export interface WordRotateProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Tag to render. Default: `'span'`. */
  as?: ElementType;
  /** Words to cycle through, in order. */
  words: string[];
  /** Milliseconds each word stays visible. Default: `2500`. */
  duration?: number;
  /** Animated transition style between words. Default: `'slide-up'`. */
  transition?: WordRotateTransition;
}

const STYLE_ID = 'bwo-word-rotate-keyframes';

/**
 * One-time injected keyframes. Each transition swaps the previous word out and
 * the next word in by re-triggering an `animation` (we remount the inner span
 * via its React `key`, so the in-animation always replays).
 *
 * The animations are intentionally short (the swap), while `duration` governs
 * how long each word rests on screen between swaps.
 */
const KEYFRAMES = `
.bwo-word-rotate {
  display: inline-flex;
  position: relative;
  overflow: hidden;
  vertical-align: bottom;
  perspective: 600px;
}
.bwo-word-rotate-word {
  display: inline-block;
  white-space: nowrap;
  will-change: transform, opacity;
  backface-visibility: hidden;
}
.bwo-word-rotate-word--fade {
  animation: bwo-word-rotate-fade var(--bwo-word-rotate-dur, 0.5s)
    var(--bwo-word-rotate-ease, cubic-bezier(0.16, 1, 0.3, 1)) both;
}
.bwo-word-rotate-word--slide-up {
  animation: bwo-word-rotate-slide-up var(--bwo-word-rotate-dur, 0.5s)
    var(--bwo-word-rotate-ease, cubic-bezier(0.16, 1, 0.3, 1)) both;
}
.bwo-word-rotate-word--flip {
  transform-origin: 50% 100%;
  animation: bwo-word-rotate-flip var(--bwo-word-rotate-dur, 0.5s)
    var(--bwo-word-rotate-ease, cubic-bezier(0.16, 1, 0.3, 1)) both;
}
@keyframes bwo-word-rotate-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes bwo-word-rotate-slide-up {
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes bwo-word-rotate-flip {
  from { opacity: 0; transform: rotateX(-90deg); }
  to { opacity: 1; transform: rotateX(0deg); }
}
@media (prefers-reduced-motion: reduce) {
  .bwo-word-rotate-word--fade,
  .bwo-word-rotate-word--slide-up,
  .bwo-word-rotate-word--flip {
    animation: none;
  }
}
`;

/** Inject the keyframes once per document (SSR-safe — only runs in effect). */
function useInjectKeyframes() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = KEYFRAMES;
    document.head.appendChild(el);
  }, []);
}

/**
 * Rotates through a list of words in place with an animated transition —
 * built for living headlines like "Build X. Build Y.".
 *
 * The interval advances `index`; the inner word's React `key` changes each
 * step, remounting it so the chosen in-animation replays. `prefers-reduced-
 * motion` is respected via the injected stylesheet (animation disabled) so the
 * swap is instant. The interval is cleared on unmount and whenever the word
 * list or duration changes.
 *
 * SSR-safe: renders the first word on the server (no DOM access during render);
 * keyframe injection and the timer only run client-side in effects.
 */
export function WordRotate({
  as,
  words,
  duration = 2500,
  transition = 'slide-up',
  className,
  style,
  ...rest
}: WordRotateProps) {
  const Tag = (as ?? 'span') as ElementType;
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useInjectKeyframes();

  // Keep index valid if the words list shrinks.
  useEffect(() => {
    if (index > words.length - 1) {
      setIndex(0);
      indexRef.current = 0;
    }
  }, [words.length, index]);

  useEffect(() => {
    if (words.length <= 1) return;
    indexRef.current = index;
    const id = window.setInterval(() => {
      indexRef.current = (indexRef.current + 1) % words.length;
      setIndex(indexRef.current);
    }, duration);
    return () => window.clearInterval(id);
    // Restart cleanly when the list identity or duration changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, duration]);

  const safeIndex = words.length ? index % words.length : 0;
  const current = words[safeIndex] ?? '';

  const rootStyle: CSSProperties = {
    ['--bwo-word-rotate-dur' as never]: `${Math.min(duration * 0.4, 600)}ms`,
    ...style,
  };

  return (
    <Tag className={cn('bwo-word-rotate', className)} style={rootStyle} {...rest}>
      <span
        key={safeIndex}
        className={cn('bwo-word-rotate-word', `bwo-word-rotate-word--${transition}`)}
      >
        {current}
      </span>
    </Tag>
  );
}
