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

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DialogPosition = 'center' | 'top';

interface DialogContext {
  open: Ref<boolean>;
  setOpen: (next: boolean) => void;
  triggerRef: Ref<HTMLElement | null>;
  contentRef: Ref<HTMLElement | null>;
  triggerId: string;
  contentId: string;
  titleId: string;
  descriptionId: string;
  modal: boolean;
}

const Key: InjectionKey<DialogContext> = Symbol('Dialog');

function useDialog(name: string): DialogContext {
  const ctx = inject(Key);
  if (!ctx) throw new Error(`${name} must be inside <DialogRoot>.`);
  return ctx;
}

export const DialogRoot = defineComponent({
  name: 'DialogRoot',
  props: {
    modelValue: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: false },
    modal: { type: Boolean, default: true },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const open = useControllable<boolean>(
      toRef(props, 'modelValue'),
      props.defaultOpen,
      (v) => emit('update:modelValue', v),
    );
    const triggerRef = ref<HTMLElement | null>(null);
    const contentRef = ref<HTMLElement | null>(null);
    const triggerId = useId();
    const contentId = useId();
    const titleId = useId();
    const descriptionId = useId();
    provide(Key, {
      open: computed(() => open.value) as unknown as Ref<boolean>,
      setOpen: (next: boolean) => (open.value = next),
      triggerRef,
      contentRef,
      triggerId,
      contentId,
      titleId,
      descriptionId,
      modal: props.modal,
    });
    return () => slots.default?.();
  },
});

export const DialogTrigger = defineComponent({
  name: 'DialogTrigger',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useDialog('DialogTrigger');
    return () =>
      h(
        'button',
        {
          ...attrs,
          ref: (el) => (ctx.triggerRef.value = el as HTMLElement | null),
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

export const DialogContent = defineComponent({
  name: 'DialogContent',
  inheritAttrs: true,
  props: {
    size: { type: String as PropType<DialogSize>, default: 'md' },
    position: { type: String as PropType<DialogPosition>, default: 'center' },
    unpadded: { type: Boolean, default: false },
    hideOverlay: { type: Boolean, default: false },
    hideClose: { type: Boolean, default: false },
    closeOnOverlayClick: { type: Boolean, default: true },
    closeOnEscape: { type: Boolean, default: true },
  },
  setup(props, { attrs, slots }) {
    const ctx = useDialog('DialogContent');
    const enabled = computed(() => ctx.open.value);
    useDismiss({
      enabled,
      refs: [ctx.contentRef],
      onDismiss: () => ctx.setOpen(false),
      escapeKey: props.closeOnEscape,
      outsidePointer: props.closeOnOverlayClick,
    });
    useFocusTrap({
      enabled: computed(() => ctx.open.value && ctx.modal) as unknown as Ref<boolean>,
      containerRef: ctx.contentRef,
      returnFocusTo: ctx.triggerRef,
    });
    useScrollLock(computed(() => ctx.open.value && ctx.modal) as unknown as Ref<boolean>);

    return () =>
      ctx.open.value
        ? h(Portal, null, () => [
            !props.hideOverlay
              ? h('div', { class: 'bwo-dialog-overlay', 'data-state': 'open', 'aria-hidden': 'true' })
              : null,
            h(
              'div',
              {
                ...attrs,
                ref: (el) => (ctx.contentRef.value = el as HTMLElement | null),
                role: 'dialog',
                'aria-modal': ctx.modal ? 'true' : undefined,
                'aria-labelledby': ctx.titleId,
                'aria-describedby': ctx.descriptionId,
                id: ctx.contentId,
                'data-state': 'open',
                'data-size': props.size,
                'data-position': props.position,
                tabindex: -1,
                class: cn(
                  'bwo-dialog-content',
                  `bwo-dialog-content--${props.size}`,
                  props.position !== 'center' && `bwo-dialog-content--${props.position}`,
                  props.unpadded && 'bwo-dialog-content--unpadded',
                  attrs.class as string | undefined,
                ),
              },
              [
                slots.default?.(),
                !props.hideClose
                  ? h(
                      'button',
                      {
                        type: 'button',
                        class: 'bwo-dialog-close',
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

export const DialogTitle = defineComponent({
  name: 'DialogTitle',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useDialog('DialogTitle');
    return () =>
      h('h2', { ...attrs, id: (attrs.id as string) ?? ctx.titleId, class: cn('bwo-dialog-title', attrs.class as string | undefined) }, slots.default?.());
  },
});

export const DialogDescription = defineComponent({
  name: 'DialogDescription',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useDialog('DialogDescription');
    return () =>
      h(
        'p',
        {
          ...attrs,
          id: (attrs.id as string) ?? ctx.descriptionId,
          class: cn('bwo-dialog-description', attrs.class as string | undefined),
        },
        slots.default?.(),
      );
  },
});

export const DialogHeader = defineComponent({
  name: 'DialogHeader',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, class: cn('bwo-dialog-header', attrs.class as string | undefined) },
        slots.default?.(),
      );
  },
});

export const DialogFooter = defineComponent({
  name: 'DialogFooter',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        'div',
        { ...attrs, class: cn('bwo-dialog-footer', attrs.class as string | undefined) },
        slots.default?.(),
      );
  },
});

export const DialogClose = defineComponent({
  name: 'DialogClose',
  inheritAttrs: true,
  setup(_, { attrs, slots }) {
    const ctx = useDialog('DialogClose');
    return () =>
      h(
        'button',
        { ...attrs, type: (attrs.type as string) ?? 'button', onClick: () => ctx.setOpen(false) },
        slots.default?.(),
      );
  },
});
