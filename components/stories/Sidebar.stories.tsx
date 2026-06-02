import type { Meta, StoryObj } from '@storybook/react';
import { LayoutDashboard, Package, Briefcase } from 'lucide-react';
import { Sidebar } from '../Sidebar';

const ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={16} /> },
  { label: 'Services',  href: '/services',  icon: <Package          size={16} /> },
  { label: 'Clients',   href: '/clients',   icon: <Briefcase        size={16} /> },
];

const meta: Meta<typeof Sidebar> = {
  title:      'Composites/Sidebar',
  component:  Sidebar,
  tags:       ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: { items: ITEMS },
};

export const CustomBrand: Story = {
  args: { items: ITEMS, brand: 'MobiBox' },
};
