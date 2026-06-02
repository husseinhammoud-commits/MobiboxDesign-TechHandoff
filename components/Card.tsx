/**
 * Card — surface container used for grouping content.
 *
 * Wraps MUI's Paper with the right border + radius defaults baked into the
 * theme. The `padded` and `hoverable` props are sugar for the most common
 * patterns (the service card grid uses `hoverable`; section containers don't).
 *
 * Usage:
 *   <Card>...</Card>
 *   <Card hoverable onClick={openSomething}>...</Card>
 *   <Card padded={false}>...</Card>
 */

import { forwardRef } from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';

export interface CardProps extends PaperProps {
  /** Whether to apply the standard 16px internal padding. Default true. */
  padded?:    boolean;
  /** Adds a subtle hover border + shadow + cursor. Use for clickable cards. */
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padded = true, hoverable = false, sx, children, ...rest },
  ref,
) {
  return (
    <Paper
      ref={ref}
      sx={{
        p: padded ? 2 : 0,                         // 16px padding by default
        transition: hoverable ? 'border-color .15s, box-shadow .15s' : undefined,
        cursor:     hoverable ? 'pointer' : undefined,
        '&:hover':  hoverable ? {
          borderColor: (t) => t.palette.border.strong,
          boxShadow:   (t) => t.shadows[2],
        } : undefined,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
});
