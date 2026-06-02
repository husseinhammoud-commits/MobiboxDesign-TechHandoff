import type { Meta, StoryObj } from '@storybook/react';
import { Plus, X, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { IconButton } from '../IconButton';

const meta: Meta<typeof IconButton> = {
  title:     'Primitives/IconButton',
  component: IconButton,
  tags:      ['autodocs'],
  argTypes: {
    variant: { control: { type: 'inline-radio' }, options: ['default', 'subtle', 'primary'] },
    size:    { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
  },
  args: { children: <MoreHorizontal size={16} />, 'aria-label': 'More actions' },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <IconButton size="sm" aria-label="Small"><X size={14} /></IconButton>
      <IconButton size="md" aria-label="Medium"><X size={16} /></IconButton>
      <IconButton size="lg" aria-label="Large"><X size={18} /></IconButton>
    </div>
  ),
};
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <IconButton variant="subtle"  aria-label="Subtle"><Edit    size={16} /></IconButton>
      <IconButton variant="default" aria-label="Default"><Edit   size={16} /></IconButton>
      <IconButton variant="primary" aria-label="Primary"><Plus   size={16} /></IconButton>
    </div>
  ),
};
export const Danger: Story = {
  render: () => (
    <IconButton aria-label="Delete" sx={{ color: 'error.main', '&:hover': { backgroundColor: 'error.light' } }}>
      <Trash2 size={16} />
    </IconButton>
  ),
};
