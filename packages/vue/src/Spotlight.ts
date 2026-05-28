import { createSpotlight } from '@bwo-ui/core';
import { defineComponent, h } from 'vue';
import { useMotion } from './use-motion';

export const Spotlight = defineComponent({
  name: 'Spotlight',
  props: {
    as: { type: String, default: 'div' },
    size: { type: Number, default: undefined },
    color: { type: String, default: undefined },
    duration: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    hideOnLeave: { type: Boolean, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createSpotlight(node, {
        size: props.size,
        color: props.color,
        duration: props.duration,
        ease: props.ease,
        hideOnLeave: props.hideOnLeave,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
