import type { Meta, StoryObj } from '@storybook/react';

import { BarChart } from '../BarChart';

const meta: Meta<typeof BarChart> = {
  title:     'Primitives/BarChart',
  component: BarChart,
  tags:      ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof BarChart>;

const SAMPLE = [
  { name: 'SA',  value: 4.50 },
  { name: 'QA',  value: 4.00 },
  { name: 'UAE', value: 3.70 },
  { name: 'KW',  value: 2.80 },
  { name: 'EG',  value: 0.90 },
];

export const ByGEO: Story = {
  args: { data: SAMPLE, formatValue: (n) => `$${n.toFixed(2)}`, height: 240 },
  decorators: [(s) => <div style={{ width: 640 }}>{s()}</div>],
};

export const ByOperator: Story = {
  args: {
    data: [
      { name: 'STC',      value: 3.00 },
      { name: 'Etisalat', value: 2.50 },
      { name: 'Ooredoo',  value: 6.80 },
      { name: 'du',       value: 1.20 },
      { name: 'Orange',   value: 0.40 },
      { name: 'Vodafone', value: 0.50 },
      { name: 'Zain',     value: 1.50 },
    ],
    formatValue: (n) => `$${n.toFixed(2)}`,
    height: 240,
  },
  decorators: [(s) => <div style={{ width: 720 }}>{s()}</div>],
};

export const Empty: Story = {
  args: { data: [], height: 240 },
  decorators: [(s) => <div style={{ width: 640 }}>{s()}</div>],
};
