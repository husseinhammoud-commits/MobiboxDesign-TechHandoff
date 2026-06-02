/**
 * Services overview — the main page that exercises the most of the design system.
 *
 * Composition pattern:
 *   - Server component for the static shell (header, tabs)
 *   - `<ServiceGrid />` (client) owns the interactive state — filters, search, infinite scroll
 *
 * This file is intentionally small — most of the work happens inside the
 * composite components from `@/tech-handoff/components`.
 */

'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import { Download, Plus } from 'lucide-react';

import { Button, PageHeader, ServiceGrid, ServiceWizardDrawer } from '@/tech-handoff/components';

type Tab = 'active' | 'archived';

export default function ServicesPage() {
  const [tab, setTab]           = useState<Tab>('active');
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Services"
        middle={<ServiceTabs value={tab} onChange={setTab} />}
      >
        <Button variant="secondary" leftIcon={<Download size={16} />}>Export</Button>
        <Button variant="primary"   leftIcon={<Plus size={16} />} onClick={() => setWizardOpen(true)}>
          Create service
        </Button>
      </PageHeader>

      <ServiceGrid tab={tab} />

      <ServiceWizardDrawer open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </>
  );
}

// ----- internal: tab nav rendered inside the page header -----

function ServiceTabs({ value, onChange }: { value: Tab; onChange: (t: Tab) => void }) {
  const tabs: { key: Tab; label: string }[] = [
    { key: 'active',   label: 'Active'   },
    { key: 'archived', label: 'Archived' },
  ];
  return (
    <Box component="nav" sx={{ display: 'flex', alignItems: 'center', fontSize: 13.5 }}>
      {tabs.map((t) => {
        const active = value === t.key;
        return (
          <Box
            key={t.key}
            component="button"
            type="button"
            onClick={() => onChange(t.key)}
            sx={{
              all: 'unset',
              cursor: 'pointer',
              px: 1.5, py: 0.75, borderRadius: 1,
              color:        active ? 'text.primary' : 'text.secondary',
              fontWeight:   active ? 500 : 400,
              backgroundColor: active ? 'surface.subtle' : 'transparent',
              transition: 'background-color .12s, color .12s',
              '&:hover': { color: 'text.primary' },
            }}
          >
            {t.label}
          </Box>
        );
      })}
    </Box>
  );
}
