import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { DataTableDemo } from './demo';

export const metadata = { title: 'DataTable — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>DataTable</h1>
      <p className="lead">
        Tabular data with sortable columns, custom cell renderers, and built-in pagination. Pure
        React — no headless library wrapped.
      </p>

      <DataTableDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { DataTable, type DataTableColumn } from '@bwo-ui/react';

const columns: DataTableColumn<Row>[] = [
  { id: 'name', header: 'Name', accessor: (r) => r.name, sortable: true },
  { id: 'role', header: 'Role', accessor: (r) => r.role, sortable: true },
  { id: 'joined', header: 'Joined', accessor: (r) => r.joined, align: 'right' },
];

<DataTable data={rows} columns={columns} pageSize={10} hoverable />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'data', type: 'T[]', description: 'Row data.' },
          { name: 'columns', type: 'DataTableColumn<T>[]', description: 'Column definitions.' },
          { name: 'getRowId', type: '(row, index) => string', description: 'Stable row key. Default: index.' },
          { name: 'sort', type: '{ id, direction } | null', description: 'Controlled sort state.' },
          { name: 'onSortChange', type: '(sort) => void', description: 'Sort change handler.' },
          { name: 'pageSize', type: 'number', description: 'When set, paginates rows.' },
          { name: 'page', type: 'number', description: 'Controlled current page (1-based).' },
          { name: 'striped', type: 'boolean', description: 'Alternating row backgrounds.' },
          { name: 'hoverable', type: 'boolean', description: 'Highlight rows on hover.' },
          { name: 'onRowClick', type: '(row, i) => void', description: 'Optional click handler per row.' },
        ]}
      />
    </>
  );
}
