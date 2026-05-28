import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const Textarea = defineComponent({
  name: 'Textarea',
  inheritAttrs: true,
  props: {
    modelValue: { type: String, default: '' },
    invalid: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h('textarea', {
        ...attrs,
        class: cn('bwo-textarea', attrs.class as string | undefined),
        value: props.modelValue,
        'aria-invalid': props.invalid || undefined,
        onInput: (e: Event) =>
          emit('update:modelValue', (e.target as HTMLTextAreaElement).value),
      });
  },
});
