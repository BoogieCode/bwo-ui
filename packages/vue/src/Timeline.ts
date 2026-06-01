import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export type TimelineOrientation = 'vertical' | 'horizontal';
export type TimelineItemStatus = 'pending' | 'active' | 'completed' | 'error';

export const Timeline = defineComponent({
  name: 'Timeline',
  inheritAttrs: true,
  props: {
    orientation: { type: String as PropType<TimelineOrientation>, default: 'vertical' },
    align: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const align = props.align ?? (props.orientation === 'horizontal' ? 'bottom' : 'right');
    return () =>
      h(
        'ol',
        {
          ...attrs,
          'data-orientation': props.orientation,
          'data-align': align,
          class: cn(
            'bwo-timeline',
            `bwo-timeline--${props.orientation}`,
            `bwo-timeline--${align}`,
            attrs.class as string | undefined,
          ),
        },
        slots.default?.(),
      );
  },
});

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
                    ? h(
                        'svg',
                        { width: 10, height: 10, viewBox: '0 0 24 24', fill: 'none' },
                        h('path', {
                          d: 'M5 12l5 5L20 7',
                          stroke: 'currentColor',
                          'stroke-width': 3,
                          'stroke-linecap': 'round',
                          'stroke-linejoin': 'round',
                        }),
                      )
                    : null),
              ],
            ),
            !props.hideConnector
              ? h('div', { class: 'bwo-timeline-connector', 'aria-hidden': 'true' })
              : null,
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
