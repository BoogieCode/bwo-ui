import { computed, defineComponent, h, type PropType } from 'vue';
import { cn, type Radius } from './utils';

type Item = number | 'ellipsis-start' | 'ellipsis-end';

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildItems(
  page: number,
  pageCount: number,
  siblingCount: number,
  boundaryCount: number,
): Item[] {
  const totalNumbers = siblingCount * 2 + boundaryCount * 2 + 3;
  if (pageCount <= totalNumbers) return range(1, pageCount);
  const startPages = range(1, Math.min(boundaryCount, pageCount));
  const endPages = range(Math.max(pageCount - boundaryCount + 1, boundaryCount + 1), pageCount);
  const siblingsStart = Math.max(
    Math.min(page - siblingCount, pageCount - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0]! - 2 : pageCount - 1,
  );
  return [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (['ellipsis-start'] as const)
      : boundaryCount + 1 < pageCount - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < pageCount - boundaryCount - 1
      ? (['ellipsis-end'] as const)
      : pageCount - boundaryCount > boundaryCount
        ? [pageCount - boundaryCount]
        : []),
    ...endPages,
  ];
}

export const Pagination = defineComponent({
  name: 'Pagination',
  inheritAttrs: true,
  props: {
    page: { type: Number, required: true },
    pageCount: { type: Number, required: true },
    siblingCount: { type: Number, default: 1 },
    boundaryCount: { type: Number, default: 1 },
    radius: { type: String as PropType<Radius>, default: undefined },
    label: { type: String, default: 'Pagination' },
  },
  emits: ['page-change'],
  setup(props, { attrs, emit }) {
    const items = computed(() =>
      buildItems(props.page, props.pageCount, props.siblingCount, props.boundaryCount),
    );
    const go = (next: number) => {
      if (next < 1 || next > props.pageCount || next === props.page) return;
      emit('page-change', next);
    };
    const navIcon = (path: string) =>
      h(
        'svg',
        { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none' },
        h('path', { d: path, stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
      );

    return () =>
      h(
        'nav',
        {
          ...attrs,
          'aria-label': props.label,
          'data-radius': props.radius,
          class: cn('bwo-pagination', attrs.class as string | undefined),
        },
        [
          h(
            'button',
            {
              type: 'button',
              class: 'bwo-pagination-btn',
              'aria-label': 'Previous page',
              disabled: props.page <= 1,
              onClick: () => go(props.page - 1),
            },
            navIcon('M15 6l-6 6 6 6'),
          ),
          ...items.value.map((item, i) => {
            if (item === 'ellipsis-start' || item === 'ellipsis-end') {
              return h(
                'span',
                { key: `${item}-${i}`, class: 'bwo-pagination-ellipsis', 'aria-hidden': 'true' },
                '…',
              );
            }
            const active = item === props.page;
            return h(
              'button',
              {
                key: item,
                type: 'button',
                class: cn('bwo-pagination-btn', active && 'bwo-pagination-btn--active'),
                'aria-current': active ? 'page' : undefined,
                onClick: () => go(item),
              },
              item,
            );
          }),
          h(
            'button',
            {
              type: 'button',
              class: 'bwo-pagination-btn',
              'aria-label': 'Next page',
              disabled: props.page >= props.pageCount,
              onClick: () => go(props.page + 1),
            },
            navIcon('M9 6l6 6-6 6'),
          ),
        ],
      );
  },
});
