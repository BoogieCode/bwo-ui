import { defineComponent, h, Teleport } from 'vue';

export const Portal = defineComponent({
  name: 'Portal',
  props: {
    to: { type: [String, Object], default: 'body' },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      // Teleport's TS signature is overly strict in recent Vue versions; cast to any.
      h(Teleport as unknown as string, { to: props.to as any, disabled: props.disabled }, slots.default?.());
  },
});
