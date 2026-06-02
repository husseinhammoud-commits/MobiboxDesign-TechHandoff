'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Step2Setup } from '../../wizard/Step2Setup';
import type { Step2Values } from '../../wizard/Step2Setup';

const DEFAULT_VALUES: Step2Values = {
  countries:    [],
  defaultLang:  '',
  channelType:  '',
  customThemes: false,
};

const CONFIGURED_VALUES: Step2Values = {
  countries:    ['UAE', 'KSA', 'Egypt'],
  defaultLang:  'English',
  channelType:  'Direct carrier billing (DCB)',
  customThemes: true,
};

const meta: Meta<typeof Step2Setup> = {
  title:      'Wizard/Step2 — Set up',
  component:  Step2Setup,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Step2Setup>;

export const Empty: Story = {
  render: () => {
    const [values, setValues] = useState<Step2Values>(DEFAULT_VALUES);
    return (
      <Step2Setup
        values={values}
        onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))}
      />
    );
  },
};

export const Configured: Story = {
  render: () => {
    const [values, setValues] = useState<Step2Values>(CONFIGURED_VALUES);
    return (
      <Step2Setup
        values={values}
        onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))}
      />
    );
  },
};
