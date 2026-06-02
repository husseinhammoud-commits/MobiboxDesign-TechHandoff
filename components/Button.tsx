/**
 * Button — thin wrapper over MuiButton.
 *
 * Why a wrapper:
 *   - Locks down which variants exist (`primary | secondary | ghost | danger`)
 *     so call sites can't drift across the codebase
 *   - Provides our own size scale (`sm | md | lg`) tuned for our spacing
 *   - Centralizes loading + icon affordances
 *
 * The visual rules live in theme.ts (MuiButton overrides). This component is
 * just the API contract — it doesn't apply colors itself.
 *
 * Usage:
 *   <Button variant="primary" size="md" onClick={...}>Save</Button>
 *   <Button variant="secondary" leftIcon={<DownloadIcon />}>Export</Button>
 *   <Button variant="danger" loading>Delete</Button>
 */

import { forwardRef } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size    = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size' | 'color'> {
  variant?: Variant;
  size?:    Size;
  loading?: boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

const VARIANT_MAP: Record<Variant, { muiVariant: MuiButtonProps['variant']; muiColor: MuiButtonProps['color'] }> = {
  primary:   { muiVariant: 'contained', muiColor: 'primary' },
  secondary: { muiVariant: 'outlined',  muiColor: 'inherit' },
  ghost:     { muiVariant: 'text',      muiColor: 'inherit' },
  danger:    { muiVariant: 'contained', muiColor: 'error'   },
};

const SIZE_MAP: Record<Size, object> = {
  sm: { minHeight: '28px', px: '10px', fontSize: '12px' },
  md: { minHeight: '36px', px: '16px', fontSize: '13px' },
  lg: { minHeight: '40px', px: '16px', fontSize: '14px' },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled, leftIcon, rightIcon, children, sx, ...rest },
  ref,
) {
  const { muiVariant, muiColor } = VARIANT_MAP[variant];
  const sizing = SIZE_MAP[size];

  return (
    <MuiButton
      ref={ref}
      variant={muiVariant}
      color={muiColor}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={14} color="inherit" /> : leftIcon}
      endIcon={rightIcon}
      sx={{ ...sizing, ...sx }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
});
