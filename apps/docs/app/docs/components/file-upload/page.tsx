import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { FileUploadDemo } from './demo';

export const metadata = { title: 'FileUpload — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>FileUpload</h1>
      <p className="lead">
        Drag-and-drop dropzone with click-to-browse fallback. Validates count + size + accept,
        shows a per-file row with size and remove button. Controlled or uncontrolled, no
        runtime dependency.
      </p>

      <FileUploadDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { FileUpload } from '@bwo-ui/react';

const [files, setFiles] = useState<File[]>([]);

<FileUpload
  value={files}
  onValueChange={setFiles}
  multiple
  maxFiles={5}
  maxSize={2 * 1024 * 1024}
  accept="image/*"
  hint="Images up to 2 MB · up to 5 files"
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'value', type: 'File[]', description: 'Controlled file list.' },
          { name: 'defaultValue', type: 'File[]', defaultValue: '[]', description: 'Uncontrolled default.' },
          { name: 'onValueChange', type: '(files: File[]) => void', description: 'Fires when files are added or removed.' },
          { name: 'multiple', type: 'boolean', defaultValue: 'false', description: 'Allow multiple files.' },
          { name: 'accept', type: 'string', description: 'MIME types or extensions, comma-separated.' },
          { name: 'maxFiles', type: 'number', description: 'Maximum number of files.' },
          { name: 'maxSize', type: 'number', description: 'Maximum size per file in bytes.' },
          { name: 'hint', type: 'ReactNode', description: 'Hint text under the dropzone.' },
          { name: 'heading', type: 'ReactNode', description: 'Override the heading text.' },
          { name: 'cta', type: 'ReactNode', defaultValue: "'Click to browse'", description: 'Override the click-to-browse copy.' },
        ]}
      />
    </>
  );
}
