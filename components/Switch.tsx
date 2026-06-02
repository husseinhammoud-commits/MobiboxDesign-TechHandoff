/**
 * Switch — boolean toggle with optional inline label + description.
 *
 * Same as our prototype's `.switch` element (the zinc-900 active state).
 * The two layouts we use are both supported:
 *   - inline:    label sits next to the switch on the same line   (most cases)
 *   - stacked:   label + description above, switch on its own row (Operator Cap toggle)
 *
 * Usage:
 *   <Switch checked={online} onChange={(_, v) => setOnline(v)} label="Online" />
 *   <Switch
 *     checked={operatorCap}
 *     onChange={…}
 *     label="Operator Cap"
 *     description="When switched on, the cap will focus on the operator level."
 *   />
 */

import { forwardRef } from 'react';
import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';
import { Box, Typography } from '@mui/material';

export interface SwitchProps extends Omit<MuiSwitchProps, 'size' | 'color'> {
  label?:        React.ReactNode;
  description?:  React.ReactNode;
  /** When `true`, label/description stack above the switch. Default = inline. */
  stacked?:      boolean;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { label, description, stacked = false, sx, ...rest },
  ref,
) {
  // No label — just the bare switch
  if (!label && !description) {
    return <MuiSwitch ref={ref} {...rest} />;
  }

  // Stacked: label + description on the left, switch right-aligned
  if (stacked) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, ...sx }}>
        <Box sx={{ minWidth: 0 }}>
          {label && <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}>{label}</Typography>}
          {description && (
            <Typography sx={{ fontSize: 11.5, color: 'text.secondary', mt: 0.25 }}>{description}</Typography>
          )}
        </Box>
        <MuiSwitch ref={ref} sx={{ flexShrink: 0 }} {...rest} />
      </Box>
    );
  }

  // Inline (default): label + switch side by side
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, ...sx }}>
      {label && (
        <Typography component="span" sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}>
          {label}
        </Typography>
      )}
      <MuiSwitch ref={ref} {...rest} />
    </Box>
  );
});
