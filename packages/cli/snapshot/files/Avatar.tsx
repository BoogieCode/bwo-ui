'use client';

import {
  forwardRef,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  /** Delay (ms) before showing the fallback while the image loads. Default: 300. */
  fallbackDelay?: number;
}

type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error';

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = 'md', src, alt, fallback, fallbackDelay = 300, className, children, ...props },
  ref,
) {
  const [status, setStatus] = useState<ImageStatus>(src ? 'loading' : 'idle');
  const [showFallback, setShowFallback] = useState(!src);

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      setShowFallback(true);
      return;
    }
    setStatus('loading');
    setShowFallback(false);
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setStatus('loaded');
    };
    img.onerror = () => {
      if (!cancelled) setStatus('error');
    };
    img.src = src;
    const timer = window.setTimeout(() => {
      if (!cancelled) setShowFallback(true);
    }, fallbackDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [src, fallbackDelay]);

  return (
    <span
      ref={ref}
      className={cn('bwo-avatar', size !== 'md' && `bwo-avatar--${size}`, className)}
      {...props}
    >
      {src && status !== 'error' && (
        <img
          src={src}
          alt={alt ?? ''}
          data-state={status}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: status === 'loaded' ? 'block' : 'none',
          }}
        />
      )}
      {(status !== 'loaded' && showFallback) || !src || status === 'error' ? (
        <span className="bwo-avatar-fallback">{fallback ?? children}</span>
      ) : null}
    </span>
  );
});
