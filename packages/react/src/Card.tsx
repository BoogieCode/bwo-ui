'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn, type Radius } from './utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  /** Corner radius preset. Omit to inherit the global default (6px). */
  radius?: Radius;
  /**
   * Padding inside the card. `'default'` (24px), `'compact'` (12px), or
   * `'none'` for edge-to-edge children (use `<CardMedia>` then `<CardTab>`).
   */
  pad?: 'default' | 'compact' | 'none';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive, radius, pad, className, style, ...props },
  ref,
) {
  const padStyle: React.CSSProperties =
    pad === 'compact' ? { padding: 12, ['--bwo-card-pad' as never]: '12px' } : {};
  return (
    <div
      ref={ref}
      data-radius={radius}
      data-pad={pad}
      className={cn('bwo-card', interactive && 'bwo-card--interactive', className)}
      style={{ ...padStyle, ...style }}
      {...props}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn('bwo-card-header', className)} {...props} />;
  },
);

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return <h3 ref={ref} className={cn('bwo-card-title', className)} {...props} />;
  },
);

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn('bwo-card-description', className)} {...props} />;
});

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn('bwo-card-footer', className)} {...props} />;
  },
);

/**
 * Media slot at the top of a card — typically a project preview, a hero
 * image, or a solid colour swatch. Use with `<Card pad="none">` to let the
 * media bleed to the edges.
 *
 * Inner `<img>` or `<video>` is automatically `object-fit: cover` and
 * `width/height: 100%`. Aspect ratio defaults to `3 / 4` and is tunable via
 * the `aspect` prop or the `--bwo-card-media-aspect` CSS variable.
 */
export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  /** CSS aspect-ratio string, e.g. `'16 / 9'`. Default: `'3 / 4'`. */
  aspect?: string;
}
export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(function CardMedia(
  { aspect, className, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('bwo-card-media', className)}
      style={
        aspect ? { ['--bwo-card-media-aspect' as never]: aspect, ...style } : style
      }
      {...props}
    />
  );
});

/**
 * Tab block sitting under `<CardMedia>` — typically holds eyebrow + name +
 * caption. Adds a top border when the parent card has `pad="none"`.
 */
export const CardTab = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardTab({ className, ...props }, ref) {
    return <div ref={ref} className={cn('bwo-card-tab', className)} {...props} />;
  },
);

/** Small uppercase code/eyebrow above the card name. */
export const CardEyebrow = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardEyebrow({ className, ...props }, ref) {
    return <p ref={ref} className={cn('bwo-card-eyebrow', className)} {...props} />;
  },
);

/** Display-font name, second line in the card tab. */
export const CardName = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardName({ className, ...props }, ref) {
    return <p ref={ref} className={cn('bwo-card-name', className)} {...props} />;
  },
);

/** Tiny uppercase tag — category, status, or any subtitle. */
export const CardCaption = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardCaption({ className, ...props }, ref) {
    return <p ref={ref} className={cn('bwo-card-caption', className)} {...props} />;
  },
);
