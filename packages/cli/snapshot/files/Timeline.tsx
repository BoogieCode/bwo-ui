'use client';

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type TimelineOrientation = 'vertical' | 'horizontal';

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  orientation?: TimelineOrientation;
  /** Position of content relative to the line. Default: `'right'` (vertical) / `'bottom'` (horizontal). */
  align?: 'left' | 'right' | 'alternate' | 'top' | 'bottom';
}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  { orientation = 'vertical', align, className, ...props },
  ref,
) {
  const effectiveAlign = align ?? (orientation === 'horizontal' ? 'bottom' : 'right');
  return (
    <ol
      ref={ref}
      data-orientation={orientation}
      data-align={effectiveAlign}
      className={cn(
        'bwo-timeline',
        `bwo-timeline--${orientation}`,
        `bwo-timeline--${effectiveAlign}`,
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
  /** Custom marker node (overrides the default dot). */
  marker?: ReactNode;
  /** Title text rendered above the body. */
  title?: ReactNode;
  /** Timestamp / supporting label. */
  time?: ReactNode;
  /** When true, no connecting line is drawn after this item. Useful for the last item. */
  hideConnector?: boolean;
}

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
          {marker ?? (status === 'completed' ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12l5 5L20 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null)}
        </div>
        {!hideConnector && <div className="bwo-timeline-connector" aria-hidden />}
      </div>
      <div className="bwo-timeline-content">
        {time && <div className="bwo-timeline-time">{time}</div>}
        {title && <div className="bwo-timeline-title">{title}</div>}
        {children && <div className="bwo-timeline-body">{children}</div>}
      </div>
    </li>
  );
});
