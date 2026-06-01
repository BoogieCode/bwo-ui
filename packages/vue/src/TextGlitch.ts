import { createTextGlitch, type TextGlitchOptions } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export const TextGlitch = defineComponent({
  name: 'TextGlitch',
  props: {
    as: { type: String, default: 'span' },
    text: { type: String, default: undefined },
    fps: { type: Number, default: undefined },
    duration: { type: Number, default: undefined },
    trigger: { type: String as PropType<TextGlitchOptions['trigger']>, default: undefined },
    chars: { type: String, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const el = useMotion<HTMLElement>((node) =>
      createTextGlitch(node, {
        text: props.text,
        fps: props.fps,
        duration: props.duration,
        trigger: props.trigger,
        chars: props.chars,
      }),
    );
    return () => h(props.as, { ...attrs, ref: el }, slots.default?.());
  },
});
