import {
  computed,
  defineComponent,
  h,
  onUnmounted,
  ref,
  toRef,
  watch,
  type PropType,
  type VNode,
} from 'vue';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

export const Carousel = defineComponent({
  name: 'Carousel',
  inheritAttrs: true,
  props: {
    modelValue: { type: Number, default: undefined },
    defaultIndex: { type: Number, default: 0 },
    showArrows: { type: Boolean, default: true },
    showDots: { type: Boolean, default: true },
    loop: { type: Boolean, default: true },
    autoplay: { type: Number, default: undefined },
    pauseOnHover: { type: Boolean, default: true },
    label: { type: String, default: 'Carousel' },
    aspectRatio: { type: String, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const index = useControllable<number>(
      toRef(props, 'modelValue'),
      props.defaultIndex,
      (v) => emit('update:modelValue', v),
    );
    const viewport = ref<HTMLElement | null>(null);
    const paused = ref(false);
    let timer: number | null = null;

    const slidesVNodes = computed<VNode[]>(() => (slots.default?.() ?? []) as VNode[]);
    const count = computed(() => slidesVNodes.value.length);

    const setActive = (next: number) => {
      const c = count.value;
      if (c === 0) return;
      const clamped = props.loop ? ((next % c) + c) % c : Math.max(0, Math.min(c - 1, next));
      index.value = clamped;
    };

    watch(index, () => {
      const vp = viewport.value;
      if (!vp) return;
      const target = vp.children[index.value] as HTMLElement | undefined;
      if (target) vp.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    });

    watch(
      [() => props.autoplay, paused, index, count],
      () => {
        if (timer !== null) {
          window.clearInterval(timer);
          timer = null;
        }
        if (!props.autoplay || props.autoplay <= 0 || paused.value || count.value <= 1) return;
        timer = window.setInterval(() => setActive(index.value + 1), props.autoplay);
      },
      { immediate: true },
    );

    onUnmounted(() => {
      if (timer !== null) window.clearInterval(timer);
    });

    return () =>
      h(
        'div',
        {
          class: cn('bwo-carousel', attrs.class as string | undefined),
          role: 'region',
          'aria-roledescription': 'carousel',
          'aria-label': props.label,
          onMouseenter: () => {
            if (props.pauseOnHover) paused.value = true;
          },
          onMouseleave: () => {
            if (props.pauseOnHover) paused.value = false;
          },
        },
        [
          h(
            'div',
            {
              ref: (el) => (viewport.value = el as HTMLElement | null),
              class: 'bwo-carousel-viewport',
              style: props.aspectRatio ? { aspectRatio: props.aspectRatio } : undefined,
            },
            slidesVNodes.value.map((slide, i) =>
              h(
                'div',
                {
                  key: i,
                  class: 'bwo-carousel-slide',
                  role: 'group',
                  'aria-roledescription': 'slide',
                  'aria-label': `Slide ${i + 1} of ${count.value}`,
                  'data-active': i === index.value || undefined,
                },
                slide,
              ),
            ),
          ),
          props.showArrows && count.value > 1
            ? h('button', {
                type: 'button',
                class: 'bwo-carousel-arrow bwo-carousel-arrow--prev',
                'aria-label': 'Previous slide',
                disabled: !props.loop && index.value === 0,
                onClick: () => setActive(index.value - 1),
                innerHTML:
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
              })
            : null,
          props.showArrows && count.value > 1
            ? h('button', {
                type: 'button',
                class: 'bwo-carousel-arrow bwo-carousel-arrow--next',
                'aria-label': 'Next slide',
                disabled: !props.loop && index.value === count.value - 1,
                onClick: () => setActive(index.value + 1),
                innerHTML:
                  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
              })
            : null,
          props.showDots && count.value > 1
            ? h(
                'div',
                { class: 'bwo-carousel-dots', role: 'tablist', 'aria-label': 'Slide indicators' },
                Array.from({ length: count.value }).map((_, i) =>
                  h('button', {
                    key: i,
                    type: 'button',
                    role: 'tab',
                    'aria-selected': i === index.value,
                    'aria-label': `Go to slide ${i + 1}`,
                    'data-active': i === index.value || undefined,
                    class: 'bwo-carousel-dot',
                    onClick: () => setActive(i),
                  }),
                ),
              )
            : null,
        ],
      );
  },
});
