'use client';

import { forwardRef, useMemo, type HTMLAttributes } from 'react';
import { cn, type Radius } from './utils';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** 1-based current page. */
  page: number;
  /** Total page count (>= 1). */
  pageCount: number;
  /** Called with the next page number (1-based). */
  onPageChange?: (page: number) => void;
  /** How many neighbors around the active page to show. Default: 1. */
  siblingCount?: number;
  /** How many pages to always show at the start/end. Default: 1. */
  boundaryCount?: number;
  radius?: Radius;
  /** Accessible label for the nav element. */
  label?: string;
}

type Item = number | 'ellipsis-start' | 'ellipsis-end';

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildItems(
  page: number,
  pageCount: number,
  siblingCount: number,
  boundaryCount: number,
): Item[] {
  const totalNumbers = siblingCount * 2 + boundaryCount * 2 + 3;
  if (pageCount <= totalNumbers) return range(1, pageCount);

  const startPages = range(1, Math.min(boundaryCount, pageCount));
  const endPages = range(Math.max(pageCount - boundaryCount + 1, boundaryCount + 1), pageCount);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, pageCount - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0]! - 2 : pageCount - 1,
  );

  return [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (['ellipsis-start'] as const)
      : boundaryCount + 1 < pageCount - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < pageCount - boundaryCount - 1
      ? (['ellipsis-end'] as const)
      : pageCount - boundaryCount > boundaryCount
        ? [pageCount - boundaryCount]
        : []),
    ...endPages,
  ];
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    pageCount,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    radius,
    label = 'Pagination',
    className,
    ...props
  },
  ref,
) {
  const items = useMemo(
    () => buildItems(page, pageCount, siblingCount, boundaryCount),
    [page, pageCount, siblingCount, boundaryCount],
  );
  const go = (next: number) => {
    if (next < 1 || next > pageCount || next === page) return;
    onPageChange?.(next);
  };
  return (
    <nav
      ref={ref}
      aria-label={label}
      data-radius={radius}
      className={cn('bwo-pagination', className)}
      {...props}
    >
      <button
        type="button"
        className="bwo-pagination-btn"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {items.map((item, i) => {
        if (item === 'ellipsis-start' || item === 'ellipsis-end') {
          return (
            <span key={`${item}-${i}`} className="bwo-pagination-ellipsis" aria-hidden>
              …
            </span>
          );
        }
        const isActive = item === page;
        return (
          <button
            key={item}
            type="button"
            className={cn('bwo-pagination-btn', isActive && 'bwo-pagination-btn--active')}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => go(item)}
          >
            {item}
          </button>
        );
      })}
      <button
        type="button"
        className="bwo-pagination-btn"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => go(page + 1)}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </nav>
  );
});
