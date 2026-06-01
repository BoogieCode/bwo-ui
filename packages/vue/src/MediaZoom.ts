import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const MediaZoom = defineComponent({
  name: 'MediaZoom',
  inheritAttrs: true,
  props: {
    as: { type: String, default: 'div' },
    scale: { type: Number, default: 1.06 },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        props.as,
        {
          ...attrs,
          class: cn('bwo-media-zoom', attrs.class as string | undefined),
          style: {
            ...((attrs.style as Record<string, string>) ?? {}),
            overflow: 'hidden',
            ['--bwo-media-zoom-scale' as string]: String(props.scale),
          },
        },
        slots.default?.(),
      );
  },
});
