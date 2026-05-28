import { defineComponent, h, type PropType } from 'vue';
import { cn, type Radius } from './utils';

export const Input = defineComponent({
  name: 'Input',
  inheritAttrs: true,
  props: {
    modelValue: { type: [String, Number], default: '' },
    invalid: { type: Boolean, default: false },
    radius: { type: String as PropType<Radius>, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h('input', {
        ...attrs,
        class: cn('bwo-input', attrs.class as string | undefined),
        value: props.modelValue,
        'aria-invalid': props.invalid || undefined,
        'data-radius': props.radius,
        onInput: (e: Event) =>
          emit('update:modelValue', (e.target as HTMLInputElement).value),
      });
  },
});
