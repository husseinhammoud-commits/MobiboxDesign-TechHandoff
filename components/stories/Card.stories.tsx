import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '../Card';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    padded:    { control: 'boolean' },
    hoverable: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { children: <div>Hello from inside a card. Padded by default.</div> },
};
export const Hoverable: Story = {
  args: { hoverable: true, children: <div>Hover me — border + shadow shift.</div> },
};
export const Unpadded: Story = {
  args: { padded: false, children: <div style={{ padding: 24, background: '#fafafa' }}>Padding off — caller owns layout.</div> },
};
