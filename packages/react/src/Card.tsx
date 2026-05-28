'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn, type Radius } from './utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  /** Corner radius preset. Omit to inherit the global default (6px). */
  radius?: Radius;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive, radius, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-radius={radius}
      className={cn('bwo-card', interactive && 'bwo-card--interactive', className)}
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
