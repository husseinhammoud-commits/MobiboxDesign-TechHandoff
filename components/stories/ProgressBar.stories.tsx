import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from '../ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title:     'Primitives/ProgressBar',
  component: ProgressBar,
  tags:      ['autodocs'],
  argTypes: {
    tone: { control: { type: 'inline-radio' }, options: ['auto','success','warning','danger','info','neutral'] },
  },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Healthy:    Story = { args: { value: 600, max: 1000 }, decorators: [(s) => <div style={{ width: 360 }}>{s()}</div>] };
export const NearLimit:  Story = { args: { value: 900, max: 1000 }, decorators: [(s) => <div style={{ width: 360 }}>{s()}</div>] };
export const Exhausted:  Story = { args: { value: 1000,max: 1000 }, decorators: [(s) => <div style={{ width: 360 }}>{s()}</div>] };
export const Spectrum: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360 }}>
      {[200, 500, 850, 1000].map((v) => (
        <div key={v}>
          <ProgressBar value={v} max={1000} />
          <div style={{ marginTop: 4, fontSize: 11, color: '#71717a' }}>{v} / 1000 ({Math.round(v / 10)}%)</div>
        </div>
      ))}
    </div>
  ),
};
