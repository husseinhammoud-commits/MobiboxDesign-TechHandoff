/**
 * ServiceDetailDrawer — right-side panel showing everything we know about
 * a service: status, action bar, and the Overview / Offers / Activity tabs.
 *
 * Open via `<ServiceDetailDrawer service={svc} open onClose={…} />`. Owns its
 * own tab state internally — the page just provides the service to show.
 *
 * Composition recap:
 *   Drawer (primitive) → Drawer.Header + Tabs + tab bodies (Overview/Offers/Activity)
 *   Overview uses StatTile, Card, divider rows
 *   Offers uses small inline cards with status pills
 *   Activity uses a simple timeline (vertical line + dot per entry)
 */

'use client';

import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Pencil, Pause, Play, Link as LinkIcon, ArrowUpRight, ArrowLeft, Tag, MoreHorizontal, X, Globe, Server } from 'lucide-react';

import {
  Drawer, Tabs, Button, StatusPill, Chip, StatTile, Card, IconButton,
} from './';
import type { Service } from '@/tech-handoff/lib/mock-services';
import {
  extractServiceKPIs, mockOffers, mockActivity, mockCountries, deriveVertical,
  type ServiceOffer, type ActivityEntry,
} from '@/tech-handoff/lib/service-detail';

type Tab = 'overview' | 'offers' | 'activity';

export interface ServiceDetailDrawerProps {
  service: Service | null;
  open:    boolean;
  onClose: () => void;
}

export function ServiceDetailDrawer({ service, open, onClose }: ServiceDetailDrawerProps) {
  const [tab, setTab] = useState<Tab>('overview');

  // Compute everything from the service. Memoized so re-renders don't churn.
  const data = useMemo(() => service ? {
    kpis:     extractServiceKPIs(service),
    offers:   mockOffers(service),
    activity: mockActivity(service),
    countries:mockCountries(service),
    vertical: deriveVertical(service.category),
  } : null, [service]);

  if (!service || !data) return null;

  const isOffline = service.status === 'offline';

  return (
    <Drawer open={open} onClose={onClose} size="lg">
      {/* Sticky header — back arrow + title + action row + tabs, all in one unit */}
      <Box sx={{
        position: 'sticky', top: 0, zIndex: 10, flexShrink: 0,
        backgroundColor: 'surface.main',
        borderBottom: (t) => `1px solid ${t.palette.border.main}`,
      }}>
        {/* Title row */}
        <Box sx={{ px: 3, pt: 2, pb: 1.5, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          {/* ← back / close */}
          <IconButton onClick={onClose} aria-label="Close" sx={{ flexShrink: 0 }}>
            <ArrowLeft size={16} />
          </IconButton>
          {/* Title + subtitle */}
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="h2" sx={{ fontSize: 18, fontWeight: 600, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {service.name}
              </Typography>
              <StatusPill status={service.status} />
            </Box>
            <Box component="span" sx={{ display: 'block', fontSize: 12.5, color: 'text.secondary', mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <Box component="span" sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12 }}>{service.serviceId}</Box>
              {' · '}{service.client}{' · '}Created {service.dateCreated}
            </Box>
          </Box>
          {/* Right actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
            <IconButton aria-label="More actions"><MoreHorizontal size={16} /></IconButton>
            <IconButton onClick={onClose} aria-label="Close panel"><X size={16} /></IconButton>
          </Box>
        </Box>

        {/* Action row — indented to align with title (past the ← button) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 3, pb: 1.5, ml: '44px' }}>
          <Button variant="primary"   size="sm" leftIcon={<Pencil size={14} />}>Edit service</Button>
          <Button variant="secondary" size="sm" leftIcon={isOffline ? <Play size={14} /> : <Pause size={14} />}>
            {isOffline ? 'Resume' : 'Pause'}
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<LinkIcon size={14} />}>Generate test link</Button>
        </Box>

        {/* Tabs inline */}
        <Tabs<Tab>
          value={tab}
          onChange={setTab}
          items={[
            { value: 'overview', label: 'Overview' },
            { value: 'offers',   label: 'Offers', count: data.offers.length },
            { value: 'activity', label: 'Activity' },
          ]}
          sx={{ px: 3 }}
        />
      </Box>

      {/* Body — one of three views */}
      <Drawer.Body padded={false} sx={{ backgroundColor: 'background.default' }}>
        {tab === 'overview' && <OverviewTab service={service} data={data} />}
        {tab === 'offers'   && <OffersTab   offers={data.offers} />}
        {tab === 'activity' && <ActivityTab activity={data.activity} />}
      </Drawer.Body>
    </Drawer>
  );
}

// =============================================================================
// Overview tab — KPI strip + Configuration card
// =============================================================================
function OverviewTab({
  service, data,
}: {
  service: Service;
  data: { kpis: ReturnType<typeof extractServiceKPIs>; countries: string[]; vertical: string };
}) {
  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Performance */}
      <Box>
        <SectionLabel>Performance</SectionLabel>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 1.5 }}>
          <StatTile size="sm" label="Avg payout"  value={data.kpis.avgPayout} />
          <StatTile size="sm" label="This week"   value={data.kpis.weekDelta} tone={data.kpis.weekDeltaTone} />
          <StatTile size="sm" label="Top market"  value={data.kpis.topMarket} />
          <StatTile size="sm" label="Conversions" value={data.kpis.conversions} />
        </Box>
      </Box>

      {/* Configuration */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <SectionLabel sx={{ mb: 0 }}>Configuration</SectionLabel>
          <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight size={14} />}>Edit in wizard</Button>
        </Box>
        <Card padded={false}>
          <ConfigRow label="Client"      value={service.client} />
          <ConfigRow label="Category"    value={service.category} />
          <ConfigRow label="Vertical"    value={data.vertical} />
          <ConfigRow label="Channel"     value="DCB · Direct carrier billing" />
          <ConfigRow label="Countries"   value={
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {data.countries.map((c) => (
                <Chip key={c} label={c} variant="soft" />
              ))}
            </Box>
          } />
          <ConfigRow label="Languages"  value={
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Chip label="EN" variant="soft" />
              <Chip label="AR" variant="soft" />
            </Box>
          } />
          <ConfigRow label="Default theme" value={
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 24, height: 24, borderRadius: 1, background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: (t) => `1px solid ${t.palette.border.main}` }} />
              <span>Light brand</span>
            </Box>
          } last />
        </Card>
      </Box>
    </Box>
  );
}

function ConfigRow({ label, value, last = false }: { label: string; value: React.ReactNode; last?: boolean }) {
  return (
    <Box sx={{
      display: 'grid', gridTemplateColumns: '160px 1fr', gap: 2,
      px: 2, py: 1.25,
      borderBottom: last ? 'none' : (t) => `1px solid ${t.palette.border.subtle}`,
    }}>
      <Box component="dt" sx={{ fontSize: 12.5, color: 'text.secondary' }}>{label}</Box>
      <Box component="dd" sx={{ m: 0, fontSize: 13, color: 'text.primary' }}>{value}</Box>
    </Box>
  );
}

// =============================================================================
// Offers tab — list of offer cards (matching HTML card design)
// =============================================================================
function OffersTab({ offers }: { offers: ServiceOffer[] }) {
  if (offers.length === 0) {
    return (
      <Box sx={{ px: 3, py: 2.5 }}>
        <Box sx={{ p: 4, textAlign: 'center', border: (t) => `1px dashed ${t.palette.border.strong}`, borderRadius: 1.5, color: 'text.secondary', fontSize: 13, backgroundColor: 'surface.subtle' }}>
          No offers yet.
        </Box>
      </Box>
    );
  }
  return (
    <Box sx={{ px: 3, py: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <SectionLabel sx={{ mb: 0 }}>Offers</SectionLabel>
        <Button variant="secondary" size="sm" leftIcon={<span style={{ fontSize: 14, lineHeight: 0 }}>+</span>}>Add offer</Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {offers.map((o, i) => {
          const dotColor = o.status === 'online' ? '#10b981' : o.status === 'draft' ? '#f59e0b' : '#a1a1aa';
          return (
            <Box
              key={o.id}
              sx={{
                backgroundColor: 'surface.main',
                border: (t) => `1px solid ${t.palette.border.main}`,
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                {/* Header row: blue tag icon + status dot + name/price */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: 1.5,
                    backgroundColor: '#eff6ff', color: '#2563eb',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <Tag size={16} />
                  </Box>
                  <Box sx={{
                    width: 8, height: 8, borderRadius: '9999px', flexShrink: 0,
                    backgroundColor: dotColor,
                    boxShadow: `0 0 0 2px white`,
                  }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0, fontSize: 14 }}>
                    <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: 14, flexShrink: 0 }}>Offer-{i + 1}</Typography>
                    <Box component="span" sx={{ color: 'border.strong', fontSize: 14 }}>|</Box>
                    <Typography sx={{ color: 'text.primary', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.name}</Typography>
                    <Box component="span" sx={{ color: 'border.strong', fontSize: 14, flexShrink: 0 }}>|</Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14, flexShrink: 0 }}>{o.price}</Typography>
                  </Box>
                  <IconButton size="sm" aria-label="Offer actions" sx={{ flexShrink: 0 }}>
                    <MoreHorizontal size={16} />
                  </IconButton>
                </Box>
                {/* Badge row — country + operator count, indented past tag icon */}
                <Box sx={{ display: 'flex', gap: 0.75, mt: 1, ml: '52px', flexWrap: 'wrap' }}>
                  <Box sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.5,
                    height: 22, px: 1.25, borderRadius: '9999px',
                    backgroundColor: 'surface.subtle', color: 'text.secondary', fontSize: 11.5, fontWeight: 500,
                  }}>
                    <Globe size={12} />{o.country}
                  </Box>
                  <Box sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.5,
                    height: 22, px: 1.25, borderRadius: '9999px',
                    backgroundColor: 'surface.subtle', color: 'text.secondary', fontSize: 11.5, fontWeight: 500,
                  }}>
                    <Server size={12} />{o.operators}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// =============================================================================
// Activity tab — vertical timeline
// =============================================================================
function ActivityTab({ activity }: { activity: ActivityEntry[] }) {
  return (
    <Box sx={{ px: 3, py: 2.5 }}>
      <SectionLabel>Activity</SectionLabel>
      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, pl: '20px', position: 'relative' }}>
        {activity.map((it, i) => (
          <Box key={it.id} component="li" sx={{ position: 'relative', pb: 2, '&:last-child': { pb: 0 } }}>
            {/* Dot */}
            <Box sx={{
              position: 'absolute', left: -20, top: 6,
              width: 8, height: 8, borderRadius: '9999px',
              backgroundColor: '#d4d4d8',
            }} />
            {/* Vertical line (skip on last) */}
            {i < activity.length - 1 && (
              <Box sx={{
                position: 'absolute', left: -15, top: 12, bottom: 0,
                width: '1px', backgroundColor: 'border.subtle',
              }} />
            )}
            <Typography sx={{ fontSize: 13, color: 'text.primary' }}>
              <Box component="span" sx={{ fontWeight: 500 }}>{it.who}</Box>{' '}{it.what}
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: 'text.secondary', mt: 0.25 }}>{it.date}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// =============================================================================
// Tiny shared: section label
// =============================================================================
function SectionLabel({ children, sx }: { children: React.ReactNode; sx?: any }) {
  return (
    <Typography
      sx={{
        fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.4,
        color: 'text.secondary', mb: 1.5, ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
