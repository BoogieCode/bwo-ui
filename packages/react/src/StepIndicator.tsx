'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export interface StepIndicatorItem {
  label: ReactNode;
  description?: ReactNode;
  /** Optional leading icon for the dot. Falls back to the step number. */
  icon?: ReactNode;
  disabled?: boolean;
}

export interface StepIndicatorProps extends HTMLAttributes<HTMLOListElement> {
  steps: StepIndicatorItem[];
  /** Zero-indexed current step. */
  current: number;
  /** Layout direction. Default: `'horizontal'`. */
  orientation?: 'horizontal' | 'vertical';
  /** Visual variant. Default: `'numbered'`. */
  variant?: 'numbered' | 'dots';
  /** Fires when a clickable step is activated. Disabled steps don't fire. */
  onStepSelect?: (index: number) => void;
}

const Check = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 12l5 5L20 7"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StepIndicator = forwardRef<HTMLOListElement, StepIndicatorProps>(
  function StepIndicator(
    {
      steps,
      current,
      orientation = 'horizontal',
      variant = 'numbered',
      onStepSelect,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const isHorizontal = orientation === 'horizontal';
    return (
      <ol
        ref={ref}
        className={cn('bwo-step-indicator', `bwo-step-indicator--${orientation}`, className)}
        style={{
          display: isHorizontal ? 'flex' : 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: isHorizontal ? 'flex-start' : 'stretch',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: isHorizontal ? 0 : 4,
          ...style,
        }}
        {...rest}
      >
        {steps.map((step, i) => {
          const isDone = i < current;
          const isActive = i === current;
          const isLast = i === steps.length - 1;
          const clickable = !step.disabled && i <= current && !!onStepSelect;
          const dotBg = isDone ? 'var(--bwo-text)' : isActive ? 'var(--bwo-text)' : 'var(--bwo-grey-4)';
          const dotColor = isDone || isActive ? 'var(--bwo-surface)' : 'var(--bwo-text-body)';
          const dotSize = variant === 'dots' ? 12 : 26;
          return (
            <li
              key={i}
              style={{
                flex: isHorizontal ? 1 : 'initial',
                display: 'flex',
                flexDirection: isHorizontal ? 'column' : 'row',
                alignItems: isHorizontal ? 'center' : 'flex-start',
                gap: isHorizontal ? 8 : 14,
                minWidth: 0,
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: isHorizontal ? 'row' : 'column',
                  alignItems: 'center',
                  gap: 0,
                  width: isHorizontal ? '100%' : 'auto',
                  position: 'relative',
                }}
              >
                <button
                  type="button"
                  onClick={() => clickable && onStepSelect?.(i)}
                  disabled={!clickable}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Step ${i + 1}${step.disabled ? ' (disabled)' : ''}`}
                  style={{
                    width: dotSize,
                    height: dotSize,
                    borderRadius: '50%',
                    background: dotBg,
                    color: dotColor,
                    border: 0,
                    padding: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: variant === 'dots' ? 0 : 12,
                    fontWeight: 700,
                    cursor: clickable ? 'pointer' : 'default',
                    fontFamily: 'inherit',
                    transition: 'background-color 0.18s ease, color 0.18s ease',
                    flex: '0 0 auto',
                    boxShadow: isActive ? '0 0 0 3px rgba(255, 72, 31, 0.18)' : undefined,
                  }}
                >
                  {variant === 'numbered'
                    ? isDone
                      ? Check
                      : (step.icon ?? i + 1)
                    : null}
                </button>
                {!isLast && (
                  <span
                    aria-hidden
                    style={{
                      flex: 1,
                      background: i < current ? 'var(--bwo-text)' : 'var(--bwo-border)',
                      transition: 'background-color 0.2s ease',
                      ...(isHorizontal
                        ? { height: 2, marginInline: 8 }
                        : { width: 2, height: 24, marginBlock: 4, marginLeft: dotSize / 2 - 1 }),
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  textAlign: isHorizontal ? 'center' : 'left',
                  flex: isHorizontal ? undefined : 1,
                  paddingBottom: isHorizontal ? 0 : 12,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive || isDone ? 'var(--bwo-text)' : 'var(--bwo-text-body)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span style={{ fontSize: 11.5, color: 'var(--bwo-text-body)' }}>
                    {step.description}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  },
);
