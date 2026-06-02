import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { DashboardCountryOps } from '../DashboardCountryOps';

const meta: Meta<typeof DashboardCountryOps> = {
  title:      'Composites/DashboardCountryOps',
  component:  DashboardCountryOps,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof DashboardCountryOps>;

export const Default: Story = {
  render: () => (
    <Box sx={{ maxWidth: 960 }}>
      <DashboardCountryOps />
    </Box>
  ),
};
