/**
 * Drawer — right-side sliding panel used for record detail views (Service
 * detail, Offer detail) and for the wizard.
 *
 * Wraps MUI's Drawer with our sizing + chrome defaults. The compound API
 * (Drawer / Drawer.Header / Drawer.Body / Drawer.Footer) gives the caller
 * layout control without a million props on the root.
 *
 * Usage:
 *   <Drawer open={open} onClose={close} size="lg">
 *     <Drawer.Header title="Premium Gaming Service" subtitle="SRV-25149">
 *       <Button>Edit</Button>
 *     </Drawer.Header>
 *     <Drawer.Body padded>...</Drawer.Body>
 *     <Drawer.Footer>...</Drawer.Footer>
 *   </Drawer>
 */

'use client';

import { ReactNode } from 'react';
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { X as CloseIcon } from 'lucide-react';

import { IconButton } from './IconButton';

const SIZE_MAP = { sm: 480, md: 640, lg: 880, xl: 1040 } as const;
type Size = keyof typeof SIZE_MAP;

export interface DrawerProps extends Omit<MuiDrawerProps, 'anchor'> {
  /** Default 'lg' (880px — same as the prototype's wizard) */
  size?: Size;
}

export function Drawer({ size = 'lg', PaperProps, hideBackdrop, ModalProps: externalModalProps, children, ...rest }: DrawerProps) {
  return (
    <MuiDrawer
      anchor="right"
      hideBackdrop={hideBackdrop}
      PaperProps={{
        ...PaperProps,
        sx: {
          width: SIZE_MAP[size], maxWidth: '94vw',
          display: 'flex', flexDirection: 'column',
          borderLeft: (t) => `1px solid ${t.palette.border.main}`,
          // Restores pointer-events on the Paper when hideBackdrop adds
          // pointer-events:none to the Modal root (see ModalProps below).
          pointerEvents: 'auto',
          ...(PaperProps?.sx as any),
        },
      }}
      // When hideBackdrop=true the caller provides their own backdrop.
      // The Modal root (position:fixed inset:0) has no pointer-events by
      // default, which means it blocks all clicks outside the Paper — our
      // custom backdrop can never fire. Setting pointer-events:none on the
      // root lets outside clicks fall through; the Paper's explicit 'auto'
      // above keeps wizard content fully interactive.
      ModalProps={{
        ...(hideBackdrop && { sx: { pointerEvents: 'none' } }),
        ...externalModalProps,
      }}
      transitionDuration={{ enter: 350, exit: 300 }}
      {...rest}
    >
      {children}
    </MuiDrawer>
  );
}

export interface DrawerHeaderProps {
  title?:    ReactNode;
  subtitle?: ReactNode;
  onClose?:  () => void;
  /** Action slot rendered to the right of the title (status pill, ⋯ menu, etc.) */
  children?: ReactNode;
  /** Default true. Shows the X close button. */
  showClose?: boolean;
}

Drawer.Header = function DrawerHeader({ title, subtitle, onClose, children, showClose = true }: DrawerHeaderProps) {
  return (
    <Box
      sx={{
        position: 'sticky', top: 0, zIndex: 10,
        backgroundColor: 'surface.main',
        borderBottom: (t) => `1px solid ${t.palette.border.main}`,
        px: 3, py: 2.5,
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          {typeof title === 'string'
            ? <Typography component="h2" sx={{ fontSize: 18, fontWeight: 600, color: 'text.primary', m: 0 }}>{title}</Typography>
            : title}
          {subtitle && (
            typeof subtitle === 'string'
              ? <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.5 }}>{subtitle}</Typography>
              : <Box sx={{ mt: 0.5 }}>{subtitle}</Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          {children}
          {showClose && (
            <IconButton onClick={onClose} aria-label="Close">
              <CloseIcon size={16} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

Drawer.Body = function DrawerBody({ padded = true, sx, children, ...rest }: BoxProps & { padded?: boolean }) {
  return (
    <Box
      sx={{
        flex: 1, overflowY: 'auto', minHeight: 0,
        p: padded ? 3 : 0,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

Drawer.Footer = function DrawerFooter({ sx, children, ...rest }: BoxProps) {
  return (
    <Box
      sx={{
        position: 'sticky', bottom: 0,
        backgroundColor: 'surface.main',
        borderTop: (t) => `1px solid ${t.palette.border.main}`,
        px: 3, py: 1.5,
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
