/**
 * DashboardPayouts — the Payouts section of the dashboard.
 *
 * Collapsed: mini By-GEO chart + top 5 ranked rows.
 * Expanded:  tabbed chart (By GEO / By operator / By service) + full filterable table.
 *
 * Search filters across name / offer / country / operator / event / status.
 */

'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardSection, BarChart, StatusPill, Chip } from './';
import {
  MOCK_PAYOUTS, aggregatePayouts, matchesPayoutQuery,
  type ChartMetric, type PayoutRecord,
} from '@/tech-handoff/lib/mock-dashboard';

const fmtMoney = (n: number) => `$${n.toFixed(2)}`;

export function DashboardPayouts() {
  return (
    <DashboardSection
      title="Payouts"
      subtitle={`Across all services · ${MOCK_PAYOUTS.length} records`}
      searchPlaceholder="Search payouts (service, country, operator, event…)"
    >
      {({ query, expanded }) => <PayoutsBody query={query} expanded={expanded} />}
    </DashboardSection>
  );
}

function PayoutsBody({ query, expanded }: { query: string; expanded: boolean }) {
  const [chartMetric, setChartMetric] = useState<ChartMetric>('country');

  const filtered = useMemo(() => MOCK_PAYOUTS.filter((r) => matchesPayoutQuery(r, query)), [query]);
  const chartData = useMemo(() => aggregatePayouts(filtered, expanded ? chartMetric : 'country'), [filtered, chartMetric, expanded]);
  const topRows = useMemo(() => [...filtered].sort((a, b) => b.payout - a.payout).slice(0, 5), [filtered]);

  return expanded ? <PayoutsExpanded chartData={chartData} chartMetric={chartMetric} setChartMetric={setChartMetric} rows={filtered} /> : <PayoutsCompact chartData={chartData} topRows={topRows} />;
}

// ----- Compact body --------------------------------------------------------
function PayoutsCompact({ chartData, topRows }: { chartData: { name: string; value: number }[]; topRows: PayoutRecord[] }) {
  return (
    <Box sx={{ px: 2.5, py: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' }, gap: 2.5 }}>
      <Box>
        <SectionLabel>By GEO</SectionLabel>
        <BarChart data={chartData} formatValue={fmtMoney} height={180} />
      </Box>
      <Box>
        <SectionLabel>Top payouts</SectionLabel>
        {topRows.length ? (
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, '& > li:not(:last-child)': { borderBottom: (t) => `1px solid ${t.palette.border.subtle}` } }}>
            {topRows.map((r) => (
              <Box key={r.id} component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingBlock: 1, fontSize: 12.5 }}>
                <Chip label={r.country} variant="soft" />
                <Box sx={{ flex: 1, color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.serviceName} · {r.operator}
                </Box>
                <Box sx={{ fontWeight: 600, color: 'text.primary', fontVariantNumeric: 'tabular-nums' }}>{fmtMoney(r.payout)}</Box>
              </Box>
            ))}
          </Box>
        ) : <EmptyLine>No matches.</EmptyLine>}
      </Box>
    </Box>
  );
}

// ----- Expanded body -------------------------------------------------------
function PayoutsExpanded({ chartData, chartMetric, setChartMetric, rows }: {
  chartData: { name: string; value: number }[];
  chartMetric: ChartMetric;
  setChartMetric: (m: ChartMetric) => void;
  rows: PayoutRecord[];
}) {
  const TAB_OPTIONS: { value: ChartMetric; label: string }[] = [
    { value: 'country',     label: 'By GEO' },
    { value: 'operator',    label: 'By operator' },
    { value: 'serviceName', label: 'By service' },
  ];
  return (
    <Box>
      {/* Chart */}
      <Box sx={{ px: 2.5, py: 2, borderBottom: (t) => `1px solid ${t.palette.border.subtle}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <SectionLabel sx={{ mb: 0 }}>Payout distribution</SectionLabel>
          <Box sx={{ display: 'inline-flex', backgroundColor: 'surface.subtle', borderRadius: 1, padding: 0.25 }}>
            {TAB_OPTIONS.map((t) => (
              <Box
                key={t.value}
                component="button"
                onClick={() => setChartMetric(t.value)}
                sx={{
                  all: 'unset',
                  cursor: 'pointer',
                  paddingBlock: 0.5, paddingInline: 1.25, borderRadius: 0.75,
                  fontSize: 12.5,
                  color:           chartMetric === t.value ? 'text.primary' : 'text.secondary',
                  fontWeight:      chartMetric === t.value ? 500 : 400,
                  backgroundColor: chartMetric === t.value ? 'surface.main' : 'transparent',
                  boxShadow:       chartMetric === t.value ? (theme) => theme.shadows[1] : 'none',
                  '&:hover':       { color: 'text.primary' },
                }}
              >
                {t.label}
              </Box>
            ))}
          </Box>
        </Box>
        <BarChart data={chartData} formatValue={fmtMoney} height={220} />
      </Box>

      {/* Table */}
      <Box sx={{ overflowX: 'auto' }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <Box component="thead">
            <Box component="tr" sx={{ backgroundColor: 'surface.muted', borderBottom: (t) => `1px solid ${t.palette.border.main}` }}>
              {['Service', 'Offer', 'Country', 'Operator', 'Event', 'Payout', 'Status'].map((h, i) => (
                <Box
                  key={h}
                  component="th"
                  sx={{
                    paddingBlock: 1.25, paddingInline: 2,
                    textAlign: i === 5 ? 'right' : 'left',
                    fontSize: 10.5, fontWeight: 500, color: 'text.secondary',
                    textTransform: 'uppercase', letterSpacing: 0.4,
                  }}
                >
                  {h}
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
            {rows.length ? rows.map((r) => (
              <Box key={r.id} component="tr" sx={{ '&:hover': { backgroundColor: 'surface.muted' }, transition: 'background-color .12s', borderTop: (t) => `1px solid ${t.palette.border.subtle}` }}>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, fontWeight: 500, color: 'text.primary' }}>{r.serviceName}</Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, color: 'text.secondary', fontSize: 12.5 }}>{r.offer}</Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2 }}><Chip label={r.country} variant="soft" /></Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, color: 'text.secondary', fontSize: 12.5 }}>{r.operator}</Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, color: 'text.secondary', fontSize: 12.5 }}>{r.event}</Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{fmtMoney(r.payout)}</Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2 }}>
                  <StatusPill status={r.status === 'active' ? 'online' : 'offline'} label={r.status === 'active' ? 'Active' : 'Paused'} />
                </Box>
              </Box>
            )) : (
              <Box component="tr">
                <Box component="td" colSpan={7} sx={{ padding: 6, textAlign: 'center', fontSize: 12.5, color: 'text.secondary' }}>
                  No payouts match your search.
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ----- shared --------------------------------------------------------------
function SectionLabel({ children, sx }: { children: React.ReactNode; sx?: any }) {
  return (
    <Typography sx={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.4, color: 'text.secondary', mb: 1, ...sx }}>
      {children}
    </Typography>
  );
}

function EmptyLine({ children }: { children: React.ReactNode }) {
  return <Box sx={{ paddingBlock: 4, textAlign: 'center', fontSize: 12.5, color: 'text.disabled' }}>{children}</Box>;
}
