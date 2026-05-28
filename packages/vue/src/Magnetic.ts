import { createMagnetic } from '@bwo-ui/core';
import { defineComponent, h } from 'vue';
import { useMotion } from './use-motion';

export const Magnetic = defineComponent({
  name: 'Magnetic',
  props: {
    as: { type: String, default: 'span' },
    strength: { type: Number, default: undefined },
    radius: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    duration: { type: Number, default: undefined },
    child: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createMagnetic(node, {
        strength: props.strength,
        radius: props.radius,
        ease: props.ease,
        duration: props.duration,
        child: props.child,
      }),
    );

    return () =>
      h(props.as, { ref: el, style: { display: 'inline-block' } }, slots.default?.());
  },
});
