import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';
import { cn } from './utils';

type AccordionType = 'single' | 'multiple';

interface AccordionContext {
  type: AccordionType;
  value: Ref<string[]>;
  toggle: (v: string) => void;
  collapsible: boolean;
  disabled?: boolean;
}
const Key: InjectionKey<AccordionContext> = Symbol('Accordion');
const ItemKey: InjectionKey<{ value: string; disabled?: boolean }> = Symbol('AccordionItem');

function useAcc(name: string): AccordionContext {
  const ctx = inject(Key);
  if (!ctx) throw new Error(`${name} must be inside <AccordionRoot>.`);
  return ctx;
}

export const AccordionRoot = defineComponent({
  name: 'AccordionRoot',
  inheritAttrs: true,
  props: {
    type: { type: String as PropType<AccordionType>, default: 'single' },
    modelValue: { type: [String, Array] as PropType<string | string[] | null>, default: undefined },
    defaultValue: { type: [String, Array] as PropType<string | string[]>, default: undefined },
    collapsible: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const isMultiple = props.type === 'multiple';
    const internal = ref<string[]>(
      isMultiple
        ? Array.isArray(props.defaultValue)
          ? props.defaultValue
          : []
        : props.defaultValue && typeof props.defaultValue === 'string'
          ? [props.defaultValue]
          : [],
    );
    const value = computed<string[]>(() => {
      if (props.modelValue === undefined) return internal.value;
      if (isMultiple) return Array.isArray(props.modelValue) ? props.modelValue : [];
      return typeof props.modelValue === 'string' && props.modelValue
        ? [props.modelValue]
        : [];
    });
    const setValue = (next: string[]) => {
      if (props.modelValue === undefined) internal.value = next;
      if (isMultiple) emit('update:modelValue', next);
      else emit('update:modelValue', next[0] ?? '');
    };
    const toggle = (v: string) => {
      if (isMultiple) {
        const isOpen = value.value.includes(v);
        setValue(isOpen ? value.value.filter((x) => x !== v) : [...value.value, v]);
      } else {
        const isOpen = value.value.includes(v);
        if (isOpen) {
          if (props.collapsible) setValue([]);
        } else {
          setValue([v]);
        }
      }
    };
    provide(Key, {
      type: props.type,
      value,
      toggle,
      collapsible: props.collapsible,
      disabled: props.disabled,
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-orientation': 'vertical',
          class: cn('bwo-accordion', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const AccordionItem = defineComponent({
  name: 'AccordionItem',
  inheritAttrs: true,
  props: {
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    const ctx = useAcc('AccordionItem');
    const open = computed(() => ctx.value.value.includes(props.value));
    provide(ItemKey, { value: props.value, disabled: props.disabled });
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-state': open.value ? 'open' : 'closed',
          'data-disabled': props.disabled || undefined,
          class: cn('bwo-accordion-item', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const AccordionTrigger = defineComponent({
  name: 'AccordionTrigger',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useAcc('AccordionTrigger');
    const item = inject(ItemKey)!;
    const open = computed(() => ctx.value.value.includes(item.value));
    const isDisabled = computed(() => ctx.disabled || item.disabled);
    return () =>
      h(
        'h3',
        { class: 'bwo-accordion-header' },
        h(
          'button',
          {
            ...attrs,
            type: 'button',
            'aria-expanded': open.value,
            'data-state': open.value ? 'open' : 'closed',
            'data-disabled': isDisabled.value || undefined,
            disabled: isDisabled.value,
            class: cn('bwo-accordion-trigger', attrs.class as string | undefined),
            onClick: () => !isDisabled.value && ctx.toggle(item.value),
          },
          [
            h('span', slots.default?.()),
            h('span', { class: 'bwo-accordion-icon', 'aria-hidden': 'true' }),
          ],
        ),
      );
  },
});

export const AccordionContent = defineComponent({
  name: 'AccordionContent',
  inheritAttrs: true,
  props: { forceMount: { type: Boolean, default: false } },
  setup(props, { attrs, slots }) {
    const ctx = useAcc('AccordionContent');
    const item = inject(ItemKey)!;
    const open = computed(() => ctx.value.value.includes(item.value));
    return () => {
      if (!open.value && !props.forceMount) return null;
      return h(
        'div',
        {
          ...attrs,
          role: 'region',
          'data-state': open.value ? 'open' : 'closed',
          hidden: !open.value,
          class: cn('bwo-accordion-content', attrs.class as string | undefined),
        },
        h('div', { class: 'bwo-accordion-content-inner' }, slots.default?.()),
      );
    };
  },
});
