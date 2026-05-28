'use client';

import * as RadixAvatar from '@radix-ui/react-avatar';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends ComponentPropsWithoutRef<typeof RadixAvatar.Root> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
}

export const Avatar = forwardRef<ElementRef<typeof RadixAvatar.Root>, AvatarProps>(
  function Avatar({ size = 'md', src, alt, fallback, className, children, ...props }, ref) {
    return (
      <RadixAvatar.Root
        ref={ref}
        className={cn('bwo-avatar', size !== 'md' && `bwo-avatar--${size}`, className)}
        {...props}
      >
        {src && <RadixAvatar.Image src={src} alt={alt ?? ''} />}
        <RadixAvatar.Fallback className="bwo-avatar-fallback" delayMs={300}>
          {fallback ?? children}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    );
  },
);
