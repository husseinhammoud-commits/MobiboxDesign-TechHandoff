/**
 * Chip — the small rounded pill used for filters, tags, and metadata.
 *
 * Distinct from StatusPill: chips can be interactive (filter selection,
 * dismissible tags), status pills are always informational.
 *
 * Usage:
 *   <Chip>UAE</Chip>
 *   <Chip leftIcon={<GlobeIcon />} count={18}>Online</Chip>
 *   <Chip variant="solid" selected>All</Chip>
 *   <Chip onDelete={() => removeFilter()}>Country: UAE</Chip>
 */

import { forwardRef } from 'react';
import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';
import { Box } from '@mui/material';

type Variant = 'soft' | 'solid' | 'outline';

export interface ChipProps extends Omit<MuiChipProps, 'variant' | 'color' | 'size'> {
  variant?:  Variant;
  /** Highlights the chip (e.g., active filter state) */
  selected?: boolean;
  /** Numeric count rendered inline (e.g., `Online 18`) */
  count?:    number;
  leftIcon?: React.ReactNode;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  { variant = 'soft', selected = false, count, leftIcon, label, onDelete, sx, ...rest },
  ref,
) {
  const variantSx =
    variant === 'solid'
      ? { backgroundColor: 'primary.main', color: 'primary.contrastText' }
      : variant === 'outline'
      ? { backgroundColor: 'transparent', border: (t: any) => `1px solid ${t.palette.border.main}` }
      : { backgroundColor: 'surface.subtle' };

  const selectedSx = selected
    ? { backgroundColor: (t: any) => t.palette.text.primary, color: (t: any) => t.palette.primary.contrastText }
    : undefined;

  return (
    <MuiChip
      ref={ref}
      size="small"
      label={
        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
          {leftIcon}
          {label}
          {typeof count === 'number' && (
            <Box
              component="span"
              sx={{
                ml: 0.5, fontSize: 11, opacity: 0.7, fontVariantNumeric: 'tabular-nums',
              }}
            >
              {count}
            </Box>
          )}
        </Box>
      }
      onDelete={onDelete}
      sx={{ height: 24, paddingInline: 0.5, ...variantSx, ...selectedSx, ...sx }}
      {...rest}
    />
  );
});
