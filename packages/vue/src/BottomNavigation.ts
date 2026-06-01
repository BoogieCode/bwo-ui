import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  type InjectionKey,
  type PropType,
} from 'vue';
import { cn } from './utils';

export type BottomNavigationVariant = 'labeled' | 'icons-only' | 'selected-label';

interface BottomNavContext {
  value: () => string | null;
  variant: BottomNavigationVariant;
  emit: (next: string) => void;
}

const Key: InjectionKey<BottomNavContext> = Symbol('BottomNav');

export const BottomNavigation = defineComponent({
  name: 'BottomNavigation',
  inheritAttrs: true,
  props: {
    modelValue: { type: [String, null] as PropType<string | null>, default: null },
    variant: {
      type: String as PropType<BottomNavigationVariant>,
      default: 'labeled',
    },
    fixed: { type: Boolean, default: false },
    label: { type: String, default: 'Bottom navigation' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    provide(Key, {
      value: () => props.modelValue,
      variant: props.variant,
      emit: (next) => emit('update:modelValue', next),
    });
    return () =>
      h(
        'nav',
        {
          ...attrs,
          'aria-label': props.label,
          'data-variant': props.variant,
          class: cn(
            'bwo-bottomnav',
            `bwo-bottomnav--${props.variant}`,
            props.fixed && 'bwo-bottomnav--fixed',
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
  },
});

export const BottomNavigationItem = defineComponent({
  name: 'BottomNavigationItem',
  inheritAttrs: true,
  props: {
    value: { type: String, required: true },
    label: { type: String, default: undefined },
    badge: { type: [String, Number, null], default: null },
  },
  setup(props, { attrs, slots }) {
    const ctx = inject(Key);
    if (!ctx) throw new Error('BottomNavigationItem must be inside <BottomNavigation>.');
    const active = computed(() => ctx.value() === props.value);
    const showLabel = computed(
      () => ctx.variant === 'labeled' || (ctx.variant === 'selected-label' && active.value),
    );
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          role: 'tab',
          'aria-selected': active.value,
          'data-active': active.value || undefined,
          class: cn(
            'bwo-bottomnav-item',
            active.value && 'bwo-bottomnav-item--active',
            attrs.class as string | undefined,
          ),
          onClick: () => ctx.emit(props.value),
        },
        [
          h('span', { class: 'bwo-bottomnav-item-icon' }, [
            slots.icon?.(),
            props.badge !== null && props.badge !== undefined
              ? h('span', { class: 'bwo-bottomnav-item-badge' }, String(props.badge))
              : null,
          ]),
          showLabel.value && props.label
            ? h('span', { class: 'bwo-bottomnav-item-label' }, props.label)
            : null,
        ],
      );
  },
});
