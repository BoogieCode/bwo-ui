import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export type TimelineOrientation = 'vertical' | 'horizontal';
export type TimelineAlign = 'left' | 'right' | 'top' | 'bottom';
export type TimelineSize = 'sm' | 'md' | 'lg';
export type TimelineConnectorStyle = 'solid' | 'dashed' | 'dotted';
export type TimelineItemStatus = 'pending' | 'active' | 'completed' | 'error';

export const Timeline = defineComponent({
  name: 'Timeline',
  inheritAttrs: true,
  props: {
    orientation: { type: String as PropType<TimelineOrientation>, default: 'vertical' },
    align: { type: String as PropType<TimelineAlign>, default: undefined },
    size: { type: String as PropType<TimelineSize>, default: 'md' },
    connectorStyle: {
      type: String as PropType<TimelineConnectorStyle>,
      default: 'solid',
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const align: TimelineAlign =
        props.align ?? (props.orientation === 'horizontal' ? 'bottom' : 'right');
      return h(
        'ol',
        {
          ...attrs,
          'data-orientation': props.orientation,
          'data-align': align,
          class: cn(
            'bwo-timeline',
            `bwo-timeline--${props.orientation}`,
            `bwo-timeline--${align}`,
            props.size !== 'md' && `bwo-timeline--${props.size}`,
            props.connectorStyle !== 'solid' && `bwo-timeline--${props.connectorStyle}`,
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
    };
  },
});

function checkIcon() {
  return h(
    'svg',
    { width: '60%', height: '60%', viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
    h('path', {
      d: 'M5 12l5 5L20 7',
      stroke: 'currentColor',
      'stroke-width': 3,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    }),
  );
}
function xIcon() {
  return h(
    'svg',
    { width: '60%', height: '60%', viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
    h('path', {
      d: 'M6 6l12 12M6 18L18 6',
      stroke: 'currentColor',
      'stroke-width': 3,
      'stroke-linecap': 'round',
    }),
  );
}

export const TimelineItem = defineComponent({
  name: 'TimelineItem',
  inheritAttrs: true,
  props: {
    status: { type: String as PropType<TimelineItemStatus>, default: 'pending' },
    title: { type: String, default: undefined },
    time: { type: String, default: undefined },
    hideConnector: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'li',
        {
          ...attrs,
          'data-status': props.status,
          'data-no-connector': props.hideConnector || undefined,
          class: cn(
            'bwo-timeline-item',
            `bwo-timeline-item--${props.status}`,
            attrs.class as string | undefined,
          ),
        },
        [
          h('div', { class: 'bwo-timeline-axis' }, [
            h(
              'div',
              { class: 'bwo-timeline-marker' },
              [
                slots.marker?.() ??
                  (props.status === 'completed'
                    ? checkIcon()
                    : props.status === 'error'
                      ? xIcon()
                      : null),
              ],
            ),
          ]),
          h('div', { class: 'bwo-timeline-content' }, [
            props.time ? h('div', { class: 'bwo-timeline-time' }, props.time) : null,
            props.title ? h('div', { class: 'bwo-timeline-title' }, props.title) : null,
            slots.default ? h('div', { class: 'bwo-timeline-body' }, slots.default()) : null,
          ]),
        ],
      );
  },
});
