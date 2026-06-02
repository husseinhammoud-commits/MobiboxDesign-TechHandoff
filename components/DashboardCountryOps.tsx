/**
 * DashboardCountryOps — country×operator performance section.
 *
 * Collapsed: top 5 markets by total payout.
 * Expanded:  all markets matching the search.
 *
 * Each row shows: country chip · operator · conversions · avg payout ·
 * total payout · trend (with arrow icon, colored) · status pill.
 */

'use client';

import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

import { DashboardSection, Chip, StatusPill } from './';
import { MOCK_PAYOUTS, aggregateMarkets, matchesMarketQuery, type MarketRow } from '@/tech-handoff/lib/mock-dashboard';

const fmtMoney = (n: number) => `$${n.toFixed(2)}`;

export function DashboardCountryOps() {
  const allRows = useMemo(() => aggregateMarkets(MOCK_PAYOUTS), []);
  return (
    <DashboardSection
      title="Country & operator performance"
      subtitle={`Aggregated across all services · ${allRows.length} markets`}
      searchPlaceholder="Search by country or operator…"
    >
      {({ query, expanded }) => <MarketsBody query={query} expanded={expanded} allRows={allRows} />}
    </DashboardSection>
  );
}

function MarketsBody({ query, expanded, allRows }: { query: string; expanded: boolean; allRows: MarketRow[] }) {
  const filtered = useMemo(() => allRows.filter((r) => matchesMarketQuery(r, query)), [allRows, query]);
  const rows = expanded ? filtered : filtered.slice(0, 5);

  return (
    <Box>
      {!expanded && filtered.length > 5 && (
        <Box sx={{
          paddingInline: 2.5, paddingBlock: 1,
          backgroundColor: 'rgba(250,250,250,0.6)',
          borderBottom: (t) => `1px solid ${t.palette.border.subtle}`,
          fontSize: 12, color: 'text.secondary', textAlign: 'right',
        }}>
          Showing top 5 by total payout
        </Box>
      )}

      <Box sx={{ overflowX: 'auto' }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <Box component="thead">
            <Box component="tr" sx={{ backgroundColor: 'surface.muted', borderBottom: (t) => `1px solid ${t.palette.border.main}` }}>
              {['Country', 'Operator', 'Conversions', 'Avg payout', 'Total payout', 'Trend', 'Status'].map((h, i) => (
                <Box key={h} component="th" sx={{
                  paddingBlock: 1.25, paddingInline: 2,
                  textAlign: i >= 2 && i <= 5 ? 'right' : 'left',
                  fontSize: 10.5, fontWeight: 500, color: 'text.secondary',
                  textTransform: 'uppercase', letterSpacing: 0.4,
                }}>
                  {h}
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
            {rows.length ? rows.map((r) => (
              <Box key={`${r.country}-${r.operator}`} component="tr" sx={{ '&:hover': { backgroundColor: 'surface.muted' }, borderTop: (t) => `1px solid ${t.palette.border.subtle}` }}>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2 }}><Chip label={r.country} variant="soft" /></Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, color: 'text.primary' }}>{r.operator}</Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, textAlign: 'right', color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}>{r.conversions}</Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, textAlign: 'right', color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}>{fmtMoney(r.avg)}</Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{fmtMoney(r.total)}</Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2, textAlign: 'right' }}>
                  <Trend value={r.trend} up={r.trendUp} />
                </Box>
                <Box component="td" sx={{ paddingBlock: 1.25, paddingInline: 2 }}>
                  <StatusPill status={r.anyPaused ? 'offline' : 'online'} label={r.anyPaused ? 'Partial' : 'Online'} />
                </Box>
              </Box>
            )) : (
              <Box component="tr">
                <Box component="td" colSpan={7} sx={{ padding: 6, textAlign: 'center', fontSize: 12.5, color: 'text.secondary' }}>
                  No markets match your search.
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Trend({ value, up }: { value: string; up: boolean }) {
  const flat = value === '0%';
  const color = flat ? 'text.secondary' : up ? 'success.dark' : 'error.dark';
  const Icon  = flat ? Minus : up ? TrendingUp : TrendingDown;
  return (
    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color, fontSize: 12.5, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
      <Icon size={14} />{value}
    </Box>
  );
}
