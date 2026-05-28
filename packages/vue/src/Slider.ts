import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui';
import { defineComponent, h, type PropType } from 'vue';
import { cn } from './utils';

export const Slider = defineComponent({
  name: 'Slider',
  inheritAttrs: true,
  props: {
    modelValue: { type: Array as PropType<number[]>, default: () => [50] },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        SliderRoot,
        {
          ...attrs,
          class: cn('bwo-slider', attrs.class as string | undefined),
          modelValue: props.modelValue,
          min: props.min,
          max: props.max,
          step: props.step,
          disabled: props.disabled,
          'onUpdate:modelValue': (v: number[] | undefined) =>
            emit('update:modelValue', v ?? []),
        },
        () => [
          h(SliderTrack, { class: 'bwo-slider-track' }, () =>
            h(SliderRange, { class: 'bwo-slider-range' }),
          ),
          ...props.modelValue.map((_, i) =>
            h(SliderThumb, { key: i, class: 'bwo-slider-thumb', 'aria-label': `Value ${i + 1}` }),
          ),
        ],
      );
  },
});
