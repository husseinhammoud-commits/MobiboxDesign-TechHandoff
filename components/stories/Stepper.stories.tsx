import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../Stepper';

const ITEMS = [
  { label: 'Service' },
  { label: 'Set up' },
  { label: 'Offers' },
  { label: 'Portals' },
  { label: 'Review' },
];

const meta: Meta<typeof Stepper> = {
  title:     'Primitives/Stepper',
  component: Stepper,
  tags:      ['autodocs'],
  args:      { items: ITEMS },
  argTypes: {
    current: { control: { type: 'range', min: 0, max: 4, step: 1 } },
  },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Step1: Story = { args: { current: 0 } };
export const Step3: Story = { args: { current: 2 } };
export const Complete: Story = { args: { current: 4 } };
export const Jumpable: Story = {
  args: { current: 2 },
  render: (args: StepperProps) => (
    <Stepper
      {...args}
      onJump={(i) => console.log('Jump to', i)}
    />
  ),
};
