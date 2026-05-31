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
  type RefObject,
} from 'react';
import {
  computeFloating,
  useAnchorRect,
  useFloatingSize,
} from './internal/floating';
import { Portal } from './internal/portal';
import { Presence } from './internal/presence';
import { useControllable } from './internal/use-controllable';
import { useDismiss } from './internal/use-dismiss';
import { cn, type Radius } from './utils';

interface SelectContextValue {
  value: string | null;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: MutableRefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement>;
  triggerId: string;
  contentId: string;
  registerLabel: (value: string, label: ReactNode) => void;
  getLabel: (value: string | null) => ReactNode;
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

export interface SelectRootProps {
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  children: ReactNode;
}

export function SelectRoot({
  value: controlledValue,
  defaultValue,
  onValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled,
  required,
  name,
  children,
}: SelectRootProps) {
  const [value = null, setValue] = useControllable<string | null>({
    value: controlledValue,
    defaultValue: defaultValue ?? null,
    onChange: (next) => {
      if (next !== null) onValueChange?.(next);
    },
  });
  const [open = false, setOpen] = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const contentId = useId();
  const [highlightedValue, setHighlightedValue] = useState<string | null>(null);
  const labelsRef = useRef(new Map<string, ReactNode>());

  const registerLabel = useCallback((v: string, label: ReactNode) => {
    labelsRef.current.set(v, label);
  }, []);
  const getLabel = useCallback(
    (v: string | null) => (v === null ? null : labelsRef.current.get(v) ?? null),
    [],
  );

  useEffect(() => {
    if (open && value && highlightedValue === null) setHighlightedValue(value);
    if (!open) setHighlightedValue(null);
  }, [open, value, highlightedValue]);

  const ctx = useMemo<SelectContextValue>(
    () => ({
      value,
      setValue: (v) => setValue(v),
      open,
      setOpen,
      triggerRef,
      contentRef,
      triggerId,
      contentId,
      registerLabel,
      getLabel,
      highlightedValue,
      setHighlightedValue,
      disabled,
      required,
      name,
    }),
    [
      value,
      setValue,
      open,
      setOpen,
      triggerId,
      contentId,
      registerLabel,
      getLabel,
      highlightedValue,
      disabled,
      required,
      name,
    ],
  );

  return (
    <SelectContext.Provider value={ctx}>
      {children}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value ?? ''}
          required={required}
          disabled={disabled}
        />
      )}
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
}

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(
  { placeholder, className, children, ...props },
  ref,
) {
  const { value, getLabel } = useSelectContext('SelectValue');
  const label = children ?? getLabel(value);
  return (
    <span
      ref={ref}
      className={cn('bwo-select-value', className)}
      data-empty={value === null || undefined}
      {...props}
    >
      {label ?? placeholder}
    </span>
  );
});

export interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  radius?: Radius;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ className, children, radius, onClick, onKeyDown, ...props }, ref) {
    const { open, setOpen, triggerRef, triggerId, contentId, disabled } =
      useSelectContext('SelectTrigger');
    const setRef = (el: HTMLButtonElement | null) => {
      triggerRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as MutableRefObject<HTMLButtonElement | null>).current = el;
    };
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
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { className, children, sideOffset = 6, position: _position, ...props },
  ref,
) {
  const ctx = useSelectContext('SelectContent');
  const { open, setOpen, triggerRef, contentRef, triggerId, contentId, value, setValue, highlightedValue, setHighlightedValue } =
    ctx;
  const rect = useAnchorRect(triggerRef, open);
  const size = useFloatingSize(contentRef, open);
  const [pos, setPos] = useState<{ top: number; left: number; minWidth: number } | null>(null);

  useEffect(() => {
    if (!open || !rect || size.width === 0) return;
    const p = computeFloating(rect, { width: rect.width, height: size.height || 200 }, {
      side: 'bottom',
      align: 'start',
      sideOffset,
    });
    setPos({ top: p.top, left: p.left, minWidth: rect.width });
  }, [open, rect, size, sideOffset]);

  useDismiss({
    enabled: open,
    refs: [contentRef, triggerRef],
    onDismiss: () => setOpen(false),
  });

  const itemsRef = useRef<Array<{ value: string; disabled: boolean }>>([]);
  const [_, force] = useState(0);
  const bump = useCallback(() => force((n) => n + 1), []);
  const registry = useMemo(() => ({ items: itemsRef, bump }), [bump]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      contentRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [open, contentRef]);

  const setRef = (el: HTMLDivElement | null) => {
    (contentRef as MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const moveHighlight = (delta: number) => {
    const items = itemsRef.current.filter((i) => !i.disabled);
    if (items.length === 0) return;
    const currentIndex = items.findIndex((i) => i.value === highlightedValue);
    const nextIndex =
      currentIndex === -1
        ? delta > 0
          ? 0
          : items.length - 1
        : (currentIndex + delta + items.length) % items.length;
    setHighlightedValue(items[nextIndex]!.value);
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
      const items = itemsRef.current.filter((i) => !i.disabled);
      if (items.length > 0) setHighlightedValue(items[0]!.value);
    } else if (event.key === 'End') {
      event.preventDefault();
      const items = itemsRef.current.filter((i) => !i.disabled);
      if (items.length > 0) setHighlightedValue(items[items.length - 1]!.value);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (highlightedValue !== null) {
        setValue(highlightedValue);
        setOpen(false);
        triggerRef.current?.focus();
      }
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

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
              aria-activedescendant={
                highlightedValue ? `${contentId}-opt-${highlightedValue}` : undefined
              }
              tabIndex={-1}
              data-state={state}
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
              <div className="bwo-select-viewport">{children}</div>
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
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { value, disabled, className, children, ...props },
  ref,
) {
  const ctx = useSelectContext('SelectItem');
  const registry = useContext(SelectItemRegistryContext);
  const { contentId, value: selected, highlightedValue, setValue, setOpen, triggerRef, registerLabel, setHighlightedValue } =
    ctx;
  const isSelected = selected === value;
  const isHighlighted = highlightedValue === value;

  useEffect(() => {
    if (typeof children === 'string') registerLabel(value, children);
  }, [value, children, registerLabel]);

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
    setValue(value);
    setOpen(false);
    triggerRef.current?.focus();
  };

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
      className={cn('bwo-select-item', className)}
      onPointerDown={(event) => {
        event.preventDefault();
        onSelect();
      }}
      onPointerEnter={() => !disabled && setHighlightedValue(value)}
      {...props}
    >
      <span className="bwo-select-item-text">{children}</span>
      {isSelected && (
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
