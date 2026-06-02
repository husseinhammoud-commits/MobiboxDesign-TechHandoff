import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from '../Select';

const meta: Meta<typeof Select> = {
  title:     'Primitives/Select',
  component: Select,
  tags:      ['autodocs'],
  args: {
    label:   'Client',
    options: ['Hexum Client', 'Edie Games Co', 'SoundWave Media', 'BrightStar Apps', 'Pulse Studios'],
    value:   '',
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const WithPlaceholder: Story = {
  args: { placeholder: 'Select a client…', value: '' },
};
export const WithDescription: Story = {
  args: {
    label:       'Category',
    description: 'Categorize for reporting and filtering.',
    placeholder: 'Select category',
    options:     ['Entertainment', 'Gaming', 'Music', 'Sports', 'Trivia', 'Lifestyle'],
    value:       '',
  },
};
export const Selected: Story = {
  args: { value: 'Edie Games Co' },
};
export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <Select
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value as string)}
      />
    );
  },
};
export const ObjectOptions: Story = {
  args: {
    label:   'Status',
    options: [
      { value: 'online',  label: 'Online'  },
      { value: 'offline', label: 'Offline' },
      { value: 'draft',   label: 'Draft'   },
    ],
    value: '',
  },
};
