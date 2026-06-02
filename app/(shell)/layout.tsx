/**
 * Shell layout — wraps every "logged-in" page in the sidebar + main area.
 *
 * Lives in the `(shell)` route group so the Next.js URL doesn't include it
 * (i.e., the page at `app/(shell)/services/page.tsx` resolves to `/services`,
 * not `/shell/services`).
 *
 * The sidebar is rendered as a server component; pages inside the group
 * are free to be server or client as needed.
 */

'use client';

export const dynamic = 'force-dynamic';

import { LayoutDashboard, Package, Briefcase } from 'lucide-react';

import { Sidebar } from '@/tech-handoff/components/Sidebar';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={16} /> },
  { label: 'Services',  href: '/services',  icon: <Package size={16} /> },
  { label: 'Clients',   href: '/clients',   icon: <Briefcase size={16} /> },
];

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar items={NAV_ITEMS} />
      <main style={{ flex: 1, minWidth: 0, backgroundColor: 'rgba(250, 250, 250, 0.6)' }}>
        {children}
      </main>
    </div>
  );
}
