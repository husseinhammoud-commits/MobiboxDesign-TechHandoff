/**
 * ProgressBar — slim horizontal progress indicator with semantic tone.
 *
 * Used in the dashboard's CAPs section to visualize used/limit per CAP, and
 * could power any "X of Y consumed" indicator (storage, quota, etc.).
 *
 * The tone defaults to `auto`, which picks a color based on the percentage:
 *   <  85%   → success (emerald)
 *   85-99%   → warning (amber)
 *   = 100%   → danger  (rose)
 *
 * Override with an explicit tone if needed.
 *
 * Usage:
 *   <ProgressBar value={287} max={300} />            // auto → amber (95%)
 *   <ProgressBar value={50}  max={100} tone="info" />
 */

import Box, { BoxProps } from '@mui/material/Box';

type Tone = 'auto' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface ProgressBarProps extends Omit<BoxProps, 'children'> {
  value:  number;
  max:    number;
  tone?:  Tone;
  height?:number;
}

const TONE_COLORS: Record<Exclude<Tone, 'auto'>, string> = {
  success: '#10b981',
  warning: '#f59e0b',
  danger:  '#f43f5e',
  info:    '#3b82f6',
  neutral: '#a1a1aa',
};

function resolveTone(value: number, max: number, tone: Tone): Exclude<Tone, 'auto'> {
  if (tone !== 'auto') return tone;
  const ratio = max > 0 ? value / max : 0;
  if (ratio >= 1)    return 'danger';
  if (ratio >= 0.85) return 'warning';
  return 'success';
}

export function ProgressBar({ value, max, tone = 'auto', height = 8, sx, ...rest }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const resolved = resolveTone(value, max, tone);
  return (
    <Box
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      sx={{
        position: 'relative',
        width: '100%', height,
        borderRadius: '9999px',
        backgroundColor: 'surface.subtle',
        overflow: 'hidden',
        ...sx,
      }}
      {...rest}
    >
      <Box
        sx={{
          position: 'absolute', inset: 0,
          width: `${pct}%`, height: '100%',
          backgroundColor: TONE_COLORS[resolved],
          transition: 'width .3s cubic-bezier(.4,0,.2,1)',
        }}
      />
    </Box>
  );
}
