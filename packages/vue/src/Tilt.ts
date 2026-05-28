import { createTilt } from '@bwo-ui/core';
import { defineComponent, h } from 'vue';
import { useMotion } from './use-motion';

export const Tilt = defineComponent({
  name: 'Tilt',
  props: {
    as: { type: String, default: 'div' },
    max: { type: Number, default: undefined },
    perspective: { type: Number, default: undefined },
    scale: { type: Number, default: undefined },
    duration: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    reverse: { type: Boolean, default: undefined },
    glareSelector: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createTilt(node, {
        max: props.max,
        perspective: props.perspective,
        scale: props.scale,
        duration: props.duration,
        ease: props.ease,
        reverse: props.reverse,
        glareSelector: props.glareSelector,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
