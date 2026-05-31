import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { PaginationDemo } from './demo';

export const metadata = { title: 'Pagination — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Pagination</h1>
      <p className="lead">
        Page navigation with smart ellipsis. Always shows the first, last, current page, and
        configurable neighbors.
      </p>

      <PaginationDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Pagination } from '@bwo-ui/react';

const [page, setPage] = useState(1);

<Pagination
  page={page}
  pageCount={20}
  onPageChange={setPage}
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'page', type: 'number', description: '1-based current page.' },
          { name: 'pageCount', type: 'number', description: 'Total page count (>= 1).' },
          {
            name: 'onPageChange',
            type: '(page: number) => void',
            description: 'Called with the next page number.',
          },
          {
            name: 'siblingCount',
            type: 'number',
            defaultValue: '1',
            description: 'Neighbors shown on either side of the active page.',
          },
          {
            name: 'boundaryCount',
            type: 'number',
            defaultValue: '1',
            description: 'Pages always shown at the start/end (before the ellipsis).',
          },
          {
            name: 'radius',
            type: "'none' | 'light' | 'sm' | 'md' | 'lg' | 'pill'",
            description: 'Shared radius preset applied via data-radius cascade.',
          },
        ]}
      />
    </>
  );
}
