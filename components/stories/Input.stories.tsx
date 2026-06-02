import type { Meta, StoryObj } from '@storybook/react';
import { Search } from 'lucide-react';

import { Input } from '../Input';

const meta: Meta<typeof Input> = {
  title:     'Primitives/Input',
  component: Input,
  tags:      ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Basic:        Story = { args: { label: 'Service name', placeholder: 'e.g. Premium VOD Package' } };
export const WithDescription:Story = { args: { label: 'Service name', placeholder: 'e.g. Premium VOD Package', description: 'Shown to your team and used in reports. Max 60 characters.' } };
export const WithSearchIcon:Story = { args: { placeholder: 'Search by name, client, country, category…', leftIcon: <Search size={16} /> } };
export const WithError:    Story = { args: { label: 'Service name', value: '', error: 'Service name is required.' } };
