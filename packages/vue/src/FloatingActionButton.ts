import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export type FabSize = 'sm' | 'md' | 'lg';
export type FabVariant = 'primary' | 'accent' | 'surface';
export type FabPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'
  | 'bottom-center'
  | 'static';

export const FloatingActionButton = defineComponent({
  name: 'FloatingActionButton',
  inheritAttrs: true,
  props: {
    label: { type: String, default: undefined },
    size: { type: String as PropType<FabSize>, default: 'md' },
    variant: { type: String as PropType<FabVariant>, default: 'primary' },
    position: { type: String as PropType<FabPosition>, default: 'bottom-right' },
    offset: { type: Number, default: 24 },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const extended = Boolean(props.label || slots.default);
      return h(
        'button',
        {
          ...attrs,
          type: 'button',
          'data-position': props.position,
          'data-extended': extended || undefined,
          'aria-label':
            !extended && typeof props.label === 'string' ? props.label : (attrs['aria-label'] as string | undefined),
          class: cn(
            'bwo-fab',
            `bwo-fab--${props.size}`,
            `bwo-fab--${props.variant}`,
            extended && 'bwo-fab--extended',
            props.position !== 'static' && `bwo-fab--${props.position}`,
            attrs.class as string | undefined,
          ),
          style: {
            ...((attrs.style as Record<string, string>) ?? {}),
            ['--bwo-fab-offset' as string]: `${props.offset}px`,
          },
        },
        [
          slots.icon ? h('span', { class: 'bwo-fab-icon' }, slots.icon()) : null,
          extended ? h('span', { class: 'bwo-fab-label' }, props.label ?? slots.default?.()) : null,
        ],
      );
    };
  },
});

export const FAB = FloatingActionButton;
