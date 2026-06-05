'use client';

import { createParticles, type ParticlesOptions } from '@bwo-ui/core';
import { useMotion } from './use-motion';

export interface ParticlesProps extends ParticlesOptions {
  className?: string;
  style?: React.CSSProperties;
}

export function Particles({ className, style, ...options }: ParticlesProps) {
  const ref = useMotion<HTMLDivElement>(
    (el) => createParticles(el, options),
    [
      options.quantity,
      options.color,
      options.size,
      options.speed,
      options.staticity,
      options.ease,
    ],
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'absolute', inset: 0, ...style }}
    />
  );
}
