import { createGradientText, type GradientTextOptions } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export const GradientText = defineComponent({
  name: 'GradientText',
  props: {
    as: { type: String, default: 'span' },
    gradient: { type: String, default: undefined },
    duration: { type: Number, default: undefined },
    angle: { type: Number, default: undefined },
    size: { type: Number, default: undefined },
    direction: {
      type: String as PropType<GradientTextOptions['direction']>,
      default: undefined,
    },
    animate: { type: Boolean, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createGradientText(node, {
        gradient: props.gradient,
        duration: props.duration,
        angle: props.angle,
        size: props.size,
        direction: props.direction,
        animate: props.animate,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
