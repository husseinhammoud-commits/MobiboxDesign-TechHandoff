import type { Meta, StoryObj } from '@storybook/react';
import { Globe } from 'lucide-react';

import { Chip } from '../Chip';

const meta: Meta<typeof Chip> = {
  title:     'Primitives/Chip',
  component: Chip,
  tags:      ['autodocs'],
  argTypes: {
    variant:  { control: { type: 'inline-radio' }, options: ['soft', 'solid', 'outline'] },
    selected: { control: 'boolean' },
  },
  args: { label: 'UAE' },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Soft:     Story = { args: { variant: 'soft'    } };
export const Outline:  Story = { args: { variant: 'outline' } };
export const Selected: Story = { args: { selected: true } };

export const WithCount: Story = {
  args: { label: 'Online', count: 82, leftIcon: <Globe size={12} /> },
};

export const FilterChipsRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Chip label="All"     selected count={114} />
      <Chip label="Online"  count={82}  />
      <Chip label="Offline" count={12}  />
      <Chip label="Drafts"  count={20}  />
    </div>
  ),
};
