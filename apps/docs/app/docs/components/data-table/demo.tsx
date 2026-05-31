'use client';

import { Badge, DataTable, type DataTableColumn } from '@bwo-ui/react';

interface Row {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'invited' | 'inactive';
  joined: string;
}

const data: Row[] = [
  { id: 1, name: 'Cris', role: 'Lead designer', status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Anya', role: 'Frontend', status: 'active', joined: '2024-02-08' },
  { id: 3, name: 'Mike', role: 'Backend', status: 'invited', joined: '2024-04-22' },
  { id: 4, name: 'Sara', role: 'Product', status: 'active', joined: '2024-05-30' },
  { id: 5, name: 'Tomas', role: 'QA', status: 'inactive', joined: '2023-11-02' },
];

const columns: DataTableColumn<Row>[] = [
  { id: 'name', header: 'Name', accessor: (r) => r.name, sortable: true },
  { id: 'role', header: 'Role', accessor: (r) => r.role, sortable: true },
  {
    id: 'status',
    header: 'Status',
    accessor: (r) => r.status,
    sortable: true,
    cell: (r) => (
      <Badge variant={r.status === 'active' ? 'green' : r.status === 'invited' ? 'yellow' : undefined}>
        {r.status}
      </Badge>
    ),
  },
  { id: 'joined', header: 'Joined', accessor: (r) => r.joined, sortable: true, align: 'right' },
];

export function DataTableDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column' }}>
      <DataTable data={data} columns={columns} hoverable striped pageSize={4} />
    </div>
  );
}
