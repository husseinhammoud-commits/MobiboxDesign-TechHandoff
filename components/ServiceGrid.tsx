/**
 * ServiceGrid — the searchable, filterable, infinite-scrolling grid of
 * service cards used on the Services Overview page.
 *
 * Owns the screen-level state:
 *   - active filter chip       (all | online | offline | draft)
 *   - search query
 *   - archived ids             (local-only, not persisted to backend in this layer)
 *
 * Delegates to:
 *   - `useInfiniteScroll`  for paginated rendering + cascade-load behavior
 *   - `ServiceCard`        for each item
 *   - `Chip`               for the filter chips
 *   - `Input`              for the global search
 *
 * The grid is intentionally self-contained — pages just drop `<ServiceGrid />`
 * into their layout and don't manage any of this state themselves.
 */

'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Search } from 'lucide-react';

import { Chip, Input, Skeleton } from './';
import { ServiceCard } from './ServiceCard';
import { ServiceDetailDrawer } from './ServiceDetailDrawer';
import { useInfiniteScroll } from '@/tech-handoff/hooks/useInfiniteScroll';
import { SERVICES, FILTER_MATCHERS, matchesQuery, type FilterKey, type Service } from '@/tech-handoff/lib/mock-services';

type Tab = 'active' | 'archived';

export interface ServiceGridProps {
  tab: Tab;
}

export function ServiceGrid({ tab }: ServiceGridProps) {
  const [filter, setFilter]           = useState<FilterKey>('all');
  const [query, setQuery]             = useState('');
  const [archivedIds, setArchivedIds] = useState<Set<string>>(() => new Set());
  const [openService, setOpenService] = useState<Service | null>(null);

  // Layer 1: tab scope (active vs archived)
  const tabScoped = useMemo(
    () => SERVICES.filter((s) => (tab === 'archived' ? archivedIds.has(s.serviceId) : !archivedIds.has(s.serviceId))),
    [tab, archivedIds]
  );

  // Layer 2: filter chip
  const filtered = useMemo(() => {
    const matchFilter = FILTER_MATCHERS[filter];
    return tabScoped.filter((s) => matchFilter(s) && matchesQuery(s, query));
  }, [tabScoped, filter, query]);

  // Layer 3: chip counts (scoped to current tab, ignoring active filter so counts stay honest)
  const counts = useMemo(() => {
    const tally: Record<FilterKey, number> = { all: tabScoped.length, online: 0, offline: 0, draft: 0 };
    for (const s of tabScoped) {
      if (s.status === 'online')  tally.online  += 1;
      if (s.status === 'offline') tally.offline += 1;
      if (s.status === 'draft')   tally.draft   += 1;
    }
    return tally;
  }, [tabScoped]);

  // Layer 4: paginated rendering + cascade-load on tall displays
  const { visibleItems, sentinelRef, isLoading, reachedEnd, loadedCount, totalCount } = useInfiniteScroll(filtered);

  // Handlers
  const handleArchive = (svc: Service) => {
    setArchivedIds((prev) => {
      const next = new Set(prev);
      if (next.has(svc.serviceId)) next.delete(svc.serviceId);
      else next.add(svc.serviceId);
      return next;
    });
  };

  const handleDelete = (svc: Service) => {
    if (!confirm(`Delete "${svc.name}"? This can't be undone.`)) return;
    // Real impl would call an API. For this POC, we just hide the row visually
    // by archiving it — keeps the SERVICES array immutable.
    setArchivedIds((prev) => new Set(prev).add(svc.serviceId));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      {/* Sticky filter + search row */}
      <Box
        sx={{
          position: 'sticky', top: 56, zIndex: 20,
          mx: -3, px: 3, py: 1.5, mb: 1.5,
          backgroundColor: 'rgba(250,250,250,0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: (t) => `1px solid ${t.palette.border.subtle}`,
          display: 'flex', alignItems: 'center', gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip selected={filter === 'all'}     count={counts.all}     onClick={() => setFilter('all')}    label="All" leftIcon={<Dot color="#d4d4d8" />} />
          <Chip selected={filter === 'online'}  count={counts.online}  onClick={() => setFilter(filter === 'online'  ? 'all' : 'online')}  label="Online"  leftIcon={<Dot color="#10b981" />} />
          <Chip selected={filter === 'offline'} count={counts.offline} onClick={() => setFilter(filter === 'offline' ? 'all' : 'offline')} label="Offline" leftIcon={<Dot color="#a1a1aa" />} />
          <Chip selected={filter === 'draft'}   count={counts.draft}   onClick={() => setFilter(filter === 'draft'   ? 'all' : 'draft')}   label="Drafts"  leftIcon={<Dot color="#f59e0b" />} />
        </Box>
        <Box sx={{ ml: 'auto', maxWidth: 'xl', flex: 1, minWidth: 220 }}>
          <Input
            value={query}
            onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
            placeholder="Search by name, client, country, category, or status…"
            leftIcon={<Search size={16} color="#a1a1aa" />}
          />
        </Box>
      </Box>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState query={query} filter={filter} tab={tab} />
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 1.5 }}>
          {visibleItems.map((svc) => (
            <ServiceCard
              key={svc.serviceId}
              service={svc}
              isArchived={archivedIds.has(svc.serviceId)}
              onOpen={setOpenService}
              onViewPayout={(s) => console.log('view payout', s.serviceId)}
              onGenerateTestLink={(s) => console.log('test link', s.serviceId)}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />
          ))}
          {isLoading && Array.from({ length: 9 }).map((_, i) => <ServiceCardSkeleton key={`sk-${i}`} />)}
        </Box>
      )}

      {/* Sentinel — picked up by IntersectionObserver in useInfiniteScroll */}
      <Box ref={sentinelRef} sx={{ height: 1, mt: 3 }} />

      {/* Status text */}
      {reachedEnd && filtered.length > 0 && (
        <Typography sx={{ mt: 2, mb: 1, textAlign: 'center', fontSize: 12, color: 'text.disabled' }}>
          {loadedCount === totalCount ? `Showing all ${totalCount} services` : null}
        </Typography>
      )}

      {/* Service-detail drawer — opens when a card is clicked */}
      <ServiceDetailDrawer
        service={openService}
        open={openService !== null}
        onClose={() => setOpenService(null)}
      />
    </Box>
  );
}

// ----- internal -----------------------------------------------------------

function Dot({ color }: { color: string }) {
  return <Box component="span" sx={{ width: 8, height: 8, borderRadius: '9999px', backgroundColor: color, display: 'inline-block' }} />;
}

function ServiceCardSkeleton() {
  return (
    <Box sx={{ p: 2, backgroundColor: 'surface.main', border: (t) => `1px solid ${t.palette.border.main}`, borderRadius: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.5 }}>
        <Skeleton variant="rect" width={36} height={36} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="75%" height={16} sx={{ mb: 0.75 }} />
          <Skeleton variant="text" width="50%" height={12} />
        </Box>
        <Skeleton variant="rect" width={56} height={20} sx={{ borderRadius: '9999px' }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {[80, 100, 70].map((w, i) => (
          <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton variant="text" width={64} height={12} />
            <Skeleton variant="text" width={w} height={12} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function EmptyState({ query, filter, tab }: { query: string; filter: FilterKey; tab: Tab }) {
  const message =
    query                ? `No services match "${query}"` :
    tab === 'archived'   ? 'No archived services' :
    filter !== 'all'     ? `No ${filter} services right now` :
                           'No services yet';
  return (
    <Box sx={{
      py: 8, textAlign: 'center',
      backgroundColor: 'surface.main',
      border: (t) => `1px dashed ${t.palette.border.strong}`,
      borderRadius: 1.5,
    }}>
      <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: 'text.primary' }}>{message}</Typography>
      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.5 }}>
        Try clearing your search or filters to see more results.
      </Typography>
    </Box>
  );
}
