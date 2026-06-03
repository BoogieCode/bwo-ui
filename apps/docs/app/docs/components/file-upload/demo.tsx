'use client';

import { FileUpload } from '@bwo-ui/react';
import { useState } from 'react';

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, padding: 24, alignItems: 'stretch' }}
    >
      <FileUpload
        value={files}
        onValueChange={setFiles}
        multiple
        maxFiles={5}
        maxSize={2 * 1024 * 1024}
        accept="image/*"
        hint="Images up to 2 MB · up to 5 files"
      />
    </div>
  );
}
