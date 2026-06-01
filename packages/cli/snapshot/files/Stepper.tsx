'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type StepperOrientation = 'horizontal' | 'vertical';

export interface StepperContextValue {
  activeStep: number;
  orientation: StepperOrientation;
  linear: boolean;
}

const StepperContext = createContext<StepperContextValue | null>(null);

function useStepper(): StepperContextValue {
  const ctx = useContext(StepperContext);
  if (!ctx) throw new Error('Stepper subcomponents must be rendered inside <Stepper>.');
  return ctx;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Zero-based index of the active step. */
  activeStep: number;
  orientation?: StepperOrientation;
  /** When true, future steps can't be jumped to from a triggered step indicator. */
  linear?: boolean;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  { activeStep, orientation = 'horizontal', linear = true, className, children, ...props },
  ref,
) {
  const value = useMemo<StepperContextValue>(
    () => ({ activeStep, orientation, linear }),
    [activeStep, orientation, linear],
  );
  return (
    <StepperContext.Provider value={value}>
      <div
        ref={ref}
        className={cn('bwo-stepper', `bwo-stepper--${orientation}`, className)}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
});

export type StepStatus = 'completed' | 'active' | 'pending' | 'error';

export interface StepProps extends HTMLAttributes<HTMLDivElement> {
  /** Zero-based index for this step. */
  index: number;
  /** Label text or node shown next to the indicator. */
  label?: ReactNode;
  /** Optional supporting text under the label. */
  description?: ReactNode;
  /** Custom indicator content (overrides the default number/checkmark). */
  icon?: ReactNode;
  /** Force a status (otherwise derived from activeStep). */
  status?: StepStatus;
  /** When true, clicking the step calls `onActivate`. */
  clickable?: boolean;
  onActivate?: (index: number) => void;
}

export const Step = forwardRef<HTMLDivElement, StepProps>(function Step(
  {
    index,
    label,
    description,
    icon,
    status: statusProp,
    clickable,
    onActivate,
    className,
    children,
    ...props
  },
  ref,
) {
  const { activeStep, linear } = useStepper();
  const status: StepStatus =
    statusProp ??
    (index < activeStep ? 'completed' : index === activeStep ? 'active' : 'pending');
  const canActivate = clickable && (!linear || status !== 'pending');

  const indicator = icon ?? (
    status === 'completed' ? (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12l5 5L20 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <span>{index + 1}</span>
    )
  );

  const Indicator = canActivate ? 'button' : 'div';

  return (
    <div
      ref={ref}
      className={cn('bwo-step', `bwo-step--${status}`, className)}
      data-status={status}
      data-step={index}
      {...props}
    >
      <Indicator
        {...(canActivate
          ? {
              type: 'button' as const,
              onClick: () => onActivate?.(index),
              'aria-current': status === 'active' ? ('step' as const) : undefined,
            }
          : { 'aria-current': status === 'active' ? ('step' as const) : undefined })}
        className="bwo-step-indicator"
      >
        {indicator}
      </Indicator>
      {(label || description) && (
        <div className="bwo-step-content">
          {label && <div className="bwo-step-label">{label}</div>}
          {description && <div className="bwo-step-desc">{description}</div>}
          {children}
        </div>
      )}
    </div>
  );
});

export interface StepConnectorProps extends HTMLAttributes<HTMLDivElement> {}

export const StepConnector = forwardRef<HTMLDivElement, StepConnectorProps>(
  function StepConnector({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn('bwo-step-connector', className)}
        {...props}
      />
    );
  },
);
