import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { TagInputDemo } from './demo';

export const metadata = { title: 'TagInput — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>TagInput</h1>
      <p className="lead">
        Input that splits typed text into removable tag pills. Enter / comma to commit (custom
        separators supported), Backspace on empty input peels the last tag, optional validator
        rejects bad entries.
      </p>

      <TagInputDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { TagInput } from '@bwo-ui/react';

const [tags, setTags] = useState<string[]>([]);

<TagInput
  value={tags}
  onValueChange={setTags}
  placeholder="Add a tag…"
  max={10}
  validate={(t) => t.length >= 2 || 'Tag too short'}
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'value', type: 'string[]', description: 'Controlled tag list.' },
          { name: 'defaultValue', type: 'string[]', defaultValue: '[]', description: 'Uncontrolled default.' },
          { name: 'onValueChange', type: '(tags: string[]) => void', description: 'Fires whenever the list changes.' },
          { name: 'placeholder', type: 'string', defaultValue: "'Add a tag…'", description: 'Input placeholder.' },
          { name: 'separators', type: 'string[]', defaultValue: "['Enter', ',']", description: 'Keys that finalise a tag.' },
          { name: 'max', type: 'number', description: 'Maximum number of tags.' },
          { name: 'validate', type: '(tag: string) => string | true', description: 'Custom validator. Return string to reject with that reason.' },
          { name: 'renderTag', type: '(tag, remove) => ReactNode', description: 'Override the pill render.' },
        ]}
      />
    </>
  );
}
