'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { OfferThemeEditor } from '../../wizard/OfferThemeEditor';

const meta: Meta<typeof OfferThemeEditor> = {
  title:      'Wizard/OfferThemeEditor',
  component:  OfferThemeEditor,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    offerLabel: 'Weekly Premium',
    onDone:     () => console.log('Done'),
    onCancel:   () => console.log('Cancel'),
  },
};
export default meta;

type Story = StoryObj<typeof OfferThemeEditor>;

export const Default: Story = {};

export const DailyOffer: Story = {
  args: { offerLabel: 'Daily Lite' },
};
