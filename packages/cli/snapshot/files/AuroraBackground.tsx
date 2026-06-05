'use client';

import { createAurora, type AuroraOptions } from '@bwo-ui/core';
import { type ElementType, type ReactNode } from 'react';
import { useMotion } from './use-motion';

export interface AuroraBackgroundProps extends AuroraOptions {
  children: ReactNode;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export function AuroraBackground({
  children,
  as,
  className,
  style,
  ...options
}: AuroraBackgroundProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useMotion<HTMLElement>(
    (el) => createAurora(el, options),
    [
      options.colors,
      options.blur,
      options.speed,
      options.opacity,
      options.blend,
    ],
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {/* Keep children above the aurora layer (which sits at z-index 0). */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </Tag>
  );
}
