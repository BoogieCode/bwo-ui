import {
  computed,
  defineComponent,
  h,
  inject,
  onUnmounted,
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
  type Side,
} from './internal/floating';
import { Portal } from './internal/portal';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

interface ProviderContext {
  delayDuration: number;
}
const ProviderKey: InjectionKey<ProviderContext> = Symbol('TooltipProvider');

export const TooltipProvider = defineComponent({
  name: 'TooltipProvider',
  props: { delayDuration: { type: Number, default: 200 } },
  setup(props, { slots }) {
    provide(ProviderKey, { delayDuration: props.delayDuration });
    return () => slots.default?.();
  },
});

interface TooltipContext {
  open: Ref<boolean>;
  show: () => void;
  hide: () => void;
  triggerRef: Ref<HTMLElement | null>;
  contentRef: Ref<HTMLElement | null>;
  triggerId: string;
  contentId: string;
}
const TooltipKey: InjectionKey<TooltipContext> = Symbol('Tooltip');

function useTooltipCtx(name: string): TooltipContext {
  const ctx = inject(TooltipKey);
  if (!ctx) throw new Error(`${name} must be inside <TooltipRoot>.`);
  return ctx;
}

export const TooltipRoot = defineComponent({
  name: 'TooltipRoot',
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: false },
    delayDuration: { type: Number, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const provider = inject(ProviderKey, { delayDuration: 200 });
    const delay = computed(() => props.delayDuration ?? provider.delayDuration);
    const open = useControllable<boolean>(
      toRef(props, 'modelValue'),
      props.defaultOpen,
      (v) => emit('update:modelValue', v),
    );
    const triggerRef = ref<HTMLElement | null>(null);
    const contentRef = ref<HTMLElement | null>(null);
    let timer: number | null = null;
    const clear = () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    };
    const show = () => {
      clear();
      timer = window.setTimeout(() => (open.value = true), delay.value);
    };
    const hide = () => {
      clear();
      open.value = false;
    };
    onUnmounted(clear);
    provide(TooltipKey, {
      open: computed(() => open.value) as unknown as Ref<boolean>,
      show,
      hide,
      triggerRef,
      contentRef,
      triggerId: useId(),
      contentId: useId(),
    });
    return () => slots.default?.();
  },
});

export const TooltipTrigger = defineComponent({
  name: 'TooltipTrigger',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useTooltipCtx('TooltipTrigger');
    return () =>
      h(
        'button',
        {
          ...attrs,
          ref: (el) => (ctx.triggerRef.value = el as HTMLElement | null),
          type: (attrs.type as string) ?? 'button',
          id: ctx.triggerId,
          'aria-describedby': ctx.open.value ? ctx.contentId : undefined,
          onMouseenter: ctx.show,
          onMouseleave: ctx.hide,
          onFocus: ctx.show,
          onBlur: ctx.hide,
          onPointerdown: ctx.hide,
        },
        slots.default?.(),
      );
  },
});

export const TooltipContent = defineComponent({
  name: 'TooltipContent',
  inheritAttrs: true,
  props: {
    side: { type: String as PropType<Side>, default: 'top' },
    sideOffset: { type: Number, default: 6 },
  },
  setup(props, { attrs, slots }) {
    const ctx = useTooltipCtx('TooltipContent');
    const rect = useAnchorRect(ctx.triggerRef as Ref<Element | null>, ctx.open);
    const size = useFloatingSize(ctx.contentRef, ctx.open);
    const pos = ref<{ top: number; left: number; side: Side } | null>(null);
    watchEffect(() => {
      if (!ctx.open.value || !rect.value || size.value.width === 0) return;
      const p = computeFloating(rect.value, size.value, {
        side: props.side,
        align: 'center',
        sideOffset: props.sideOffset,
      });
      pos.value = { top: p.top, left: p.left, side: p.side };
    });
    return () =>
      ctx.open.value
        ? h(Portal, null, () =>
            h(
              'div',
              {
                ...attrs,
                ref: (el) => (ctx.contentRef.value = el as HTMLElement | null),
                role: 'tooltip',
                id: ctx.contentId,
                'data-state': 'open',
                'data-side': pos.value?.side ?? props.side,
                style: {
                  position: 'fixed',
                  top: `${pos.value?.top ?? -9999}px`,
                  left: `${pos.value?.left ?? -9999}px`,
                  visibility: pos.value ? 'visible' : 'hidden',
                },
                class: cn('bwo-tooltip', attrs.class as string | undefined),
              },
              slots.default?.(),
            ),
          )
        : null;
  },
});

export const Tooltip = defineComponent({
  name: 'Tooltip',
  props: {
    content: { type: String, default: '' },
    delayDuration: { type: Number, default: 200 },
    side: { type: String as PropType<Side>, default: 'top' },
  },
  setup(props, { slots }) {
    return () =>
      h(TooltipProvider, { delayDuration: props.delayDuration }, () =>
        h(TooltipRoot, null, () => [
          h(TooltipTrigger, null, () => slots.default?.()),
          h(TooltipContent, { side: props.side }, () => props.content),
        ]),
      );
  },
});
