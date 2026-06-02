/**
 * WizardShell — full-screen wizard chrome.
 *
 * Renders a sticky header (title + status pill + stepper + Exit button),
 * a scrollable body for the current step, and a sticky footer with
 * Back / Save draft & exit / Continue/Launch buttons.
 *
 * Presentational — the page owns step state and decides what each button does.
 */

'use client';

import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

import { Button, Chip, Stepper } from './';

export interface WizardShellProps {
  title:          string;
  statusLabel?:   string;
  stepperItems:   { label: string }[];
  currentStep:    number;
  onJumpStep?:    (idx: number) => void;
  onBack?:        () => void;
  onContinue?:    () => void;
  onSaveDraft?:   () => void;
  onExit?:        () => void;
  continueLabel?: string;
  children:       ReactNode;
}

export function WizardShell({
  title, statusLabel = 'Draft',
  stepperItems, currentStep, onJumpStep,
  onBack, onContinue, onSaveDraft, onExit,
  continueLabel = 'Continue',
  children,
}: WizardShellProps) {
  const isFirst = currentStep === 0;
  const isLast  = currentStep === stepperItems.length - 1;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box component="header" sx={{
        position: 'sticky', top: 0, zIndex: 20,
        backgroundColor: 'surface.main',
        borderBottom: (t) => `1px solid ${t.palette.border.main}`,
        paddingInline: 4, paddingTop: 2.5, paddingBottom: 2,
      }}>
        <Box sx={{ maxWidth: 940, mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography component="h1" sx={{ fontSize: 18, fontWeight: 600 }}>{title}</Typography>
                {statusLabel && <Chip label={statusLabel} variant="soft" />}
              </Box>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.5 }}>
                {stepperItems.length}-step setup. Your progress is saved automatically.
              </Typography>
            </Box>
            {onExit && (
              <Button variant="secondary" leftIcon={<X size={14} />} onClick={onExit}>Exit</Button>
            )}
          </Box>
          <Box sx={{ mt: 2.5 }}>
            <Stepper items={stepperItems} current={currentStep} onJump={onJumpStep} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, paddingInline: 4, paddingBlock: 4 }}>
        <Box sx={{ maxWidth: 940, mx: 'auto' }}>{children}</Box>
      </Box>

      <Box sx={{
        position: 'sticky', bottom: 0, zIndex: 10,
        backgroundColor: 'surface.main',
        borderTop: (t) => `1px solid ${t.palette.border.main}`,
        paddingInline: 4, paddingBlock: 1.5,
      }}>
        <Box sx={{ maxWidth: 940, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
          <Button variant="secondary" disabled={isFirst} leftIcon={<ArrowLeft size={14} />} onClick={onBack}>Back</Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {onSaveDraft && <Button variant="secondary" onClick={onSaveDraft}>Save draft &amp; exit</Button>}
            <Button variant="primary" rightIcon={!isLast ? <ArrowRight size={14} /> : undefined} onClick={onContinue}>
              {continueLabel}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
