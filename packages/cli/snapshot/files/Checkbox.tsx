'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

export type CheckedState = boolean | 'indeterminate';

export interface CheckboxProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'checked' | 'defaultChecked' | 'onChange' | 'value'> {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  /** Form value attribute (becomes the value of the underlying hidden input). */
  value?: string;
  /** Form name for the underlying hidden input. */
  name?: string;
  /** Required flag for form validation. */
  required?: boolean;
}

function stateToString(state: CheckedState): 'checked' | 'unchecked' | 'indeterminate' {
  if (state === 'indeterminate') return 'indeterminate';
  return state ? 'checked' : 'unchecked';
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  {
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    className,
    onClick,
    onKeyDown,
    value = 'on',
    name,
    required,
    ...props
  },
  ref,
) {
  const [state = false, setState] = useControllable<CheckedState>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange: onCheckedChange,
  });
  const checkedBool = state === true;
  const indeterminate = state === 'indeterminate';

  const toggle = () => {
    if (disabled) return;
    setState(indeterminate || !checkedBool);
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checkedBool}
        aria-required={required || undefined}
        data-state={stateToString(state)}
        data-disabled={disabled || undefined}
        disabled={disabled}
        className={cn('bwo-checkbox', className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggle();
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === 'Enter') event.preventDefault();
        }}
        {...props}
      >
        {(checkedBool || indeterminate) && (
          <span className="bwo-checkbox-indicator" data-state={stateToString(state)}>
            {indeterminate ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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
      </button>
      {name && (
        <input
          type="checkbox"
          tabIndex={-1}
          aria-hidden
          name={name}
          value={value}
          checked={checkedBool}
          required={required}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', margin: 0, width: 1, height: 1 }}
          onChange={() => {
            // controlled by the button
          }}
        />
      )}
    </>
  );
});
