'use client';

import {
  forwardRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

type Responsive<T> = T | Partial<Record<'sm' | 'md' | 'lg' | 'xl', T>>;

function toCss<T>(
  value: Responsive<T> | undefined,
  format: (v: T) => string,
): { base: string | undefined; vars: Record<string, string> } {
  if (value === undefined) return { base: undefined, vars: {} };
  if (typeof value !== 'object' || value === null)
    return { base: format(value as T), vars: {} };
  const v = value as Partial<Record<'sm' | 'md' | 'lg' | 'xl', T>>;
  const vars: Record<string, string> = {};
  for (const key of ['sm', 'md', 'lg', 'xl'] as const) {
    if (v[key] !== undefined) vars[`--bwo-grid-${key}`] = format(v[key] as T);
  }
  return { base: undefined, vars };
}

type Size = string | number;

const formatSize = (v: Size): string => (typeof v === 'number' ? `${v}px` : v);
const formatCount = (v: number): string => String(v);

/* ─── SimpleGrid ───────────────────────────────────────────────────────── */

export interface SimpleGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of equal columns. Responsive object also supported, e.g. `{ sm: 2, md: 3 }`. */
  columns?: Responsive<number>;
  /** Gap between cells. */
  gap?: Size;
  /** Column gap (overrides gap on x-axis). */
  columnGap?: Size;
  /** Row gap (overrides gap on y-axis). */
  rowGap?: Size;
  /**
   * When set, columns auto-fit to fill the row given each child needs at least
   * this width. Overrides `columns`.
   */
  minChildWidth?: Size;
  /** Polymorphic element. Default: `'div'`. */
  as?: ElementType;
}

export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(function SimpleGrid(
  { columns = 1, gap, columnGap, rowGap, minChildWidth, as, className, style, ...props },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;
  const cssVars: CSSProperties & Record<string, string | number | undefined> = {};
  if (minChildWidth) {
    cssVars['--bwo-grid-cols'] = `repeat(auto-fit, minmax(${formatSize(minChildWidth)}, 1fr))`;
  } else {
    const cols = toCss(columns, formatCount);
    if (cols.base) cssVars['--bwo-grid-cols'] = `repeat(${cols.base}, minmax(0, 1fr))`;
    for (const [k, v] of Object.entries(cols.vars))
      cssVars[k.replace('--bwo-grid-', '--bwo-grid-cols-')] = `repeat(${v}, minmax(0, 1fr))`;
  }
  if (gap !== undefined) cssVars['--bwo-grid-gap'] = formatSize(gap);
  if (columnGap !== undefined) cssVars['--bwo-grid-col-gap'] = formatSize(columnGap);
  if (rowGap !== undefined) cssVars['--bwo-grid-row-gap'] = formatSize(rowGap);

  return (
    <Tag
      ref={ref}
      className={cn('bwo-simple-grid', className)}
      style={{ ...cssVars, ...style }}
      {...props}
    />
  );
});

/* ─── Grid (advanced) + GridItem ──────────────────────────────────────── */

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom `grid-template-columns` value (e.g. `'1fr 2fr'`, `'repeat(12, 1fr)'`). */
  templateColumns?: Responsive<string>;
  /** Custom `grid-template-rows`. */
  templateRows?: Responsive<string>;
  /** Custom `grid-template-areas` (one row per string). */
  templateAreas?: string[];
  /** Convenience: `grid-template-columns: repeat(columns, 1fr)`. */
  columns?: Responsive<number>;
  /** Convenience: `grid-template-rows: repeat(rows, auto)`. */
  rows?: Responsive<number>;
  gap?: Size;
  columnGap?: Size;
  rowGap?: Size;
  /** Sets `grid-auto-flow`. */
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  /** Sets `grid-auto-rows`. */
  autoRows?: Size;
  /** Sets `grid-auto-columns`. */
  autoColumns?: Size;
  as?: ElementType;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    templateColumns,
    templateRows,
    templateAreas,
    columns,
    rows,
    gap,
    columnGap,
    rowGap,
    autoFlow,
    autoRows,
    autoColumns,
    as,
    className,
    style,
    ...props
  },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;
  const cssVars: CSSProperties & Record<string, string | number | undefined> = {};

  if (templateColumns !== undefined) {
    const tc = toCss(templateColumns, (v) => v);
    if (tc.base) cssVars['--bwo-grid-tc'] = tc.base;
    for (const [k, v] of Object.entries(tc.vars)) cssVars[k.replace('--bwo-grid-', '--bwo-grid-tc-')] = v;
  } else if (columns !== undefined) {
    const c = toCss(columns, formatCount);
    if (c.base) cssVars['--bwo-grid-tc'] = `repeat(${c.base}, minmax(0, 1fr))`;
    for (const [k, v] of Object.entries(c.vars))
      cssVars[k.replace('--bwo-grid-', '--bwo-grid-tc-')] = `repeat(${v}, minmax(0, 1fr))`;
  }

  if (templateRows !== undefined) {
    const tr = toCss(templateRows, (v) => v);
    if (tr.base) cssVars['--bwo-grid-tr'] = tr.base;
  } else if (rows !== undefined) {
    const r = toCss(rows, formatCount);
    if (r.base) cssVars['--bwo-grid-tr'] = `repeat(${r.base}, auto)`;
  }

  if (templateAreas) {
    cssVars['--bwo-grid-ta'] = templateAreas.map((row) => `"${row}"`).join(' ');
  }
  if (gap !== undefined) cssVars['--bwo-grid-gap'] = formatSize(gap);
  if (columnGap !== undefined) cssVars['--bwo-grid-col-gap'] = formatSize(columnGap);
  if (rowGap !== undefined) cssVars['--bwo-grid-row-gap'] = formatSize(rowGap);
  if (autoFlow) cssVars['--bwo-grid-flow'] = autoFlow;
  if (autoRows !== undefined) cssVars['--bwo-grid-ar'] = formatSize(autoRows);
  if (autoColumns !== undefined) cssVars['--bwo-grid-ac'] = formatSize(autoColumns);

  return (
    <Tag
      ref={ref}
      className={cn('bwo-grid', className)}
      style={{ ...cssVars, ...style }}
      {...props}
    />
  );
});

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Span N columns (sets `grid-column: span N`). */
  colSpan?: number;
  /** Span N rows. */
  rowSpan?: number;
  /** 1-based start line. */
  colStart?: number;
  /** 1-based end line (exclusive). */
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
  /** Named grid area (must match a name in `Grid.templateAreas`). */
  area?: string;
  as?: ElementType;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  {
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    area,
    as,
    className,
    style,
    ...props
  },
  ref,
) {
  const Tag = (as ?? 'div') as ElementType;
  const inline: CSSProperties = {};
  if (colSpan) inline.gridColumn = `span ${colSpan} / span ${colSpan}`;
  if (rowSpan) inline.gridRow = `span ${rowSpan} / span ${rowSpan}`;
  if (colStart) inline.gridColumnStart = colStart;
  if (colEnd) inline.gridColumnEnd = colEnd;
  if (rowStart) inline.gridRowStart = rowStart;
  if (rowEnd) inline.gridRowEnd = rowEnd;
  if (area) inline.gridArea = area;
  return (
    <Tag
      ref={ref}
      className={cn('bwo-grid-item', className)}
      style={{ ...inline, ...style }}
      {...props}
    />
  );
});

export type GridChildren = ReactNode;
