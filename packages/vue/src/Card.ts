import { defineComponent, h } from 'vue';
import { cn } from './utils';

export const Card = defineComponent({
  name: 'Card',
  inheritAttrs: true,
  props: { interactive: { type: Boolean, default: false } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          class: cn(
            'bwo-card',
            props.interactive && 'bwo-card--interactive',
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
  },
});

const makeWrapper = (name: string, tag: string, baseClass: string) =>
  defineComponent({
    name,
    inheritAttrs: true,
    setup(_props, { slots, attrs }) {
      return () =>
        h(
          tag,
          { ...attrs, class: cn(baseClass, attrs.class as string | undefined) },
          slots.default?.(),
        );
    },
  });

export const CardHeader = makeWrapper('CardHeader', 'div', 'bwo-card-header');
export const CardTitle = makeWrapper('CardTitle', 'h3', 'bwo-card-title');
export const CardDescription = makeWrapper('CardDescription', 'p', 'bwo-card-description');
export const CardFooter = makeWrapper('CardFooter', 'div', 'bwo-card-footer');
