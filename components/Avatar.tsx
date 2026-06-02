/**
 * Avatar — small initials block used as a visual anchor on service cards.
 *
 * The tint color is deterministically derived from the name (same name → same
 * tint), so the visual stays stable across refreshes without needing real logos.
 * Once we have actual brand logos, this component can grow an `imageSrc` prop.
 *
 * Usage:
 *   <Avatar name="Premium Gaming Service" />
 *   <Avatar name="Premium Gaming Service" size="lg" />
 */

import { useMemo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

const TINTS = [
  { bg: '#ede9fe', fg: '#6d28d9' }, // violet
  { bg: '#dbeafe', fg: '#1d4ed8' }, // sky
  { bg: '#d1fae5', fg: '#047857' }, // emerald
  { bg: '#fef3c7', fg: '#b45309' }, // amber
  { bg: '#fee2e2', fg: '#be123c' }, // rose
  { bg: '#e0e7ff', fg: '#3730a3' }, // indigo
  { bg: '#ccfbf1', fg: '#0f766e' }, // teal
  { bg: '#fae8ff', fg: '#a21caf' }, // fuchsia
] as const;

const SIZE_MAP = {
  sm: { box: 28, font: 11 },
  md: { box: 36, font: 12.5 },
  lg: { box: 44, font: 14 },
} as const;

export interface AvatarProps extends Omit<BoxProps, 'children'> {
  name:  string;
  size?: keyof typeof SIZE_MAP;
}

export function Avatar({ name, size = 'md', sx, ...rest }: AvatarProps) {
  const { initials, tint } = useMemo(() => {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
    const tint = TINTS[Math.abs(h) % TINTS.length];
    const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('') || '?';
    return { tint, initials };
  }, [name]);

  const { box, font } = SIZE_MAP[size];

  return (
    <Box
      sx={{
        width: box, height: box,
        flexShrink: 0,
        borderRadius: 1,
        backgroundColor: tint.bg,
        color: tint.fg,
        display: 'grid', placeItems: 'center',
        fontWeight: 600, fontSize: font,
        ...sx,
      }}
      {...rest}
    >
      {initials}
    </Box>
  );
}
