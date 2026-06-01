import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  toRef,
  useId,
  watchEffect,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';
import {
  computeFloating,
  useAnchorRect,
  useFloatingSize,
} from './internal/floating';
import { Portal } from './internal/portal';
import { useControllable } from './internal/use-controllable';
import { useDismiss } from './internal/use-dismiss';
import { cn, type Radius } from './utils';

interface SelectContext {
  value: Ref<string | null>;
  setValue: (v: string) => void;
  open: Ref<boolean>;
  setOpen: (v: boolean) => void;
  triggerRef: Ref<HTMLButtonElement | null>;
  contentRef: Ref<HTMLElement | null>;
  triggerId: string;
  contentId: string;
  registerLabel: (v: string, label: string) => void;
  getLabel: (v: string | null) => string | null;
  highlighted: Ref<string | null>;
  setHighlighted: (v: string | null) => void;
  items: Ref<Array<{ value: string; disabled: boolean }>>;
  disabled?: boolean;
}
const Key: InjectionKey<SelectContext> = Symbol('Select');

function useSelect(name: string): SelectContext {
  const ctx = inject(Key);
  if (!ctx) throw new Error(`${name} must be inside <SelectRoot>.`);
  return ctx;
}

export const SelectRoot = defineComponent({
  name: 'SelectRoot',
  props: {
    modelValue: { type: [String, null] as PropType<string | null>, default: undefined },
    defaultValue: { type: String, default: undefined },
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: undefined },
  },
  emits: ['update:modelValue', 'update:open'],
  setup(props, { slots, emit }) {
    const value = useControllable<string | null>(
      toRef(props, 'modelValue'),
      props.defaultValue ?? null,
      (v) => v !== null && emit('update:modelValue', v),
    );
    const open = useControllable<boolean>(
      toRef(props, 'open'),
      props.defaultOpen,
      (v) => emit('update:open', v),
    );
    const labels = ref(new Map<string, string>());
    const items = ref<Array<{ value: string; disabled: boolean }>>([]);
    const highlighted = ref<string | null>(null);

    watchEffect(() => {
      if (open.value && value.value && highlighted.value === null) {
        highlighted.value = value.value;
      } else if (!open.value) {
        highlighted.value = null;
      }
    });

    provide(Key, {
      value: computed(() => value.value) as unknown as Ref<string | null>,
      setValue: (v: string) => (value.value = v),
      open: computed(() => open.value) as unknown as Ref<boolean>,
      setOpen: (v: boolean) => (open.value = v),
      triggerRef: ref<HTMLButtonElement | null>(null),
      contentRef: ref<HTMLElement | null>(null),
      triggerId: useId(),
      contentId: useId(),
      registerLabel: (v, label) => labels.value.set(v, label),
      getLabel: (v) => (v === null ? null : labels.value.get(v) ?? null),
      highlighted: computed(() => highlighted.value) as unknown as Ref<string | null>,
      setHighlighted: (v) => (highlighted.value = v),
      items,
      disabled: props.disabled,
    });

    return () => [
      slots.default?.(),
      props.name
        ? h('input', { type: 'hidden', name: props.name, value: value.value ?? '' })
        : null,
    ];
  },
});

export const SelectValue = defineComponent({
  name: 'SelectValue',
  inheritAttrs: true,
  props: { placeholder: { type: String, default: undefined } },
  setup(props, { attrs, slots }) {
    const ctx = useSelect('SelectValue');
    return () =>
      h(
        'span',
        {
          ...attrs,
          class: cn('bwo-select-value', attrs.class as string | undefined),
          'data-empty': ctx.value.value === null || undefined,
        },
        slots.default?.() ?? ctx.getLabel(ctx.value.value) ?? props.placeholder,
      );
  },
});

export const SelectTrigger = defineComponent({
  name: 'SelectTrigger',
  inheritAttrs: true,
  props: { radius: { type: String as PropType<Radius>, default: undefined } },
  setup(props, { attrs, slots }) {
    const ctx = useSelect('SelectTrigger');
    return () =>
      h(
        'button',
        {
          ...attrs,
          ref: (el) => (ctx.triggerRef.value = el as HTMLButtonElement | null),
          type: (attrs.type as string) ?? 'button',
          id: ctx.triggerId,
          role: 'combobox',
          'aria-haspopup': 'listbox',
          'aria-expanded': ctx.open.value,
          'aria-controls': ctx.open.value ? ctx.contentId : undefined,
          'data-state': ctx.open.value ? 'open' : 'closed',
          'data-disabled': ctx.disabled || undefined,
          'data-radius': props.radius,
          disabled: ctx.disabled,
          class: cn('bwo-select-trigger', attrs.class as string | undefined),
          onClick: () => ctx.setOpen(!ctx.open.value),
          onKeydown: (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              ctx.setOpen(true);
            }
          },
        },
        [
          slots.default?.(),
          h(
            'span',
            { class: 'bwo-select-icon', 'aria-hidden': 'true' },
            h(
              'svg',
              { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none' },
              h('path', {
                d: 'M6 9l6 6 6-6',
                stroke: 'currentColor',
                'stroke-width': 2,
                'stroke-linecap': 'round',
              }),
            ),
          ),
        ],
      );
  },
});

export const SelectContent = defineComponent({
  name: 'SelectContent',
  inheritAttrs: true,
  props: { sideOffset: { type: Number, default: 6 } },
  setup(props, { attrs, slots }) {
    const ctx = useSelect('SelectContent');
    const rect = useAnchorRect(ctx.triggerRef as Ref<Element | null>, ctx.open);
    const size = useFloatingSize(ctx.contentRef, ctx.open);
    const pos = ref<{ top: number; left: number; minWidth: number } | null>(null);

    watchEffect(() => {
      if (!ctx.open.value || !rect.value || size.value.width === 0) return;
      const p = computeFloating(
        rect.value,
        { width: rect.value.width, height: size.value.height || 200 },
        { side: 'bottom', align: 'start', sideOffset: props.sideOffset },
      );
      pos.value = { top: p.top, left: p.left, minWidth: rect.value.width };
    });

    useDismiss({
      enabled: ctx.open,
      refs: [ctx.contentRef, ctx.triggerRef as unknown as Ref<Element | null>],
      onDismiss: () => ctx.setOpen(false),
    });

    const move = (delta: number) => {
      const usable = ctx.items.value.filter((i) => !i.disabled);
      if (usable.length === 0) return;
      const i = usable.findIndex((it) => it.value === ctx.highlighted.value);
      const next = i === -1 ? (delta > 0 ? 0 : usable.length - 1) : (i + delta + usable.length) % usable.length;
      ctx.setHighlighted(usable[next]!.value);
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        move(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        move(-1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (ctx.highlighted.value !== null) {
          ctx.setValue(ctx.highlighted.value);
          ctx.setOpen(false);
          ctx.triggerRef.value?.focus();
        }
      } else if (e.key === 'Tab') {
        ctx.setOpen(false);
      }
    };

    return () =>
      ctx.open.value
        ? h(Portal, null, () =>
            h(
              'div',
              {
                ...attrs,
                ref: (el) => (ctx.contentRef.value = el as HTMLElement | null),
                role: 'listbox',
                id: ctx.contentId,
                'aria-labelledby': ctx.triggerId,
                'aria-activedescendant': ctx.highlighted.value
                  ? `${ctx.contentId}-opt-${ctx.highlighted.value}`
                  : undefined,
                tabindex: -1,
                'data-state': 'open',
                style: {
                  position: 'fixed',
                  top: `${pos.value?.top ?? -9999}px`,
                  left: `${pos.value?.left ?? -9999}px`,
                  minWidth: pos.value ? `${pos.value.minWidth}px` : undefined,
                  visibility: pos.value ? 'visible' : 'hidden',
                },
                class: cn('bwo-select-content', attrs.class as string | undefined),
                onKeydown,
              },
              h('div', { class: 'bwo-select-viewport' }, slots.default?.()),
            ),
          )
        : null;
  },
});

export const SelectGroup = defineComponent({
  name: 'SelectGroup',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'group',
          class: cn('bwo-select-group', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const SelectItem = defineComponent({
  name: 'SelectItem',
  inheritAttrs: true,
  props: {
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    const ctx = useSelect('SelectItem');
    const selected = computed(() => ctx.value.value === props.value);
    const highlighted = computed(() => ctx.highlighted.value === props.value);

    watchEffect((onCleanup) => {
      const nodes = slots.default?.();
      const first = nodes && nodes.length > 0 ? nodes[0] : undefined;
      const text =
        typeof first === 'string' ? first : (first?.children as string | undefined) ?? '';
      if (text) ctx.registerLabel(props.value, text);
      const entry = { value: props.value, disabled: props.disabled };
      ctx.items.value.push(entry);
      onCleanup(() => {
        const idx = ctx.items.value.indexOf(entry);
        if (idx >= 0) ctx.items.value.splice(idx, 1);
      });
    });

    const onSelect = () => {
      if (props.disabled) return;
      ctx.setValue(props.value);
      ctx.setOpen(false);
      ctx.triggerRef.value?.focus();
    };

    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'option',
          id: `${ctx.contentId}-opt-${props.value}`,
          'aria-selected': selected.value,
          'aria-disabled': props.disabled || undefined,
          'data-state': selected.value ? 'checked' : 'unchecked',
          'data-highlighted': highlighted.value || undefined,
          'data-disabled': props.disabled || undefined,
          class: cn('bwo-select-item', attrs.class as string | undefined),
          onPointerdown: (e: PointerEvent) => {
            e.preventDefault();
            onSelect();
          },
          onPointerenter: () => !props.disabled && ctx.setHighlighted(props.value),
        },
        [
          h('span', { class: 'bwo-select-item-text' }, slots.default?.()),
          selected.value
            ? h(
                'span',
                { class: 'bwo-select-item-indicator', 'data-state': 'checked' },
                h(
                  'svg',
                  { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none' },
                  h('path', {
                    d: 'M5 12l5 5L20 7',
                    stroke: 'currentColor',
                    'stroke-width': 2.5,
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                  }),
                ),
              )
            : null,
        ],
      );
  },
});
