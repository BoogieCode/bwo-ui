import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export type StatSize = 'sm' | 'md' | 'lg';
export type StatAlign = 'start' | 'center' | 'end';
export type StatTone = 'default' | 'success' | 'warning' | 'danger';
export type StatGoodWhen = 'up' | 'down';

function formatNumber(n: number, decimals: number, prefix?: string, suffix?: string): string {
  const opts: Intl.NumberFormatOptions =
    decimals > 0
      ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
      : {};
  return `${prefix ?? ''}${n.toLocaleString(undefined, opts)}${suffix ?? ''}`;
}

function formatDeltaAbs(value: number, decimals: number): string {
  const abs = Math.abs(value);
  if (abs % 1 === 0 && decimals === 0) return abs.toLocaleString();
  return abs.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export const Stat = defineComponent({
  name: 'Stat',
  inheritAttrs: true,
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: undefined },
    count: { type: Number, default: undefined },
    decimals: { type: Number, default: 0 },
    prefix: { type: String, default: undefined },
    suffix: { type: String, default: undefined },
    hint: { type: String, default: undefined },
    size: { type: String as PropType<StatSize>, default: 'md' },
    align: { type: String as PropType<StatAlign>, default: 'start' },
    tone: { type: String as PropType<StatTone>, default: 'default' },
    delta: { type: Number, default: undefined },
    deltaPrefix: { type: String, default: undefined },
    deltaSuffix: { type: String, default: undefined },
    deltaLabel: { type: String, default: undefined },
    goodWhen: { type: String as PropType<StatGoodWhen>, default: 'up' },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const direction: 'up' | 'down' | 'neutral' =
        props.delta === undefined || props.delta === 0
          ? 'neutral'
          : props.delta > 0
            ? 'up'
            : 'down';
      const positiveIsGood = props.goodWhen === 'up';
      const deltaTone: 'positive' | 'negative' | 'neutral' =
        direction === 'neutral'
          ? 'neutral'
          : (direction === 'up') === positiveIsGood
            ? 'positive'
            : 'negative';
      const arrow = direction === 'up' ? '▲' : direction === 'down' ? '▼' : '→';

      const displayValue =
        props.count !== undefined
          ? formatNumber(props.count, props.decimals, props.prefix, props.suffix)
          : props.value;

      return h(
        'div',
        {
          ...attrs,
          class: cn(
            'bwo-stat',
            props.size !== 'md' && `bwo-stat--${props.size}`,
            props.align !== 'start' && `bwo-stat--${props.align}`,
            props.tone !== 'default' && `bwo-stat--tone-${props.tone}`,
            attrs.class as string | undefined,
          ),
        },
        [
          h('div', { class: 'bwo-stat-value-row' }, [
            slots.icon
              ? h('span', { class: 'bwo-stat-icon', 'aria-hidden': true }, slots.icon())
              : null,
            h('div', { class: 'bwo-stat-value' }, String(displayValue ?? '')),
          ]),
          h('div', { class: 'bwo-stat-label' }, props.label),
          props.delta !== undefined
            ? h('div', { class: 'bwo-stat-delta', 'data-tone': deltaTone }, [
                h('span', { class: 'bwo-stat-delta-arrow', 'aria-hidden': true }, arrow),
                h(
                  'span',
                  { class: 'bwo-stat-delta-value' },
                  `${props.deltaPrefix ?? ''}${formatDeltaAbs(props.delta, props.decimals)}${props.deltaSuffix ?? ''}`,
                ),
                props.deltaLabel
                  ? h('span', { class: 'bwo-stat-delta-label' }, props.deltaLabel)
                  : null,
              ])
            : null,
          props.hint ? h('div', { class: 'bwo-stat-hint' }, props.hint) : null,
        ],
      );
    };
  },
});

export const StatGroup = defineComponent({
  name: 'StatGroup',
  inheritAttrs: true,
  props: {
    divided: { type: Boolean, default: false },
    size: { type: String as PropType<StatSize>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          class: cn(
            'bwo-stat-group',
            props.divided && 'bwo-stat-group--divided',
            props.size && `bwo-stat-group--${props.size}`,
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
  },
});
