import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type PropType,
} from 'vue';
import { cn } from './utils';

interface RadioGroupContext {
  value: () => string | null;
  setValue: (next: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

const Key: InjectionKey<RadioGroupContext> = Symbol('RadioGroup');

export const RadioGroupRoot = defineComponent({
  name: 'RadioGroupRoot',
  inheritAttrs: true,
  props: {
    modelValue: { type: [String, null] as PropType<string | null>, default: undefined },
    defaultValue: { type: String, default: undefined },
    name: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    orientation: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const internal = ref<string | null>(props.defaultValue ?? null);
    const value = computed<string | null>(() =>
      props.modelValue !== undefined ? props.modelValue : internal.value,
    );
    provide(Key, {
      value: () => value.value,
      setValue: (next: string) => {
        if (props.modelValue === undefined) internal.value = next;
        emit('update:modelValue', next);
      },
      name: props.name,
      disabled: props.disabled,
      required: props.required,
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'radiogroup',
          'aria-orientation': props.orientation,
          'aria-required': props.required || undefined,
          'data-orientation': props.orientation,
          'data-disabled': props.disabled || undefined,
          class: cn('bwo-radio-group', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const RadioGroupItem = defineComponent({
  name: 'RadioGroupItem',
  inheritAttrs: true,
  props: {
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { attrs }) {
    const ctx = inject(Key);
    if (!ctx) throw new Error('RadioGroupItem must be inside <RadioGroupRoot>.');
    const checked = computed(() => ctx.value() === props.value);
    const isDisabled = computed(() => ctx.disabled || props.disabled);
    return () =>
      h('span', { style: 'display: contents' }, [
        h(
          'button',
          {
            ...attrs,
            type: 'button',
            role: 'radio',
            'aria-checked': checked.value,
            'data-state': checked.value ? 'checked' : 'unchecked',
            'data-disabled': isDisabled.value || undefined,
            disabled: isDisabled.value,
            class: cn('bwo-radio', attrs.class as string | undefined),
            onClick: () => !isDisabled.value && ctx.setValue(props.value),
          },
          h('span', {
            class: 'bwo-radio-indicator',
            'data-state': checked.value ? 'checked' : 'unchecked',
            'aria-hidden': 'true',
          }),
        ),
        ctx.name
          ? h('input', {
              type: 'radio',
              tabindex: -1,
              'aria-hidden': 'true',
              name: ctx.name,
              value: props.value,
              checked: checked.value,
              required: ctx.required,
              style:
                'position: absolute; opacity: 0; pointer-events: none; margin: 0; width: 1px; height: 1px;',
              onChange: () => {},
            })
          : null,
      ]);
  },
});
