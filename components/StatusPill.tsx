/**
 * StatusPill — informational pill showing a status (online/offline/draft/themed/etc).
 *
 * Distinct from Chip because it's never interactive — it just communicates state.
 * Uses semantic status colors from the theme so the visual mapping
 *   online  → emerald  (success)
 *   offline → zinc     (neutral, paused)
 *   draft   → amber    (warning)
 *   themed  → violet   (accent — for the "has custom theme" badge on offer cards)
 *   error   → rose     (danger — for the "Issue" status)
 * stays consistent everywhere.
 *
 * Usage:
 *   <StatusPill status="online">Online</StatusPill>
 *   <StatusPill status="draft" />        // label defaults to status name (capitalized)
 *   <StatusPill status="themed" iconOnly />   // for the violet paintbrush badge
 */

import { forwardRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

export type Status = 'online' | 'offline' | 'draft' | 'themed' | 'error';

export interface StatusPillProps extends Omit<BoxProps, 'children'> {
  status:    Status;
  label?:    string;
  /** When true, hide the label and show just the dot/icon — used for badges */
  iconOnly?: boolean;
  /** Override the default icon */
  icon?:     React.ReactNode;
}

const STATUS_STYLES: Record<Status, { bg: string; fg: string; dot: string; defaultLabel: string }> = {
  online:  { bg: '#ecfdf5', fg: '#047857', dot: '#10b981', defaultLabel: 'Online' },
  offline: { bg: '#f4f4f5', fg: '#52525b', dot: '#a1a1aa', defaultLabel: 'Offline' },
  draft:   { bg: '#fffbeb', fg: '#b45309', dot: '#f59e0b', defaultLabel: 'Draft' },
  themed:  { bg: '#ede9fe', fg: '#6d28d9', dot: '#7c3aed', defaultLabel: 'Themed' },
  error:   { bg: '#fff1f2', fg: '#be123c', dot: '#f43f5e', defaultLabel: 'Issue' },
};

export const StatusPill = forwardRef<HTMLDivElement, StatusPillProps>(function StatusPill(
  { status, label, iconOnly = false, icon, sx, ...rest },
  ref,
) {
  const s = STATUS_STYLES[status];
  const text = label ?? s.defaultLabel;

  return (
    <Box
      ref={ref}
      component="span"
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: 0.5,
        backgroundColor: s.bg,
        color: s.fg,
        fontSize: 11, fontWeight: 500, lineHeight: 1,
        borderRadius: '9999px',
        paddingInline: iconOnly ? 0.75 : 1.25,
        paddingBlock: 0.5,
        border: `1px solid ${s.bg}`,
        ...sx,
      }}
      {...rest}
    >
      {icon ?? (
        <Box
          component="span"
          sx={{ width: 6, height: 6, borderRadius: '9999px', backgroundColor: s.dot, display: 'inline-block' }}
        />
      )}
      {!iconOnly && <span>{text}</span>}
    </Box>
  );
});
