import { computed, defineComponent, h, ref } from 'vue';
import { cn } from './utils';

export const Switch = defineComponent({
  name: 'Switch',
  inheritAttrs: true,
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: undefined },
    value: { type: String, default: 'on' },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const internal = ref<boolean>(props.defaultChecked);
    const state = computed<boolean>(() =>
      props.modelValue !== undefined ? (props.modelValue as boolean) : internal.value,
    );
    const toggle = () => {
      if (props.disabled) return;
      const next = !state.value;
      if (props.modelValue === undefined) internal.value = next;
      emit('update:modelValue', next);
    };
    return () =>
      h('span', { style: 'display: contents' }, [
        h(
          'button',
          {
            ...attrs,
            type: 'button',
            role: 'switch',
            'aria-checked': state.value,
            'aria-required': props.required || undefined,
            'data-state': state.value ? 'checked' : 'unchecked',
            'data-disabled': props.disabled || undefined,
            disabled: props.disabled,
            class: cn('bwo-switch', attrs.class as string | undefined),
            onClick: toggle,
          },
          h('span', {
            class: 'bwo-switch-thumb',
            'data-state': state.value ? 'checked' : 'unchecked',
          }),
        ),
        props.name
          ? h('input', {
              type: 'checkbox',
              tabindex: -1,
              'aria-hidden': 'true',
              name: props.name,
              value: props.value,
              checked: state.value,
              required: props.required,
              style:
                'position: absolute; opacity: 0; pointer-events: none; margin: 0; width: 1px; height: 1px;',
              onChange: () => {},
            })
          : null,
      ]);
  },
});
