'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import {
  computeFloating,
  useAnchorRect,
  useFloatingSize,
} from './internal/floating';
import { Portal } from './internal/portal';
import { Presence } from './internal/presence';
import { useDismiss } from './internal/use-dismiss';
import { cn, type Radius } from './utils';

interface SelectContextValue {
  /** Currently selected values. Single-select always has 0 or 1 entry. */
  values: string[];
  /** Toggle for multi, replace for single. */
  toggleValue: (v: string) => void;
  multiple: boolean;
  searchable: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerEl: HTMLButtonElement | null;
  setTriggerEl: (el: HTMLButtonElement | null) => void;
  contentEl: HTMLDivElement | null;
  setContentEl: (el: HTMLDivElement | null) => void;
  triggerId: string;
  contentId: string;
  registerLabel: (value: string, label: ReactNode) => void;
  registerText: (value: string, text: string) => void;
  getLabel: (value: string | null) => ReactNode;
  labels: Map<string, ReactNode>;
  texts: Map<string, string>;
  highlightedValue: string | null;
  setHighlightedValue: (v: string | null) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext(name: string): SelectContextValue {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <SelectRoot>.`);
  return ctx;
}

interface BaseSelectRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  /** When true, the content renders a filter input at the top. */
  searchable?: boolean;
  /** Placeholder for the search input. Default: `'Search…'`. */
  searchPlaceholder?: string;
  children: ReactNode;
}

interface SingleSelectRootProps extends BaseSelectRootProps {
  multiple?: false;
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface MultiSelectRootProps extends BaseSelectRootProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type SelectRootProps = SingleSelectRootProps | MultiSelectRootProps;

function toArray(v: string | string[] | null | undefined): string[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

export function SelectRoot(props: SelectRootProps) {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled,
    required,
    name,
    searchable = false,
    children,
  } = props;
  const multiple = props.multiple === true;

  const controlledValues =
    props.value === undefined ? undefined : toArray(props.value as string | string[] | null);
  const [internalValues, setInternalValues] = useState<string[]>(() => {
    if (props.defaultValue === undefined) return [];
    return toArray(props.defaultValue as string | string[]);
  });
  const values = controlledValues ?? internalValues;

  const fireValueChange = useCallback(
    (next: string[]) => {
      if (multiple) {
        (props as MultiSelectRootProps).onValueChange?.(next);
      } else {
        const single = next[0];
        if (single !== undefined) (props as SingleSelectRootProps).onValueChange?.(single);
      }
    },
    [multiple, props],
  );

  const toggleValue = useCallback(
    (v: string) => {
      const isSelected = values.includes(v);
      let next: string[];
      if (multiple) {
        next = isSelected ? values.filter((x) => x !== v) : [...values, v];
      } else {
        next = [v];
      }
      if (controlledValues === undefined) setInternalValues(next);
      fireValueChange(next);
    },
    [values, multiple, controlledValues, fireValueChange],
  );

  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const [triggerEl, setTriggerEl] = useState<HTMLButtonElement | null>(null);
  const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);
  const triggerId = useId();
  const contentId = useId();
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [labels, setLabels] = useState<Map<string, ReactNode>>(() => new Map());
  const [texts, setTexts] = useState<Map<string, string>>(() => new Map());
  const registerLabel = useCallback((v: string, label: ReactNode) => {
    setLabels((prev) => {
      if (prev.get(v) === label) return prev;
      const next = new Map(prev);
      next.set(v, label);
      return next;
    });
  }, []);
  const registerText = useCallback((v: string, text: string) => {
    setTexts((prev) => {
      if (prev.get(v) === text) return prev;
      const next = new Map(prev);
      next.set(v, text);
      return next;
    });
  }, []);
  const getLabel = useCallback(
    (v: string | null) => (v === null ? null : labels.get(v) ?? null),
    [labels],
  );

  useEffect(() => {
    if (open && values[0] && highlightedValue === null) setHighlightedValue(values[0]);
    if (!open) {
      setHighlightedValue(null);
      setSearchQuery('');
    }
  }, [open, values, highlightedValue]);

  const ctx = useMemo<SelectContextValue>(
    () => ({
      values,
      toggleValue,
      multiple,
      searchable,
      searchQuery,
      setSearchQuery,
      open,
      setOpen,
      triggerEl,
      setTriggerEl,
      contentEl,
      setContentEl,
      triggerId,
      contentId,
      registerLabel,
      registerText,
      getLabel,
      labels,
      texts,
      highlightedValue,
      setHighlightedValue,
      disabled,
      required,
      name,
    }),
    [
      values,
      toggleValue,
      multiple,
      searchable,
      searchQuery,
      open,
      setOpen,
      triggerEl,
      contentEl,
      triggerId,
      contentId,
      registerLabel,
      registerText,
      getLabel,
      labels,
      texts,
      highlightedValue,
      disabled,
      required,
      name,
    ],
  );

  return (
    <SelectContext.Provider value={ctx}>
      {children}
      {name &&
        (multiple
          ? values.map((v) => (
              <input
                key={v}
                type="hidden"
                name={`${name}[]`}
                value={v}
                required={required}
                disabled={disabled}
              />
            ))
          : (
            <input
              type="hidden"
              name={name}
              value={values[0] ?? ''}
              required={required}
              disabled={disabled}
            />
          ))}
    </SelectContext.Provider>
  );
}

export interface SelectGroupProps extends HTMLAttributes<HTMLDivElement> {}

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(function SelectGroup(
  { className, ...props },
  ref,
) {
  return <div ref={ref} role="group" className={cn('bwo-select-group', className)} {...props} />;
});

export interface SelectValueProps extends HTMLAttributes<HTMLSpanElement> {
  placeholder?: ReactNode;
  /** Custom renderer for multi-select. Default: joined labels with ", ". */
  formatMultiple?: (labels: ReactNode[], values: string[]) => ReactNode;
}

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(
  { placeholder, formatMultiple, className, children, ...props },
  ref,
) {
  const { values, getLabel, multiple } = useSelectContext('SelectValue');

  let content: ReactNode;
  if (children !== undefined) {
    content = children;
  } else if (values.length === 0) {
    content = placeholder;
  } else if (multiple) {
    const labels = values.map((v) => getLabel(v) ?? v);
    content = formatMultiple
      ? formatMultiple(labels, values)
      : labels.reduce<ReactNode[]>(
          (acc, label, i) => (i === 0 ? [label] : [...acc, ', ', label]),
          [],
        );
  } else {
    content = getLabel(values[0]!) ?? placeholder;
  }

  return (
    <span
      ref={ref}
      className={cn('bwo-select-value', className)}
      data-empty={values.length === 0 || undefined}
      {...props}
    >
      {content}
    </span>
  );
});

export interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  radius?: Radius;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ className, children, radius, onClick, onKeyDown, ...props }, ref) {
    const { open, setOpen, setTriggerEl, triggerId, contentId, disabled, values, multiple } =
      useSelectContext('SelectTrigger');
    const setRef = useCallback(
      (el: HTMLButtonElement | null) => {
        setTriggerEl(el);
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as MutableRefObject<HTMLButtonElement | null>).current = el;
      },
      [ref, setTriggerEl],
    );
    return (
      <button
        ref={setRef}
        type="button"
        id={triggerId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        data-radius={radius}
        data-multiple={multiple || undefined}
        data-count={multiple ? values.length : undefined}
        disabled={disabled}
        className={cn('bwo-select-trigger', className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(!open);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        {...props}
      >
        {children}
        <span className="bwo-select-icon" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    );
  },
);

interface SelectItemRegistryContextValue {
  items: MutableRefObject<Array<{ value: string; disabled: boolean }>>;
  bump: () => void;
}
const SelectItemRegistryContext = createContext<SelectItemRegistryContextValue | null>(null);

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
  /** When `'popper'` (default) the listbox anchors to the trigger. */
  position?: 'popper' | 'item-aligned';
  /** Empty state when search filter returns no matches. */
  searchEmpty?: ReactNode;
  /** Placeholder for the search input when `searchable` is on. */
  searchPlaceholder?: string;
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  {
    className,
    children,
    sideOffset = 6,
    position: _position,
    searchEmpty,
    searchPlaceholder,
    ...props
  },
  ref,
) {
  const ctx = useSelectContext('SelectContent');
  const {
    open,
    setOpen,
    triggerEl,
    contentEl,
    setContentEl,
    triggerId,
    contentId,
    values,
    toggleValue,
    multiple,
    searchable,
    searchQuery,
    setSearchQuery,
    highlightedValue,
    setHighlightedValue,
    texts,
  } = ctx;
  const rect = useAnchorRect(triggerEl, open);
  const size = useFloatingSize(contentEl, open);
  const [pos, setPos] = useState<{ top: number; left: number; minWidth: number } | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open || !rect || size.width === 0) {
      if (!open) setPos(null);
      return;
    }
    const p = computeFloating(rect, { width: rect.width, height: size.height || 200 }, {
      side: 'bottom',
      align: 'start',
      sideOffset,
    });
    setPos({ top: p.top, left: p.left, minWidth: rect.width });
  }, [open, rect, size, sideOffset]);

  const contentRefSink = useRef<HTMLDivElement | null>(null);
  const triggerRefSink = useRef<HTMLButtonElement | null>(null);
  contentRefSink.current = contentEl;
  triggerRefSink.current = triggerEl;
  useDismiss({
    enabled: open,
    refs: [contentRefSink, triggerRefSink],
    onDismiss: () => setOpen(false),
  });

  const itemsRef = useRef<Array<{ value: string; disabled: boolean }>>([]);
  const [, force] = useState(0);
  const bump = useCallback(() => force((n) => n + 1), []);
  const registry = useMemo(() => ({ items: itemsRef, bump }), [bump]);

  const queryLower = searchQuery.trim().toLowerCase();
  const visibleItems = useMemo(() => {
    if (!searchable || !queryLower) return itemsRef.current;
    return itemsRef.current.filter((i) => {
      const text = texts.get(i.value);
      if (!text) return false;
      return text.toLowerCase().includes(queryLower);
    });
  }, [searchable, queryLower, texts]);

  useEffect(() => {
    if (!open) return;
    const visible = visibleItems.filter((i) => !i.disabled);
    if (visible.length === 0) {
      setHighlightedValue(null);
      return;
    }
    if (!highlightedValue || !visible.some((i) => i.value === highlightedValue)) {
      setHighlightedValue(visible[0]!.value);
    }
  }, [open, visibleItems, highlightedValue, setHighlightedValue]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      if (searchable) searchInputRef.current?.focus({ preventScroll: true });
      else contentEl?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [open, contentEl, searchable]);

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      setContentEl(el);
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = el;
    },
    [ref, setContentEl],
  );

  const moveHighlight = (delta: number) => {
    const visible = visibleItems.filter((i) => !i.disabled);
    if (visible.length === 0) return;
    const currentIndex = visible.findIndex((i) => i.value === highlightedValue);
    const nextIndex =
      currentIndex === -1
        ? delta > 0
          ? 0
          : visible.length - 1
        : (currentIndex + delta + visible.length) % visible.length;
    setHighlightedValue(visible[nextIndex]!.value);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveHighlight(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveHighlight(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      const visible = visibleItems.filter((i) => !i.disabled);
      if (visible.length > 0) setHighlightedValue(visible[0]!.value);
    } else if (event.key === 'End') {
      event.preventDefault();
      const visible = visibleItems.filter((i) => !i.disabled);
      if (visible.length > 0) setHighlightedValue(visible[visible.length - 1]!.value);
    } else if (event.key === 'Enter' || (event.key === ' ' && !searchable)) {
      event.preventDefault();
      if (highlightedValue !== null) {
        toggleValue(highlightedValue);
        if (!multiple) {
          setOpen(false);
          triggerEl?.focus();
        }
      }
    } else if (event.key === 'Tab') {
      setOpen(false);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerEl?.focus();
    }
  };

  const placeholder = searchPlaceholder ?? 'Search…';

  return (
    <Presence present={open}>
      {(state) => (
        <Portal>
          <SelectItemRegistryContext.Provider value={registry}>
            <div
              ref={setRef}
              role="listbox"
              id={contentId}
              aria-labelledby={triggerId}
              aria-multiselectable={multiple || undefined}
              aria-activedescendant={
                highlightedValue ? `${contentId}-opt-${highlightedValue}` : undefined
              }
              tabIndex={-1}
              data-state={state}
              data-bwo-floating=""
              style={{
                position: 'fixed',
                top: pos?.top ?? -9999,
                left: pos?.left ?? -9999,
                minWidth: pos?.minWidth,
                visibility: pos ? 'visible' : 'hidden',
              }}
              className={cn('bwo-select-content', className)}
              onKeyDown={onKeyDown}
              {...props}
            >
              {searchable && (
                <div className="bwo-select-search">
                  <svg
                    className="bwo-select-search-icon"
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
                    ref={searchInputRef}
                    type="text"
                    role="searchbox"
                    aria-label="Filter options"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bwo-select-search-input"
                  />
                </div>
              )}
              <div className="bwo-select-viewport">
                {children}
                {searchable && visibleItems.length === 0 && queryLower && (
                  <div className="bwo-select-empty">
                    {searchEmpty ?? `No results for "${searchQuery}"`}
                  </div>
                )}
              </div>
              {multiple && values.length > 0 && (
                <div className="bwo-select-footer">
                  <span className="bwo-select-count">{values.length} selected</span>
                  <button
                    type="button"
                    className="bwo-select-clear"
                    onClick={() => {
                      for (const v of [...values]) toggleValue(v);
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </SelectItemRegistryContext.Provider>
        </Portal>
      )}
    </Presence>
  );
});

export interface SelectItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: string;
  disabled?: boolean;
  children: ReactNode;
  /** Override the searchable text. Default: extracted from string children. */
  searchText?: string;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { value, disabled, className, children, searchText, ...props },
  ref,
) {
  const ctx = useSelectContext('SelectItem');
  const registry = useContext(SelectItemRegistryContext);
  const {
    contentId,
    values,
    multiple,
    highlightedValue,
    toggleValue,
    setOpen,
    triggerEl,
    registerLabel,
    registerText,
    setHighlightedValue,
    searchable,
    searchQuery,
    texts,
  } = ctx;
  const isSelected = values.includes(value);
  const isHighlighted = highlightedValue === value;

  useEffect(() => {
    if (typeof children === 'string') {
      registerLabel(value, children);
      registerText(value, searchText ?? children);
    } else if (searchText) {
      registerText(value, searchText);
    }
  }, [value, children, searchText, registerLabel, registerText]);

  useEffect(() => {
    if (!registry) return;
    const entry = { value, disabled: Boolean(disabled) };
    registry.items.current.push(entry);
    registry.bump();
    return () => {
      const idx = registry.items.current.indexOf(entry);
      if (idx >= 0) registry.items.current.splice(idx, 1);
    };
  }, [registry, value, disabled]);

  const onSelect = () => {
    if (disabled) return;
    toggleValue(value);
    if (!multiple) {
      setOpen(false);
      triggerEl?.focus();
    }
  };

  // Filter by search query — hide non-matching items.
  const queryLower = searchQuery.trim().toLowerCase();
  if (searchable && queryLower) {
    const text = texts.get(value);
    if (!text || !text.toLowerCase().includes(queryLower)) return null;
  }

  return (
    <div
      ref={ref}
      role="option"
      id={`${contentId}-opt-${value}`}
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      data-state={isSelected ? 'checked' : 'unchecked'}
      data-highlighted={isHighlighted || undefined}
      data-disabled={disabled || undefined}
      data-multiple={multiple || undefined}
      className={cn('bwo-select-item', className)}
      onPointerDown={(event) => {
        event.preventDefault();
        onSelect();
      }}
      onPointerEnter={() => !disabled && setHighlightedValue(value)}
      {...props}
    >
      {multiple && (
        <span
          className="bwo-select-checkbox"
          data-state={isSelected ? 'checked' : 'unchecked'}
          aria-hidden
        >
          {isSelected && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      )}
      <span className="bwo-select-item-text">{children}</span>
      {!multiple && isSelected && (
        <span className="bwo-select-item-indicator" data-state="checked">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
});

export const Select = {
  Root: SelectRoot,
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Item: SelectItem,
};
