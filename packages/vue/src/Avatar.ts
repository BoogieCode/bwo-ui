import {
  defineComponent,
  h,
  onUnmounted,
  ref,
  watch,
  type PropType,
  type VNode,
} from 'vue';
import { cn } from './utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';

export const Avatar = defineComponent({
  name: 'Avatar',
  inheritAttrs: true,
  props: {
    size: { type: String as PropType<AvatarSize>, default: 'md' },
    shape: { type: String as PropType<AvatarShape>, default: 'circle' },
    src: { type: String, default: undefined },
    alt: { type: String, default: '' },
    fallback: { type: String, default: undefined },
    fallbackDelay: { type: Number, default: 300 },
  },
  setup(props, { attrs, slots }) {
    const status = ref<'idle' | 'loading' | 'loaded' | 'error'>(props.src ? 'loading' : 'idle');
    const showFallback = ref(!props.src);
    let timer: number | null = null;
    let cancel = false;

    const teardown = () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
      cancel = true;
    };

    watch(
      () => props.src,
      (src) => {
        teardown();
        cancel = false;
        if (!src) {
          status.value = 'idle';
          showFallback.value = true;
          return;
        }
        status.value = 'loading';
        showFallback.value = false;
        const img = new Image();
        img.onload = () => {
          if (!cancel) status.value = 'loaded';
        };
        img.onerror = () => {
          if (!cancel) status.value = 'error';
        };
        img.src = src;
        timer = window.setTimeout(() => {
          if (!cancel) showFallback.value = true;
        }, props.fallbackDelay);
      },
      { immediate: true },
    );

    onUnmounted(teardown);

    return () =>
      h(
        'span',
        {
          ...attrs,
          class: cn(
            'bwo-avatar',
            props.size !== 'md' && `bwo-avatar--${props.size}`,
            props.shape !== 'circle' && `bwo-avatar--${props.shape}`,
            attrs.class as string | undefined,
          ),
        },
        [
          props.src && status.value !== 'error'
            ? h('img', {
                src: props.src,
                alt: props.alt,
                'data-state': status.value,
                style: {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: status.value === 'loaded' ? 'block' : 'none',
                },
              })
            : null,
          (status.value !== 'loaded' && showFallback.value) || !props.src || status.value === 'error'
            ? h('span', { class: 'bwo-avatar-fallback' }, slots.default?.() ?? props.fallback)
            : null,
        ],
      );
  },
});

/* ─── AvatarGroup ──────────────────────────────────────────────────────── */

export const AvatarGroup = defineComponent({
  name: 'AvatarGroup',
  inheritAttrs: true,
  props: {
    max: { type: Number, default: undefined },
    size: { type: String as PropType<AvatarSize>, default: 'md' },
    shape: { type: String as PropType<AvatarShape>, default: 'circle' },
    total: { type: Number, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const all = (slots.default?.() ?? []) as VNode[];
      const items = all.filter((v) => v && typeof v === 'object' && v.type);
      const visible = props.max === undefined ? items : items.slice(0, props.max);
      const baseTotal = props.total ?? items.length;
      const overflow = Math.max(0, baseTotal - visible.length);

      const children: (VNode | null)[] = visible.map((v) => {
        const childProps =
          v.props && typeof v.props === 'object'
            ? { ...(v.props as Record<string, unknown>) }
            : {};
        if (!('size' in childProps)) childProps.size = props.size;
        if (!('shape' in childProps)) childProps.shape = props.shape;
        return h(v.type as never, childProps as never, v.children as never);
      });

      if (overflow > 0) {
        children.push(
          h(
            'span',
            {
              class: cn(
                'bwo-avatar',
                'bwo-avatar--overflow',
                props.size !== 'md' && `bwo-avatar--${props.size}`,
                props.shape !== 'circle' && `bwo-avatar--${props.shape}`,
              ),
              'aria-label': `${overflow} more`,
            },
            [h('span', { class: 'bwo-avatar-fallback' }, `+${overflow}`)],
          ),
        );
      }

      return h(
        'div',
        {
          ...attrs,
          class: cn(
            'bwo-avatar-group',
            props.size !== 'md' && `bwo-avatar-group--${props.size}`,
            attrs.class as string | undefined,
          ),
        },
        children,
      );
    };
  },
});
