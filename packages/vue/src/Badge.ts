import { defineComponent, h, type PropType } from 'vue';
import { cn, type Radius } from './utils';

export type BadgeVariant = 'default' | 'solid' | 'green' | 'yellow' | 'red' | 'soft';
export type BadgeSize = 'sm' | 'md' | 'lg';

export const Badge = defineComponent({
  name: 'Badge',
  inheritAttrs: true,
  props: {
    variant: { type: String as PropType<BadgeVariant>, default: 'default' },
    size: { type: String as PropType<BadgeSize>, default: 'md' },
    radius: { type: String as PropType<Radius>, default: undefined },
    dot: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'span',
        {
          ...attrs,
          'data-radius': props.radius,
          'data-dot': props.dot ? '' : undefined,
          class: cn(
            'bwo-badge',
            props.variant !== 'default' && `bwo-badge--${props.variant}`,
            props.size !== 'md' && `bwo-badge--${props.size}`,
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
  },
});
