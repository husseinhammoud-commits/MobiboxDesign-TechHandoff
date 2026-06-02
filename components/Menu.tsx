/**
 * Menu — popover menu (typically anchored to a 3-dot button on a card or row).
 *
 * Wraps MUI's Menu + MenuItem with the styling baked into theme.ts so the menu
 * looks like a shadcn dropdown (no Material elevation, soft border, tight rows).
 *
 * Compound API:
 *   <Menu anchorEl={anchor} open={open} onClose={close}>
 *     <Menu.Item icon={<EyeIcon />} onClick={...}>View</Menu.Item>
 *     <Menu.Item icon={<EditIcon />} onClick={...}>Edit</Menu.Item>
 *     <Menu.Divider />
 *     <Menu.Item icon={<TrashIcon />} variant="danger" onClick={...}>Delete</Menu.Item>
 *   </Menu>
 *
 * For the common "click button → open menu" pattern, use the `useMenu` helper:
 *   const { anchor, open, openMenu, closeMenu } = useMenu();
 *   <IconButton onClick={openMenu}><MoreHorizontalIcon /></IconButton>
 *   <Menu anchorEl={anchor} open={open} onClose={closeMenu}>...</Menu>
 */

'use client';

import { useState, useCallback } from 'react';
import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export interface MenuProps extends Omit<MuiMenuProps, 'anchorOrigin' | 'transformOrigin'> {}

export function Menu({ children, PaperProps, ...rest }: MenuProps) {
  return (
    <MuiMenu
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        ...PaperProps,
        sx: { minWidth: 200, ...(PaperProps?.sx as any) },
      }}
      {...rest}
    >
      {children}
    </MuiMenu>
  );
}

export interface MenuItemProps extends Omit<MuiMenuItemProps, 'children'> {
  icon?:    React.ReactNode;
  variant?: 'default' | 'danger';
  children: React.ReactNode;
}

Menu.Item = function MenuItem({ icon, variant = 'default', children, sx, ...rest }: MenuItemProps) {
  const danger = variant === 'danger';
  return (
    <MuiMenuItem
      sx={{
        gap: 1, fontSize: 13, paddingBlock: 1, paddingInline: 1.5,
        color: danger ? 'error.dark' : 'text.primary',
        '&:hover': danger ? { backgroundColor: 'error.light' } : undefined,
        ...sx,
      }}
      {...rest}
    >
      {icon && (
        <Box component="span" sx={{ display: 'inline-flex', color: danger ? 'error.main' : 'text.secondary' }}>
          {icon}
        </Box>
      )}
      {children}
    </MuiMenuItem>
  );
};

Menu.Divider = function MenuDivider() {
  return <Divider sx={{ my: 0.5 }} />;
};

/**
 * Convenience hook for the standard "open menu on button click" pattern.
 */
export function useMenu() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const openMenu  = useCallback((e: React.MouseEvent<HTMLElement>) => { e.stopPropagation(); setAnchor(e.currentTarget); }, []);
  const closeMenu = useCallback(() => setAnchor(null), []);
  return { anchor, open: Boolean(anchor), openMenu, closeMenu };
}
