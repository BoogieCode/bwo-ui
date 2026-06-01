'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

interface RadioGroupContextValue {
  value: string | null;
  setValue: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  orientation: 'horizontal' | 'vertical';
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup(name: string): RadioGroupContextValue {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <RadioGroupRoot>.`);
  return ctx;
}

export interface RadioGroupRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>(
  function RadioGroupRoot(
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      name,
      disabled,
      required,
      orientation = 'vertical',
      className,
      children,
      ...props
    },
    ref,
  ) {
    const [value = null, setValue] = useControllable<string | null>({
      value: controlledValue,
      defaultValue: defaultValue ?? null,
      onChange: (next) => {
        if (next !== null) onValueChange?.(next);
      },
    });
    const ctx = useMemo<RadioGroupContextValue>(
      () => ({ value, setValue: (v) => setValue(v), name, disabled, required, orientation }),
      [value, setValue, name, disabled, required, orientation],
    );
    return (
      <RadioGroupContext.Provider value={ctx}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          aria-required={required || undefined}
          data-orientation={orientation}
          data-disabled={disabled || undefined}
          className={cn('bwo-radio-group', className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

export interface RadioGroupItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: string;
}

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  function RadioGroupItem({ value, disabled: itemDisabled, className, onClick, ...rest }, ref) {
    const ctx = useRadioGroup('RadioGroupItem');
    const id = useId();
    const checked = ctx.value === value;
    const isDisabled = ctx.disabled || itemDisabled;
    return (
      <>
        <button
          ref={ref}
          type="button"
          role="radio"
          aria-checked={checked}
          data-state={checked ? 'checked' : 'unchecked'}
          data-disabled={isDisabled || undefined}
          disabled={isDisabled}
          id={id}
          className={cn('bwo-radio', className)}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented && !isDisabled) ctx.setValue(value);
          }}
          {...rest}
        >
          <span
            className="bwo-radio-indicator"
            data-state={checked ? 'checked' : 'unchecked'}
            aria-hidden
          />
        </button>
        {ctx.name && (
          <input
            type="radio"
            tabIndex={-1}
            aria-hidden
            name={ctx.name}
            value={value}
            checked={checked}
            required={ctx.required}
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', margin: 0, width: 1, height: 1 }}
            onChange={() => {
              /* controlled by the button */
            }}
          />
        )}
      </>
    );
  },
);

export const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
};
