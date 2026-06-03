import { computed, defineComponent, h, ref, toRef, type PropType } from 'vue';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

export type SliderOrientation = 'horizontal' | 'vertical';
export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderVariant = 'primary' | 'green' | 'yellow' | 'red';
export type SliderTooltipMode = 'never' | 'drag' | 'always';
export type SliderMark = number | { value: number; label?: string };

function clampN(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function snap(v: number, min: number, step: number): number {
  const steps = Math.round((v - min) / step);
  return min + steps * step;
}

export const Slider = defineComponent({
  name: 'Slider',
  inheritAttrs: true,
  props: {
    modelValue: { type: Array as PropType<number[]>, default: undefined },
    defaultValue: { type: Array as PropType<number[]>, default: () => [50] },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    largeStep: { type: Number, default: undefined },
    orientation: { type: String as PropType<SliderOrientation>, default: 'horizontal' },
    size: { type: String as PropType<SliderSize>, default: 'md' },
    variant: { type: String as PropType<SliderVariant>, default: 'primary' },
    marks: { type: Array as PropType<SliderMark[]>, default: undefined },
    tooltip: { type: String as PropType<SliderTooltipMode>, default: 'never' },
    formatValue: { type: Function as PropType<(v: number) => string>, default: undefined },
    disabled: { type: Boolean, default: false },
    inverted: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'value-commit'],
  setup(props, { attrs, emit }) {
    const values = useControllable<number[]>(
      toRef(props, 'modelValue'),
      props.defaultValue,
      (v) => emit('update:modelValue', v),
    );
    const trackRef = ref<HTMLElement | null>(null);
    const dragging = ref<number | null>(null);
    const activeIndex = ref<number | null>(null);

    const computeFromPointer = (clientX: number, clientY: number): number | null => {
      const track = trackRef.value;
      if (!track) return null;
      const rect = track.getBoundingClientRect();
      let pct: number;
      if (props.orientation === 'horizontal') {
        pct = (clientX - rect.left) / rect.width;
      } else {
        pct = 1 - (clientY - rect.top) / rect.height;
      }
      if (props.inverted) pct = 1 - pct;
      pct = clampN(pct, 0, 1);
      const raw = props.min + pct * (props.max - props.min);
      return clampN(snap(raw, props.min, props.step), props.min, props.max);
    };

    // For multi-thumb ranges, walk other thumbs to find the nearest lower /
    // upper neighbour. The previous implementation sorted the values array and
    // then indexed into it with the *unsorted* index — which only worked when
    // values were already passed in sorted order. For [70, 30], moving thumb 0
    // would clamp against sorted[1] = 70 (its own value) and refuse to move.
    const updateAt = (index: number, next: number) => {
      const current = values.value;
      const myValue = current[index];
      if (myValue === undefined) return;
      let lower = props.min;
      let upper = props.max;
      for (let i = 0; i < current.length; i++) {
        if (i === index) continue;
        const v = current[i]!;
        const isBelow = v < myValue || (v === myValue && i < index);
        const isAbove = v > myValue || (v === myValue && i > index);
        if (isBelow && v > lower) lower = v;
        if (isAbove && v < upper) upper = v;
      }
      const updated = [...current];
      updated[index] = clampN(next, lower, upper);
      values.value = updated;
    };

    const onThumbPointerDown = (i: number) => (event: PointerEvent) => {
      if (props.disabled) return;
      event.preventDefault();
      (event.currentTarget as Element).setPointerCapture(event.pointerId);
      dragging.value = i;
      activeIndex.value = i;
      const v = computeFromPointer(event.clientX, event.clientY);
      if (v !== null) updateAt(i, v);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (dragging.value === null) return;
      const v = computeFromPointer(event.clientX, event.clientY);
      if (v !== null) updateAt(dragging.value, v);
    };
    const onPointerUp = (event: PointerEvent) => {
      if (dragging.value === null) return;
      (event.currentTarget as Element).releasePointerCapture(event.pointerId);
      dragging.value = null;
      activeIndex.value = null;
      emit('value-commit', values.value);
    };
    const onTrackPointerDown = (event: PointerEvent) => {
      if (props.disabled) return;
      const v = computeFromPointer(event.clientX, event.clientY);
      if (v === null) return;
      let nearest = 0;
      let dist = Infinity;
      for (let i = 0; i < values.value.length; i++) {
        const d = Math.abs(values.value[i]! - v);
        if (d < dist) {
          dist = d;
          nearest = i;
        }
      }
      updateAt(nearest, v);
      dragging.value = nearest;
      activeIndex.value = nearest;
      (event.currentTarget as Element).setPointerCapture(event.pointerId);
    };
    const onThumbKeyDown = (i: number) => (event: KeyboardEvent) => {
      if (props.disabled) return;
      const big = props.largeStep ?? props.step * 10;
      let delta = 0;
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp')
        delta = event.shiftKey ? big : props.step;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown')
        delta = event.shiftKey ? -big : -props.step;
      else if (event.key === 'PageUp') delta = big;
      else if (event.key === 'PageDown') delta = -big;
      else if (event.key === 'Home') {
        event.preventDefault();
        updateAt(i, props.min);
        emit('value-commit', values.value);
        return;
      } else if (event.key === 'End') {
        event.preventDefault();
        updateAt(i, props.max);
        emit('value-commit', values.value);
        return;
      } else return;
      event.preventDefault();
      updateAt(i, values.value[i]! + (props.inverted ? -delta : delta));
      emit('value-commit', values.value);
    };

    const valueToPct = (v: number) => ((v - props.min) / (props.max - props.min || 1)) * 100;
    const sorted = computed(() => [...values.value].sort((a, b) => a - b));
    const startPct = computed(() => valueToPct(sorted.value[0] ?? props.min));
    const endPct = computed(() =>
      valueToPct(sorted.value[sorted.value.length - 1] ?? props.max),
    );

    const normalisedMarks = computed(() =>
      props.marks?.map((m) => (typeof m === 'number' ? { value: m } : m)),
    );

    const fmt = (v: number): string => (props.formatValue ? props.formatValue(v) : String(v));

    return () => {
      const isHorizontal = props.orientation === 'horizontal';
      const rangeStart = sorted.value[0] ?? props.min;
      const rangeEnd = sorted.value[sorted.value.length - 1] ?? props.max;

      return h(
        'span',
        {
          ...attrs,
          role: 'group',
          'data-orientation': props.orientation,
          'data-disabled': props.disabled || undefined,
          class: cn(
            'bwo-slider',
            props.size !== 'md' && `bwo-slider--${props.size}`,
            props.variant !== 'primary' && `bwo-slider--${props.variant}`,
            normalisedMarks.value && normalisedMarks.value.length > 0 && 'bwo-slider--with-marks',
            attrs.class as string | undefined,
          ),
          onPointermove: onPointerMove,
          onPointerup: onPointerUp,
        },
        [
          h(
            'span',
            {
              ref: (el) => (trackRef.value = el as HTMLElement | null),
              class: 'bwo-slider-track',
              onPointerdown: onTrackPointerDown,
            },
            [
              h('span', {
                class: 'bwo-slider-range',
                style:
                  isHorizontal
                    ? props.inverted
                      ? { right: `${startPct.value}%`, left: `${100 - endPct.value}%` }
                      : { left: `${startPct.value}%`, right: `${100 - endPct.value}%` }
                    : props.inverted
                      ? { top: `${startPct.value}%`, bottom: `${100 - endPct.value}%` }
                      : { bottom: `${startPct.value}%`, top: `${100 - endPct.value}%` },
              }),
              ...(normalisedMarks.value ?? []).map((mark) => {
                const pct = valueToPct(mark.value);
                if (pct < 0 || pct > 100) return null;
                const isActive = mark.value >= rangeStart && mark.value <= rangeEnd;
                const markStyle = isHorizontal
                  ? props.inverted
                    ? { right: `${pct}%` }
                    : { left: `${pct}%` }
                  : props.inverted
                    ? { top: `${pct}%` }
                    : { bottom: `${pct}%` };
                return h(
                  'span',
                  {
                    key: mark.value,
                    class: 'bwo-slider-mark',
                    'data-active': isActive || undefined,
                    style: markStyle,
                    'aria-hidden': true,
                  },
                  mark.label !== undefined
                    ? [h('span', { class: 'bwo-slider-mark-label' }, mark.label)]
                    : undefined,
                );
              }),
            ],
          ),
          ...values.value.map((v, i) => {
            const pct = valueToPct(v);
            // Cross-axis pin (`top: 50%` for horizontal, `left: 50%` for
            // vertical) keeps the absolutely-positioned thumb centred on the
            // track; translate(...) places the thumb *centre* exactly at the
            // requested percentage.
            const style = isHorizontal
              ? props.inverted
                ? { right: `${pct}%`, top: '50%', transform: 'translate(50%, -50%)' }
                : { left: `${pct}%`, top: '50%', transform: 'translate(-50%, -50%)' }
              : props.inverted
                ? { top: `${pct}%`, left: '50%', transform: 'translate(-50%, -50%)' }
                : { bottom: `${pct}%`, left: '50%', transform: 'translate(-50%, 50%)' };
            const showTooltip =
              props.tooltip === 'always' ||
              (props.tooltip === 'drag' && activeIndex.value === i);
            return h(
              'span',
              {
                key: i,
                role: 'slider',
                tabindex: props.disabled ? -1 : 0,
                'aria-valuemin': props.min,
                'aria-valuemax': props.max,
                'aria-valuenow': v,
                'aria-valuetext': props.formatValue ? fmt(v) : undefined,
                'aria-orientation': props.orientation,
                'aria-label': `Value ${i + 1}`,
                'data-disabled': props.disabled || undefined,
                'data-active': activeIndex.value === i || undefined,
                class: 'bwo-slider-thumb',
                style,
                onPointerdown: onThumbPointerDown(i),
                onKeydown: onThumbKeyDown(i),
                onFocus: () => (activeIndex.value = i),
                onBlur: () => (activeIndex.value = null),
              },
              props.tooltip !== 'never'
                ? [
                    h(
                      'span',
                      {
                        class: 'bwo-slider-tooltip',
                        'data-visible': showTooltip || undefined,
                        'aria-hidden': true,
                      },
                      fmt(v),
                    ),
                  ]
                : undefined,
            );
          }),
        ],
      );
    };
  },
});
