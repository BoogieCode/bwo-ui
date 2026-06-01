'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from './utils';
import {
  computeFloating,
  useAnchorRect,
  useFloatingSize,
} from './internal/floating';

export interface ComboboxOption {
  value: string;
  label: string;
  /** Optional supporting text shown under the label. */
  description?: string;
  disabled?: boolean;
}

export interface ComboboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'defaultValue'> {
  /** Selected option value (controlled). */
  value?: string | null;
  /** Default selected value (uncontrolled). */
  defaultValue?: string | null;
  /** Called when selection changes. */
  onValueChange?: (value: string | null) => void;
  /** Available options. */
  options: ComboboxOption[];
  /** Custom filter. Default: substring match on label, case-insensitive. */
  filter?: (option: ComboboxOption, query: string) => boolean;
  /** Render when no options match. Default: a plain "No results" row. */
  emptyState?: ReactNode;
  /** Open state (controlled). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const defaultFilter = (option: ComboboxOption, query: string) =>
  option.label.toLowerCase().includes(query.toLowerCase());

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    value: controlledValue,
    defaultValue = null,
    onValueChange,
    options,
    filter = defaultFilter,
    emptyState,
    open: controlledOpen,
    onOpenChange,
    placeholder = 'Select…',
    className,
    onFocus,
    onKeyDown,
    ...inputProps
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const selected = options.find((o) => o.value === value) ?? null;
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
  const [listEl, setListEl] = useState<HTMLDivElement | null>(null);
  const listboxId = useId();

  const filtered = useMemo(
    () => (query ? options.filter((o) => filter(o, query)) : options),
    [options, query, filter],
  );

  useEffect(() => {
    if (!open) {
      setQuery('');
    } else {
      setActiveIndex(0);
    }
  }, [open]);

  const rect = useAnchorRect(inputEl, open);
  const size = useFloatingSize(listEl, open);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    if (!open || !rect) return;
    const p = computeFloating(rect, { width: rect.width, height: size.height || 200 }, {
      side: 'bottom',
      align: 'start',
      sideOffset: 4,
    });
    setPos({ top: p.top, left: p.left, width: rect.width });
  }, [open, rect, size]);

  const selectValue = useCallback(
    (next: string | null) => {
      if (controlledValue === undefined) setInternalValue(next);
      onValueChange?.(next);
      setOpen(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [controlledValue, onValueChange, setOpen],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (inputEl?.contains(t)) return;
      if (listEl?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, setOpen, inputEl, listEl]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      if (open && filtered[activeIndex]) {
        e.preventDefault();
        const opt = filtered[activeIndex]!;
        if (!opt.disabled) selectValue(opt.value);
      }
    } else if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
    } else if (e.key === 'Tab') {
      if (open) setOpen(false);
    }
  };

  const displayValue = open ? query : (selected?.label ?? '');

  return (
    <>
      <input
        ref={(el) => {
          inputRef.current = el;
          setInputEl(el);
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }}
        role="combobox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={open && filtered[activeIndex] ? `${listboxId}-opt-${activeIndex}` : undefined}
        autoComplete="off"
        placeholder={placeholder}
        value={displayValue}
        className={cn('bwo-input', 'bwo-combobox-input', className)}
        onFocus={(e) => {
          onFocus?.(e);
          setOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          if (!open) setOpen(true);
          setActiveIndex(0);
        }}
        onKeyDown={handleKeyDown}
        {...inputProps}
      />
      {open && typeof document !== 'undefined' && pos &&
        createPortal(
          <div
            ref={setListEl}
            id={listboxId}
            role="listbox"
            data-bwo-floating=""
            className="bwo-combobox-listbox"
            style={{
              position: 'fixed',
              top: pos.top,
              left: pos.left,
              width: pos.width,
            }}
          >
            {filtered.length === 0 ? (
              <div className="bwo-combobox-empty">{emptyState ?? 'No results'}</div>
            ) : (
              filtered.map((opt, i) => {
                const isActive = i === activeIndex;
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    id={`${listboxId}-opt-${i}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled || undefined}
                    data-active={isActive || undefined}
                    data-disabled={opt.disabled || undefined}
                    className="bwo-combobox-option"
                    onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      if (!opt.disabled) selectValue(opt.value);
                    }}
                  >
                    <span className="bwo-combobox-option-label">{opt.label}</span>
                    {opt.description && (
                      <span className="bwo-combobox-option-desc">{opt.description}</span>
                    )}
                    {isSelected && (
                      <svg
                        className="bwo-combobox-option-check"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M5 12l5 5L20 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                );
              })
            )}
          </div>,
          document.body,
        )}
    </>
  );
});
