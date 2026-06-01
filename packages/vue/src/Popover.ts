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
  type Align,
  type Side,
} from './internal/floating';
import { Portal } from './internal/portal';
import { useControllable } from './internal/use-controllable';
import { useDismiss } from './internal/use-dismiss';
import { cn } from './utils';

interface PopoverContext {
  open: Ref<boolean>;
  setOpen: (next: boolean) => void;
  triggerRef: Ref<HTMLElement | null>;
  anchorRef: Ref<HTMLElement | null>;
  contentRef: Ref<HTMLElement | null>;
  triggerId: string;
  contentId: string;
}

const Key: InjectionKey<PopoverContext> = Symbol('Popover');

function usePopover(name: string): PopoverContext {
  const ctx = inject(Key);
  if (!ctx) throw new Error(`${name} must be inside <PopoverRoot>.`);
  return ctx;
}

export const PopoverRoot = defineComponent({
  name: 'PopoverRoot',
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const open = useControllable<boolean>(
      toRef(props, 'modelValue'),
      props.defaultOpen,
      (v) => emit('update:modelValue', v),
    );
    const triggerRef = ref<HTMLElement | null>(null);
    const anchorRef = ref<HTMLElement | null>(null);
    const contentRef = ref<HTMLElement | null>(null);
    provide(Key, {
      open: computed(() => open.value) as unknown as Ref<boolean>,
      setOpen: (next: boolean) => (open.value = next),
      triggerRef,
      anchorRef,
      contentRef,
      triggerId: useId(),
      contentId: useId(),
    });
    return () => slots.default?.();
  },
});

export const PopoverTrigger = defineComponent({
  name: 'PopoverTrigger',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = usePopover('PopoverTrigger');
    return () =>
      h(
        'button',
        {
          ...attrs,
          ref: (el) => {
            ctx.triggerRef.value = el as HTMLElement | null;
            if (!ctx.anchorRef.value) ctx.anchorRef.value = el as HTMLElement | null;
          },
          type: (attrs.type as string) ?? 'button',
          id: ctx.triggerId,
          'aria-haspopup': 'dialog',
          'aria-expanded': ctx.open.value,
          'aria-controls': ctx.open.value ? ctx.contentId : undefined,
          'data-state': ctx.open.value ? 'open' : 'closed',
          onClick: () => ctx.setOpen(!ctx.open.value),
        },
        slots.default?.(),
      );
  },
});

export const PopoverAnchor = defineComponent({
  name: 'PopoverAnchor',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = usePopover('PopoverAnchor');
    return () =>
      h(
        'div',
        { ...attrs, ref: (el) => (ctx.anchorRef.value = el as HTMLElement | null) },
        slots.default?.(),
      );
  },
});

export const PopoverContent = defineComponent({
  name: 'PopoverContent',
  inheritAttrs: true,
  props: {
    side: { type: String as PropType<Side>, default: 'bottom' },
    align: { type: String as PropType<Align>, default: 'center' },
    sideOffset: { type: Number, default: 6 },
    alignOffset: { type: Number, default: 0 },
  },
  setup(props, { attrs, slots }) {
    const ctx = usePopover('PopoverContent');
    const rect = useAnchorRect(ctx.anchorRef as Ref<Element | null>, ctx.open);
    const size = useFloatingSize(ctx.contentRef, ctx.open);
    const pos = ref<{ top: number; left: number; side: Side } | null>(null);

    watchEffect(() => {
      if (!ctx.open.value || !rect.value || size.value.width === 0) return;
      const p = computeFloating(rect.value, size.value, {
        side: props.side,
        align: props.align,
        sideOffset: props.sideOffset,
        alignOffset: props.alignOffset,
      });
      pos.value = { top: p.top, left: p.left, side: p.side };
    });

    useDismiss({
      enabled: ctx.open,
      refs: [ctx.contentRef, ctx.triggerRef],
      onDismiss: () => ctx.setOpen(false),
    });

    return () =>
      ctx.open.value
        ? h(Portal, null, () =>
            h(
              'div',
              {
                ...attrs,
                ref: (el) => (ctx.contentRef.value = el as HTMLElement | null),
                role: 'dialog',
                id: ctx.contentId,
                'aria-labelledby': ctx.triggerId,
                tabindex: -1,
                'data-state': 'open',
                'data-side': pos.value?.side ?? props.side,
                style: {
                  position: 'fixed',
                  top: `${pos.value?.top ?? -9999}px`,
                  left: `${pos.value?.left ?? -9999}px`,
                  visibility: pos.value ? 'visible' : 'hidden',
                },
                class: cn('bwo-popover', attrs.class as string | undefined),
              },
              slots.default?.(),
            ),
          )
        : null;
  },
});

export const PopoverClose = defineComponent({
  name: 'PopoverClose',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = usePopover('PopoverClose');
    return () =>
      h(
        'button',
        { ...attrs, type: (attrs.type as string) ?? 'button', onClick: () => ctx.setOpen(false) },
        slots.default?.(),
      );
  },
});
