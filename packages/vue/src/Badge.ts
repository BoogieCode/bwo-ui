import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export type BadgeVariant = 'default' | 'solid' | 'green' | 'yellow' | 'red' | 'soft';

export const Badge = defineComponent({
  name: 'Badge',
  inheritAttrs: true,
  props: {
    variant: { type: String as PropType<BadgeVariant>, default: 'default' },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          class: cn(
            'bwo-badge',
            props.variant !== 'default' && `bwo-badge--${props.variant}`,
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
  },
});
