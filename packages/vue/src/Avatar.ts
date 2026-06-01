import { defineComponent, h, onUnmounted, ref, watch, type PropType } from 'vue';
import { cn } from './utils';

export type AvatarSize = 'sm' | 'md' | 'lg';

export const Avatar = defineComponent({
  name: 'Avatar',
  inheritAttrs: true,
  props: {
    size: { type: String as PropType<AvatarSize>, default: 'md' },
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
