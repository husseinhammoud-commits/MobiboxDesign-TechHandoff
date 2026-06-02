/**
 * DashboardCAPs — capacity-health section of the dashboard.
 *
 * Collapsed: top 5 most-urgent CAPs (sorted by % used desc) + alert banner
 *            when any CAP is near-limit or exhausted.
 * Expanded:  all CAPs + the same alert banner.
 *
 * Search filters across service / offer / country / operator / mode.
 * The status pills at the top recount based on the filtered set.
 */

'use client';

import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AlertTriangle } from 'lucide-react';

import { DashboardSection, ProgressBar, Chip } from './';
import {
  MOCK_CAPS, capPct, capHealth, matchesCapQuery, type CapRecord,
} from '@/tech-handoff/lib/mock-dashboard';

export function DashboardCAPs() {
  return (
    <DashboardSection
      title="CAPs"
      subtitle={`Capacity health · ${MOCK_CAPS.length} CAPs`}
      searchPlaceholder="Search CAPs (service, country, operator, mode…)"
    >
      {({ query, expanded }) => <CapsBody query={query} expanded={expanded} />}
    </DashboardSection>
  );
}

function CapsBody({ query, expanded }: { query: string; expanded: boolean }) {
  const filtered = useMemo(() => MOCK_CAPS.filter((c) => matchesCapQuery(c, query)), [query]);
  const sorted   = useMemo(() => [...filtered].sort((a, b) => capPct(b) - capPct(a)), [filtered]);
  const rows     = expanded ? sorted : sorted.slice(0, 5);

  const healthy   = filtered.filter((c) => capHealth(c) === 'healthy').length;
  const near      = filtered.filter((c) => capHealth(c) === 'near-limit').length;
  const exhausted = filtered.filter((c) => capHealth(c) === 'exhausted').length;
  const alertCount = near + exhausted;

  return (
    <Box>
      {/* Status strip */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 2,
        paddingInline: 2.5, paddingBlock: 1.25,
        backgroundColor: 'rgba(250,250,250,0.6)',
        borderBottom: (t) => `1px solid ${t.palette.border.subtle}`,
        fontSize: 12,
      }}>
        <StatusCount color="#047857" count={healthy}   label="healthy" />
        <StatusCount color="#b45309" count={near}      label="near limit" />
        <StatusCount color="#be123c" count={exhausted} label="exhausted" />
        {!expanded && filtered.length > 5 && (
          <Box sx={{ ml: 'auto', color: 'text.secondary' }}>Showing top 5 by urgency</Box>
        )}
      </Box>

      {/* Alert banner — flat amber strip matching the HTML prototype */}
      {alertCount > 0 && (
        <Box sx={{
          paddingInline: 2.5, paddingBlock: 1.5,
          backgroundColor: '#fffbeb',
          borderBottom: '1px solid #fef3c7',
          display: 'flex', alignItems: 'flex-start', gap: 1,
          fontSize: 12.5, color: '#78350f',
        }}>
          <AlertTriangle size={16} color="#b45309" style={{ marginTop: 1, flexShrink: 0 }} />
          <Box>
            <strong>{alertCount} {alertCount === 1 ? 'CAP needs' : 'CAPs need'} attention</strong>
            {' '}— review usage before traffic gets dropped.
          </Box>
        </Box>
      )}

      {/* Rows */}
      {rows.length ? (
        <Box>
          {rows.map((c, i) => (
            <CapRow key={`${c.service}-${c.offer}-${c.operator}`} cap={c} divider={i > 0} />
          ))}
        </Box>
      ) : (
        <Box sx={{ paddingBlock: 6, textAlign: 'center', fontSize: 12.5, color: 'text.secondary' }}>
          No CAPs match your search.
        </Box>
      )}
    </Box>
  );
}

// ----- internal -----------------------------------------------------------

function CapRow({ cap, divider }: { cap: CapRecord; divider: boolean }) {
  const pct = capPct(cap);
  const health = capHealth(cap);
  const toneText = health === 'exhausted' ? 'error.dark' : health === 'near-limit' ? 'warning.dark' : 'success.dark';
  const label    = health === 'exhausted' ? 'Exhausted' : health === 'near-limit' ? 'Near limit' : 'Healthy';

  return (
    <Box sx={{
      paddingInline: 2.5, paddingBlock: 1.25,
      display: 'grid', gridTemplateColumns: '1.4fr 1fr 2fr auto', alignItems: 'center', gap: 2,
      borderTop: divider ? (t) => `1px solid ${t.palette.border.subtle}` : 'none',
    }}>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {cap.service}
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {cap.offer} · {cap.mode}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
        <Chip label={cap.country} variant="soft" />
        <Box sx={{ fontSize: 12, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cap.operator}</Box>
      </Box>
      <Box>
        <ProgressBar value={cap.used} max={cap.limit} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5, fontSize: 11, color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}>
          <span>{cap.used.toLocaleString()} / {cap.limit.toLocaleString()}</span>
          <Box component="span" sx={{ color: toneText, fontWeight: 500 }}>{pct}%</Box>
        </Box>
      </Box>
      <Box sx={{ fontSize: 11, fontWeight: 500, color: toneText, whiteSpace: 'nowrap' }}>
        {label}
      </Box>
    </Box>
  );
}

function StatusCount({ color, count, label }: { color: string; count: number; label: string }) {
  return (
    <Box component="span" sx={{ color }}>
      <Box component="span" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{count}</Box>
      {' '}{label}
    </Box>
  );
}
