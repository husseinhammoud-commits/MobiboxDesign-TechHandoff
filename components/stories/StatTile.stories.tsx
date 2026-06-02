import type { Meta, StoryObj } from '@storybook/react';

import { StatTile } from '../StatTile';

const meta: Meta<typeof StatTile> = {
  title:     'Primitives/StatTile',
  component: StatTile,
  tags:      ['autodocs'],
  argTypes:  { tone: { control: { type: 'inline-radio' }, options: ['neutral','positive','negative','muted'] } },
};
export default meta;

type Story = StoryObj<typeof StatTile>;

export const Neutral:    Story = { args: { label: 'Avg payout',    value: '$3.10' } };
export const Positive:   Story = { args: { label: 'This week',     value: '+16%',  tone: 'positive' } };
export const Negative:   Story = { args: { label: 'This week',     value: '-9%',   tone: 'negative' } };

export const KPIStrip: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, minWidth: 720 }}>
      <StatTile label="Avg payout"     value="$3.10" />
      <StatTile label="Active services" value={9}    tone="positive" />
      <StatTile label="CAPs near limit" value={3}    tone="negative" />
      <StatTile label="Markets covered" value={12} />
    </div>
  ),
};
