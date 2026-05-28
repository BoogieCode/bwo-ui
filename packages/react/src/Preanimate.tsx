'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

interface PreanimateState {
  ready: boolean;
}

const PreanimateContext = createContext<PreanimateState>({ ready: true });

/**
 * Provider that flips `ready` from `false` to `true` after `duration` ms.
 * Children using `usePreanimate()` (or wrapped in `<Preanimate>`) see the
 * change and swap their skeleton placeholder for real content — at which
 * point the real component mounts and its own entrance animations fire.
 *
 * If you control readiness externally, pass `ready` directly and the
 * `duration` prop is ignored.
 */
export interface PreanimateProviderProps {
  children: ReactNode;
  /** Auto-flip ready=true after this many ms. Defaults to 1000. */
  duration?: number;
  /** Externally control ready. When set, `duration` is ignored. */
  ready?: boolean;
}
export function PreanimateProvider({
  children,
  duration = 1000,
  ready: readyProp,
}: PreanimateProviderProps) {
  const [internalReady, setInternalReady] = useState(false);
  useEffect(() => {
    if (readyProp !== undefined) return;
    const t = window.setTimeout(() => setInternalReady(true), duration);
    return () => window.clearTimeout(t);
  }, [duration, readyProp]);

  const ready = readyProp ?? internalReady;
  return (
    <PreanimateContext.Provider value={{ ready }}>{children}</PreanimateContext.Provider>
  );
}

/** Hook returning the shared `ready` flag from the nearest provider. */
export function usePreanimate(): boolean {
  return useContext(PreanimateContext).ready;
}

/**
 * Renders `skeleton` while not ready, and `children` once ready. Children
 * are not mounted until ready, so their entrance animations (SplitReveal,
 * Stagger, etc.) fire fresh on the swap.
 *
 * Skeleton and content should occupy the same approximate dimensions to
 * keep the layout stable across the swap.
 *
 * Pass `delay` (ms) to stagger this section's ready time *after* the
 * provider's base ready flips — useful for cascading entrances (e.g. cards
 * wait for the hero typewriter to finish).
 */
export interface PreanimateProps extends HTMLAttributes<HTMLDivElement> {
  /** Placeholder rendered while `ready` is false. */
  skeleton: ReactNode;
  /** Real content; mounted only after `ready` flips to true. */
  children: ReactNode;
  /**
   * Extra ms to wait *after* the provider's base ready flips before mounting
   * children. The total delay is `provider.duration + delay`.
   */
  delay?: number;
}
export function Preanimate({
  skeleton,
  children,
  delay,
  className,
  ...props
}: PreanimateProps) {
  const contextReady = usePreanimate();
  const [localReady, setLocalReady] = useState(!delay);

  useEffect(() => {
    if (!delay) {
      setLocalReady(true);
      return;
    }
    if (!contextReady) {
      setLocalReady(false);
      return;
    }
    const t = window.setTimeout(() => setLocalReady(true), delay);
    return () => window.clearTimeout(t);
  }, [delay, contextReady]);

  const ready = contextReady && localReady;
  return (
    <div className={className} {...props}>
      {ready ? children : skeleton}
    </div>
  );
}
