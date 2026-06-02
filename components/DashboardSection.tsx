/**
 * DashboardSection — shared shell for the 3 dashboard sections (Payouts,
 * CAPs, Country & Operator). Each section gets:
 *
 *   - Title + subtitle on the left
 *   - Compact search input below
 *   - Expand/collapse button on the right (toggles `Maximize2 ⇄ Minimize2`)
 *   - Body slot rendered below the header
 *
 * The section owns its own `query` and `expanded` state, exposing them
 * via render props so each section's body can decide what to do with them.
 *
 * Usage:
 *   <DashboardSection title="Payouts" subtitle="Across all services · 8 records" searchPlaceholder="Search payouts…">
 *     {({ query, expanded }) => <PayoutsBody query={query} expanded={expanded} />}
 *   </DashboardSection>
 */

'use client';

import { ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Maximize2, Minimize2, Search } from 'lucide-react';

import { Card, Input, Button } from './';

export interface DashboardSectionProps {
  title:             string;
  subtitle?:         ReactNode;
  searchPlaceholder: string;
  children:          (state: { query: string; expanded: boolean }) => ReactNode;
}

export function DashboardSection({ title, subtitle, searchPlaceholder, children }: DashboardSectionProps) {
  const [query, setQuery]       = useState('');
  const [expanded, setExpanded] = useState(false);

  return (
    <Card padded={false} sx={{ overflow: 'hidden', borderRadius: 2 }}>
      {/* Header */}
      <Box sx={{ px: 2.5, py: 2, borderBottom: (t) => `1px solid ${t.palette.border.subtle}` }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography component="h2" sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>{title}</Typography>
            {subtitle && (
              <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>{subtitle}</Typography>
            )}
          </Box>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </Box>
        <Box sx={{ mt: 1.5, maxWidth: 560 }}>
          <Input
            value={query}
            onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
            placeholder={searchPlaceholder}
            leftIcon={<Search size={16} color="#a1a1aa" />}
          />
        </Box>
      </Box>

      {/* Body */}
      {children({ query, expanded })}
    </Card>
  );
}
