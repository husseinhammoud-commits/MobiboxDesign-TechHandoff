import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { DashboardCAPs } from '../DashboardCAPs';

const meta: Meta<typeof DashboardCAPs> = {
  title:      'Composites/DashboardCAPs',
  component:  DashboardCAPs,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof DashboardCAPs>;

export const Default: Story = {
  render: () => (
    <Box sx={{ maxWidth: 960 }}>
      <DashboardCAPs />
    </Box>
  ),
};
