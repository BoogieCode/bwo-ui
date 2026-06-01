import { computed, defineComponent, h, ref, type PropType } from 'vue';
import { cn } from './utils';

export type CheckedState = boolean | 'indeterminate';

function stateToString(state: CheckedState): 'checked' | 'unchecked' | 'indeterminate' {
  if (state === 'indeterminate') return 'indeterminate';
  return state ? 'checked' : 'unchecked';
}

export const Checkbox = defineComponent({
  name: 'Checkbox',
  inheritAttrs: true,
  props: {
    modelValue: {
      type: [Boolean, String] as PropType<CheckedState | undefined>,
      default: undefined,
    },
    defaultChecked: { type: [Boolean, String] as PropType<CheckedState>, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: String, default: 'on' },
    name: { type: String, default: undefined },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const internal = ref<CheckedState>(props.defaultChecked);
    const state = computed<CheckedState>(() =>
      props.modelValue !== undefined ? (props.modelValue as CheckedState) : internal.value,
    );
    const checkedBool = computed(() => state.value === true);
    const indeterminate = computed(() => state.value === 'indeterminate');

    const toggle = () => {
      if (props.disabled) return;
      const next: CheckedState = indeterminate.value || !checkedBool.value;
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
            role: 'checkbox',
            'aria-checked': indeterminate.value ? 'mixed' : checkedBool.value,
            'aria-required': props.required || undefined,
            'data-state': stateToString(state.value),
            'data-disabled': props.disabled || undefined,
            disabled: props.disabled,
            class: cn('bwo-checkbox', attrs.class as string | undefined),
            onClick: toggle,
            onKeydown: (e: KeyboardEvent) => {
              if (e.key === 'Enter') e.preventDefault();
            },
          },
          [(checkedBool.value || indeterminate.value)
            ? h(
                'span',
                {
                  class: 'bwo-checkbox-indicator',
                  'data-state': stateToString(state.value),
                },
                indeterminate.value
                  ? h(
                      'svg',
                      { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none' },
                      h('path', {
                        d: 'M5 12h14',
                        stroke: 'currentColor',
                        'stroke-width': 3,
                        'stroke-linecap': 'round',
                      }),
                    )
                  : h(
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
              )
            : null],
        ),
        props.name
          ? h('input', {
              type: 'checkbox',
              tabindex: -1,
              'aria-hidden': 'true',
              name: props.name,
              value: props.value,
              checked: checkedBool.value,
              required: props.required,
              style:
                'position: absolute; opacity: 0; pointer-events: none; margin: 0; width: 1px; height: 1px;',
              onChange: () => {},
            })
          : null,
      ]);
  },
});
