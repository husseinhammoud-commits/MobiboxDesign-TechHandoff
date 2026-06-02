'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// ─── Types & defaults ─────────────────────────────────────────────────────────

export type ThemeElementId = 'background' | 'logo' | 'headline' | 'subhead' | 'phoneInput' | 'button' | 'link' | 'terms';
export type ElementKind    = 'background' | 'image' | 'text' | 'phoneInput' | 'button' | 'link';

export interface ChannelTheme {
  background: { color: string };
  logo:       { src: string; initial: string; bgColor: string; textColor: string; size: number };
  headline:   { text: string; color: string; fontSize: number; fontWeight: number };
  subhead:    { text: string; color: string; fontSize: number; fontWeight: number };
  phoneInput: { enabled: boolean; countryCode: string; flag: string; placeholder: string; borderColor: string; fillColor: string; textColor: string; radius: number };
  button:     { text: string; bgColor: string; textColor: string; radius: number };
  link:       { text: string; color: string };
  terms:      { text: string; color: string; fontSize: number };
}

export interface ThemeState {
  otp:   ChannelTheme;
  voice: ChannelTheme;
}

export const THEME_DEFAULTS: ThemeState = {
  otp: {
    background: { color: '#ffffff' },
    logo:       { src: '', initial: 'M', bgColor: '#7c3aed', textColor: '#ffffff', size: 56 },
    headline:   { text: 'Enter your phone number', color: '#0f172a', fontSize: 22, fontWeight: 700 },
    subhead:    { text: "We'll send you a code by SMS to confirm.", color: '#64748b', fontSize: 13, fontWeight: 400 },
    phoneInput: { enabled: true, countryCode: '+971', flag: '🇦🇪', placeholder: '50 123 4567', borderColor: '#e4e4e7', fillColor: '#ffffff', textColor: '#0f172a', radius: 10 },
    button:     { text: 'Send code', bgColor: '#18181b', textColor: '#ffffff', radius: 10 },
    link:       { text: 'Already have a code?', color: '#7c3aed' },
    terms:      { text: 'By continuing, you agree to our Terms and Privacy Policy.', color: '#94a3b8', fontSize: 11 },
  },
  voice: {
    background: { color: '#ffffff' },
    logo:       { src: '', initial: 'M', bgColor: '#7c3aed', textColor: '#ffffff', size: 56 },
    headline:   { text: 'Enter your phone number', color: '#0f172a', fontSize: 22, fontWeight: 700 },
    subhead:    { text: "We'll give you a quick call to confirm.", color: '#64748b', fontSize: 13, fontWeight: 400 },
    phoneInput: { enabled: true, countryCode: '+971', flag: '🇦🇪', placeholder: '50 123 4567', borderColor: '#e4e4e7', fillColor: '#ffffff', textColor: '#0f172a', radius: 10 },
    button:     { text: 'Call me', bgColor: '#18181b', textColor: '#ffffff', radius: 10 },
    link:       { text: 'Try a different number', color: '#7c3aed' },
    terms:      { text: 'Standard carrier rates may apply.', color: '#94a3b8', fontSize: 11 },
  },
};

export const ELEMENT_KIND: Record<ThemeElementId, ElementKind> = {
  background: 'background',
  logo:       'image',
  headline:   'text',
  subhead:    'text',
  phoneInput: 'phoneInput',
  button:     'button',
  link:       'link',
  terms:      'text',
};

export const ELEMENT_LABEL: Record<ThemeElementId, string> = {
  background: 'Page background',
  logo:       'Logo',
  headline:   'Headline',
  subhead:    'Sub-headline',
  phoneInput: 'Phone number input',
  button:     'Primary button',
  link:       'Secondary link',
  terms:      'Terms text',
};

// ─── Component ────────────────────────────────────────────────────────────────

export interface ThemeEditorPanelProps {
  open:            boolean;
  channel:         'otp' | 'voice';
  themeState:      ThemeState;
  selectedEl:      ThemeElementId | null;
  onChannelChange: (c: 'otp' | 'voice') => void;
  onSelectEl:      (id: ThemeElementId | null) => void;
  onClose:         () => void;
}

export function ThemeEditorPanel({
  open, channel, themeState, selectedEl,
  onChannelChange, onSelectEl, onClose,
}: ThemeEditorPanelProps) {
  const theme = themeState[channel];

  return (
    <Box
      role="dialog"
      aria-label="Theme editor preview"
      sx={{
        position: 'fixed',
        right: '880px',
        top: '50%',
        width: 360,
        height: 740,
        maxHeight: '92vh',
        transform: open ? 'translate(0, -50%)' : 'translate(100%, -50%)',
        transition: 'transform .5s cubic-bezier(.4,0,.2,1)',
        pointerEvents: open ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fafafa',
        border: '1px solid #e4e4e7',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        zIndex: 1199,
      }}
    >
      {/* Header: OTP / VOICE tabs */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 48, flexShrink: 0,
        borderBottom: '1px solid #e4e4e7',
        backgroundColor: '#fff',
        borderRadius: '12px 12px 0 0',
      }}>
        <Box sx={{
          display: 'inline-flex',
          border: '1px solid #e4e4e7', borderRadius: '6px',
          backgroundColor: '#fff', p: '2px', gap: '2px',
        }}>
          {(['otp', 'voice'] as const).map((ch) => (
            <Box key={ch} component="button" onClick={() => onChannelChange(ch)} sx={{
              all: 'unset', cursor: 'pointer',
              px: '12px', py: '4px',
              borderRadius: '4px', fontSize: 12.5, fontWeight: 500,
              color: channel === ch ? '#18181b' : '#71717a',
              backgroundColor: channel === ch ? '#f4f4f5' : 'transparent',
              transition: 'background .1s, color .1s',
              '&:hover': { color: '#18181b' },
            }}>
              {ch.toUpperCase()}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Preview area */}
      <Box sx={{
        flex: 1, overflowY: 'auto', py: 2,
        display: 'grid', placeItems: 'center',
        borderRadius: '0 0 12px 12px',
      }}>
        <PhoneMockup
          channel={channel}
          theme={theme}
          selectedEl={selectedEl}
          onSelectEl={onSelectEl}
        />
      </Box>
    </Box>
  );
}

// ─── Hotspot wrapper ──────────────────────────────────────────────────────────

function ThemeHotspot({ id, selectedEl, onSelectEl, children }: {
  id: ThemeElementId;
  selectedEl: ThemeElementId | null;
  onSelectEl: (id: ThemeElementId | null) => void;
  children: React.ReactNode;
}) {
  const active = selectedEl === id;
  return (
    <Box
      onClick={(e: React.MouseEvent) => { e.stopPropagation(); onSelectEl(active ? null : id); }}
      sx={{
        cursor: 'pointer', borderRadius: '4px', width: '100%',
        outline: active ? '2px solid #6366f1' : '2px dashed transparent',
        outlineOffset: '3px',
        transition: 'outline-color .1s',
        '&:hover': {
          outline: active ? '2px solid #6366f1' : '2px dashed rgba(99,102,241,0.55)',
        },
      }}
    >
      {children}
    </Box>
  );
}

// ─── Phone mockup ─────────────────────────────────────────────────────────────

function PhoneMockup({ channel, theme, selectedEl, onSelectEl }: {
  channel: 'otp' | 'voice';
  theme: ChannelTheme;
  selectedEl: ThemeElementId | null;
  onSelectEl: (id: ThemeElementId | null) => void;
}) {
  void channel;
  return (
    <Box sx={{
      width: 328,
      backgroundColor: '#0a0a0a',
      borderRadius: '40px',
      padding: '10px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
    }}>
      {/* Screen — clicking the background area selects the background element */}
      <Box
        onClick={() => onSelectEl('background')}
        sx={{
          backgroundColor: theme.background.color,
          borderRadius: '30px',
          overflow: 'hidden',
          aspectRatio: '9 / 18.5',
          position: 'relative',
          cursor: 'pointer',
          outline: selectedEl === 'background' ? '3px solid #6366f1' : '3px dashed transparent',
          outlineOffset: '-2px',
          transition: 'background-color .2s, outline-color .1s',
          '&:hover': {
            outline: selectedEl === 'background' ? '3px solid #6366f1' : '3px dashed rgba(99,102,241,0.55)',
          },
        }}
      >
        {/* Dynamic island */}
        <Box sx={{
          position: 'absolute', top: 8, left: '50%',
          transform: 'translateX(-50%)',
          width: 70, height: 20,
          backgroundColor: '#0a0a0a',
          borderRadius: '0 0 14px 14px',
          zIndex: 5, pointerEvents: 'none',
        }} />

        <Box sx={{
          padding: '50px 22px 28px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        }}>
          {/* Logo */}
          <ThemeHotspot id="logo" selectedEl={selectedEl} onSelectEl={onSelectEl}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                width: theme.logo.size,
                height: theme.logo.size,
                borderRadius: '16px',
                backgroundColor: theme.logo.bgColor,
                color: theme.logo.textColor,
                display: 'grid', placeItems: 'center',
                fontSize: 22, fontWeight: 700,
                transition: 'background-color .2s, color .2s',
              }}>{theme.logo.initial}</Box>
            </Box>
          </ThemeHotspot>

          {/* Headline */}
          <ThemeHotspot id="headline" selectedEl={selectedEl} onSelectEl={onSelectEl}>
            <Typography sx={{
              textAlign: 'center',
              color: theme.headline.color,
              fontSize: theme.headline.fontSize,
              fontWeight: theme.headline.fontWeight,
              lineHeight: 1.25,
              transition: 'color .2s',
            }}>{theme.headline.text}</Typography>
          </ThemeHotspot>

          {/* Subhead */}
          <ThemeHotspot id="subhead" selectedEl={selectedEl} onSelectEl={onSelectEl}>
            <Typography sx={{
              textAlign: 'center',
              color: theme.subhead.color,
              fontSize: theme.subhead.fontSize,
              fontWeight: theme.subhead.fontWeight,
              lineHeight: 1.4,
              transition: 'color .2s',
            }}>{theme.subhead.text}</Typography>
          </ThemeHotspot>

          {/* Phone input — same layout for both OTP and Voice */}
          <ThemeHotspot id="phoneInput" selectedEl={selectedEl} onSelectEl={onSelectEl}>
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: '6px',
              px: '10px', py: '7px',
              border: `1.5px solid ${theme.phoneInput.borderColor}`,
              borderRadius: `${theme.phoneInput.radius}px`,
              backgroundColor: theme.phoneInput.fillColor,
              transition: 'border-color .2s, background-color .2s',
            }}>
              <Typography sx={{ fontSize: 18, lineHeight: 1 }}>{theme.phoneInput.flag}</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: theme.phoneInput.textColor }}>{theme.phoneInput.countryCode}</Typography>
              <Typography sx={{ color: '#d4d4d8', fontSize: 13 }}>|</Typography>
              <Typography sx={{ flex: 1, color: 'rgba(0,0,0,0.35)', fontSize: 13 }}>{theme.phoneInput.placeholder}</Typography>
            </Box>
          </ThemeHotspot>

          {/* CTA button */}
          <ThemeHotspot id="button" selectedEl={selectedEl} onSelectEl={onSelectEl}>
            <Box sx={{
              textAlign: 'center',
              py: '8px', px: '12px',
              backgroundColor: theme.button.bgColor,
              color: theme.button.textColor,
              borderRadius: `${theme.button.radius}px`,
              fontSize: 14, fontWeight: 600,
              transition: 'background-color .2s, color .2s, border-radius .2s',
            }}>{theme.button.text}</Box>
          </ThemeHotspot>

          {/* Secondary link */}
          <ThemeHotspot id="link" selectedEl={selectedEl} onSelectEl={onSelectEl}>
            <Typography sx={{
              textAlign: 'center', fontSize: 13, fontWeight: 500,
              color: theme.link.color, transition: 'color .2s',
            }}>{theme.link.text}</Typography>
          </ThemeHotspot>

          {/* Terms */}
          <ThemeHotspot id="terms" selectedEl={selectedEl} onSelectEl={onSelectEl}>
            <Typography sx={{
              textAlign: 'center',
              fontSize: theme.terms.fontSize,
              color: theme.terms.color,
              lineHeight: 1.4,
              transition: 'color .2s',
            }}>{theme.terms.text}</Typography>
          </ThemeHotspot>
        </Box>
      </Box>
    </Box>
  );
}
