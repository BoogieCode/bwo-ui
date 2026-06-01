'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  /** Container element. Default: `document.body`. */
  container?: Element | null;
}

/**
 * SSR-safe Portal. Renders nothing on the server; renders into the target
 * container after the first commit on the client.
 */
export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || typeof document === 'undefined') return null;
  const target = container ?? document.body;
  return createPortal(children, target);
}
