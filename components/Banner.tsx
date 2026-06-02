/**
 * Banner — inline alert/notice block used for "near limit" warnings,
 * informational messages, and prompts inside cards or sections.
 *
 * Distinct from Toast (which is transient and floats) — Banner stays put in
 * the document flow. Distinct from Dialog (which interrupts) — Banner just
 * informs.
 *
 * Usage:
 *   <Banner tone="warning" icon={<AlertTriangleIcon />}>
 *     <strong>3 CAPs need attention</strong> — review usage before traffic gets dropped.
 *   </Banner>
 *
 *   <Banner tone="info" icon={<InfoIcon />} action={<Button size="sm">Learn more</Button>}>
 *     These settings inherit to every offer in this service.
 *   </Banner>
 */

import { ReactNode } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

type Tone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BannerProps extends Omit<BoxProps, 'children'> {
  tone?:     Tone;
  icon?:     ReactNode;
  action?:   ReactNode;
  children:  ReactNode;
}

const TONE_STYLES: Record<Tone, { bg: string; border: string; text: string; iconColor: string }> = {
  info:     { bg: '#eff6ff', border: '#dbeafe', text: '#1e3a8a', iconColor: '#2563eb' },
  success:  { bg: '#ecfdf5', border: '#d1fae5', text: '#065f46', iconColor: '#059669' },
  warning:  { bg: '#fffbeb', border: '#fef3c7', text: '#78350f', iconColor: '#b45309' },
  danger:   { bg: '#fff1f2', border: '#ffe4e6', text: '#881337', iconColor: '#be123c' },
  neutral:  { bg: '#fafafa', border: '#e4e4e7', text: '#27272a', iconColor: '#52525b' },
};

export function Banner({ tone = 'info', icon, action, children, sx, ...rest }: BannerProps) {
  const s = TONE_STYLES[tone];
  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'flex-start', gap: 1.25,
        backgroundColor: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 1.5,
        padding: 1.5,
        fontSize: 12.5,
        color: s.text,
        ...sx,
      }}
      {...rest}
    >
      {icon && (
        <Box component="span" sx={{ display: 'inline-flex', color: s.iconColor, mt: 0.25, flexShrink: 0 }}>
          {icon}
        </Box>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>
      {action && <Box sx={{ ml: 1, flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}
