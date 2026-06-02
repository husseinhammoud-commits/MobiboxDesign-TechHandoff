import type { Meta, StoryObj } from '@storybook/react';
import { Download, Plus, Trash2 } from 'lucide-react';

import { Button } from '../Button';

const meta: Meta<typeof Button> = {
  title:     'Primitives/Button',
  component: Button,
  tags:      ['autodocs'],
  argTypes: {
    variant: { control: { type: 'inline-radio' }, options: ['primary', 'secondary', 'ghost', 'danger'] },
    size:    { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled:{ control: 'boolean' },
  },
  args: { children: 'Button label' },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary:   Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost:     Story = { args: { variant: 'ghost' } };
export const Danger:    Story = { args: { variant: 'danger',  children: 'Delete' } };
export const Loading:   Story = { args: { variant: 'primary', loading: true } };
export const WithIcon:  Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="primary"   leftIcon={<Plus     size={14} />}>Create service</Button>
      <Button variant="secondary" leftIcon={<Download size={14} />}>Export</Button>
      <Button variant="danger"    leftIcon={<Trash2   size={14} />}>Delete</Button>
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
