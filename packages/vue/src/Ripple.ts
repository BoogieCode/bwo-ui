import { createRipple } from '@bwo-ui/core';
import { defineComponent, h } from 'vue';
import { useMotion } from './use-motion';

export const Ripple = defineComponent({
  name: 'Ripple',
  props: {
    as: { type: String, default: 'div' },
    color: { type: String, default: undefined },
    duration: { type: Number, default: undefined },
    opacity: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    respectDisabled: { type: Boolean, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createRipple(node, {
        color: props.color,
        duration: props.duration,
        opacity: props.opacity,
        ease: props.ease,
        respectDisabled: props.respectDisabled,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
