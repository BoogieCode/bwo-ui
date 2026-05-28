import { createScrollProgress, type ScrollProgressOptions } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export const ScrollProgress = defineComponent({
  name: 'ScrollProgress',
  props: {
    as: { type: String, default: 'div' },
    start: { type: String, default: undefined },
    end: { type: String, default: undefined },
    axis: { type: String as PropType<ScrollProgressOptions['axis']>, default: undefined },
    origin: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createScrollProgress(node, {
        start: props.start,
        end: props.end,
        axis: props.axis,
        origin: props.origin,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
