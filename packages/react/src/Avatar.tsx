'use client';

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  shape?: AvatarShape;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  /** Delay (ms) before showing the fallback while the image loads. Default: 300. */
  fallbackDelay?: number;
}

type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error';

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    size = 'md',
    shape = 'circle',
    src,
    alt,
    fallback,
    fallbackDelay = 300,
    className,
    children,
    ...props
  },
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
      className={cn(
        'bwo-avatar',
        size !== 'md' && `bwo-avatar--${size}`,
        shape !== 'circle' && `bwo-avatar--${shape}`,
        className,
      )}
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

/* ─── AvatarGroup ──────────────────────────────────────────────────────── */

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum visible avatars before collapsing into a +N pill. */
  max?: number;
  /** Size cascaded to every child avatar and to the overflow pill. */
  size?: AvatarSize;
  /** Shape cascaded to every child avatar and to the overflow pill. */
  shape?: AvatarShape;
  /**
   * Explicit total count when the rendered children are a sample (e.g. fetched a
   * preview of a larger set). When set, the overflow pill shows
   * `total - visible.length` rather than `children.length - visible.length`.
   */
  total?: number;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { max, size = 'md', shape = 'circle', total, className, children, ...props },
  ref,
) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];
  const visible = max === undefined ? items : items.slice(0, max);
  const baseTotal = total ?? items.length;
  const overflow = Math.max(0, baseTotal - visible.length);

  return (
    <div
      ref={ref}
      className={cn(
        'bwo-avatar-group',
        size !== 'md' && `bwo-avatar-group--${size}`,
        className,
      )}
      {...props}
    >
      {visible.map((child, i) =>
        cloneElement(child, {
          key: child.key ?? i,
          size: child.props.size ?? size,
          shape: child.props.shape ?? shape,
        }),
      )}
      {overflow > 0 ? (
        <span
          className={cn(
            'bwo-avatar',
            'bwo-avatar--overflow',
            size !== 'md' && `bwo-avatar--${size}`,
            shape !== 'circle' && `bwo-avatar--${shape}`,
          )}
          aria-label={`${overflow} more`}
        >
          <span className="bwo-avatar-fallback">+{overflow}</span>
        </span>
      ) : null}
    </div>
  );
});
