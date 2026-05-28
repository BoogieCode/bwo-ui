import { createMarquee, type MarqueeOptions } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export const Marquee = defineComponent({
  name: 'Marquee',
  props: {
    as: { type: String, default: 'div' },
    speed: { type: Number, default: undefined },
    direction: {
      type: String as PropType<MarqueeOptions['direction']>,
      default: undefined,
    },
    draggable: { type: Boolean, default: undefined },
    pauseOnHover: { type: Boolean, default: undefined },
    itemSelector: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createMarquee(node, {
        speed: props.speed,
        direction: props.direction,
        draggable: props.draggable,
        pauseOnHover: props.pauseOnHover,
        itemSelector: props.itemSelector,
      }),
    );

    return () =>
      h(props.as, { ref: el, style: { overflow: 'hidden' } }, slots.default?.());
  },
});
