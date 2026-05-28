import { SwitchRoot, SwitchThumb } from 'reka-ui';
import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const Switch = defineComponent({
  name: 'Switch',
  inheritAttrs: true,
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        SwitchRoot,
        {
          ...attrs,
          class: cn('bwo-switch', attrs.class as string | undefined),
          checked: props.modelValue,
          disabled: props.disabled,
          'onUpdate:checked': (v: boolean) => emit('update:modelValue', v),
        },
        () => h(SwitchThumb, { class: 'bwo-switch-thumb' }),
      );
  },
});
