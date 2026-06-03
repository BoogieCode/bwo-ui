import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './utils';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** Ratio as `width / height` (1.777… for 16/9). Default: `16 / 9`. */
  ratio?: number;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio(
  { ratio = 16 / 9, className, style, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('bwo-aspect-ratio', className)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: String(ratio),
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
});
