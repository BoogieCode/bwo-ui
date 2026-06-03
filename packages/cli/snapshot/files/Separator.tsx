'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorVariant = 'solid' | 'dashed' | 'dotted';
export type SeparatorSize = 'sm' | 'md' | 'lg';
export type SeparatorTone = 'default' | 'muted' | 'strong';
export type SeparatorSpacing = 'none' | 'sm' | 'md' | 'lg';
export type SeparatorLabelAlign = 'start' | 'center' | 'end';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: SeparatorOrientation;
  variant?: SeparatorVariant;
  /** Line thickness — `sm` = 1 px (default), `md` = 2 px, `lg` = 4 px. */
  size?: SeparatorSize;
  /** Colour weight — `default`, `muted` (lighter), `strong` (darker). */
  tone?: SeparatorTone;
  /** Optional built-in margin around the separator. */
  spacing?: SeparatorSpacing;
  /**
   * Inline label that breaks the line on either side — &quot;OR&quot;, &quot;TODAY&quot;,
   * section names. Horizontal-only. When set, the separator is no longer decorative.
   */
  label?: ReactNode;
  /** Where the label sits in the line. Only used with `label`. */
  labelAlign?: SeparatorLabelAlign;
  /** When true, hide from screen readers. Auto-set to false when `label` is present. */
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  {
    orientation = 'horizontal',
    variant = 'solid',
    size = 'sm',
    tone = 'default',
    spacing = 'none',
    label,
    labelAlign = 'center',
    decorative,
    className,
    ...props
  },
  ref,
) {
  const hasLabel = label !== undefined && orientation === 'horizontal';
  const isDecorative = decorative ?? !hasLabel;

  const classes = cn(
    'bwo-separator',
    `bwo-separator--${orientation}`,
    variant !== 'solid' && `bwo-separator--${variant}`,
    size !== 'sm' && `bwo-separator--${size}`,
    tone !== 'default' && `bwo-separator--tone-${tone}`,
    spacing !== 'none' && `bwo-separator--space-${spacing}`,
    hasLabel && 'bwo-separator--labelled',
    className,
  );

  if (hasLabel) {
    return (
      <div
        ref={ref}
        role={isDecorative ? undefined : 'separator'}
        aria-orientation="horizontal"
        data-label-align={labelAlign}
        {...(isDecorative ? { 'aria-hidden': true } : {})}
        className={classes}
        {...props}
      >
        <span className="bwo-separator-line" aria-hidden />
        <span className="bwo-separator-label">{label}</span>
        <span className="bwo-separator-line" aria-hidden />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role={isDecorative ? undefined : 'separator'}
      aria-orientation={orientation}
      {...(isDecorative ? { 'aria-hidden': true } : {})}
      className={classes}
      {...props}
    />
  );
});
