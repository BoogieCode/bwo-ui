'use client';

import { type CircleRevealOrigin } from '@bwo-ui/core';
import { type ReactNode } from 'react';
import { CircleReveal } from './CircleReveal';

export interface PageIrisProps {
  /**
   * Anything that changes on route change. Pass `usePathname()` in Next.js,
   * `useLocation().pathname` in React Router, or your own derived key. The
   * iris re-plays whenever this value changes.
   */
  pathname: string;
  children: ReactNode;
  /** Animation duration in seconds. Default: `0.8`. */
  duration?: number;
  /** GSAP ease. Default: `'expo.out'`. */
  ease?: string;
  /** Centre of the circle. Default: screen centre. */
  origin?: CircleRevealOrigin;
  /** Wrapper className — useful for sizing the iris to fill its container. */
  className?: string;
  /** Wrapper style. */
  style?: React.CSSProperties;
}

/**
 * Iris-open page transition. Wraps page content so every route change replays
 * the circle-reveal entrance — start with the page hidden behind a 0% circle,
 * grow to full coverage as the new content settles.
 *
 *   <PageIris pathname={usePathname() ?? '/'}>
 *     {children}
 *   </PageIris>
 *
 * Re-mounts on pathname change (via `key`), so each navigation gets a fresh
 * iris-open. Pair with the standalone `<CircleReveal mode="close">` if you
 * also want an exit animation before triggering navigation.
 */
export function PageIris({
  pathname,
  children,
  duration = 0.8,
  ease = 'expo.out',
  origin,
  className,
  style,
}: PageIrisProps) {
  return (
    <CircleReveal
      key={pathname}
      mode="open"
      duration={duration}
      ease={ease}
      origin={origin}
      className={className}
      style={style}
    >
      {children}
    </CircleReveal>
  );
}
