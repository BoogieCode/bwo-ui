import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export const Alert = defineComponent({
  name: 'Alert',
  inheritAttrs: true,
  props: {
    variant: { type: String as PropType<AlertVariant>, default: 'info' },
    title: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...attrs,
          role: 'alert',
          'data-variant': props.variant,
          class: cn(
            'bwo-alert',
            `bwo-alert--${props.variant}`,
            attrs.class as string | undefined,
          ),
        },
        [
          props.title ? h('div', { class: 'bwo-alert-title' }, props.title) : null,
          slots.default ? h('div', { class: 'bwo-alert-body' }, slots.default()) : null,
        ],
      );
  },
});
