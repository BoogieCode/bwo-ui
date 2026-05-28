import { createMagneticCursor, type MagneticCursorOptions } from '@bwo-ui/core';
import { defineComponent, onBeforeUnmount, onMounted } from 'vue';

/**
 * Mount once at the root of your app to enable a custom magnetic cursor that
 * follows the pointer and grows on interactive elements. Renders nothing.
 *
 * No-ops on touch devices.
 */
export const MagneticCursor = defineComponent({
  name: 'MagneticCursor',
  props: {
    size: { type: Number, default: undefined },
    hoverSize: { type: Number, default: undefined },
    color: { type: String, default: undefined },
    hoverColor: { type: String, default: undefined },
    duration: { type: Number, default: undefined },
    hoverSelector: { type: String, default: undefined },
    hideNativeCursor: { type: Boolean, default: undefined },
  },
  setup(props) {
    let instance: { destroy: () => void } | undefined;
    onMounted(() => {
      const opts: MagneticCursorOptions = {
        size: props.size,
        hoverSize: props.hoverSize,
        color: props.color,
        hoverColor: props.hoverColor,
        duration: props.duration,
        hoverSelector: props.hoverSelector,
        hideNativeCursor: props.hideNativeCursor,
      };
      instance = createMagneticCursor(opts);
    });
    onBeforeUnmount(() => instance?.destroy());
    return () => null;
  },
});
