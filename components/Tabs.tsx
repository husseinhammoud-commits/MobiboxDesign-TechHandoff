/**
 * Tabs — underline tabs with our zinc-neutral styling.
 *
 * Wraps MUI's Tabs + Tab. The native MUI styling is overridden in the theme,
 * but the wrapper standardizes the API so we don't expose MUI's `value` /
 * `onChange` (which uses an `event` argument we never use) at call sites.
 *
 * Usage:
 *   <Tabs
 *     value={tab}
 *     onChange={setTab}
 *     items={[
 *       { value: 'overview', label: 'Overview' },
 *       { value: 'offers',   label: 'Offers', count: 6 },
 *       { value: 'activity', label: 'Activity' },
 *     ]}
 *   />
 */

'use client';

import { ReactNode } from 'react';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export interface TabItem<V extends string = string> {
  value:    V;
  label:    ReactNode;
  count?:   number;
  disabled?: boolean;
}

export interface TabsProps<V extends string = string> {
  value:     V;
  onChange:  (next: V) => void;
  items:     TabItem<V>[];
  /** Optional sticky positioning (used inside drawer headers) */
  sticky?:   boolean;
  /** Optional top offset when sticky (e.g., to clear another sticky element) */
  stickyTop?: number;
  /** Extra styles on the outer container */
  sx?:       any;
}

export function Tabs<V extends string = string>({ value, onChange, items, sticky, stickyTop = 0, sx }: TabsProps<V>) {
  return (
    <Box
      sx={{
        ...(sticky && {
          position: 'sticky', top: stickyTop, zIndex: 9,
          backgroundColor: 'surface.main',
          borderBottom: (t) => `1px solid ${t.palette.border.main}`,
          px: 3,
        }),
        ...sx,
      }}
    >
      <MuiTabs
        value={value}
        onChange={(_e, next) => onChange(next as V)}
        TabIndicatorProps={{
          sx: { backgroundColor: 'text.primary', height: 2 },
        }}
        sx={{
          minHeight: 40,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: 13,
            fontWeight: 500,
            minHeight: 40,
            padding: '8px 4px',
            marginRight: 2.5,
            color: 'text.secondary',
            '&.Mui-selected': { color: 'text.primary' },
            '&:hover':        { color: 'text.primary' },
          },
        }}
      >
        {items.map((it) => (
          <MuiTab
            key={it.value}
            value={it.value}
            disabled={it.disabled}
            label={
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                {it.label}
                {typeof it.count === 'number' && (
                  <Box
                    component="span"
                    sx={{ fontSize: 11, color: 'text.disabled', fontVariantNumeric: 'tabular-nums' }}
                  >
                    ({it.count})
                  </Box>
                )}
              </Box>
            }
          />
        ))}
      </MuiTabs>
    </Box>
  );
}
