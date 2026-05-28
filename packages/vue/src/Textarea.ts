import { defineComponent, h, type PropType } from 'vue';
import { cn, type Radius } from './utils';

export const Textarea = defineComponent({
  name: 'Textarea',
  inheritAttrs: true,
  props: {
    modelValue: { type: String, default: '' },
    invalid: { type: Boolean, default: false },
    radius: { type: String as PropType<Radius>, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h('textarea', {
        ...attrs,
        class: cn('bwo-textarea', attrs.class as string | undefined),
        value: props.modelValue,
        'aria-invalid': props.invalid || undefined,
        'data-radius': props.radius,
        onInput: (e: Event) =>
          emit('update:modelValue', (e.target as HTMLTextAreaElement).value),
      });
  },
});
