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
import { Portal } from './internal/portal';
import { useControllable } from './internal/use-controllable';
import { useDismiss } from './internal/use-dismiss';
import { useFocusTrap } from './internal/use-focus-trap';
import { useScrollLock } from './internal/scroll-lock';
import { cn } from './utils';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

interface SheetContext {
  open: Ref<boolean>;
  setOpen: (v: boolean) => void;
  triggerRef: Ref<HTMLElement | null>;
  contentRef: Ref<HTMLElement | null>;
  titleId: string;
  descriptionId: string;
}
const Key: InjectionKey<SheetContext> = Symbol('Sheet');

function useSheet(name: string): SheetContext {
  const ctx = inject(Key);
  if (!ctx) throw new Error(`${name} must be inside <SheetRoot>.`);
  return ctx;
}

export const SheetRoot = defineComponent({
  name: 'SheetRoot',
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
    provide(Key, {
      open: computed(() => open.value) as unknown as Ref<boolean>,
      setOpen: (v: boolean) => (open.value = v),
      triggerRef: ref<HTMLElement | null>(null),
      contentRef: ref<HTMLElement | null>(null),
      titleId: useId(),
      descriptionId: useId(),
    });
    return () => slots.default?.();
  },
});

export const SheetTrigger = defineComponent({
  name: 'SheetTrigger',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useSheet('SheetTrigger');
    return () =>
      h(
        'button',
        {
          ...attrs,
          ref: (el) => (ctx.triggerRef.value = el as HTMLElement | null),
          type: (attrs.type as string) ?? 'button',
          'data-state': ctx.open.value ? 'open' : 'closed',
          onClick: () => ctx.setOpen(!ctx.open.value),
        },
        slots.default?.(),
      );
  },
});

export const SheetContent = defineComponent({
  name: 'SheetContent',
  inheritAttrs: true,
  props: {
    side: { type: String as PropType<SheetSide>, default: 'right' },
    showClose: { type: Boolean, default: true },
  },
  setup(props, { attrs, slots }) {
    const ctx = useSheet('SheetContent');
    useDismiss({ enabled: ctx.open, refs: [ctx.contentRef], onDismiss: () => ctx.setOpen(false) });
    useFocusTrap({
      enabled: ctx.open,
      containerRef: ctx.contentRef,
      returnFocusTo: ctx.triggerRef,
    });
    useScrollLock(ctx.open);
    return () =>
      ctx.open.value
        ? h(Portal, null, () => [
            h('div', { class: 'bwo-sheet-overlay', 'data-state': 'open', 'aria-hidden': 'true' }),
            h(
              'div',
              {
                ...attrs,
                ref: (el) => (ctx.contentRef.value = el as HTMLElement | null),
                role: 'dialog',
                'aria-modal': 'true',
                'aria-labelledby': ctx.titleId,
                'aria-describedby': ctx.descriptionId,
                tabindex: -1,
                'data-state': 'open',
                'data-side': props.side,
                class: cn(
                  'bwo-sheet',
                  `bwo-sheet--${props.side}`,
                  attrs.class as string | undefined,
                ),
              },
              [
                slots.default?.(),
                props.showClose
                  ? h(
                      'button',
                      {
                        type: 'button',
                        class: 'bwo-sheet-close',
                        'aria-label': 'Close',
                        onClick: () => ctx.setOpen(false),
                      },
                      h(
                        'svg',
                        { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none' },
                        h('path', {
                          d: 'M6 6l12 12M6 18L18 6',
                          stroke: 'currentColor',
                          'stroke-width': 2,
                          'stroke-linecap': 'round',
                        }),
                      ),
                    )
                  : null,
              ],
            ),
          ])
        : null;
  },
});

export const SheetTitle = defineComponent({
  name: 'SheetTitle',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useSheet('SheetTitle');
    return () =>
      h(
        'h2',
        {
          ...attrs,
          id: (attrs.id as string) ?? ctx.titleId,
          class: cn('bwo-sheet-title', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const SheetDescription = defineComponent({
  name: 'SheetDescription',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useSheet('SheetDescription');
    return () =>
      h(
        'p',
        {
          ...attrs,
          id: (attrs.id as string) ?? ctx.descriptionId,
          class: cn('bwo-sheet-desc', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const SheetHeader = defineComponent({
  name: 'SheetHeader',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, class: cn('bwo-sheet-header', attrs.class as string | undefined) },
        slots.default?.(),
      );
  },
});

export const SheetFooter = defineComponent({
  name: 'SheetFooter',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, class: cn('bwo-sheet-footer', attrs.class as string | undefined) },
        slots.default?.(),
      );
  },
});

export const SheetClose = defineComponent({
  name: 'SheetClose',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useSheet('SheetClose');
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: (attrs.type as string) ?? 'button',
          onClick: () => ctx.setOpen(false),
        },
        slots.default?.(),
      );
  },
});
