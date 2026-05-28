import { CheckboxIndicator, CheckboxRoot } from 'reka-ui';
import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const Checkbox = defineComponent({
  name: 'Checkbox',
  inheritAttrs: true,
  props: {
    modelValue: { type: [Boolean, String], default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        CheckboxRoot,
        {
          ...attrs,
          class: cn('bwo-checkbox', attrs.class as string | undefined),
          checked: props.modelValue,
          disabled: props.disabled,
          'onUpdate:checked': (v: boolean | 'indeterminate') => emit('update:modelValue', v),
        },
        () =>
          h(CheckboxIndicator, { class: 'bwo-checkbox-indicator' }, () =>
            h(
              'svg',
              { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none' },
              h('path', {
                d: 'M5 12l5 5L20 7',
                stroke: 'currentColor',
                'stroke-width': 3,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
              }),
            ),
          ),
      );
  },
});
