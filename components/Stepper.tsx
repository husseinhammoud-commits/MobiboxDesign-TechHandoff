/**
 * Stepper — horizontal step indicator used inside the wizard header.
 *
 * Each step is one of three states:
 *   - 'complete' (filled dot with check icon)
 *   - 'active'   (filled dot with number, current step)
 *   - 'future'   (outlined dot with number, not yet visited)
 *
 * Clicking a step calls `onJump(index)` if provided — the wizard lets users
 * jump backward to any earlier step but typically not forward past unvisited
 * steps (the consumer decides what to do with the click).
 *
 * Usage:
 *   <Stepper
 *     current={2}
 *     items={[{label:'Service'}, {label:'Setup'}, {label:'Offers'}, {label:'Portals'}, {label:'Review'}]}
 *     onJump={setCurrent}
 *   />
 */

'use client';

import { Check } from 'lucide-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface StepperItem {
  label: string;
}

export interface StepperProps {
  items:   StepperItem[];
  current: number;
  onJump?: (idx: number) => void;
}

export function Stepper({ items, current, onJump }: StepperProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {items.map((item, i) => {
        const state = i < current ? 'complete' : i === current ? 'active' : 'future';
        const isLast = i === items.length - 1;
        const clickable = !!onJump;
        return (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', flex: isLast ? 'initial' : 1 }}>
            <Box
              component={clickable ? 'button' : 'div'}
              onClick={clickable ? () => onJump?.(i) : undefined}
              sx={{
                all: clickable ? 'unset' : undefined,
                cursor: clickable ? 'pointer' : 'default',
                display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80,
                outline: 'none',
                transition: 'transform .12s ease',
                '&:hover .step-dot': {
                  boxShadow: '0 0 0 4px rgba(24, 24, 27, 0.08)',
                  ...(state === 'future' && { borderColor: '#71717a', color: '#18181b' }),
                },
                '&:hover p': { color: '#18181b' },
                '&:active': { transform: 'scale(0.97)' },
              }}
            >
              {/* Dot */}
              <Box
                className="step-dot"
                sx={{
                  width: 28, height: 28, borderRadius: '9999px',
                  display: 'grid', placeItems: 'center',
                  fontSize: 13, fontWeight: 600,
                  transition: 'box-shadow .15s ease, background .15s ease, border-color .15s ease, color .15s ease',
                  ...(state === 'complete' && { backgroundColor: 'text.primary', color: 'primary.contrastText' }),
                  ...(state === 'active'   && { backgroundColor: 'text.primary', color: 'primary.contrastText' }),
                  ...(state === 'future'   && { backgroundColor: 'surface.main', color: 'text.disabled', border: '1.5px solid', borderColor: 'border.main' }),
                }}
              >
                {state === 'complete' ? <Check size={14} strokeWidth={3} /> : i + 1}
              </Box>
              {/* Label */}
              <Typography sx={{
                mt: 0.75, fontSize: 12,
                transition: 'color .12s ease',
                color:      state === 'future' ? 'text.disabled' : 'text.primary',
                fontWeight: state === 'active' ? 500 : 400,
              }}>
                {item.label}
              </Typography>
            </Box>
            {/* Connector */}
            {!isLast && (
              <Box
                sx={{
                  flex: 1, height: '1.5px', mb: 2.5, mx: 1,
                  backgroundColor: i < current ? 'text.primary' : 'border.main',
                  transition: 'background-color .15s',
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
