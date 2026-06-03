import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from './utils';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Max-width preset. Default: `'lg'`. */
  size?: ContainerSize;
  /** Horizontal gutter in pixels (or any CSS length). Default: `24px`. */
  gutter?: number | string;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
}

const widthMap: Record<ContainerSize, string> = {
  sm: '640px',
  md: '780px',
  lg: '1080px',
  xl: '1280px',
  full: '100%',
};

export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { size = 'lg', gutter = 24, as, className, style, children, ...rest },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;
  const padding = typeof gutter === 'number' ? `${gutter}px` : gutter;
  return (
    <Tag
      ref={ref}
      className={cn('bwo-container', className)}
      style={{
        width: '100%',
        maxWidth: widthMap[size],
        marginInline: 'auto',
        paddingInline: padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
});
