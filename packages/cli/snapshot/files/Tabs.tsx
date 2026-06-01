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
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

interface TabsContextValue {
  value: string | null;
  setValue: (value: string) => void;
  baseId: string;
  orientation: 'horizontal' | 'vertical';
  activationMode: 'automatic' | 'manual';
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(name: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <TabsRoot>.`);
  return ctx;
}

export interface TabsRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  /** Automatic activates on focus; manual requires Enter/Space. Default: 'automatic'. */
  activationMode?: 'automatic' | 'manual';
}

export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(function TabsRoot(
  {
    value: controlledValue,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    activationMode = 'automatic',
    className,
    children,
    ...props
  },
  ref,
) {
  const baseId = useId();
  const [value = null, setValue] = useControllable<string | null>({
    value: controlledValue,
    defaultValue: defaultValue ?? null,
    onChange: (next) => {
      if (next !== null) onValueChange?.(next);
    },
  });
  const ctx = useMemo<TabsContextValue>(
    () => ({ value, setValue: (v) => setValue(v), baseId, orientation, activationMode }),
    [value, setValue, baseId, orientation, activationMode],
  );
  return (
    <TabsContext.Provider value={ctx}>
      <div
        ref={ref}
        data-orientation={orientation}
        className={cn('bwo-tabs', className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /** Loop arrow-key navigation around the ends. Default: true. */
  loop?: boolean;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, loop = true, onKeyDown, children, ...props },
  ref,
) {
  const { orientation, setValue, activationMode } = useTabs('TabsList');
  const listRef = useRef<HTMLDivElement | null>(null);
  const setRef = (el: HTMLDivElement | null) => {
    listRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    const el = listRef.current;
    if (!el) return;
    const triggers = Array.from(
      el.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (triggers.length === 0) return;
    const currentIndex = triggers.indexOf(document.activeElement as HTMLButtonElement);
    const nextKey =
      orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const prevKey =
      orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    let nextIndex: number | null = null;
    if (event.key === nextKey) {
      nextIndex = currentIndex + 1;
    } else if (event.key === prevKey) {
      nextIndex = currentIndex - 1;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = triggers.length - 1;
    } else return;
    event.preventDefault();
    if (nextIndex < 0) nextIndex = loop ? triggers.length - 1 : 0;
    if (nextIndex >= triggers.length) nextIndex = loop ? 0 : triggers.length - 1;
    const target = triggers[nextIndex]!;
    target.focus();
    if (activationMode === 'automatic') {
      const value = target.getAttribute('data-value');
      if (value) setValue(value);
    }
  };

  return (
    <div
      ref={setRef}
      role="tablist"
      aria-orientation={orientation}
      className={cn('bwo-tabs-list', className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
});

export interface TabsTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { value, className, onClick, ...props },
  ref,
) {
  const { value: selected, setValue, baseId } = useTabs('TabsTrigger');
  const active = selected === value;
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${baseId}-trigger-${value}`}
      aria-selected={active}
      aria-controls={`${baseId}-content-${value}`}
      data-state={active ? 'active' : 'inactive'}
      data-value={value}
      tabIndex={active ? 0 : -1}
      className={cn('bwo-tabs-trigger', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setValue(value);
      }}
      {...props}
    />
  );
});

export interface TabsContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: string;
  /** When true, content remains mounted even when inactive. */
  forceMount?: boolean;
  children?: ReactNode;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { value, forceMount, className, children, ...props },
  ref,
) {
  const { value: selected, baseId } = useTabs('TabsContent');
  const active = selected === value;
  if (!active && !forceMount) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-content-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      data-state={active ? 'active' : 'inactive'}
      tabIndex={0}
      hidden={!active}
      className={cn('bwo-tabs-content', className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
