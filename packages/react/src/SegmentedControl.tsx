'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

export interface SegmentedOption<V extends string = string> {
  value: V;
  label: ReactNode;
  /** Optional leading icon. */
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<V extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentedOption<V>[];
  /** Currently selected value. Pass `undefined` for the uncontrolled case. */
  value?: V;
  /** Default (uncontrolled). */
  defaultValue?: V;
  onValueChange?: (value: V) => void;
  /** Accessible group label. */
  'aria-label'?: string;
  size?: SegmentedControlSize;
  /** Full-width vs hug content. Default: `false`. */
  fullWidth?: boolean;
}

const sizeStyles: Record<SegmentedControlSize, { padY: number; padX: number; fontSize: number; height: number }> = {
  sm: { padY: 4, padX: 10, fontSize: 12.5, height: 28 },
  md: { padY: 6, padX: 14, fontSize: 13.5, height: 34 },
  lg: { padY: 8, padX: 18, fontSize: 15, height: 40 },
};

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps<string>>(
  function SegmentedControl(
    {
      options,
      value,
      defaultValue,
      onValueChange,
      size = 'md',
      fullWidth = false,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const groupId = useId();
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string>(
      defaultValue ?? options[0]?.value ?? '',
    );
    const active = isControlled ? value : internal;
    const ss = sizeStyles[size];

    const wrapRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(
      null,
    );

    useIsomorphicLayoutEffect(() => {
      const el = itemRefs.current[active ?? ''];
      const wrap = wrapRef.current;
      if (!el || !wrap) return;
      const r = el.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      setIndicator({ left: r.left - w.left, width: r.width });
    }, [active, options.length, size, fullWidth]);

    const select = (next: string) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    return (
      <div
        ref={(node) => {
          wrapRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="radiogroup"
        className={cn('bwo-segmented', className)}
        style={{
          position: 'relative',
          display: fullWidth ? 'grid' : 'inline-flex',
          gridTemplateColumns: fullWidth ? `repeat(${options.length}, 1fr)` : undefined,
          padding: 3,
          gap: 2,
          background: 'var(--bwo-grey-4)',
          border: '1px solid var(--bwo-border)',
          borderRadius: 9999,
          height: ss.height,
          fontFamily: 'inherit',
          ...style,
        }}
        {...rest}
      >
        {indicator && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: 3,
              bottom: 3,
              left: indicator.left,
              width: indicator.width,
              borderRadius: 9999,
              background: 'var(--bwo-surface)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
              transition: 'left 0.22s cubic-bezier(0.16, 1, 0.3, 1), width 0.22s ease',
              zIndex: 0,
            }}
          />
        )}
        {options.map((opt) => {
          const isActive = opt.value === active;
          return (
            <button
              key={opt.value}
              ref={(node) => {
                itemRefs.current[opt.value] = node;
              }}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-disabled={opt.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !opt.disabled && select(opt.value)}
              onKeyDown={(e) => {
                if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
                e.preventDefault();
                const idx = options.findIndex((o) => o.value === active);
                const dir = e.key === 'ArrowRight' ? 1 : -1;
                let next = idx;
                for (let i = 0; i < options.length; i++) {
                  next = (next + dir + options.length) % options.length;
                  if (!options[next]!.disabled) break;
                }
                const nextValue = options[next]!.value;
                select(nextValue);
                itemRefs.current[nextValue]?.focus();
              }}
              disabled={opt.disabled}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: `${ss.padY}px ${ss.padX}px`,
                background: 'transparent',
                border: 0,
                color: isActive ? 'var(--bwo-text)' : 'var(--bwo-text-body)',
                fontFamily: 'inherit',
                fontWeight: isActive ? 600 : 500,
                fontSize: ss.fontSize,
                lineHeight: 1,
                borderRadius: 9999,
                cursor: opt.disabled ? 'not-allowed' : 'pointer',
                opacity: opt.disabled ? 0.5 : 1,
                whiteSpace: 'nowrap',
                zIndex: 1,
                transition: 'color 0.2s ease',
              }}
              data-segmented-id={`${groupId}-${opt.value}`}
            >
              {opt.icon && <span style={{ display: 'inline-flex' }}>{opt.icon}</span>}
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  },
) as <V extends string>(p: SegmentedControlProps<V> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;
