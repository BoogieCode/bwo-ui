import {
  SelectContent as RekaSelectContent,
  SelectGroup as RekaSelectGroup,
  SelectIcon as RekaSelectIcon,
  SelectItem as RekaSelectItem,
  SelectItemIndicator as RekaSelectItemIndicator,
  SelectItemText as RekaSelectItemText,
  SelectPortal as RekaSelectPortal,
  SelectRoot as RekaSelectRoot,
  SelectTrigger as RekaSelectTrigger,
  SelectValue as RekaSelectValue,
  SelectViewport as RekaSelectViewport,
} from 'reka-ui';
import { defineComponent, h, type PropType } from 'vue';
import { cn, type Radius } from './utils';

type SelectPosition = 'popper' | 'item-aligned';

/**
 * <SelectRoot>: thin wrapper around reka-ui's SelectRoot.
 * Usage:
 *   <SelectRoot v-model="value">
 *     <SelectTrigger><SelectValue placeholder="Pick…" /></SelectTrigger>
 *     <SelectContent>
 *       <SelectItem value="apple">Apple</SelectItem>
 *     </SelectContent>
 *   </SelectRoot>
 */
export const SelectRoot = RekaSelectRoot;
export const SelectGroup = RekaSelectGroup;
export const SelectValue = RekaSelectValue;

export const SelectTrigger = defineComponent({
  name: 'SelectTrigger',
  inheritAttrs: true,
  props: {
    radius: { type: String as PropType<Radius>, default: undefined },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RekaSelectTrigger,
        {
          ...attrs,
          'data-radius': props.radius,
          class: cn('bwo-select-trigger', attrs.class as string | undefined),
        },
        () => [
          slots.default?.(),
          h(RekaSelectIcon, { class: 'bwo-select-icon' }, () =>
            h(
              'svg',
              { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none' },
              h('path', {
                d: 'M6 9l6 6 6-6',
                stroke: 'currentColor',
                'stroke-width': 2,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
              }),
            ),
          ),
        ],
      );
  },
});

export const SelectContent = defineComponent({
  name: 'SelectContent',
  inheritAttrs: true,
  props: {
    position: { type: String as PropType<SelectPosition>, default: 'popper' },
    sideOffset: { type: Number, default: 6 },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(RekaSelectPortal, null, () =>
        h(
          RekaSelectContent,
          {
            ...attrs,
            class: cn('bwo-select-content', attrs.class as string | undefined),
            position: props.position,
            sideOffset: props.sideOffset,
          },
          () => h(RekaSelectViewport, null, () => slots.default?.()),
        ),
      );
  },
});

export const SelectItem = defineComponent({
  name: 'SelectItem',
  inheritAttrs: true,
  props: { value: { type: String, required: true } },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        RekaSelectItem,
        {
          ...attrs,
          class: cn('bwo-select-item', attrs.class as string | undefined),
          value: props.value,
        },
        () => [
          h(RekaSelectItemText, null, () => slots.default?.()),
          h(RekaSelectItemIndicator, { class: 'bwo-select-item-indicator' }, () =>
            h(
              'svg',
              { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none' },
              h('path', {
                d: 'M5 12l5 5L20 7',
                stroke: 'currentColor',
                'stroke-width': 2.5,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
              }),
            ),
          ),
        ],
      );
  },
});
