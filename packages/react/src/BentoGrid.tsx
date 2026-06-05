'use client';

import {
  forwardRef,
  useId,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

type Size = string | number;

const formatSize = (v: Size): string => (typeof v === 'number' ? `${v}px` : v);

/* ─── BentoGrid ────────────────────────────────────────────────────────── */

export interface BentoGridProps extends HTMLAttributes<HTMLElement> {
  /** Number of columns on wide screens. Default: `3`. */
  columns?: number;
  /** Gap between cells. Number → px. Default: `16`. */
  gap?: Size;
  /** Track sizing for `grid-auto-rows`. Default: `'minmax(180px, auto)'`. */
  rowHeight?: Size;
  /** Polymorphic element. Default: `'div'`. */
  as?: ElementType;
}

export const BentoGrid = forwardRef<HTMLElement, BentoGridProps>(function BentoGrid(
  { columns = 3, gap = 16, rowHeight = 'minmax(180px, auto)', as, className, style, children, ...props },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;
  // Stable, SSR-safe unique id for the scoped responsive stylesheet.
  const rawId = useId();
  const scope = `bwo-bento-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const gapCss = formatSize(gap);
  const rowCss = typeof rowHeight === 'number' ? `${rowHeight}px` : rowHeight;

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gridAutoRows: rowCss,
    gap: gapCss,
    ...style,
  };

  // Collapse columns on smaller viewports. At ≤900px halve (min 2), ≤600px
  // single column so spanned cells never overflow. Scoped by class so it
  // never leaks to sibling grids. Injected once per instance, SSR-safe.
  const collapsed = Math.max(2, Math.ceil(columns / 2));
  const css =
    `.${scope}{grid-template-columns:repeat(${columns},minmax(0,1fr));}` +
    `@media (max-width:900px){.${scope}{grid-template-columns:repeat(${Math.min(columns, collapsed)},minmax(0,1fr));}` +
    `.${scope}>*{grid-column:auto / span min(var(--bwo-bento-col-span,1),${Math.min(columns, collapsed)});}}` +
    `@media (max-width:600px){.${scope}{grid-template-columns:1fr;}` +
    `.${scope}>*{grid-column:auto;grid-row:auto;}}`;

  return (
    <Tag
      ref={ref}
      className={cn('bwo-bento-grid', scope, className)}
      style={gridStyle}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </Tag>
  );
});

/* ─── BentoCard ────────────────────────────────────────────────────────── */

export interface BentoCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Columns this card spans. Default: `1`. */
  colSpan?: number;
  /** Rows this card spans. Default: `1`. */
  rowSpan?: number;
  /** Small uppercase label above the title. */
  eyebrow?: ReactNode;
  /** Card heading. */
  title?: ReactNode;
  /** Supporting copy under the title. */
  description?: ReactNode;
  /** Leading icon, rendered in a rounded chip above the text. */
  icon?: ReactNode;
  /** Full-bleed media (image/video/etc.) rendered behind/above the content. */
  media?: ReactNode;
  /** Polymorphic element. Default: `'div'`. */
  as?: ElementType;
}

const surfaceStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: 'var(--bwo-radius-lg, 12px)',
  border: '1px solid var(--bwo-border, rgba(0,0,0,0.1))',
  background: 'var(--bwo-surface, #fff)',
  color: 'var(--bwo-fg, inherit)',
  minWidth: 0,
};

const bodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 20,
  minWidth: 0,
};

const iconChipStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  marginBottom: 4,
  borderRadius: 'var(--bwo-radius-md, 8px)',
  border: '1px solid var(--bwo-border, rgba(0,0,0,0.1))',
  background: 'var(--bwo-surface-2, rgba(0,0,0,0.03))',
  flex: '0 0 auto',
};

const eyebrowStyle: CSSProperties = {
  margin: 0,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--bwo-muted, rgba(0,0,0,0.55))',
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.25,
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.5,
  color: 'var(--bwo-muted, rgba(0,0,0,0.6))',
};

const mediaStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  flex: '1 1 auto',
  minHeight: 0,
  overflow: 'hidden',
};

export const BentoCard = forwardRef<HTMLElement, BentoCardProps>(function BentoCard(
  {
    colSpan = 1,
    rowSpan = 1,
    eyebrow,
    title,
    description,
    icon,
    media,
    as,
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;

  const inline: CSSProperties & Record<string, string | number> = {
    ...surfaceStyle,
    gridColumn: `span ${colSpan} / span ${colSpan}`,
    gridRow: `span ${rowSpan} / span ${rowSpan}`,
    // Consumed by BentoGrid's responsive stylesheet to clamp spans on collapse.
    ['--bwo-bento-col-span' as string]: colSpan,
    ...style,
  };

  // Children fully override the convenience slots.
  const hasSlots = eyebrow != null || title != null || description != null || icon != null;

  return (
    <Tag
      ref={ref}
      className={cn('bwo-bento-card', className)}
      style={inline}
      {...props}
    >
      {children != null ? (
        children
      ) : (
        <>
          {media != null && <div className="bwo-bento-card-media" style={mediaStyle}>{media}</div>}
          {hasSlots && (
            <div className="bwo-bento-card-body" style={bodyStyle}>
              {icon != null && (
                <span className="bwo-bento-card-icon" style={iconChipStyle} aria-hidden="true">
                  {icon}
                </span>
              )}
              {eyebrow != null && <p style={eyebrowStyle}>{eyebrow}</p>}
              {title != null && <h3 style={titleStyle}>{title}</h3>}
              {description != null && <p style={descriptionStyle}>{description}</p>}
            </div>
          )}
        </>
      )}
    </Tag>
  );
});
