'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Step3Offers } from '../../wizard/Step3Offers';
import type { OfferDraft } from '../../wizard/Step3Offers';

const SAMPLE_OFFERS: OfferDraft[] = [
  { id: 'offer-1', name: 'Weekly Premium',  type: 'Subscription', firewall: 'Tier 1', online: true,  themed: false },
  { id: 'offer-2', name: 'Daily Lite',      type: 'Subscription', firewall: 'Tier 2', online: true,  themed: true  },
  { id: 'offer-3', name: 'One-off Boost',   type: 'One-off',      firewall: '',       online: false, themed: false },
];

const meta: Meta<typeof Step3Offers> = {
  title:      'Wizard/Step3 — Offers',
  component:  Step3Offers,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Step3Offers>;

export const EmptyForm: Story = {
  render: () => {
    const [offers, setOffers] = useState<OfferDraft[]>([]);
    return (
      <Step3Offers
        offers={offers}
        onAddOffer={(o) => setOffers((p) => [...p, o])}
        onUpdateOffer={(id, patch) => setOffers((p) => p.map((o) => o.id === id ? { ...o, ...patch } : o))}
        onRemoveOffer={(id) => setOffers((p) => p.filter((o) => o.id !== id))}
        onEditTheme={(id) => console.log('Edit theme for', id)}
      />
    );
  },
};

export const WithOffers: Story = {
  render: () => {
    const [offers, setOffers] = useState<OfferDraft[]>(SAMPLE_OFFERS);
    return (
      <Step3Offers
        offers={offers}
        onAddOffer={(o) => setOffers((p) => [...p, o])}
        onUpdateOffer={(id, patch) => setOffers((p) => p.map((o) => o.id === id ? { ...o, ...patch } : o))}
        onRemoveOffer={(id) => setOffers((p) => p.filter((o) => o.id !== id))}
        onEditTheme={(id) => console.log('Edit theme for', id)}
      />
    );
  },
};
