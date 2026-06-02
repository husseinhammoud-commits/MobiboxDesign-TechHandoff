/**
 * Skeleton — animated placeholder shown while content loads.
 *
 * Used by ServiceGrid between batches so newly-loading cards have a soft pulse
 * before the real card swaps in. Same pattern can be reused anywhere we have
 * loading state.
 *
 * Usage:
 *   <Skeleton width={120} height={16} />
 *   <Skeleton variant="circle" size={36} />
 *   <ServiceCardSkeleton />     // composite version exported below
 */

import Box, { BoxProps } from '@mui/material/Box';

export interface SkeletonProps extends Omit<BoxProps, 'width' | 'height'> {
  variant?: 'rect' | 'circle' | 'text';
  width?:   number | string;
  height?:  number | string;
  size?:    number; // shortcut for circle: both w + h
}

export function Skeleton({ variant = 'rect', width, height, size, sx, ...rest }: SkeletonProps) {
  const isCircle = variant === 'circle';
  return (
    <Box
      sx={{
        width:  isCircle ? size : width,
        height: isCircle ? size : height,
        borderRadius: isCircle ? '50%' : variant === 'text' ? 0.5 : 1,
        backgroundColor: 'surface.subtle',
        animation: 'skeleton-pulse 1.4s ease-in-out infinite',
        '@keyframes skeleton-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.6 },
        },
        ...sx,
      }}
      {...rest}
    />
  );
}
