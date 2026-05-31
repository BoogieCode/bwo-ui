import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { BottomNavigationDemo } from './demo';

export const metadata = { title: 'BottomNavigation — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>BottomNavigation</h1>
      <p className="lead">
        Mobile-style tab bar with icons + labels and optional badges. Use <code>fixed</code> for a
        true bottom-of-viewport bar with safe-area inset support.
      </p>

      <BottomNavigationDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { BottomNavigation, BottomNavigationItem } from '@bwo-ui/react';

const [tab, setTab] = useState('home');

<BottomNavigation value={tab} onValueChange={setTab}>
  <BottomNavigationItem value="home"    icon={<HomeIcon />}   label="Home" />
  <BottomNavigationItem value="search"  icon={<SearchIcon />} label="Search" />
  <BottomNavigationItem value="alerts"  icon={<BellIcon />}   label="Alerts" badge={3} />
  <BottomNavigationItem value="profile" icon={<UserIcon />}   label="Profile" />
</BottomNavigation>`}</CodeBlock>

      <h2>Props — BottomNavigation</h2>
      <PropsTable
        rows={[
          { name: 'value', type: 'string | null', description: 'Active item value.' },
          { name: 'onValueChange', type: '(value: string) => void', description: 'Selection handler.' },
          {
            name: 'variant',
            type: "'labeled' | 'icons-only' | 'selected-label'",
            defaultValue: "'labeled'",
            description: 'How to render labels.',
          },
          {
            name: 'fixed',
            type: 'boolean',
            description: 'Pin to the bottom of the viewport with safe-area padding.',
          },
        ]}
      />

      <h2>Props — BottomNavigationItem</h2>
      <PropsTable
        rows={[
          { name: 'value', type: 'string', description: 'Unique id matching the parent value.' },
          { name: 'icon', type: 'ReactNode', description: 'Icon element rendered above the label.' },
          { name: 'label', type: 'ReactNode', description: 'Label text.' },
          { name: 'badge', type: 'ReactNode', description: 'Notification badge content.' },
        ]}
      />
    </>
  );
}
