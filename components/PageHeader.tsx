/**
 * PageHeader — the sticky page-level header shared across screens.
 *
 * Mirrors the prototype's `h-14 sticky top-0` header. Title + optional subtitle
 * on the left, optional children rendered to the right via `actions`.
 *
 * Use this for the FIRST element inside a screen's content — it sticks to the
 * top of the scroll container.
 *
 * Usage:
 *   <PageHeader title="Services">
 *     <Button variant="secondary">Export</Button>
 *     <Button variant="primary">Create service</Button>
 *   </PageHeader>
 */

import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface PageHeaderProps {
  title:     string;
  subtitle?: string;
  /** Slot rendered between title and actions — e.g., tab nav. */
  middle?:   ReactNode;
  /** Actions on the right — Buttons, search, etc. */
  children?: ReactNode;
}

export function PageHeader({ title, subtitle, middle, children }: PageHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        height: 56, px: 3,
        backgroundColor: 'surface.main',
        borderBottom: (t) => `1px solid ${t.palette.border.main}`,
        display: 'flex', alignItems: 'center', gap: 2,
        position: 'sticky', top: 0, zIndex: 30,
      }}
    >
      <Typography component="h1" sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary' }}>{title}</Typography>
      {subtitle && (
        <Typography sx={{ fontSize: 12.5, color: 'text.secondary', display: { xs: 'none', md: 'block' } }}>{subtitle}</Typography>
      )}
      {middle && <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>{middle}</Box>}
      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>{children}</Box>
    </Box>
  );
}
