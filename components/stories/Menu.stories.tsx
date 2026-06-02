'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { MoreHorizontal, Eye, Edit, Archive, Trash2 } from 'lucide-react';
import { Menu, useMenu } from '../Menu';
import { IconButton } from '../IconButton';

const meta: Meta = {
  title:      'Primitives/Menu',
  tags:       ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const { anchor, open, openMenu, closeMenu } = useMenu();
    return (
      <>
        <IconButton onClick={openMenu} aria-label="More actions">
          <MoreHorizontal size={16} />
        </IconButton>
        <Menu anchorEl={anchor} open={open} onClose={closeMenu}>
          <Menu.Item icon={<Eye     size={14} />} onClick={closeMenu}>View details</Menu.Item>
          <Menu.Item icon={<Edit    size={14} />} onClick={closeMenu}>Edit service</Menu.Item>
          <Menu.Item icon={<Archive size={14} />} onClick={closeMenu}>Archive</Menu.Item>
          <Menu.Divider />
          <Menu.Item icon={<Trash2  size={14} />} variant="danger" onClick={closeMenu}>Delete</Menu.Item>
        </Menu>
      </>
    );
  },
};

export const OfferMenu: Story = {
  render: () => {
    const { anchor, open, openMenu, closeMenu } = useMenu();
    return (
      <>
        <IconButton onClick={openMenu} aria-label="Offer actions">
          <MoreHorizontal size={16} />
        </IconButton>
        <Menu anchorEl={anchor} open={open} onClose={closeMenu}>
          <Menu.Item onClick={closeMenu}>Duplicate &amp; edit theme</Menu.Item>
          <Menu.Divider />
          <Menu.Item variant="danger" icon={<Trash2 size={14} />} onClick={closeMenu}>Delete offer</Menu.Item>
        </Menu>
      </>
    );
  },
};
