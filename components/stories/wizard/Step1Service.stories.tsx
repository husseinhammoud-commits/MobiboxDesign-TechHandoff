'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Step1Service } from '../../wizard/Step1Service';
import type { Step1Values } from '../../wizard/Step1Service';

const DEFAULT_VALUES: Step1Values = {
  name:     '',
  client:   '',
  category: '',
  premium:  true,
};

const FILLED_VALUES: Step1Values = {
  name:     'Premium Gaming Service',
  client:   'Edie Games Co',
  category: 'Gaming',
  premium:  true,
};

const meta: Meta<typeof Step1Service> = {
  title:      'Wizard/Step1 — Service',
  component:  Step1Service,
  tags:       ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof Step1Service>;

export const Empty: Story = {
  render: () => {
    const [values, setValues] = useState<Step1Values>(DEFAULT_VALUES);
    return (
      <Step1Service
        values={values}
        onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))}
      />
    );
  },
};

export const Filled: Story = {
  render: () => {
    const [values, setValues] = useState<Step1Values>(FILLED_VALUES);
    return (
      <Step1Service
        values={values}
        onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))}
      />
    );
  },
};
