'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  /**
   * DOM node to portal into. If a function is passed, it's called once after
   * mount to resolve the target. Defaults to `document.body`.
   */
  container?: Element | DocumentFragment | (() => Element | DocumentFragment | null) | null;
  /** Suppress render until the container resolves. Default: `true`. */
  disableSSR?: boolean;
}

export function Portal({ children, container, disableSSR = true }: PortalProps) {
  const [target, setTarget] = useState<Element | DocumentFragment | null>(null);

  useEffect(() => {
    const resolved =
      typeof container === 'function' ? container() : container ?? document.body;
    setTarget(resolved ?? document.body);
  }, [container]);

  if (!target) return disableSSR ? null : <>{children}</>;
  return createPortal(children, target);
}
