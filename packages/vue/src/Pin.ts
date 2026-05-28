import { createPin } from '@bwo-ui/core';
import { defineComponent, h } from 'vue';
import { useMotion } from './use-motion';

export const Pin = defineComponent({
  name: 'Pin',
  props: {
    as: { type: String, default: 'div' },
    start: { type: String, default: undefined },
    end: { type: String, default: undefined },
    pinSpacing: { type: Boolean, default: undefined },
    enableMedia: { type: String, default: undefined },
    anticipatePin: { type: Number, default: undefined },
  },
  setup(props, { slots }) {
    const el = useMotion<HTMLElement>((node) =>
      createPin(node, {
        start: props.start,
        end: props.end,
        pinSpacing: props.pinSpacing,
        enableMedia: props.enableMedia,
        anticipatePin: props.anticipatePin,
      }),
    );
    return () => h(props.as, { ref: el }, slots.default?.());
  },
});
