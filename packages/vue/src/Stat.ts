import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const Stat = defineComponent({
  name: 'Stat',
  inheritAttrs: true,
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: undefined },
    count: { type: Number, default: undefined },
    hint: { type: String, default: undefined },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          class: cn('bwo-stat', attrs.class as string | undefined),
        },
        [
          h('div', { class: 'bwo-stat-value' }, String(props.value ?? props.count ?? '')),
          h('div', { class: 'bwo-stat-label' }, props.label),
          props.hint ? h('div', { class: 'bwo-stat-hint' }, props.hint) : null,
        ],
      );
  },
});
