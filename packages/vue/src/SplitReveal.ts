import { createSplitReveal, type SplitRevealOptions } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export const SplitReveal = defineComponent({
  name: 'SplitReveal',
  props: {
    as: { type: String, default: 'div' },
    type: { type: String as PropType<SplitRevealOptions['type']>, default: 'words' },
    stagger: { type: Number, default: undefined },
    duration: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    delay: { type: Number, default: undefined },
    scrub: { type: [Boolean, Number], default: undefined },
    once: { type: Boolean, default: undefined },
    start: { type: String, default: undefined },
    end: { type: String, default: undefined },
    mask: {
      type: [String, Boolean] as PropType<SplitRevealOptions['mask']>,
      default: undefined,
    },
    from: { type: Object as PropType<SplitRevealOptions['from']>, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createSplitReveal(node, {
        type: props.type,
        stagger: props.stagger,
        duration: props.duration,
        ease: props.ease,
        delay: props.delay,
        scrub: props.scrub,
        once: props.once,
        start: props.start,
        end: props.end,
        mask: props.mask,
        from: props.from,
      }),
    );

    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
