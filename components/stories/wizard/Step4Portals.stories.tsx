'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Step4Portals } from '../../wizard/Step4Portals';
import type { Step4Values } from '../../wizard/Step4Portals';

const DEFAULT_VALUES: Step4Values = {
  country:    '',
  operator:   '',
  premium:    false,
  url:        '',
  parameters: [],
};

const CONFIGURED_VALUES: Step4Values = {
  country:   'UAE',
  operator:  'Etisalat',
  premium:   true,
  url:       'https://landing.example.com/subscribe',
  parameters: [
    { name: 'sid',    value: 'Static value' },
    { name: 'msisdn', value: 'Dynamic from request' },
  ],
};

const meta: Meta<typeof Step4Portals> = {
  title:      'Wizard/Step4 — Portals',
  component:  Step4Portals,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Step4Portals>;

export const Empty: Story = {
  render: () => {
    const [values, setValues] = useState<Step4Values>(DEFAULT_VALUES);
    return (
      <Step4Portals
        values={values}
        onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))}
      />
    );
  },
};

export const Configured: Story = {
  render: () => {
    const [values, setValues] = useState<Step4Values>(CONFIGURED_VALUES);
    return (
      <Step4Portals
        values={values}
        onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))}
      />
    );
  },
};
