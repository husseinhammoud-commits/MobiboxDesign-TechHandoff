'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { WizardShell } from '../WizardShell';

const STEPS = [
  { label: 'Service' },
  { label: 'Set up'  },
  { label: 'Offers'  },
  { label: 'Portals' },
  { label: 'Review'  },
];

const meta: Meta<typeof WizardShell> = {
  title:      'Composites/WizardShell',
  component:  WizardShell,
  tags:       ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof WizardShell>;

export const Step1Active: Story = {
  args: {
    title:        'Create new service',
    stepperItems: STEPS,
    currentStep:  0,
    children:     (
      <Box sx={{ p: 3, border: '2px dashed #e4e4e7', borderRadius: 2, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Step 1 body content</Typography>
      </Box>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <WizardShell
        title="Create new service"
        stepperItems={STEPS}
        currentStep={step}
        onJumpStep={setStep}
        onBack={() => setStep((s) => Math.max(0, s - 1))}
        onContinue={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
        onSaveDraft={() => alert('Draft saved')}
        onExit={() => alert('Exit')}
        continueLabel={step === STEPS.length - 1 ? 'Launch service' : 'Continue'}
      >
        <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>Step {step + 1} — {STEPS[step].label}</Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
            Use the footer buttons or click a step to navigate.
          </Typography>
        </Box>
      </WizardShell>
    );
  },
};

export const LastStep: Story = {
  args: {
    title:         'Create new service',
    stepperItems:  STEPS,
    currentStep:   4,
    continueLabel: 'Launch service',
    children: (
      <Box sx={{ p: 3, border: '2px dashed #e4e4e7', borderRadius: 2, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Step 5 — Review</Typography>
      </Box>
    ),
  },
};
