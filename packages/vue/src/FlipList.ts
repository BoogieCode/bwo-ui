import {
  createFlipList,
  type FlipListInstance,
  type FlipListOptions,
} from '@bwo-ui/core';
import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type PropType,
} from 'vue';

export const FlipList = defineComponent({
  name: 'FlipList',
  props: {
    as: { type: String, default: 'div' },
    flipKey: { type: [String, Number], required: true },
    itemSelector: { type: String, default: undefined },
    duration: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    stagger: { type: Number, default: undefined },
    absolute: { type: Boolean, default: undefined },
  },
  setup(props, { slots, expose }) {
    const el = ref<HTMLElement | null>(null);
    let instance: FlipListInstance | undefined;

    const buildOptions = (): FlipListOptions => ({
      itemSelector: props.itemSelector,
      duration: props.duration,
      ease: props.ease,
      stagger: props.stagger,
      absolute: props.absolute,
    });

    onMounted(() => {
      if (!el.value) return;
      instance = createFlipList(el.value, buildOptions());
    });

    onBeforeUnmount(() => {
      instance?.destroy();
      instance = undefined;
    });

    // Capture before flipKey-driven render, commit after the DOM updates.
    watch(
      () => props.flipKey,
      async () => {
        instance?.capture();
        await nextTick();
        instance?.commit();
      },
    );

    expose({
      flip: (mutate: () => void) => instance?.flip(mutate),
      capture: () => instance?.capture(),
      commit: () => instance?.commit(),
    });

    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
