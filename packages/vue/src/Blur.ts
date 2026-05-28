import { createBlur } from '@bwo-ui/core';
import { defineComponent, h } from 'vue';
import { useMotion } from './use-motion';

export const Blur = defineComponent({
  name: 'Blur',
  props: {
    as: { type: String, default: 'div' },
    from: { type: Number, default: undefined },
    to: { type: Number, default: undefined },
    fade: { type: Boolean, default: undefined },
    duration: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    start: { type: String, default: undefined },
    end: { type: String, default: undefined },
    scrub: { type: [Boolean, Number], default: undefined },
    once: { type: Boolean, default: undefined },
    delay: { type: Number, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createBlur(node, {
        from: props.from,
        to: props.to,
        fade: props.fade,
        duration: props.duration,
        ease: props.ease,
        start: props.start,
        end: props.end,
        scrub: props.scrub,
        once: props.once,
        delay: props.delay,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
