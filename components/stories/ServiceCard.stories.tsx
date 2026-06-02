import type { Meta, StoryObj } from '@storybook/react';
import { ServiceCard } from '../ServiceCard';
import type { Service } from '@/tech-handoff/lib/mock-services';

const SERVICE_ONLINE: Service = {
  name:        'Premium Gaming Service',
  serviceId:   'SRV-25149',
  category:    'Gaming',
  client:      'Edie Games Co',
  status:      'online',
  dateCreated: 'May 05, 2025',
  sub:         'Edie Games Co · 6 offers · 8 countries',
};

const SERVICE_DRAFT: Service = {
  name:        'Automated Service 1',
  serviceId:   'SRV-25127',
  category:    'Tools',
  client:      'No client assigned',
  status:      'draft',
  dateCreated: 'Apr 11, 2025',
  sub:         'No client · 4 offers · 2 countries',
  warning:     '2 issues need review',
};

const SERVICE_OFFLINE: Service = {
  name:        'Movie Trailers Pro',
  serviceId:   'SRV-25231',
  category:    'Entertainment',
  client:      'MediaCo',
  status:      'offline',
  dateCreated: 'Sep 24, 2025',
  sub:         'MediaCo · 2 offers · 3 countries',
  warning:     'Approval blocked: 2 issues',
};

const meta: Meta<typeof ServiceCard> = {
  title:      'Composites/ServiceCard',
  component:  ServiceCard,
  tags:       ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export default meta;

type Story = StoryObj<typeof ServiceCard>;

export const Online:  Story = { args: { service: SERVICE_ONLINE  } };
export const Draft:   Story = { args: { service: SERVICE_DRAFT   } };
export const Offline: Story = { args: { service: SERVICE_OFFLINE } };
export const Archived: Story = { args: { service: SERVICE_ONLINE, isArchived: true } };
