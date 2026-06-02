/**
 * IconButton — icon-only square button used in dense UIs (drawer headers,
 * card action menus, toolbars).
 *
 * Wraps MUI's IconButton with our sizing. Use `Button` for any button that
 * has a text label — this is strictly for icon-only triggers.
 *
 * Usage:
 *   <IconButton aria-label="Close" onClick={close}><X size={16} /></IconButton>
 *   <IconButton size="lg" variant="primary"><Plus size={20} /></IconButton>
 */

import { forwardRef } from 'react';
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

type Variant = 'default' | 'subtle' | 'primary';
type Size    = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends Omit<MuiIconButtonProps, 'size' | 'color'> {
  variant?: Variant;
  size?:    Size;
}

const SIZE_MAP: Record<Size, number> = { sm: 28, md: 32, lg: 40 };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'subtle', size = 'md', sx, children, ...rest },
  ref,
) {
  const box = SIZE_MAP[size];
  return (
    <MuiIconButton
      ref={ref}
      sx={{
        width: box, height: box, borderRadius: 1,
        color:
          variant === 'primary' ? 'primary.contrastText' :
          variant === 'default' ? 'text.primary' :
                                  'text.secondary',
        backgroundColor:
          variant === 'primary' ? 'primary.main' : 'transparent',
        '&:hover': {
          backgroundColor:
            variant === 'primary' ? 'primary.dark' : 'surface.subtle',
          color: variant === 'primary' ? 'primary.contrastText' : 'text.primary',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiIconButton>
  );
});
