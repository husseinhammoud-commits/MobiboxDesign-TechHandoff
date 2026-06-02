/**
 * Dashboard — KPI strip + 3 stacked sections (Payouts / CAPs / Country & Op).
 *
 * Sections are independent — each owns its own search + expand state. The
 * page is just a layout shell.
 *
 * KPI strip is server-rendered; sections are client components (they have
 * interactive state).
 */

'use client';

import Box from '@mui/material/Box';
import { Download } from 'lucide-react';

import {
  PageHeader, Button, StatTile,
  DashboardPayouts, DashboardCAPs, DashboardCountryOps,
} from '@/tech-handoff/components';
import { MOCK_PAYOUTS, MOCK_CAPS, avgPayout, capHealth } from '@/tech-handoff/lib/mock-dashboard';
import { SERVICES } from '@/tech-handoff/lib/mock-services';

export default function DashboardPage() {
  // KPI computations (server-side — these don't need to be reactive)
  const avg            = avgPayout(MOCK_PAYOUTS);
  const activeServices = SERVICES.filter((s) => s.status === 'online').length;
  const capsNearLimit  = MOCK_CAPS.filter((c) => capHealth(c) !== 'healthy').length;
  const marketsCovered = new Set(MOCK_PAYOUTS.map((r) => `${r.country}|${r.operator}`)).size;

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of payouts, CAPs, and markets">
        <Button variant="secondary" leftIcon={<Download size={16} />}>Export</Button>
      </PageHeader>

      <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* KPI strip */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' }, gap: 1.5 }}>
          <StatTile label="Avg payout"     value={`$${avg}`} />
          <StatTile label="Active services" value={activeServices} tone={activeServices ? 'positive' : 'neutral'} />
          <StatTile label="CAPs near limit" value={capsNearLimit} tone={capsNearLimit ? 'warning' : 'neutral'} />
          <StatTile label="Markets covered" value={marketsCovered} />
        </Box>

        {/* Three sections, each with its own search + expand */}
        <DashboardPayouts />
        <DashboardCAPs />
        <DashboardCountryOps />
      </Box>
    </>
  );
}
