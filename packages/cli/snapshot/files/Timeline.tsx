'use client';

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type TimelineOrientation = 'vertical' | 'horizontal';
export type TimelineAlign = 'left' | 'right' | 'top' | 'bottom';
export type TimelineSize = 'sm' | 'md' | 'lg';
export type TimelineConnectorStyle = 'solid' | 'dashed' | 'dotted';

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  orientation?: TimelineOrientation;
  /** Position of content relative to the line. `left`/`right` for vertical, `top`/`bottom` for horizontal. */
  align?: TimelineAlign;
  /** Marker + line scale. `sm` = 10 px, `md` = 14 px (default), `lg` = 20 px. */
  size?: TimelineSize;
  /** Visual style of the connecting line. */
  connectorStyle?: TimelineConnectorStyle;
}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  {
    orientation = 'vertical',
    align,
    size = 'md',
    connectorStyle = 'solid',
    className,
    ...props
  },
  ref,
) {
  const effectiveAlign: TimelineAlign =
    align ?? (orientation === 'horizontal' ? 'bottom' : 'right');
  return (
    <ol
      ref={ref}
      data-orientation={orientation}
      data-align={effectiveAlign}
      className={cn(
        'bwo-timeline',
        `bwo-timeline--${orientation}`,
        `bwo-timeline--${effectiveAlign}`,
        size !== 'md' && `bwo-timeline--${size}`,
        connectorStyle !== 'solid' && `bwo-timeline--${connectorStyle}`,
        className,
      )}
      {...props}
    />
  );
});

export type TimelineItemStatus = 'pending' | 'active' | 'completed' | 'error';

export interface TimelineItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Visual marker state. */
  status?: TimelineItemStatus;
  /** Custom marker node (overrides the default dot / status icon). */
  marker?: ReactNode;
  /** Title text rendered above the body. */
  title?: ReactNode;
  /** Timestamp / supporting label. */
  time?: ReactNode;
  /**
   * Suppress the connecting line after this item. The last child auto-hides its connector,
   * so you only need this for unusual cases (e.g. the second-to-last item ending a sequence).
   */
  hideConnector?: boolean;
}

const CheckIcon = (
  <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 12l5 5L20 7"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const XIcon = (
  <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M6 6l12 12M6 18L18 6"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(function TimelineItem(
  { status = 'pending', marker, title, time, hideConnector, className, children, ...props },
  ref,
) {
  return (
    <li
      ref={ref}
      data-status={status}
      data-no-connector={hideConnector || undefined}
      className={cn('bwo-timeline-item', `bwo-timeline-item--${status}`, className)}
      {...props}
    >
      <div className="bwo-timeline-axis">
        <div className="bwo-timeline-marker">
          {marker ??
            (status === 'completed' ? CheckIcon : status === 'error' ? XIcon : null)}
        </div>
      </div>
      <div className="bwo-timeline-content">
        {time && <div className="bwo-timeline-time">{time}</div>}
        {title && <div className="bwo-timeline-title">{title}</div>}
        {children && <div className="bwo-timeline-body">{children}</div>}
      </div>
    </li>
  );
});
