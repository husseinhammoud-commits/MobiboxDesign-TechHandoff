import type { Meta, StoryObj } from '@storybook/react';

import { StatusPill } from '../StatusPill';

const meta: Meta<typeof StatusPill> = {
  title:     'Primitives/StatusPill',
  component: StatusPill,
  tags:      ['autodocs'],
  argTypes: {
    status:   { control: { type: 'inline-radio' }, options: ['online', 'offline', 'draft', 'themed', 'error'] },
    iconOnly: { control: 'boolean' },
    label:    { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof StatusPill>;

export const Online:   Story = { args: { status: 'online'  } };
export const Offline:  Story = { args: { status: 'offline' } };
export const Draft:    Story = { args: { status: 'draft'   } };
export const Themed:   Story = { args: { status: 'themed'  } };
export const ErrorPill:Story = { args: { status: 'error'   } };

export const IconOnly: Story = { args: { status: 'themed',  iconOnly: true } };

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <StatusPill status="online" />
      <StatusPill status="offline" />
      <StatusPill status="draft" />
      <StatusPill status="themed" />
      <StatusPill status="error" />
    </div>
  ),
};
