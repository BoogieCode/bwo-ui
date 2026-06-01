import { defineComponent, h, type CSSProperties, type PropType } from 'vue';
import { cn } from './utils';

type Size = string | number;
type Responsive<T> = T | Partial<Record<'sm' | 'md' | 'lg' | 'xl', T>>;

const formatSize = (v: Size): string => (typeof v === 'number' ? `${v}px` : v);

function toCss<T>(
  value: Responsive<T> | undefined,
  format: (v: T) => string,
): { base: string | undefined; vars: Record<string, string> } {
  if (value === undefined) return { base: undefined, vars: {} };
  if (typeof value !== 'object' || value === null)
    return { base: format(value as T), vars: {} };
  const v = value as Partial<Record<'sm' | 'md' | 'lg' | 'xl', T>>;
  const vars: Record<string, string> = {};
  for (const key of ['sm', 'md', 'lg', 'xl'] as const) {
    if (v[key] !== undefined) vars[`--bwo-grid-${key}`] = format(v[key] as T);
  }
  return { base: undefined, vars };
}

export const SimpleGrid = defineComponent({
  name: 'SimpleGrid',
  inheritAttrs: true,
  props: {
    as: { type: String, default: 'div' },
    columns: { type: [Number, Object] as PropType<Responsive<number>>, default: 1 },
    gap: { type: [String, Number] as PropType<Size>, default: undefined },
    columnGap: { type: [String, Number] as PropType<Size>, default: undefined },
    rowGap: { type: [String, Number] as PropType<Size>, default: undefined },
    minChildWidth: { type: [String, Number] as PropType<Size>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const cssVars: CSSProperties & Record<string, string | number | undefined> = {};
      if (props.minChildWidth !== undefined) {
        cssVars['--bwo-grid-cols'] = `repeat(auto-fit, minmax(${formatSize(
          props.minChildWidth,
        )}, 1fr))`;
      } else {
        const cols = toCss(props.columns, String);
        if (cols.base) cssVars['--bwo-grid-cols'] = `repeat(${cols.base}, minmax(0, 1fr))`;
        for (const [k, v] of Object.entries(cols.vars))
          cssVars[k.replace('--bwo-grid-', '--bwo-grid-cols-')] = `repeat(${v}, minmax(0, 1fr))`;
      }
      if (props.gap !== undefined) cssVars['--bwo-grid-gap'] = formatSize(props.gap);
      if (props.columnGap !== undefined) cssVars['--bwo-grid-col-gap'] = formatSize(props.columnGap);
      if (props.rowGap !== undefined) cssVars['--bwo-grid-row-gap'] = formatSize(props.rowGap);
      return h(
        props.as,
        {
          ...attrs,
          class: cn('bwo-simple-grid', attrs.class as string | undefined),
          style: { ...cssVars, ...((attrs.style as Record<string, string>) ?? {}) },
        },
        slots.default?.(),
      );
    };
  },
});

export const Grid = defineComponent({
  name: 'Grid',
  inheritAttrs: true,
  props: {
    as: { type: String, default: 'div' },
    templateColumns: { type: [String, Object] as PropType<Responsive<string>>, default: undefined },
    templateRows: { type: [String, Object] as PropType<Responsive<string>>, default: undefined },
    templateAreas: { type: Array as PropType<string[]>, default: undefined },
    columns: { type: [Number, Object] as PropType<Responsive<number>>, default: undefined },
    rows: { type: [Number, Object] as PropType<Responsive<number>>, default: undefined },
    gap: { type: [String, Number] as PropType<Size>, default: undefined },
    columnGap: { type: [String, Number] as PropType<Size>, default: undefined },
    rowGap: { type: [String, Number] as PropType<Size>, default: undefined },
    autoFlow: { type: String, default: undefined },
    autoRows: { type: [String, Number] as PropType<Size>, default: undefined },
    autoColumns: { type: [String, Number] as PropType<Size>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const cssVars: CSSProperties & Record<string, string | number | undefined> = {};
      if (props.templateColumns !== undefined) {
        const tc = toCss(props.templateColumns, (v) => v);
        if (tc.base) cssVars['--bwo-grid-tc'] = tc.base;
        for (const [k, v] of Object.entries(tc.vars))
          cssVars[k.replace('--bwo-grid-', '--bwo-grid-tc-')] = v;
      } else if (props.columns !== undefined) {
        const c = toCss(props.columns, String);
        if (c.base) cssVars['--bwo-grid-tc'] = `repeat(${c.base}, minmax(0, 1fr))`;
        for (const [k, v] of Object.entries(c.vars))
          cssVars[k.replace('--bwo-grid-', '--bwo-grid-tc-')] = `repeat(${v}, minmax(0, 1fr))`;
      }
      if (props.templateRows !== undefined) {
        const tr = toCss(props.templateRows, (v) => v);
        if (tr.base) cssVars['--bwo-grid-tr'] = tr.base;
      } else if (props.rows !== undefined) {
        const r = toCss(props.rows, String);
        if (r.base) cssVars['--bwo-grid-tr'] = `repeat(${r.base}, auto)`;
      }
      if (props.templateAreas) {
        cssVars['--bwo-grid-ta'] = props.templateAreas.map((row) => `"${row}"`).join(' ');
      }
      if (props.gap !== undefined) cssVars['--bwo-grid-gap'] = formatSize(props.gap);
      if (props.columnGap !== undefined) cssVars['--bwo-grid-col-gap'] = formatSize(props.columnGap);
      if (props.rowGap !== undefined) cssVars['--bwo-grid-row-gap'] = formatSize(props.rowGap);
      if (props.autoFlow) cssVars['--bwo-grid-flow'] = props.autoFlow;
      if (props.autoRows !== undefined) cssVars['--bwo-grid-ar'] = formatSize(props.autoRows);
      if (props.autoColumns !== undefined) cssVars['--bwo-grid-ac'] = formatSize(props.autoColumns);
      return h(
        props.as,
        {
          ...attrs,
          class: cn('bwo-grid', attrs.class as string | undefined),
          style: { ...cssVars, ...((attrs.style as Record<string, string>) ?? {}) },
        },
        slots.default?.(),
      );
    };
  },
});

export const GridItem = defineComponent({
  name: 'GridItem',
  inheritAttrs: true,
  props: {
    as: { type: String, default: 'div' },
    colSpan: { type: Number, default: undefined },
    rowSpan: { type: Number, default: undefined },
    colStart: { type: Number, default: undefined },
    colEnd: { type: Number, default: undefined },
    rowStart: { type: Number, default: undefined },
    rowEnd: { type: Number, default: undefined },
    area: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const inline: CSSProperties = {};
      if (props.colSpan) inline.gridColumn = `span ${props.colSpan} / span ${props.colSpan}`;
      if (props.rowSpan) inline.gridRow = `span ${props.rowSpan} / span ${props.rowSpan}`;
      if (props.colStart) inline.gridColumnStart = String(props.colStart);
      if (props.colEnd) inline.gridColumnEnd = String(props.colEnd);
      if (props.rowStart) inline.gridRowStart = String(props.rowStart);
      if (props.rowEnd) inline.gridRowEnd = String(props.rowEnd);
      if (props.area) inline.gridArea = props.area;
      return h(
        props.as,
        {
          ...attrs,
          class: cn('bwo-grid-item', attrs.class as string | undefined),
          style: { ...inline, ...((attrs.style as Record<string, string>) ?? {}) },
        },
        slots.default?.(),
      );
    };
  },
});
