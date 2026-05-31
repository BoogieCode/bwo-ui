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
  type ReactNode,
} from 'react';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;
  value: string[];
  toggle: (itemValue: string) => void;
  collapsible: boolean;
  disabled?: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(name: string): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <AccordionRoot>.`);
  return ctx;
}

const AccordionItemContext = createContext<{ value: string; disabled?: boolean } | null>(null);

function useAccordionItem(name: string) {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <AccordionItem>.`);
  return ctx;
}

export type AccordionRootProps =
  | ({
      type?: 'single';
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
      collapsible?: boolean;
      disabled?: boolean;
    } & Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>)
  | ({
      type: 'multiple';
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
      collapsible?: never;
      disabled?: boolean;
    } & Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>);

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(function AccordionRoot(
  props,
  ref,
) {
  const {
    type = 'single',
    collapsible = false,
    disabled,
    className,
    children,
    ...rest
  } = props as AccordionRootProps & { type: AccordionType };

  const isMultiple = type === 'multiple';

  const initialValue: string[] = (() => {
    if (isMultiple) return (props as { defaultValue?: string[] }).defaultValue ?? [];
    const v = (props as { defaultValue?: string }).defaultValue;
    return v ? [v] : [];
  })();
  const controlled = (() => {
    if (isMultiple) {
      const v = (props as { value?: string[] }).value;
      return v;
    }
    const v = (props as { value?: string }).value;
    return v !== undefined ? (v ? [v] : []) : undefined;
  })();
  const [internalValue, setInternalValue] = useState<string[]>(initialValue);
  const value = controlled ?? internalValue;
  const setValue = useCallback(
    (next: string[]) => {
      if (controlled === undefined) setInternalValue(next);
      if (isMultiple) {
        (props as { onValueChange?: (v: string[]) => void }).onValueChange?.(next);
      } else {
        const single = next[0] ?? '';
        if (single !== '' || collapsible)
          (props as { onValueChange?: (v: string) => void }).onValueChange?.(single);
      }
    },
    [controlled, isMultiple, collapsible, props],
  );

  const toggle = useCallback(
    (itemValue: string) => {
      if (isMultiple) {
        const isOpen = value.includes(itemValue);
        const next = isOpen ? value.filter((v) => v !== itemValue) : [...value, itemValue];
        setValue(next);
      } else {
        const isOpen = value.includes(itemValue);
        if (isOpen) {
          if (collapsible) setValue([]);
        } else {
          setValue([itemValue]);
        }
      }
    },
    [isMultiple, value, collapsible, setValue],
  );

  const ctx = useMemo<AccordionContextValue>(
    () => ({ type, value, toggle, collapsible, disabled }),
    [type, value, toggle, collapsible, disabled],
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div
        ref={ref}
        data-orientation="vertical"
        className={cn('bwo-accordion', className)}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, disabled, className, children, ...props },
  ref,
) {
  const { value: openValues } = useAccordionContext('AccordionItem');
  const open = openValues.includes(value);
  const itemCtx = useMemo(() => ({ value, disabled }), [value, disabled]);
  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        className={cn('bwo-accordion-item', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, onClick, ...props }, ref) {
    const { value, disabled } = useAccordionItem('AccordionTrigger');
    const { value: openValues, toggle, disabled: rootDisabled } =
      useAccordionContext('AccordionTrigger');
    const open = openValues.includes(value);
    const isDisabled = rootDisabled || disabled;
    const triggerId = useId();
    return (
      <h3 className="bwo-accordion-header">
        <button
          ref={ref}
          type="button"
          id={triggerId}
          aria-expanded={open}
          data-state={open ? 'open' : 'closed'}
          data-disabled={isDisabled || undefined}
          disabled={isDisabled}
          className={cn('bwo-accordion-trigger', className)}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented && !isDisabled) toggle(value);
          }}
          {...props}
        >
          <span>{children}</span>
          <span className="bwo-accordion-icon" aria-hidden />
        </button>
      </h3>
    );
  },
);

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, children, forceMount, ...props }, ref) {
    const { value } = useAccordionItem('AccordionContent');
    const { value: openValues } = useAccordionContext('AccordionContent');
    const open = openValues.includes(value);
    if (!open && !forceMount) return null;
    return (
      <div
        ref={ref}
        role="region"
        data-state={open ? 'open' : 'closed'}
        hidden={!open}
        className={cn('bwo-accordion-content', className)}
        {...props}
      >
        <div className="bwo-accordion-content-inner">{children}</div>
      </div>
    );
  },
);

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
