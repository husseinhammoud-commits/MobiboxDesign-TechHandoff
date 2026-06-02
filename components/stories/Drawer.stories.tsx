'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Drawer } from '../Drawer';
import { Button } from '../Button';
import { StatusPill } from '../StatusPill';

const meta: Meta = {
  title:      'Primitives/Drawer',
  tags:       ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

export const ServiceDetail: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box sx={{ p: 3 }}>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open service drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Drawer.Header
            title="Premium Gaming Service"
            subtitle="SRV-25149 · Edie Games Co"
            onClose={() => setOpen(false)}
          >
            <StatusPill status="online" />
          </Drawer.Header>
          <Drawer.Body>
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              Drawer body content. Scrollable when content overflows.
            </Typography>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="ghost"     onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>Edit</Button>
            <Button variant="primary"   onClick={() => setOpen(false)}>Save changes</Button>
          </Drawer.Footer>
        </Drawer>
      </Box>
    );
  },
};

export const SmallDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Box sx={{ p: 3 }}>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open small drawer (480px)</Button>
        <Drawer open={open} onClose={() => setOpen(false)} size="sm">
          <Drawer.Header title="Quick edit" onClose={() => setOpen(false)} />
          <Drawer.Body>
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Small drawer body.</Typography>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="primary" onClick={() => setOpen(false)}>Done</Button>
          </Drawer.Footer>
        </Drawer>
      </Box>
    );
  },
};
