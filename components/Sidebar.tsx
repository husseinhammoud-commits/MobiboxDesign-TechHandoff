/**
 * Sidebar — the left nav shared across the app shell.
 *
 * Items are configurable via the `items` prop. The active item is highlighted
 * based on the current pathname (read via Next's `usePathname`). Pure
 * presentation — no business logic.
 *
 * Usage:
 *   <Sidebar items={[
 *     { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboardIcon size={16} /> },
 *     { label: 'Services',  href: '/services',  icon: <PackageIcon size={16} /> },
 *     { label: 'Clients',   href: '/clients',   icon: <BriefcaseIcon size={16} /> },
 *   ]} />
 */

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import { Zap as BrandIcon, Bell as NotificationsIcon, Settings as SystemIcon } from 'lucide-react';

export interface SidebarItem {
  label: string;
  href:  string;
  icon:  ReactNode;
}

export interface SidebarProps {
  items: SidebarItem[];
  /** Brand name shown at the top. Defaults to "DCB Platform". */
  brand?: string;
}

export function Sidebar({ items, brand = 'DCB Platform' }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        width: 212, flexShrink: 0,
        borderRight: (t) => `1px solid ${t.palette.border.main}`,
        backgroundColor: 'surface.main',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, alignSelf: 'flex-start',
        height: '100vh',
      }}
    >
      {/* Brand */}
      <Box sx={{ height: 56, px: 1.5, display: 'flex', alignItems: 'center', gap: 1, borderBottom: (t) => `1px solid ${t.palette.border.subtle}` }}>
        <Box sx={{
          width: 24, height: 24, borderRadius: 1,
          backgroundColor: 'text.primary', color: 'primary.contrastText',
          display: 'grid', placeItems: 'center',
        }}>
          <BrandIcon size={14} strokeWidth={2} />
        </Box>
        <Box sx={{ fontWeight: 600, fontSize: 13.5, color: 'text.primary' }}>{brand}</Box>
      </Box>

      {/* Nav */}
      <Box component="nav" sx={{ flex: 1, overflowY: 'auto', px: 1.25, py: 1, fontSize: 13 }}>
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: 'none' }}
              aria-current={active ? 'page' : undefined}
            >
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.25,
                  px: 1.25, py: 0.75, borderRadius: 1,
                  color: active ? 'text.primary' : 'text.secondary',
                  fontWeight: active ? 500 : 400,
                  backgroundColor: active ? 'surface.subtle' : 'transparent',
                  '&:hover': { backgroundColor: 'surface.subtle' },
                  transition: 'background-color .12s, color .12s',
                  cursor: 'pointer',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Box>
            </Link>
          );
        })}
      </Box>

      {/* Bottom */}
      <Box sx={{ borderTop: (t) => `1px solid ${t.palette.border.subtle}`, p: 1, fontSize: 13 }}>
        {[
          { label: 'System',        icon: <SystemIcon size={16} /> },
          { label: 'Notifications', icon: <NotificationsIcon size={16} />, badge: 9 },
        ].map((item) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1.25,
              px: 1.25, py: 0.75, borderRadius: 1, color: 'text.secondary',
              '&:hover': { backgroundColor: 'surface.subtle' }, cursor: 'pointer',
            }}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge != null && (
              <Box sx={{
                ml: 'auto', minWidth: 16, height: 16, px: 0.5,
                borderRadius: '9999px', backgroundColor: 'text.primary', color: 'primary.contrastText',
                fontSize: 10, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {item.badge}
              </Box>
            )}
          </Box>
        ))}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 1.25, py: 0.75, borderRadius: 1, color: 'text.secondary', '&:hover': { backgroundColor: 'surface.subtle' }, cursor: 'pointer' }}>
          <Box sx={{ width: 20, height: 20, borderRadius: '9999px', backgroundColor: 'surface.subtle', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 600, color: 'text.primary' }}>
            HH
          </Box>
          Hussein
        </Box>
      </Box>
    </Box>
  );
}
