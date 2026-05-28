import { defineComponent, h, type PropType } from 'vue';
import { cn, type Radius } from './utils';

export type ButtonVariant = 'primary' | 'green' | 'yellow' | 'ghost' | 'outline' | 'solid';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const Button = defineComponent({
  name: 'Button',
  inheritAttrs: true,
  props: {
    variant: { type: String as PropType<ButtonVariant>, default: 'primary' },
    size: { type: String as PropType<ButtonSize>, default: 'md' },
    radius: { type: String as PropType<Radius>, default: undefined },
    type: { type: String, default: 'button' },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: props.type,
          'data-radius': props.radius,
          class: cn(
            'bwo-btn',
            props.variant !== 'primary' && `bwo-btn--${props.variant}`,
            props.size !== 'md' && `bwo-btn--${props.size}`,
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
  },
});
