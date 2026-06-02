/**
 * StatTile — a small KPI tile (label on top, big value below).
 *
 * Used in the Service detail drawer's Overview tab and on the Dashboard's
 * KPI strip. Keeps the visual treatment of "key number" content consistent
 * across the product.
 *
 * Usage:
 *   <StatTile label="Avg payout"   value="$3.10" />
 *   <StatTile label="This week"    value="+16%"  tone="positive" />
 *   <StatTile label="Top market"   value="KSA" />
 *   <StatTile label="Conversions"  value="12,847" />
 */

import { ReactNode } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Tone = 'neutral' | 'positive' | 'negative' | 'warning' | 'muted';

export interface StatTileProps extends Omit<BoxProps, 'children'> {
  label: string;
  value: ReactNode;
  tone?: Tone;
  /** 'sm' = 20px value / 12px padding (drawer context); 'md' = 22px / 16px (default, dashboard) */
  size?: 'sm' | 'md';
}

const TONE_COLOR: Record<Tone, string> = {
  neutral:  'text.primary',
  positive: 'success.dark',
  negative: 'error.dark',
  warning:  'warning.dark',
  muted:    'text.secondary',
};

export function StatTile({ label, value, tone = 'neutral', size = 'md', sx, ...rest }: StatTileProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'surface.main',
        border: (t) => `1px solid ${t.palette.border.main}`,
        borderRadius: 2,
        p: size === 'sm' ? 1.5 : 2,
        ...sx,
      }}
      {...rest}
    >
      <Typography sx={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.4, color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: size === 'sm' ? 20 : 22, fontWeight: 600, color: TONE_COLOR[tone], mt: 0.5, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>
        {value}
      </Typography>
    </Box>
  );
}
