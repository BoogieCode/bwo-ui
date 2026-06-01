'use client';

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  optional?: boolean;
  required?: boolean;
  /** Used as the `htmlFor` on the label and `id` on the first child control. */
  id?: string;
  children: ReactNode;
}

/**
 * Lays out a label, control, hint, and error consistently.
 *
 * ```tsx
 * <FormField label="Email" hint="We'll never share it." required>
 *   <Input type="email" placeholder="you@boogie.ro" />
 * </FormField>
 * ```
 *
 * The id is auto-generated if you don't pass one, and applied to the first
 * child via `cloneElement` so the label/control association works without
 * boilerplate.
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  { label, hint, error, optional, required, id, className, children, ...props },
  ref,
) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  // Attach id + a11y attrs to the first valid React-element child.
  const enhancedChildren = Children.map(children, (child, index) => {
    if (index !== 0 || !isValidElement(child)) return child;
    const childProps = child.props as Record<string, unknown>;
    return cloneElement(child as ReactElement<Record<string, unknown>>, {
      id: (childProps.id as string | undefined) ?? controlId,
      'aria-describedby': describedBy,
      'aria-invalid':
        (childProps['aria-invalid'] as boolean | undefined) ?? (error ? true : undefined),
      ...((childProps as { required?: boolean }).required === undefined && required
        ? { required: true }
        : {}),
    });
  });

  return (
    <div ref={ref} className={cn('bwo-form-field', className)} {...props}>
      {(label || optional) && (
        <div className="bwo-form-field-label-row">
          {label && (
            <label className="bwo-label" htmlFor={controlId}>
              {label}
              {required && (
                <span aria-hidden style={{ color: 'var(--bwo-red)', marginLeft: 2 }}>
                  *
                </span>
              )}
            </label>
          )}
          {optional && !required && <span className="bwo-form-field-optional">Optional</span>}
        </div>
      )}
      {enhancedChildren}
      {hint && !error && (
        <span id={hintId} className="bwo-form-field-hint">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className="bwo-form-field-error">
          {error}
        </span>
      )}
    </div>
  );
});
