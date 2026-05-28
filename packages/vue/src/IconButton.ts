import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export type IconButtonVariant = 'primary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export const IconButton = defineComponent({
  name: 'IconButton',
  inheritAttrs: true,
  props: {
    variant: { type: String as PropType<IconButtonVariant>, default: 'primary' },
    size: { type: String as PropType<IconButtonSize>, default: 'md' },
    type: { type: String, default: 'button' },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'button',
        {
          ...attrs,
          type: props.type,
          class: cn(
            'bwo-icon-btn',
            props.variant !== 'primary' && `bwo-icon-btn--${props.variant}`,
            props.size !== 'md' && `bwo-icon-btn--${props.size}`,
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
  },
});
