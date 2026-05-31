'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { DialogContent, DialogRoot, DialogTitle } from './Dialog';
import { cn } from './utils';

export interface CommandItemEntry {
  /** Unique id. */
  id: string;
  /** Display label used by the default filter. */
  label: string;
  /** Optional group/section. */
  group?: string;
  /** Optional keyword pool added to the filter haystack. */
  keywords?: string[];
  /** Disabled rows skip filtering and selection. */
  disabled?: boolean;
  /** Optional icon node rendered before the label. */
  icon?: ReactNode;
  /** Optional shortcut hint rendered on the right (e.g. "⌘K"). */
  shortcut?: string;
  /** Optional supporting text shown under the label. */
  description?: string;
  /** Called when the row is selected via click/Enter. */
  onSelect?: () => void;
}

export interface CommandProps extends HTMLAttributes<HTMLDivElement> {
  /** All items, grouped by their optional `group` field. */
  items: CommandItemEntry[];
  /** Placeholder text for the search input. */
  placeholder?: string;
  /** Custom filter. Default: case-insensitive substring across label + keywords. */
  filter?: (item: CommandItemEntry, query: string) => boolean;
  /** Rendered when no items match. */
  emptyState?: ReactNode;
  /** Programmatic search value (controlled). */
  search?: string;
  onSearchChange?: (search: string) => void;
}

const defaultFilter = (item: CommandItemEntry, query: string) => {
  const q = query.toLowerCase();
  if (item.label.toLowerCase().includes(q)) return true;
  if (item.keywords?.some((k) => k.toLowerCase().includes(q))) return true;
  return false;
};

export const Command = forwardRef<HTMLDivElement, CommandProps>(function Command(
  {
    items,
    placeholder = 'Type a command…',
    filter = defaultFilter,
    emptyState,
    search: controlledSearch,
    onSearchChange,
    className,
    ...props
  },
  ref,
) {
  const [internalSearch, setInternalSearch] = useState('');
  const search = controlledSearch !== undefined ? controlledSearch : internalSearch;
  const setSearch = useCallback(
    (next: string) => {
      if (controlledSearch === undefined) setInternalSearch(next);
      onSearchChange?.(next);
    },
    [controlledSearch, onSearchChange],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const listboxId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const enabled = items.filter((i) => !i.disabled);
    return search ? enabled.filter((i) => filter(i, search)) : enabled;
  }, [items, search, filter]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItemEntry[]>();
    for (const item of filtered) {
      const key = item.group ?? '';
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const select = (item: CommandItemEntry) => {
    if (item.disabled) return;
    item.onSelect?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(filtered.length - 1);
    } else if (e.key === 'Enter') {
      const item = filtered[activeIndex];
      if (item) {
        e.preventDefault();
        select(item);
      }
    }
  };

  let flatIndex = 0;
  return (
    <div
      ref={ref}
      className={cn('bwo-command', className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className="bwo-command-input-wrap">
        <svg
          className="bwo-command-input-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M20 20l-3.5-3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          autoFocus
          type="text"
          role="combobox"
          aria-expanded
          aria-controls={listboxId}
          aria-autocomplete="list"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bwo-command-input"
        />
      </div>
      <div
        ref={listRef}
        role="listbox"
        id={listboxId}
        className="bwo-command-list"
      >
        {filtered.length === 0 ? (
          <div className="bwo-command-empty">{emptyState ?? 'No results found.'}</div>
        ) : (
          grouped.map(([group, groupItems]) => (
            <div key={group || 'default'} className="bwo-command-group">
              {group && <div className="bwo-command-group-heading">{group}</div>}
              {groupItems.map((item) => {
                const index = flatIndex++;
                const isActive = index === activeIndex;
                return (
                  <div
                    key={item.id}
                    role="option"
                    aria-selected={isActive}
                    data-index={index}
                    data-active={isActive || undefined}
                    className="bwo-command-item"
                    onMouseEnter={() => setActiveIndex(index)}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      select(item);
                    }}
                  >
                    {item.icon && <span className="bwo-command-item-icon">{item.icon}</span>}
                    <span className="bwo-command-item-label">
                      {item.label}
                      {item.description && (
                        <span className="bwo-command-item-desc">{item.description}</span>
                      )}
                    </span>
                    {item.shortcut && (
                      <kbd className="bwo-command-item-shortcut">{item.shortcut}</kbd>
                    )}
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export interface CommandDialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Accessible title. Default: "Command Palette". */
  title?: string;
  children: ReactNode;
}

/**
 * Convenience: renders <Command> inside a modal dialog (cmdk-style overlay).
 */
export const CommandDialog = forwardRef<HTMLDivElement, CommandDialogProps>(function CommandDialog(
  { open, onOpenChange, title = 'Command Palette', children, className, ...rest },
  ref,
) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={ref}
        hideOverlay
        hideClose
        className={cn('bwo-command-dialog', className)}
        {...rest}
      >
        <div className="bwo-command-overlay" aria-hidden />
        <DialogTitle className="bwo-sr-only">{title}</DialogTitle>
        {children}
      </DialogContent>
    </DialogRoot>
  );
});
