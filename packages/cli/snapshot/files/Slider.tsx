'use client';

import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

export type SliderOrientation = 'horizontal' | 'vertical';
export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderVariant = 'primary' | 'green' | 'yellow' | 'red';
export type SliderTooltipMode = 'never' | 'drag' | 'always';

/** A tick on the slider track. Pass a number for an unlabelled mark, or an object for a labelled one. */
export type SliderMark = number | { value: number; label?: ReactNode };

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
  /** Track + thumb scale — `sm` (3 / 14 px) / `md` (5 / 20 px, default) / `lg` (7 / 26 px). */
  size?: SliderSize;
  /** Range fill colour. */
  variant?: SliderVariant;
  /** Tick marks along the track. Pass numbers or `{ value, label }` objects. */
  marks?: SliderMark[];
  /** When and whether to show a value tooltip above the thumb. `'drag'` = while dragging. */
  tooltip?: SliderTooltipMode;
  /** Optional formatter for the tooltip and aria-valuetext. Defaults to `String(value)`. */
  formatValue?: (value: number) => ReactNode;
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
    size = 'md',
    variant = 'primary',
    marks,
    tooltip = 'never',
    formatValue,
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
  // Tracks which thumb is currently focused or being dragged — drives the
  // tooltip visibility for `tooltip="drag"` and the `data-active` attribute.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sliderId = useId();

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

  // For multi-thumb ranges, each thumb's movement is bounded by its nearest
  // neighbours so identities never cross. The old implementation sorted the
  // values array and then indexed into it with the *unsorted* index — which
  // only happened to work when the caller passed values in sorted order. For
  // values like [70, 30], moving thumb 0 would clamp against sorted[1] = 70
  // (its own value) and refuse to move.
  //
  // The fix walks the other thumbs and picks the largest one strictly below
  // (or equal-with-smaller-index, to keep order stable when two thumbs sit on
  // top of each other) as the lower bound, and the smallest one strictly
  // above (or equal-with-larger-index) as the upper bound.
  const updateValue = (index: number, next: number) => {
    const myValue = values[index];
    if (myValue === undefined) return;
    let lower = min;
    let upper = max;
    for (let i = 0; i < values.length; i++) {
      if (i === index) continue;
      const v = values[i]!;
      const isBelow = v < myValue || (v === myValue && i < index);
      const isAbove = v > myValue || (v === myValue && i > index);
      if (isBelow && v > lower) lower = v;
      if (isAbove && v < upper) upper = v;
    }
    const updated = [...values];
    updated[index] = clamp(next, lower, upper);
    setValues(updated);
  };

  const onPointerDown = (index: number) => (event: ReactPointerEvent<HTMLSpanElement>) => {
    if (disabled) return;
    event.preventDefault();
    (event.currentTarget as Element).setPointerCapture(event.pointerId);
    draggingIndex.current = index;
    setActiveIndex(index);
    const next = computeFromPointer(event.clientX, event.clientY);
    if (next !== null) updateValue(index, next);
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
    setActiveIndex(null);
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
    setActiveIndex(nearestIndex);
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

  const formatTooltip = (v: number): ReactNode => (formatValue ? formatValue(v) : String(v));

  // Normalise marks into `{ value, label }` objects so the renderer is uniform.
  const normalisedMarks = marks?.map((m) =>
    typeof m === 'number' ? { value: m } : m,
  );

  const isHorizontal = orientation === 'horizontal';

  return (
    <span
      ref={ref}
      role="group"
      data-orientation={orientation}
      data-disabled={disabled || undefined}
      className={cn(
        'bwo-slider',
        size !== 'md' && `bwo-slider--${size}`,
        variant !== 'primary' && `bwo-slider--${variant}`,
        normalisedMarks && normalisedMarks.length > 0 && 'bwo-slider--with-marks',
        className,
      )}
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
            isHorizontal
              ? inverted
                ? { right: `${startPct}%`, left: `${100 - endPct}%` }
                : { left: `${startPct}%`, right: `${100 - endPct}%` }
              : inverted
                ? { top: `${startPct}%`, bottom: `${100 - endPct}%` }
                : { bottom: `${startPct}%`, top: `${100 - endPct}%` }
          }
        />
        {normalisedMarks?.map((mark) => {
          const pct = valueToPct(mark.value);
          if (pct < 0 || pct > 100) return null;
          const isActive = mark.value >= rangeStart && mark.value <= rangeEnd;
          const markStyle = isHorizontal
            ? inverted
              ? { right: `${pct}%` }
              : { left: `${pct}%` }
            : inverted
              ? { top: `${pct}%` }
              : { bottom: `${pct}%` };
          return (
            <span
              key={mark.value}
              className="bwo-slider-mark"
              data-active={isActive || undefined}
              style={markStyle}
              aria-hidden
            >
              {mark.label !== undefined && (
                <span className="bwo-slider-mark-label">{mark.label}</span>
              )}
            </span>
          );
        })}
      </span>
      {values.map((v, i) => {
        const pct = valueToPct(v);
        // Cross-axis pin (`top: 50%` for horizontal, `left: 50%` for vertical)
        // keeps the absolutely-positioned thumb centred on the track; the
        // translate(...) places the thumb *centre* exactly at the percentage.
        const style: React.CSSProperties = isHorizontal
          ? inverted
            ? { right: `${pct}%`, top: '50%', transform: 'translate(50%, -50%)' }
            : { left: `${pct}%`, top: '50%', transform: 'translate(-50%, -50%)' }
          : inverted
            ? { top: `${pct}%`, left: '50%', transform: 'translate(-50%, -50%)' }
            : { bottom: `${pct}%`, left: '50%', transform: 'translate(-50%, 50%)' };
        const showTooltip =
          tooltip === 'always' || (tooltip === 'drag' && activeIndex === i);
        return (
          <span
            key={i}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={v}
            aria-valuetext={formatValue ? String(formatValue(v)) : undefined}
            aria-orientation={orientation}
            aria-label={props['aria-label'] ?? `Value ${i + 1}`}
            id={`${sliderId}-thumb-${i}`}
            data-disabled={disabled || undefined}
            data-active={activeIndex === i || undefined}
            className="bwo-slider-thumb"
            style={style}
            onPointerDown={onPointerDown(i)}
            onKeyDown={onKeyDown(i)}
            onFocus={() => setActiveIndex(i)}
            onBlur={() => setActiveIndex(null)}
          >
            {tooltip !== 'never' && (
              <span
                className="bwo-slider-tooltip"
                data-visible={showTooltip || undefined}
                aria-hidden
              >
                {formatTooltip(v)}
              </span>
            )}
          </span>
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
