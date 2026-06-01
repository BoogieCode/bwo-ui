import { createCountUp } from '@bwo-ui/core';
import { defineComponent, h } from 'vue';
import { useMotion } from './use-motion';

export const CountUp = defineComponent({
  name: 'CountUp',
  props: {
    as: { type: String, default: 'span' },
    from: { type: Number, default: undefined },
    to: { type: Number, required: true },
    duration: { type: Number, default: undefined },
    ease: { type: String, default: undefined },
    separator: { type: String, default: undefined },
    decimals: { type: Number, default: undefined },
    prefix: { type: String, default: undefined },
    suffix: { type: String, default: undefined },
  },
  setup(props, { attrs }) {
    const el = useMotion<HTMLElement>((node) =>
      createCountUp(node, {
        from: props.from,
        to: props.to,
        duration: props.duration,
        ease: props.ease,
        separator: props.separator,
        decimals: props.decimals,
        prefix: props.prefix,
        suffix: props.suffix,
      }),
    );
    return () => h(props.as, { ...attrs, ref: el });
  },
});
