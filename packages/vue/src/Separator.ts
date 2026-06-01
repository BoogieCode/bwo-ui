import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorVariant = 'solid' | 'dashed' | 'dotted';
export type SeparatorSize = 'sm' | 'md' | 'lg';
export type SeparatorTone = 'default' | 'muted' | 'strong';
export type SeparatorSpacing = 'none' | 'sm' | 'md' | 'lg';
export type SeparatorLabelAlign = 'start' | 'center' | 'end';

export const Separator = defineComponent({
  name: 'Separator',
  inheritAttrs: true,
  props: {
    orientation: {
      type: String as PropType<SeparatorOrientation>,
      default: 'horizontal',
    },
    variant: { type: String as PropType<SeparatorVariant>, default: 'solid' },
    size: { type: String as PropType<SeparatorSize>, default: 'sm' },
    tone: { type: String as PropType<SeparatorTone>, default: 'default' },
    spacing: { type: String as PropType<SeparatorSpacing>, default: 'none' },
    label: { type: String, default: undefined },
    labelAlign: {
      type: String as PropType<SeparatorLabelAlign>,
      default: 'center',
    },
    decorative: { type: Boolean, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const labelContent = slots.label?.() ?? props.label;
      const hasLabel = labelContent !== undefined && props.orientation === 'horizontal';
      const isDecorative = props.decorative ?? !hasLabel;

      const baseClass = cn(
        'bwo-separator',
        `bwo-separator--${props.orientation}`,
        props.variant !== 'solid' && `bwo-separator--${props.variant}`,
        props.size !== 'sm' && `bwo-separator--${props.size}`,
        props.tone !== 'default' && `bwo-separator--tone-${props.tone}`,
        props.spacing !== 'none' && `bwo-separator--space-${props.spacing}`,
        hasLabel && 'bwo-separator--labelled',
        attrs.class as string | undefined,
      );

      if (hasLabel) {
        return h(
          'div',
          {
            ...attrs,
            role: isDecorative ? undefined : 'separator',
            'aria-orientation': 'horizontal',
            'aria-hidden': isDecorative ? true : undefined,
            'data-label-align': props.labelAlign,
            class: baseClass,
          },
          [
            h('span', { class: 'bwo-separator-line', 'aria-hidden': true }),
            h('span', { class: 'bwo-separator-label' }, labelContent),
            h('span', { class: 'bwo-separator-line', 'aria-hidden': true }),
          ],
        );
      }

      return h('div', {
        ...attrs,
        role: isDecorative ? undefined : 'separator',
        'aria-orientation': props.orientation,
        'aria-hidden': isDecorative ? true : undefined,
        class: baseClass,
      });
    };
  },
});
