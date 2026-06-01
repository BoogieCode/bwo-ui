import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const Progress = defineComponent({
  name: 'Progress',
  inheritAttrs: true,
  props: {
    value: { type: Number, default: undefined },
    max: { type: Number, default: 100 },
  },
  setup(props, { attrs }) {
    return () => {
      const indeterminate = props.value === undefined;
      const clamped = indeterminate ? 0 : Math.max(0, Math.min(props.max, props.value as number));
      const pct = indeterminate ? 0 : (clamped / props.max) * 100;
      return h(
        'div',
        {
          ...attrs,
          role: 'progressbar',
          'aria-valuemin': 0,
          'aria-valuemax': props.max,
          'aria-valuenow': indeterminate ? undefined : clamped,
          'data-state': indeterminate ? 'indeterminate' : 'loading',
          class: cn('bwo-progress', attrs.class as string | undefined),
        },
        h('div', {
          class: 'bwo-progress-indicator',
          'data-state': indeterminate ? 'indeterminate' : 'loading',
          style: { transform: `translateX(-${100 - pct}%)` },
        }),
      );
    };
  },
});
