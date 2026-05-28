import { createScrambleText, type ScrambleTextOptions } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export const ScrambleText = defineComponent({
  name: 'ScrambleText',
  props: {
    as: { type: String, default: 'span' },
    text: { type: String, default: undefined },
    chars: { type: String, default: undefined },
    duration: { type: Number, default: undefined },
    trigger: { type: String as PropType<ScrambleTextOptions['trigger']>, default: undefined },
    speed: { type: Number, default: undefined },
    once: { type: Boolean, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createScrambleText(node, {
        text: props.text,
        chars: props.chars,
        duration: props.duration,
        trigger: props.trigger,
        speed: props.speed,
        once: props.once,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
