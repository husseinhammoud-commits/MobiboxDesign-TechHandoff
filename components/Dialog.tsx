/**
 * Dialog — modal dialog with title, content, and footer actions.
 *
 * Replaces ad-hoc <div class="fixed inset-0">…</div> patterns. Built on MUI's
 * Dialog so we get focus trap, escape-to-close, and scrim click handling for free.
 *
 * The compositional API (Dialog / Dialog.Body / Dialog.Footer) gives the
 * caller layout control without a million props on the root.
 *
 * Usage:
 *   <Dialog open={open} onClose={close} title="Done editing this offer's theme?">
 *     <Dialog.Body>
 *       Your changes will be saved as a custom theme for Offer-1.
 *     </Dialog.Body>
 *     <Dialog.Footer>
 *       <Button variant="ghost" onClick={close}>Keep editing</Button>
 *       <Button variant="primary" onClick={confirm}>Yes, done</Button>
 *     </Dialog.Footer>
 *   </Dialog>
 */

import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

export interface DialogProps extends Omit<MuiDialogProps, 'title'> {
  title?:           React.ReactNode;
  description?:     React.ReactNode;
  /** Default true — shows the X close icon in the corner */
  showClose?:       boolean;
  /** Default 'sm' — sm=480px, md=640px, lg=800px */
  size?:            'sm' | 'md' | 'lg';
}

const SIZE_MAP = { sm: 480, md: 640, lg: 800 };

export function Dialog({
  title, description, showClose = true, size = 'sm', onClose, children, PaperProps, ...rest
}: DialogProps) {
  return (
    <MuiDialog
      onClose={onClose}
      PaperProps={{ ...PaperProps, sx: { width: SIZE_MAP[size], maxWidth: '92vw', ...(PaperProps?.sx as any) } }}
      {...rest}
    >
      {(title || showClose) && (
        <DialogTitle sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, pb: description ? 1 : 2 }}>
          <span>{title}</span>
          {showClose && (
            <IconButton
              size="small"
              onClick={(e) => onClose?.(e, 'escapeKeyDown')}
              sx={{ ml: 'auto', mt: -0.5, mr: -0.5 }}
              aria-label="Close"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </DialogTitle>
      )}
      {description && (
        <Typography sx={{ px: 3, pb: 1, fontSize: 13, color: 'text.secondary' }}>{description}</Typography>
      )}
      {children}
    </MuiDialog>
  );
}

Dialog.Body = function DialogBody({ children, sx, ...rest }: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent sx={{ pt: 1, pb: 2, fontSize: 13, color: 'text.primary', ...sx }} {...rest}>
      {children}
    </DialogContent>
  );
};

Dialog.Footer = function DialogFooter({ children, sx, ...rest }: React.ComponentProps<typeof DialogActions>) {
  return (
    <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1, ...sx }} {...rest}>
      {children}
    </DialogActions>
  );
};
