import { defineComponent, h, type PropType } from 'vue';
import { cn, type Radius } from './utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export type AlertAppearance = 'soft' | 'solid' | 'outline';

const URGENT_VARIANTS: ReadonlySet<AlertVariant> = new Set(['warning', 'error']);

function defaultIcon(variant: AlertVariant) {
  if (variant === 'success') {
    return h(
      'svg',
      { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' },
      [
        h('circle', { cx: 12, cy: 12, r: 10, fill: 'currentColor', opacity: 0.18 }),
        h('path', {
          d: 'M8 12.5l2.5 2.5L16 9.5',
          stroke: 'currentColor',
          'stroke-width': 2,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ],
    );
  }
  if (variant === 'warning' || variant === 'error') {
    return h(
      'svg',
      { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' },
      [
        h('circle', { cx: 12, cy: 12, r: 10, fill: 'currentColor', opacity: 0.18 }),
        h('path', { d: 'M12 8v5', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
        h('circle', { cx: 12, cy: 16, r: 1, fill: 'currentColor' }),
      ],
    );
  }
  return h(
    'svg',
    { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' },
    [
      h('circle', { cx: 12, cy: 12, r: 10, fill: 'currentColor', opacity: 0.18 }),
      h('path', { d: 'M12 11v5', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      h('circle', { cx: 12, cy: 8, r: 1, fill: 'currentColor' }),
    ],
  );
}

export const Alert = defineComponent({
  name: 'Alert',
  inheritAttrs: true,
  emits: ['dismiss'],
  props: {
    variant: { type: String as PropType<AlertVariant>, default: 'info' },
    appearance: { type: String as PropType<AlertAppearance>, default: 'soft' },
    title: { type: String, default: undefined },
    radius: { type: String as PropType<Radius>, default: undefined },
    dismissible: { type: Boolean, default: false },
    urgent: { type: Boolean, default: undefined },
  },
  setup(props, { attrs, slots, emit }) {
    return () => {
      const isUrgent = props.urgent ?? URGENT_VARIANTS.has(props.variant);
      return h(
        'div',
        {
          ...attrs,
          role: isUrgent ? 'alert' : 'status',
          'aria-live': isUrgent ? 'assertive' : 'polite',
          'data-radius': props.radius,
          'data-appearance': props.appearance,
          class: cn(
            'bwo-alert',
            `bwo-alert--${props.variant}`,
            props.appearance !== 'soft' && `bwo-alert--${props.appearance}`,
            attrs.class as string | undefined,
          ),
        },
        [
          h(
            'span',
            { class: 'bwo-alert-icon', 'aria-hidden': true },
            slots.icon ? slots.icon() : defaultIcon(props.variant),
          ),
          h('div', { class: 'bwo-alert-body' }, [
            props.title ? h('div', { class: 'bwo-alert-title' }, props.title) : null,
            slots.default ? h('div', { class: 'bwo-alert-description' }, slots.default()) : null,
            slots.actions ? h('div', { class: 'bwo-alert-actions' }, slots.actions()) : null,
          ]),
          props.dismissible
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'bwo-alert-close',
                  'aria-label': 'Dismiss',
                  onClick: () => emit('dismiss'),
                },
                h(
                  'svg',
                  { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none' },
                  h('path', {
                    d: 'M6 6l12 12M6 18L18 6',
                    stroke: 'currentColor',
                    'stroke-width': 2,
                    'stroke-linecap': 'round',
                  }),
                ),
              )
            : null,
        ],
      );
    };
  },
});
