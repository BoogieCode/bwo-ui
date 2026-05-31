'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'checked' | 'defaultChecked' | 'onChange' | 'value'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  required?: boolean;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    className,
    onClick,
    name,
    value = 'on',
    required,
    ...props
  },
  ref,
) {
  const [state = false, setState] = useControllable<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange: onCheckedChange,
  });
  const toggle = () => {
    if (disabled) return;
    setState(!state);
  };
  return (
    <>
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={state}
        aria-required={required || undefined}
        data-state={state ? 'checked' : 'unchecked'}
        data-disabled={disabled || undefined}
        disabled={disabled}
        className={cn('bwo-switch', className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggle();
        }}
        {...props}
      >
        <span className="bwo-switch-thumb" data-state={state ? 'checked' : 'unchecked'} />
      </button>
      {name && (
        <input
          type="checkbox"
          tabIndex={-1}
          aria-hidden
          name={name}
          value={value}
          checked={state}
          required={required}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', margin: 0, width: 1, height: 1 }}
          onChange={() => {
            /* controlled by the button */
          }}
        />
      )}
    </>
  );
});
