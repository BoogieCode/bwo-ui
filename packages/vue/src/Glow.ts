import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export const Glow = defineComponent({
  name: 'Glow',
  inheritAttrs: true,
  props: {
    as: { type: String, default: 'div' },
    variant: {
      type: String as PropType<'default' | 'subtle' | 'bold'>,
      default: 'default',
    },
    color: { type: String, default: undefined },
    intensity: { type: Number, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        props.as,
        {
          ...attrs,
          class: cn(
            'bwo-glow',
            `bwo-glow--${props.variant}`,
            attrs.class as string | undefined,
          ),
          style: {
            ...((attrs.style as Record<string, string>) ?? {}),
            ['--bwo-glow-color' as string]: props.color,
            ['--bwo-glow-intensity' as string]:
              props.intensity !== undefined ? String(props.intensity) : undefined,
          },
        },
        slots.default?.(),
      );
  },
});
