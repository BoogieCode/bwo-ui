import {
  defineComponent,
  h,
  ref,
  toRef,
  type CSSProperties,
  type PropType,
  type VNode,
} from 'vue';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

export type RateSymbol = 'star' | 'heart' | 'thumb' | 'bolt';
export type RateSize = 'sm' | 'md' | 'lg';

const ICON_PATHS: Record<RateSymbol, string> = {
  star: 'M12 2.6l2.94 6.18 6.81.6-5.16 4.5 1.55 6.66L12 16.9l-6.14 3.64 1.55-6.66L2.25 9.38l6.81-.6z',
  heart:
    'M12 21s-7-4.35-9.5-9C.4 8.5 3.4 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.6 0 6.6 4.5 4.5 8-2.5 4.65-9.5 9-9.5 9z',
  thumb:
    'M2 10h4v11H2zM22 11a2 2 0 00-2-2h-5.5l.94-4.41A1.5 1.5 0 0014 3l-6 7v11h10.5a2 2 0 001.96-1.6l1.5-7.4A2 2 0 0022 11z',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
};

function builtIn(symbol: RateSymbol): VNode {
  return h(
    'svg',
    { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true' },
    h('path', { d: ICON_PATHS[symbol] }),
  );
}

export const Rate = defineComponent({
  name: 'Rate',
  inheritAttrs: true,
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: 0 },
    count: { type: Number, default: 5 },
    allowHalf: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    /** `'star' | 'heart' | 'thumb' | 'bolt'` or a custom string label. */
    icon: { type: String as PropType<RateSymbol | string>, default: 'star' },
    size: { type: String as PropType<RateSize>, default: 'md' },
    color: { type: String, default: undefined },
    name: { type: String, default: undefined },
    label: { type: String, default: 'Rating' },
    showValue: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit, slots }) {
    const value = useControllable<number>(
      toRef(props, 'modelValue'),
      props.defaultValue,
      (v) => emit('update:modelValue', v),
    );
    const hover = ref<number | null>(null);

    const interactive = () => !props.readOnly && !props.disabled;

    const commit = (next: number) => {
      if (!interactive()) return;
      const final = props.clearable && next === value.value ? 0 : next;
      value.value = final;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!interactive()) return;
      const step = props.allowHalf ? 0.5 : 1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        commit(Math.min(props.count, value.value + step));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        commit(Math.max(0, value.value - step));
      } else if (e.key === 'Home') {
        e.preventDefault();
        commit(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        commit(props.count);
      }
    };

    const renderIcon = (): VNode | undefined => {
      if (slots.icon) {
        const nodes = slots.icon();
        return nodes[0];
      }
      if ((props.icon as RateSymbol) in ICON_PATHS) {
        return builtIn(props.icon as RateSymbol);
      }
      // string label fallback — render as text
      return h('span', { style: 'font-size: inherit; line-height: 1;' }, props.icon);
    };

    return () => {
      const display = hover.value ?? value.value;
      const inlineStyle: CSSProperties = {};
      if (props.color) {
        (inlineStyle as Record<string, string>)['--bwo-rate-color'] = props.color;
      }
      const symbol = renderIcon();

      return h(
        'div',
        {
          ...attrs,
          role: 'slider',
          'aria-label': props.label,
          'aria-valuemin': 0,
          'aria-valuemax': props.count,
          'aria-valuenow': value.value,
          'aria-readonly': props.readOnly || undefined,
          'aria-disabled': props.disabled || undefined,
          tabindex: interactive() ? 0 : -1,
          'data-readonly': props.readOnly || undefined,
          'data-disabled': props.disabled || undefined,
          'data-size': props.size,
          class: cn(
            'bwo-rate',
            `bwo-rate--${props.size}`,
            attrs.class as string | undefined,
          ),
          style: { ...inlineStyle, ...((attrs.style as Record<string, string>) ?? {}) },
          onKeydown: onKeyDown,
          onMouseleave: () => (hover.value = null),
        },
        [
          ...Array.from({ length: props.count }).map((_, i) => {
            const fillPct = Math.max(0, Math.min(1, display - i)) * 100;
            return h('span', { key: i, class: 'bwo-rate-slot' }, [
              h('span', { class: 'bwo-rate-empty' }, symbol),
              h(
                'span',
                {
                  class: 'bwo-rate-full',
                  style: { clipPath: `inset(0 ${100 - fillPct}% 0 0)` },
                },
                symbol,
              ),
              interactive() && props.allowHalf
                ? h('button', {
                    type: 'button',
                    tabindex: -1,
                    'aria-label': `${i + 0.5} of ${props.count}`,
                    class: 'bwo-rate-hit bwo-rate-hit--left',
                    onMouseenter: () => (hover.value = i + 0.5),
                    onClick: () => commit(i + 0.5),
                  })
                : null,
              interactive()
                ? h('button', {
                    type: 'button',
                    tabindex: -1,
                    'aria-label': `${i + 1} of ${props.count}`,
                    class: cn(
                      'bwo-rate-hit',
                      props.allowHalf ? 'bwo-rate-hit--right' : 'bwo-rate-hit--full',
                    ),
                    onMouseenter: () => (hover.value = i + 1),
                    onClick: () => commit(i + 1),
                  })
                : null,
            ]);
          }),
          props.showValue
            ? h(
                'span',
                { class: 'bwo-rate-value' },
                display.toFixed(props.allowHalf ? 1 : 0),
              )
            : null,
          props.name ? h('input', { type: 'hidden', name: props.name, value: value.value }) : null,
        ],
      );
    };
  },
});
