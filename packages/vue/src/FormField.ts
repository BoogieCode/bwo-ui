import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const FormField = defineComponent({
  name: 'FormField',
  inheritAttrs: true,
  props: {
    label: { type: String, default: undefined },
    hint: { type: String, default: undefined },
    error: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    htmlFor: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          class: cn('bwo-field', attrs.class as string | undefined),
          'data-invalid': props.error ? '' : undefined,
        },
        [
          props.label
            ? h(
                'label',
                { class: 'bwo-label', for: props.htmlFor },
                [
                  props.label,
                  props.required ? h('span', { class: 'bwo-required', 'aria-hidden': 'true' }, ' *') : null,
                ],
              )
            : null,
          slots.default?.(),
          props.hint && !props.error ? h('span', { class: 'bwo-hint' }, props.hint) : null,
          props.error ? h('span', { class: 'bwo-error' }, props.error) : null,
        ],
      );
  },
});
