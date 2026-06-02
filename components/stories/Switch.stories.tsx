import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '../Switch';

const meta: Meta<typeof Switch> = {
  title:     'Primitives/Switch',
  component: Switch,
  tags:      ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Bare:    Story = { args: {} };
export const Inline:  Story = { args: { label: 'Online', checked: true } };
export const Stacked: Story = { args: { label: 'Operator Cap', description: 'When switched on, the cap will focus on the operator level.', stacked: true } };
