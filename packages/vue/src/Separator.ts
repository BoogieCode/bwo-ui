import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export const Separator = defineComponent({
  name: 'Separator',
  inheritAttrs: true,
  props: {
    orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'horizontal' },
    decorative: { type: Boolean, default: true },
  },
  setup(props, { attrs }) {
    return () =>
      h('div', {
        ...attrs,
        role: props.decorative ? 'none' : 'separator',
        'aria-orientation': props.decorative ? undefined : props.orientation,
        'data-orientation': props.orientation,
        class: cn(
          'bwo-separator',
          props.orientation === 'vertical' && 'bwo-separator--vertical',
          attrs.class as string | undefined,
        ),
      });
  },
});
