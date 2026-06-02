import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Tabs } from '../Tabs';

const meta: Meta<typeof Tabs> = {
  title:     'Primitives/Tabs',
  component: Tabs,
  tags:      ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

const WIZARD_TABS = [
  { value: 'country', label: 'Country' },
  { value: 'billing', label: 'Billing' },
  { value: 'theme',   label: 'Theme'   },
];

const DETAIL_TABS = [
  { value: 'overview',  label: 'Overview'  },
  { value: 'offers',    label: 'Offers',   count: 6  },
  { value: 'activity',  label: 'Activity'             },
  { value: 'settings',  label: 'Settings'             },
];

export const Default: Story = {
  render: () => {
    const [tab, setTab] = useState('country');
    return (
      <Box sx={{ width: 600 }}>
        <Tabs value={tab} onChange={setTab} items={WIZARD_TABS} />
        <Box sx={{ p: 2, fontSize: 13, color: 'text.secondary' }}>Active: {tab}</Box>
      </Box>
    );
  },
};

export const WithCounts: Story = {
  render: () => {
    const [tab, setTab] = useState('overview');
    return (
      <Box sx={{ width: 600 }}>
        <Tabs value={tab} onChange={setTab} items={DETAIL_TABS} />
        <Box sx={{ p: 2, fontSize: 13, color: 'text.secondary' }}>Active: {tab}</Box>
      </Box>
    );
  },
};
