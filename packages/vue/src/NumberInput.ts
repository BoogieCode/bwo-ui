import { defineComponent, h, ref, toRef, watch, type PropType } from 'vue';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

function derivePrecision(step: number): number {
  if (!Number.isFinite(step)) return 0;
  const str = String(step);
  const dot = str.indexOf('.');
  if (dot === -1) return 0;
  return str.length - dot - 1;
}

function fmt(value: number, precision: number): string {
  return precision > 0 ? value.toFixed(precision) : String(value);
}

function clampN(v: number, min: number | undefined, max: number | undefined): number {
  let out = v;
  if (min !== undefined) out = Math.max(min, out);
  if (max !== undefined) out = Math.min(max, out);
  return out;
}

export const NumberInput = defineComponent({
  name: 'NumberInput',
  inheritAttrs: true,
  props: {
    modelValue: { type: [Number, null] as PropType<number | null>, default: undefined },
    defaultValue: { type: [Number, null] as PropType<number | null>, default: null },
    min: { type: Number, default: undefined },
    max: { type: Number, default: undefined },
    step: { type: Number, default: 1 },
    largeStep: { type: Number, default: undefined },
    precision: { type: Number, default: undefined },
    showSteppers: { type: Boolean, default: true },
    clampOnBlur: { type: Boolean, default: true },
    prefix: { type: String, default: undefined },
    suffix: { type: String, default: undefined },
    disableWheel: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const value = useControllable<number | null>(
      toRef(props, 'modelValue'),
      props.defaultValue,
      (v) => emit('update:modelValue', v),
    );
    const precision = () => props.precision ?? derivePrecision(props.step);
    const display = ref<string>(
      value.value === null || value.value === undefined ? '' : fmt(value.value, precision()),
    );

    watch(value, (next) => {
      display.value = next === null || next === undefined ? '' : fmt(next, precision());
    });

    const adjust = (delta: number) => {
      if (props.disabled || props.readonly) return;
      const base = value.value ?? props.min ?? 0;
      const next = clampN(Number((base + delta).toFixed(10)), props.min, props.max);
      value.value = next;
    };

    const onInput = (e: Event) => {
      const raw = (e.target as HTMLInputElement).value;
      display.value = raw;
      if (raw === '' || raw === '-') {
        value.value = null;
        return;
      }
      const parsed = Number(raw);
      if (Number.isFinite(parsed)) value.value = parsed;
    };

    const onBlur = () => {
      if (display.value === '' || display.value === '-') {
        value.value = null;
        display.value = '';
        return;
      }
      const parsed = Number(display.value);
      if (!Number.isFinite(parsed)) {
        display.value =
          value.value === null || value.value === undefined ? '' : fmt(value.value, precision());
        return;
      }
      const next = props.clampOnBlur ? clampN(parsed, props.min, props.max) : parsed;
      value.value = next;
      display.value = fmt(next, precision());
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const big = props.largeStep ?? props.step * 10;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        adjust(e.shiftKey ? big : props.step);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        adjust(e.shiftKey ? -big : -props.step);
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        adjust(big);
      } else if (e.key === 'PageDown') {
        e.preventDefault();
        adjust(-big);
      } else if (e.key === 'Home' && props.min !== undefined) {
        e.preventDefault();
        value.value = props.min;
      } else if (e.key === 'End' && props.max !== undefined) {
        e.preventDefault();
        value.value = props.max;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (props.disableWheel || props.disabled || props.readonly) return;
      const target = e.target as HTMLElement;
      if (document.activeElement !== target) return;
      e.preventDefault();
      adjust(e.deltaY < 0 ? props.step : -props.step);
    };

    return () => {
      const canDecrement =
        !props.disabled &&
        !props.readonly &&
        (props.min === undefined || (value.value ?? props.min) > props.min);
      const canIncrement =
        !props.disabled &&
        !props.readonly &&
        (props.max === undefined || (value.value ?? props.max) < props.max);
      const arrowSvg = (path: string) =>
        h(
          'svg',
          { width: 8, height: 8, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' },
          h('path', { d: path, stroke: 'currentColor', 'stroke-width': 2.5, 'stroke-linecap': 'round' }),
        );

      return h(
        'div',
        {
          class: cn(
            'bwo-numberinput',
            props.disabled && 'bwo-numberinput--disabled',
            attrs.class as string | undefined,
          ),
          'data-disabled': props.disabled || undefined,
        },
        [
          props.prefix ? h('span', { class: 'bwo-numberinput-prefix' }, props.prefix) : null,
          h('input', {
            ...attrs,
            type: 'text',
            inputmode: 'decimal',
            role: 'spinbutton',
            'aria-valuenow': value.value ?? undefined,
            'aria-valuemin': props.min,
            'aria-valuemax': props.max,
            autocomplete: 'off',
            class: 'bwo-numberinput-input',
            value: display.value,
            disabled: props.disabled,
            readonly: props.readonly,
            onInput,
            onBlur,
            onKeydown: onKeyDown,
            onWheel,
          }),
          props.suffix ? h('span', { class: 'bwo-numberinput-suffix' }, props.suffix) : null,
          props.showSteppers
            ? h('div', { class: 'bwo-numberinput-steppers' }, [
                h(
                  'button',
                  {
                    type: 'button',
                    tabindex: -1,
                    'aria-label': 'Increment',
                    disabled: !canIncrement,
                    class: 'bwo-numberinput-stepper bwo-numberinput-stepper--up',
                    onClick: () => adjust(props.step),
                  },
                  arrowSvg('M6 15l6-6 6 6'),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    tabindex: -1,
                    'aria-label': 'Decrement',
                    disabled: !canDecrement,
                    class: 'bwo-numberinput-stepper bwo-numberinput-stepper--down',
                    onClick: () => adjust(-props.step),
                  },
                  arrowSvg('M6 9l6 6 6-6'),
                ),
              ])
            : null,
        ],
      );
    };
  },
});
