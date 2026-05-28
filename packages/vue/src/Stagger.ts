import { createStagger, type StaggerOptions } from '@bwo-ui/core';
import { defineComponent, h, type PropType } from 'vue';
import { useMotion } from './use-motion';

export const Stagger = defineComponent({
  name: 'Stagger',
  props: {
    as: { type: String, default: 'div' },
    itemSelector: { type: String, default: undefined },
    duration: { type: Number, default: undefined },
    stagger: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    start: { type: String, default: undefined },
    end: { type: String, default: undefined },
    scrub: { type: [Boolean, Number], default: undefined },
    once: { type: Boolean, default: undefined },
    delay: { type: Number, default: undefined },
    from: { type: Object as PropType<StaggerOptions['from']>, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createStagger(node, {
        itemSelector: props.itemSelector,
        duration: props.duration,
        stagger: props.stagger,
        ease: props.ease,
        start: props.start,
        end: props.end,
        scrub: props.scrub,
        once: props.once,
        delay: props.delay,
        from: props.from,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
