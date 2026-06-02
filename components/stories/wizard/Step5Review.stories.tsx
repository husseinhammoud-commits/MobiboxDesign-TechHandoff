import type { Meta, StoryObj } from '@storybook/react';
import { Step5Review } from '../../wizard/Step5Review';
import type { Step1Values } from '../../wizard/Step1Service';
import type { Step2Values } from '../../wizard/Step2Setup';
import type { OfferDraft  } from '../../wizard/Step3Offers';
import type { Step4Values } from '../../wizard/Step4Portals';

const STEP1: Step1Values = {
  name:     'Premium Gaming Service',
  client:   'Edie Games Co',
  category: 'Gaming',
  premium:  true,
};

const STEP2: Step2Values = {
  countries:    ['UAE', 'KSA', 'Egypt'],
  defaultLang:  'English',
  channelType:  'Direct carrier billing (DCB)',
  customThemes: true,
};

const OFFERS: OfferDraft[] = [
  { id: 'o1', name: 'Weekly Premium', type: 'Subscription', firewall: 'Tier 1', online: true,  themed: true  },
  { id: 'o2', name: 'Daily Lite',     type: 'Subscription', firewall: 'Tier 2', online: true,  themed: false },
];

const STEP4: Step4Values = {
  country:   'UAE',
  operator:  'Etisalat',
  premium:   true,
  url:       'https://landing.example.com/subscribe',
  parameters: [{ name: 'sid', value: 'Static value' }],
};

const meta: Meta<typeof Step5Review> = {
  title:      'Wizard/Step5 — Review',
  component:  Step5Review,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Step5Review>;

export const Complete: Story = {
  args: {
    step1: STEP1,
    step2: STEP2,
    offers: OFFERS,
    step4: STEP4,
    onJumpTo: (idx: number) => console.log('Jump to step', idx + 1),
  },
};

export const Empty: Story = {
  args: {
    step1:  { name: '', client: '', category: '', premium: false },
    step2:  { countries: [], defaultLang: '', channelType: '', customThemes: false },
    offers: [],
    step4:  { country: '', operator: '', premium: false, url: '', parameters: [] },
    onJumpTo: (idx: number) => console.log('Jump to step', idx + 1),
  },
};
