import { createReveal, type RevealOptions } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export const Reveal = defineComponent({
  name: 'Reveal',
  props: {
    as: { type: String, default: 'div' },
    direction: { type: String as PropType<RevealOptions['direction']>, default: undefined },
    duration: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    delay: { type: Number, default: undefined },
    start: { type: String, default: undefined },
    once: { type: Boolean, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const el = useMotion<HTMLElement>((node) =>
      createReveal(node, {
        direction: props.direction,
        duration: props.duration,
        ease: props.ease,
        delay: props.delay,
        start: props.start,
        once: props.once,
      }),
    );
    return () => h(props.as, { ...attrs, ref: el }, slots.default?.());
  },
});
