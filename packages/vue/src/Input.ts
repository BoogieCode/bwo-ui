import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const Input = defineComponent({
  name: 'Input',
  inheritAttrs: true,
  props: {
    modelValue: { type: [String, Number], default: '' },
    invalid: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h('input', {
        ...attrs,
        class: cn('bwo-input', attrs.class as string | undefined),
        value: props.modelValue,
        'aria-invalid': props.invalid || undefined,
        onInput: (e: Event) =>
          emit('update:modelValue', (e.target as HTMLInputElement).value),
      });
  },
});
