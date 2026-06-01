import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export const Skeleton = defineComponent({
  name: 'Skeleton',
  inheritAttrs: true,
  props: {
    width: { type: [String, Number], default: undefined },
    height: { type: [String, Number], default: undefined },
    radius: { type: String, default: undefined },
    variant: {
      type: String as PropType<'rect' | 'circle' | 'text'>,
      default: 'rect',
    },
  },
  setup(props, { attrs }) {
    return () =>
      h('span', {
        ...attrs,
        class: cn(
          'bwo-skeleton',
          props.variant !== 'rect' && `bwo-skeleton--${props.variant}`,
          attrs.class as string | undefined,
        ),
        style: {
          width: typeof props.width === 'number' ? `${props.width}px` : props.width,
          height: typeof props.height === 'number' ? `${props.height}px` : props.height,
          borderRadius: props.radius,
        },
        'data-radius': props.radius,
      });
  },
});
