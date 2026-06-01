import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  toRef,
  useId,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

interface TabsContext {
  value: Ref<string | null>;
  setValue: (v: string) => void;
  baseId: string;
  orientation: 'horizontal' | 'vertical';
  activationMode: 'automatic' | 'manual';
}
const Key: InjectionKey<TabsContext> = Symbol('Tabs');

function useTabs(name: string): TabsContext {
  const ctx = inject(Key);
  if (!ctx) throw new Error(`${name} must be inside <TabsRoot>.`);
  return ctx;
}

export const TabsRoot = defineComponent({
  name: 'TabsRoot',
  inheritAttrs: true,
  props: {
    modelValue: { type: [String, null] as PropType<string | null>, default: undefined },
    defaultValue: { type: String, default: undefined },
    orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
    activationMode: { type: String as PropType<'automatic' | 'manual'>, default: 'automatic' },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const value = useControllable<string | null>(
      toRef(props, 'modelValue'),
      props.defaultValue ?? null,
      (v) => v !== null && emit('update:modelValue', v),
    );
    provide(Key, {
      value: computed(() => value.value) as unknown as Ref<string | null>,
      setValue: (v: string) => (value.value = v),
      baseId: useId(),
      orientation: props.orientation,
      activationMode: props.activationMode,
    });
    return () =>
      h(
        'div',
        {
          ...attrs,
          'data-orientation': props.orientation,
          class: cn('bwo-tabs', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const TabsList = defineComponent({
  name: 'TabsList',
  inheritAttrs: true,
  props: { loop: { type: Boolean, default: true } },
  setup(props, { attrs, slots }) {
    const ctx = useTabs('TabsList');
    const listRef = ref<HTMLDivElement | null>(null);
    const onKeydown = (event: KeyboardEvent) => {
      const el = listRef.value;
      if (!el) return;
      const triggers = Array.from(
        el.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
      );
      if (triggers.length === 0) return;
      const i = triggers.indexOf(document.activeElement as HTMLButtonElement);
      const next = ctx.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      const prev = ctx.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      let target: number | null = null;
      if (event.key === next) target = i + 1;
      else if (event.key === prev) target = i - 1;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = triggers.length - 1;
      else return;
      event.preventDefault();
      if (target < 0) target = props.loop ? triggers.length - 1 : 0;
      if (target >= triggers.length) target = props.loop ? 0 : triggers.length - 1;
      const t = triggers[target]!;
      t.focus();
      if (ctx.activationMode === 'automatic') {
        const v = t.getAttribute('data-value');
        if (v) ctx.setValue(v);
      }
    };
    return () =>
      h(
        'div',
        {
          ...attrs,
          ref: (el) => (listRef.value = el as HTMLDivElement | null),
          role: 'tablist',
          'aria-orientation': ctx.orientation,
          class: cn('bwo-tabs-list', attrs.class as string | undefined),
          onKeydown,
        },
        slots.default?.(),
      );
  },
});

export const TabsTrigger = defineComponent({
  name: 'TabsTrigger',
  inheritAttrs: true,
  props: { value: { type: String, required: true } },
  setup(props, { attrs, slots }) {
    const ctx = useTabs('TabsTrigger');
    const active = computed(() => ctx.value.value === props.value);
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: 'button',
          role: 'tab',
          id: `${ctx.baseId}-trigger-${props.value}`,
          'aria-selected': active.value,
          'aria-controls': `${ctx.baseId}-content-${props.value}`,
          'data-state': active.value ? 'active' : 'inactive',
          'data-value': props.value,
          tabindex: active.value ? 0 : -1,
          class: cn('bwo-tabs-trigger', attrs.class as string | undefined),
          onClick: () => ctx.setValue(props.value),
        },
        slots.default?.(),
      );
  },
});

export const TabsContent = defineComponent({
  name: 'TabsContent',
  inheritAttrs: true,
  props: {
    value: { type: String, required: true },
    forceMount: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    const ctx = useTabs('TabsContent');
    const active = computed(() => ctx.value.value === props.value);
    return () => {
      if (!active.value && !props.forceMount) return null;
      return h(
        'div',
        {
          ...attrs,
          role: 'tabpanel',
          id: `${ctx.baseId}-content-${props.value}`,
          'aria-labelledby': `${ctx.baseId}-trigger-${props.value}`,
          'data-state': active.value ? 'active' : 'inactive',
          tabindex: 0,
          hidden: !active.value,
          class: cn('bwo-tabs-content', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
    };
  },
});
