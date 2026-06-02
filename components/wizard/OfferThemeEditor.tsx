'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paintbrush, Paintbrush2, Check, MousePointerClick } from 'lucide-react';

import { Button, Dialog } from '../';
import type { ThemeState, ThemeElementId } from './ThemeEditorPanel';
import { PropertyEditor } from './Step2Setup';

export interface OfferThemeEditorProps {
  offerLabel:    string;
  channel:       'otp' | 'voice';
  themeState:    ThemeState;
  selectedEl:    ThemeElementId | null;
  onSelectEl:    (id: ThemeElementId | null) => void;
  onUpdateTheme: (channel: 'otp' | 'voice', id: ThemeElementId, patch: Record<string, unknown>) => void;
  onDone:        () => void;
  onCancel:      () => void;
}

export function OfferThemeEditor({
  offerLabel, channel, themeState, selectedEl, onSelectEl, onUpdateTheme, onDone, onCancel,
}: OfferThemeEditorProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Section heading */}
      <Box>
        <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>
          Offer theme settings
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.25 }}>
          Offer-specific theme override for {offerLabel}. Per-element styling is below.
        </Typography>
      </Box>

      {/* Editing state bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 13, color: 'text.secondary' }}>
          <Paintbrush2 size={16} />
          <span>Editing{' '}<strong style={{ color: 'inherit', fontWeight: 600 }}>{channel.toUpperCase()}</strong></span>
        </Box>
        <Box component="button" onClick={onCancel} sx={{
          all: 'unset', cursor: 'pointer',
          fontSize: 12.5, fontWeight: 500, color: 'text.secondary',
          '&:hover': { color: 'text.primary', textDecoration: 'underline' },
        }}>
          Close editor
        </Box>
      </Box>

      {/* Property editor or empty state */}
      {selectedEl ? (
        <PropertyEditor
          elId={selectedEl}
          channel={channel}
          themeState={themeState}
          onUpdateTheme={onUpdateTheme}
          onClearSelection={() => onSelectEl(null)}
        />
      ) : (
        <Box sx={{
          backgroundColor: 'surface.main',
          border: (t) => `1px solid ${t.palette.border.main}`,
          borderRadius: '12px',
          px: 3, py: 5, textAlign: 'center',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}>
          <Box sx={{
            width: 40, height: 40, borderRadius: '50%',
            backgroundColor: '#f4f4f5', color: '#a1a1aa',
            display: 'grid', placeItems: 'center', mx: 'auto', mb: 1.5,
          }}>
            <MousePointerClick size={20} />
          </Box>
          <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: 'text.primary' }}>
            Click an element in the preview
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mt: 0.5 }}>
            Pick any element in the phone mockup to edit its properties here.
          </Typography>
        </Box>
      )}

      {/* Sticky "I'm done" banner */}
      <Box sx={{
        position: 'sticky', bottom: 80, zIndex: 5,
        backgroundColor: '#fffbeb',
        border: '1px solid #fef3c7',
        borderRadius: '12px', px: 2.5, py: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', mt: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, minWidth: 0 }}>
          <Box sx={{
            width: 32, height: 32, borderRadius: '8px',
            backgroundColor: '#fef3c7', color: '#b45309',
            display: 'grid', placeItems: 'center', flexShrink: 0,
          }}>
            <Paintbrush size={16} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#78350f' }}>
              Editing theme for {offerLabel}
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#b45309', mt: 0.25 }}>
              Changes here only apply to this offer. Confirm when you're done.
            </Typography>
          </Box>
        </Box>
        <Button variant="primary" leftIcon={<Check size={14} />} onClick={() => setShowConfirm(true)}>
          I'm done
        </Button>
      </Box>

      <Dialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Done editing this offer's theme?"
        description={`Your changes will be saved as a custom theme for ${offerLabel} and you'll return to the offer list.`}
        showClose={false}
      >
        <Dialog.Footer>
          <Button variant="ghost" onClick={() => setShowConfirm(false)}>Keep editing</Button>
          <Button variant="primary" onClick={() => { setShowConfirm(false); onDone(); }}>Yes, done</Button>
        </Dialog.Footer>
      </Dialog>
    </Box>
  );
}
