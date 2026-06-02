import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DashboardSection } from '../DashboardSection';

const meta: Meta<typeof DashboardSection> = {
  title:      'Composites/DashboardSection',
  component:  DashboardSection,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof DashboardSection>;

export const Default: Story = {
  render: () => (
    <Box sx={{ maxWidth: 800 }}>
      <DashboardSection
        title="Payouts"
        subtitle="Across all services · 8 records"
        searchPlaceholder="Search payouts…"
      >
        {({ query, expanded }) => (
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
              query: <code>"{query}"</code> · expanded: <code>{String(expanded)}</code>
            </Typography>
          </Box>
        )}
      </DashboardSection>
    </Box>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Box sx={{ maxWidth: 800 }}>
      <DashboardSection
        title="CAPs"
        subtitle="Subscription limits · 8 active"
        searchPlaceholder="Search by service, offer, country…"
      >
        {({ query, expanded }) => (
          <Box sx={{ px: 2.5, py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {['Service A · UAE · Daily cap: 287/300', 'Service B · KSA · Weekly cap: 450/500', 'Service C · EG · Monthly cap: 1200/2000']
              .filter(r => !query || r.toLowerCase().includes(query.toLowerCase()))
              .slice(0, expanded ? 10 : 3)
              .map((r) => (
                <Box key={r} sx={{ fontSize: 12.5, color: 'text.secondary' }}>{r}</Box>
              ))
            }
          </Box>
        )}
      </DashboardSection>
    </Box>
  ),
};
