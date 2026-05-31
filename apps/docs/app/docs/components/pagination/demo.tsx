'use client';

import { useState } from 'react';
import { Pagination } from '@bwo-ui/react';

export function PaginationDemo() {
  const [page, setPage] = useState(3);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 16 }}>
      <Pagination page={page} pageCount={12} onPageChange={setPage} />
      <Pagination page={page} pageCount={3} onPageChange={setPage} />
    </div>
  );
}
