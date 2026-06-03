import { forwardRef, type ElementType, type HTMLAttributes } from 'react';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Default: `'span'`. */
  as?: ElementType;
}

/**
 * Hide content visually while keeping it available to assistive technology.
 * Lifted from the standard "sr-only" pattern — `position: absolute`, 1×1 px,
 * `overflow: hidden`, `clip-path: inset(50%)`.
 */
export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  function VisuallyHidden({ as, style, children, ...rest }, ref) {
    const Tag = (as ?? 'span') as ElementType;
    return (
      <Tag
        ref={ref}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clipPath: 'inset(50%)',
          whiteSpace: 'nowrap',
          borderWidth: 0,
          ...style,
        }}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);
