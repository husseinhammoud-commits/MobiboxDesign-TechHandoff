import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { DashboardPayouts } from '../DashboardPayouts';

const meta: Meta<typeof DashboardPayouts> = {
  title:      'Composites/DashboardPayouts',
  component:  DashboardPayouts,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof DashboardPayouts>;

export const Default: Story = {
  render: () => (
    <Box sx={{ maxWidth: 960 }}>
      <DashboardPayouts />
    </Box>
  ),
};
