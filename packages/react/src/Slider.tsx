'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

export type SliderOrientation = 'horizontal' | 'vertical';

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'defaultValue' | 'onChange'> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  /** Called once with the final value when the user releases the thumb. */
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Larger step applied with Shift+Arrow / Page keys. Default: step × 10. */
  largeStep?: number;
  orientation?: SliderOrientation;
  disabled?: boolean;
  /** When true, the value direction is reversed. */
  inverted?: boolean;
  /** Accessible labels for each thumb. */
  'aria-label'?: string;
  /** Optional name attribute(s) on the underlying hidden inputs. */
  name?: string;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function snap(v: number, min: number, step: number): number {
  const steps = Math.round((v - min) / step);
  return min + steps * step;
}

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(function Slider(
  {
    value: controlledValue,
    defaultValue,
    onValueChange,
    onValueCommit,
    min = 0,
    max = 100,
    step = 1,
    largeStep,
    orientation = 'horizontal',
    disabled,
    inverted,
    className,
    name,
    ...props
  },
  ref,
) {
  const [values = [50], setValues] = useControllable<number[]>({
    value: controlledValue,
    defaultValue: defaultValue ?? [50],
    onChange: onValueChange,
  });
  const trackRef = useRef<HTMLSpanElement>(null);
  const draggingIndex = useRef<number | null>(null);
  const sliderId = useId();
  const [_, force] = useState(0);

  const computeFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const track = trackRef.current;
      if (!track) return null;
      const rect = track.getBoundingClientRect();
      let pct: number;
      if (orientation === 'horizontal') {
        pct = (clientX - rect.left) / rect.width;
      } else {
        pct = 1 - (clientY - rect.top) / rect.height;
      }
      if (inverted) pct = 1 - pct;
      pct = clamp(pct, 0, 1);
      const raw = min + pct * (max - min);
      return clamp(snap(raw, min, step), min, max);
    },
    [min, max, step, orientation, inverted],
  );

  const updateValue = (index: number, next: number) => {
    const updated = [...values];
    const sorted = [...updated].sort((a, b) => a - b);
    const lower = index > 0 ? sorted[index - 1] ?? min : min;
    const upper = index < sorted.length - 1 ? sorted[index + 1] ?? max : max;
    updated[index] = clamp(next, lower, upper);
    setValues(updated);
  };

  const onPointerDown = (index: number) => (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (disabled) return;
    event.preventDefault();
    (event.currentTarget as Element).setPointerCapture(event.pointerId);
    draggingIndex.current = index;
    const next = computeFromPointer(event.clientX, event.clientY);
    if (next !== null) updateValue(index, next);
    force((n) => n + 1);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (draggingIndex.current === null) return;
    const next = computeFromPointer(event.clientX, event.clientY);
    if (next !== null) updateValue(draggingIndex.current, next);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (draggingIndex.current === null) return;
    (event.currentTarget as Element).releasePointerCapture(event.pointerId);
    draggingIndex.current = null;
    onValueCommit?.(values);
  };

  const onTrackPointerDown = (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (disabled) return;
    const next = computeFromPointer(event.clientX, event.clientY);
    if (next === null) return;
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    for (let i = 0; i < values.length; i++) {
      const d = Math.abs(values[i]! - next);
      if (d < nearestDistance) {
        nearestDistance = d;
        nearestIndex = i;
      }
    }
    updateValue(nearestIndex, next);
    draggingIndex.current = nearestIndex;
    (event.currentTarget as Element).setPointerCapture(event.pointerId);
  };

  const onKeyDown = (index: number) => (event: React.KeyboardEvent) => {
    if (disabled) return;
    const big = largeStep ?? step * 10;
    let delta = 0;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp')
      delta = event.shiftKey ? big : step;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown')
      delta = event.shiftKey ? -big : -step;
    else if (event.key === 'PageUp') delta = big;
    else if (event.key === 'PageDown') delta = -big;
    else if (event.key === 'Home') {
      event.preventDefault();
      updateValue(index, min);
      onValueCommit?.(values);
      return;
    } else if (event.key === 'End') {
      event.preventDefault();
      updateValue(index, max);
      onValueCommit?.(values);
      return;
    } else return;
    event.preventDefault();
    updateValue(index, values[index]! + (inverted ? -delta : delta));
    onValueCommit?.(values);
  };

  // Recompute thumb offsets on every render (avoid layout flash on resize).
  const valueToPct = (v: number) => ((v - min) / (max - min || 1)) * 100;
  const sorted = [...values].sort((a, b) => a - b);
  const rangeStart = sorted[0] ?? min;
  const rangeEnd = sorted[sorted.length - 1] ?? max;
  const startPct = valueToPct(rangeStart);
  const endPct = valueToPct(rangeEnd);

  // mark force as intentionally read (suppress unused-var lint without changing behavior)
  useEffect(() => void _, [_]);

  return (
    <span
      ref={ref}
      role="group"
      data-orientation={orientation}
      data-disabled={disabled || undefined}
      className={cn('bwo-slider', className)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      {...props}
    >
      <span
        ref={trackRef}
        className="bwo-slider-track"
        onPointerDown={onTrackPointerDown}
      >
        <span
          className="bwo-slider-range"
          style={
            orientation === 'horizontal'
              ? inverted
                ? { right: `${startPct}%`, left: `${100 - endPct}%` }
                : { left: `${startPct}%`, right: `${100 - endPct}%` }
              : inverted
                ? { top: `${startPct}%`, bottom: `${100 - endPct}%` }
                : { bottom: `${startPct}%`, top: `${100 - endPct}%` }
          }
        />
      </span>
      {values.map((v, i) => {
        const pct = valueToPct(v);
        const style =
          orientation === 'horizontal'
            ? inverted
              ? { right: `${pct}%`, transform: 'translate(50%, -50%)' }
              : { left: `${pct}%`, transform: 'translate(-50%, -50%)' }
            : inverted
              ? { top: `${pct}%`, transform: 'translate(-50%, -50%)' }
              : { bottom: `${pct}%`, transform: 'translate(-50%, 50%)' };
        return (
          <span
            key={i}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={v}
            aria-orientation={orientation}
            aria-label={props['aria-label'] ?? `Value ${i + 1}`}
            id={`${sliderId}-thumb-${i}`}
            data-disabled={disabled || undefined}
            className="bwo-slider-thumb"
            style={style}
            onPointerDown={onPointerDown(i)}
            onKeyDown={onKeyDown(i)}
          />
        );
      })}
      {name &&
        values.map((v, i) => (
          <input
            key={i}
            type="hidden"
            name={values.length > 1 ? `${name}[${i}]` : name}
            value={v}
          />
        ))}
    </span>
  );
});
