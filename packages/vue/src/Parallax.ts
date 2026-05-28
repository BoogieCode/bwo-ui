import { createParallax, type ParallaxOptions } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export const Parallax = defineComponent({
  name: 'Parallax',
  props: {
    as: { type: String, default: 'div' },
    speed: { type: Number, default: undefined },
    axis: { type: String as PropType<ParallaxOptions['axis']>, default: undefined },
    start: { type: String, default: undefined },
    end: { type: String, default: undefined },
    scrub: { type: [Boolean, Number], default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createParallax(node, {
        speed: props.speed,
        axis: props.axis,
        start: props.start,
        end: props.end,
        scrub: props.scrub,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
