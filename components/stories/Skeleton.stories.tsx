import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { Skeleton } from '../Skeleton';

const meta: Meta<typeof Skeleton> = {
  title:     'Primitives/Skeleton',
  component: Skeleton,
  tags:      ['autodocs'],
  args: { width: 200, height: 16 },
  argTypes: {
    variant: { control: { type: 'inline-radio' }, options: ['rect', 'circle', 'text'] },
  },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Text:   Story = { args: { variant: 'text', width: 200, height: 14 } };
export const Rect:   Story = { args: { variant: 'rect', width: 200, height: 32 } };
export const Circle: Story = { args: { variant: 'circle', size: 40 } };

export const CardSkeleton: Story = {
  render: () => (
    <Box sx={{ width: 320, p: 2.5, border: '1px solid #e4e4e7', borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Skeleton variant="circle" size={36} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Skeleton variant="text" width="60%" height={14} />
          <Skeleton variant="text" width="40%" height={12} />
        </Box>
        <Skeleton variant="rect" width={56} height={22} />
      </Box>
      <Skeleton variant="text" width="80%" height={12} />
      <Skeleton variant="text" width="55%" height={12} />
      <Skeleton variant="text" width="70%" height={12} />
    </Box>
  ),
};
