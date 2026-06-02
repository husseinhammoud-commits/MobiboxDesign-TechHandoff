import type { Meta, StoryObj } from '@storybook/react';
import { Download, Plus } from 'lucide-react';
import { PageHeader } from '../PageHeader';
import { Button } from '../Button';
import { Tabs } from '../Tabs';
import { useState } from 'react';

const meta: Meta<typeof PageHeader> = {
  title:      'Composites/PageHeader',
  component:  PageHeader,
  tags:       ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof PageHeader>;

export const ServicesPage: Story = {
  render: () => (
    <PageHeader title="Services">
      <Button variant="secondary" leftIcon={<Download size={14} />}>Export</Button>
      <Button variant="primary"   leftIcon={<Plus     size={14} />}>Create service</Button>
    </PageHeader>
  ),
};

export const DashboardPage: Story = {
  render: () => (
    <PageHeader title="Dashboard" subtitle="Overview of payouts, CAPs, and markets">
      <Button variant="secondary" leftIcon={<Download size={14} />}>Export</Button>
    </PageHeader>
  ),
};

export const WithTabs: Story = {
  render: () => {
    const [tab, setTab] = useState('active');
    return (
      <PageHeader
        title="Services"
        middle={
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { value: 'active',   label: 'Active'   },
              { value: 'archived', label: 'Archived' },
            ]}
          />
        }
      >
        <Button variant="primary" leftIcon={<Plus size={14} />}>Create service</Button>
      </PageHeader>
    );
  },
};
