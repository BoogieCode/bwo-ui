'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface PresenceProps {
  /** When true, content is mounted. When false, content lingers until any CSS animation finishes, then unmounts. */
  present: boolean;
  children: (state: 'open' | 'closed') => ReactNode;
}

/**
 * Manage mount/unmount with exit animation support. When `present` flips to
 * false, the child is rendered with `state="closed"` until any CSS animation
 * completes, then removed. Works without coupling to any animation library —
 * relies on the standard `animationend` DOM event.
 */
export function Presence({ present, children }: PresenceProps) {
  const [rendered, setRendered] = useState(present);
  const [state, setState] = useState<'open' | 'closed'>(present ? 'open' : 'closed');
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (present) {
      setRendered(true);
      setState('open');
      return;
    }
    setState('closed');
    const el = elementRef.current;
    if (!el) {
      setRendered(false);
      return;
    }
    const styles = window.getComputedStyle(el);
    const hasAnimation = styles.animationName !== 'none' && styles.animationDuration !== '0s';
    if (!hasAnimation) {
      setRendered(false);
      return;
    }
    const onEnd = (event: AnimationEvent) => {
      if (event.target === el) setRendered(false);
    };
    el.addEventListener('animationend', onEnd);
    return () => el.removeEventListener('animationend', onEnd);
  }, [present]);

  if (!rendered) return null;
  return (
    <PresenceCapture ref={elementRef}>
      {children(state)}
    </PresenceCapture>
  );
}

import { cloneElement, isValidElement, forwardRef } from 'react';

const PresenceCapture = forwardRef<HTMLElement, { children: ReactNode }>(
  function PresenceCapture({ children }, ref) {
    if (!isValidElement(children)) return <>{children}</>;
    return cloneElement(children as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>, { ref });
  },
);
