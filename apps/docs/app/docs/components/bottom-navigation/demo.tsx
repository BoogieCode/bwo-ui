'use client';

import { useState } from 'react';
import { BottomNavigation, BottomNavigationItem } from '@bwo-ui/react';

const HomeIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 12l9-8 9 8M5 10v10h5v-6h4v6h5V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SearchIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const BellIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 8a6 6 0 1112 0v4l2 3H4l2-3V8zM9 19a3 3 0 006 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const UserIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M4 20c1-4 5-6 8-6s7 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function BottomNavigationDemo() {
  const [value, setValue] = useState('home');
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 0,
        background: 'var(--bwo-grey-1)',
        border: '1px solid var(--bwo-border)',
        borderRadius: 'var(--bwo-radius-md)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--bwo-text-muted)', fontSize: 14 }}>
        Active tab: <strong style={{ color: 'var(--bwo-text)' }}>{value}</strong>
      </div>
      <BottomNavigation value={value} onValueChange={setValue}>
        <BottomNavigationItem value="home" icon={HomeIcon} label="Home" />
        <BottomNavigationItem value="search" icon={SearchIcon} label="Search" />
        <BottomNavigationItem value="alerts" icon={BellIcon} label="Alerts" badge={3} />
        <BottomNavigationItem value="profile" icon={UserIcon} label="Profile" />
      </BottomNavigation>
    </div>
  );
}
