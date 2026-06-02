'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from '../Dialog';
import { Button } from '../Button';

const meta: Meta = {
  title:      'Primitives/Dialog',
  tags:       ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj;

export const Confirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Done editing this offer's theme?"
          description="Your changes will be saved as a custom theme for Offer-1 and you'll return to the offer list."
          showClose={false}
        >
          <Dialog.Footer>
            <Button variant="ghost"   onClick={() => setOpen(false)}>Keep editing</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Yes, done</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete service</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Delete this service?"
          description="This action cannot be undone. All offers, portals, and associated data will be permanently removed."
        >
          <Dialog.Footer>
            <Button variant="ghost"  onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete service</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export const WithBody: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>View details</Button>
        <Dialog open={open} onClose={() => setOpen(false)} title="Service details" size="md">
          <Dialog.Body>
            <p>This dialog has a scrollable body for richer content — lists, forms, or summaries.</p>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="ghost"   onClick={() => setOpen(false)}>Close</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};
