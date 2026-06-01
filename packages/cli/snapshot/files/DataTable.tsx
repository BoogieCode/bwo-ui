'use client';

import {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type ThHTMLAttributes,
} from 'react';
import { cn } from './utils';

export interface DataTableColumn<T> {
  /** Unique column key. */
  id: string;
  /** Header content. */
  header: ReactNode;
  /** Cell renderer. Receives the row. */
  cell?: (row: T, rowIndex: number) => ReactNode;
  /** Accessor used by default cell rendering and sorting. */
  accessor?: (row: T) => string | number | null | undefined;
  /** Enable sorting on this column. */
  sortable?: boolean;
  /** Pin column width via inline style. */
  width?: string | number;
  /** Text alignment for the column. Default: `'left'`. */
  align?: 'left' | 'center' | 'right';
  /** Extra class on the th/td. */
  className?: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  id: string | null;
  direction: SortDirection;
}

export interface DataTableProps<T> extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  data: T[];
  columns: DataTableColumn<T>[];
  /** Custom row key. Default: array index. */
  getRowId?: (row: T, index: number) => string;
  /** Sort state (controlled). */
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;
  /** Pagination — when omitted, all rows are rendered. */
  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  /** Rendered when `data` is empty. */
  emptyState?: ReactNode;
  /** Show striped row backgrounds. */
  striped?: boolean;
  /** Make rows highlight on hover. */
  hoverable?: boolean;
  /** Make rows clickable. */
  onRowClick?: (row: T, rowIndex: number) => void;
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
}

function DataTableInner<T>(
  {
    data,
    columns,
    getRowId,
    sort: controlledSort,
    onSortChange,
    pageSize,
    page: controlledPage,
    onPageChange,
    emptyState,
    striped,
    hoverable,
    onRowClick,
    className,
    ...rest
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>,
) {
  const [internalSort, setInternalSort] = useState<SortState>({ id: null, direction: null });
  const sort = controlledSort ?? internalSort;
  const setSort = useCallback(
    (next: SortState) => {
      if (!controlledSort) setInternalSort(next);
      onSortChange?.(next);
    },
    [controlledSort, onSortChange],
  );

  const [internalPage, setInternalPage] = useState(1);
  const page = controlledPage ?? internalPage;
  const setPage = useCallback(
    (next: number) => {
      if (controlledPage === undefined) setInternalPage(next);
      onPageChange?.(next);
    },
    [controlledPage, onPageChange],
  );

  const sortedData = useMemo(() => {
    if (!sort.id || !sort.direction) return data;
    const col = columns.find((c) => c.id === sort.id);
    if (!col?.accessor) return data;
    const out = [...data];
    out.sort((a, b) => {
      const v = compareValues(col.accessor!(a), col.accessor!(b));
      return sort.direction === 'asc' ? v : -v;
    });
    return out;
  }, [data, sort, columns]);

  const pageCount = pageSize ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;
  const pagedData = useMemo(() => {
    if (!pageSize) return sortedData;
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const toggleSort = (col: DataTableColumn<T>) => {
    if (!col.sortable) return;
    if (sort.id !== col.id) setSort({ id: col.id, direction: 'asc' });
    else if (sort.direction === 'asc') setSort({ id: col.id, direction: 'desc' });
    else setSort({ id: null, direction: null });
  };

  return (
    <div className={cn('bwo-datatable', className)}>
      <table ref={ref} {...rest}>
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sort.id === col.id && sort.direction;
              const ariaSort: ThHTMLAttributes<HTMLTableCellElement>['aria-sort'] =
                !isSorted
                  ? col.sortable
                    ? 'none'
                    : undefined
                  : sort.direction === 'asc'
                    ? 'ascending'
                    : 'descending';
              return (
                <th
                  key={col.id}
                  scope="col"
                  aria-sort={ariaSort}
                  className={cn(
                    'bwo-datatable-th',
                    col.align && `bwo-datatable-th--${col.align}`,
                    col.sortable && 'bwo-datatable-th--sortable',
                    col.className,
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => toggleSort(col)}
                >
                  <span className="bwo-datatable-th-content">
                    {col.header}
                    {col.sortable && (
                      <span className="bwo-datatable-th-sort" aria-hidden>
                        {sort.id === col.id && sort.direction === 'asc' ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M6 15l6-6 6 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : sort.id === col.id && sort.direction === 'desc' ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M6 9l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" opacity="0.4">
                            <path
                              d="M8 10l4-4 4 4M8 14l4 4 4-4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {pagedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="bwo-datatable-empty">
                {emptyState ?? 'No data'}
              </td>
            </tr>
          ) : (
            pagedData.map((row, i) => {
              const rowIndex = pageSize ? (page - 1) * pageSize + i : i;
              const key = getRowId?.(row, rowIndex) ?? String(rowIndex);
              return (
                <tr
                  key={key}
                  data-striped={striped || undefined}
                  data-hoverable={hoverable || undefined}
                  data-clickable={onRowClick ? true : undefined}
                  onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                >
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={cn(
                        'bwo-datatable-td',
                        col.align && `bwo-datatable-td--${col.align}`,
                        col.className,
                      )}
                    >
                      {col.cell
                        ? col.cell(row, rowIndex)
                        : col.accessor
                          ? String(col.accessor(row) ?? '')
                          : null}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {pageSize && pageCount > 1 && (
        <div className="bwo-datatable-pagination">
          <button
            type="button"
            className="bwo-datatable-page-btn"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="bwo-datatable-page-info">
            Page {page} of {pageCount}
          </span>
          <button
            type="button"
            className="bwo-datatable-page-btn"
            disabled={page >= pageCount}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export const DataTable = forwardRef(DataTableInner) as <T>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> },
) => ReturnType<typeof DataTableInner>;
