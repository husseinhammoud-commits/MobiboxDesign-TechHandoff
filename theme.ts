/**
 * MUI v6 theme — consumes design-tokens.ts and overrides MUI's defaults globally.
 *
 * Two main things happen here:
 *   1. `createTheme` maps our palette / shape / typography tokens to MUI's theme API.
 *      Anything you read off `theme` (in `sx={(theme) => ...}`, `useTheme()`, or
 *      `styled()`) is grounded in our tokens.
 *   2. `components.<MuiX>.styleOverrides` rewrites the default look of every
 *      built-in MUI primitive (Button, Paper, Chip, TextField, …) so that even if
 *      a developer reaches for raw MUI, they get our zinc-neutral aesthetic
 *      instead of stock Material.
 *
 * Use the wrapper components in /components for the cleanest API surface, but
 * the theme guarantees that even bare MUI usage doesn't look like Google's Material.
 */

import { createTheme, alpha } from '@mui/material/styles';
import { palette, radii, shadows, fontFamily, fontSize, fontWeight, colors } from './design-tokens';

declare module '@mui/material/styles' {
  // Allow our custom palette role names alongside MUI's defaults
  interface Palette {
    accent: Palette['primary'];
    surface: { main: string; muted: string; subtle: string };
    border:  { main: string; strong: string; subtle: string };
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    surface?: { main: string; muted: string; subtle: string };
    border?:  { main: string; strong: string; subtle: string };
  }
}

export const theme = createTheme({
  // ---------------------------------------------------------------------------
  // PALETTE
  // ---------------------------------------------------------------------------
  palette: {
    mode: 'light',
    primary:   { main: palette.primary,  contrastText: palette.primaryText },
    secondary: { main: colors.zinc[600], contrastText: '#ffffff' },
    success:   { main: palette.success, light: palette.successBg, dark: palette.successText },
    warning:   { main: palette.warning, light: palette.warningBg, dark: palette.warningText },
    error:     { main: palette.danger,  light: palette.dangerBg,  dark: palette.dangerText },
    accent:    { main: palette.accent,  light: palette.accentBg,  dark: palette.accentText, contrastText: '#ffffff' },
    text: {
      primary:   palette.textPrimary,
      secondary: palette.textSecondary,
      disabled:  palette.textDisabled,
    },
    divider: palette.border,
    background: {
      default: palette.surfaceMuted,
      paper:   palette.surface,
    },
    surface: { main: palette.surface,      muted: palette.surfaceMuted, subtle: palette.surfaceSubtle },
    border:  { main: palette.border, strong: palette.borderStrong, subtle: palette.borderSubtle },
  },

  // ---------------------------------------------------------------------------
  // SHAPE — global border radius default
  // ---------------------------------------------------------------------------
  shape: { borderRadius: radii.sm },

  // ---------------------------------------------------------------------------
  // TYPOGRAPHY
  // ---------------------------------------------------------------------------
  typography: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    htmlFontSize: 16,
    fontWeightRegular: fontWeight.regular,
    fontWeightMedium:  fontWeight.medium,
    fontWeightBold:    fontWeight.semibold,
    h1: { fontSize: fontSize['4xl'], fontWeight: fontWeight.semibold, lineHeight: 1.2 },
    h2: { fontSize: fontSize['3xl'], fontWeight: fontWeight.semibold, lineHeight: 1.25 },
    h3: { fontSize: fontSize['2xl'], fontWeight: fontWeight.semibold, lineHeight: 1.3 },
    h4: { fontSize: fontSize.lg,     fontWeight: fontWeight.semibold, lineHeight: 1.35 },
    h5: { fontSize: fontSize.md,     fontWeight: fontWeight.semibold, lineHeight: 1.4 },
    h6: { fontSize: fontSize.base,   fontWeight: fontWeight.semibold, lineHeight: 1.4 },
    body1: { fontSize: fontSize.base, fontWeight: fontWeight.regular, lineHeight: 1.5 },
    body2: { fontSize: fontSize.sm,   fontWeight: fontWeight.regular, lineHeight: 1.45 },
    button: {
      fontSize:   fontSize.base,
      fontWeight: fontWeight.medium,
      textTransform: 'none',     // turn OFF Material's all-caps buttons
      letterSpacing: 0,
    },
    caption: { fontSize: fontSize.xs, fontWeight: fontWeight.regular, color: palette.textMuted },
  },

  // ---------------------------------------------------------------------------
  // SHADOWS — replace MUI's 25-step elevation with our restrained set
  // ---------------------------------------------------------------------------
  shadows: [
    'none',
    shadows.xs, shadows.sm, shadows.sm, shadows.md, shadows.md,
    shadows.md, shadows.lg, shadows.lg, shadows.lg, shadows.lg,
    shadows.lg, shadows.lg, shadows.lg, shadows.lg, shadows.xl,
    shadows.xl, shadows.xl, shadows.xl, shadows.xl, shadows.xl,
    shadows.xl, shadows.xl, shadows.xl, shadows.xl,
  ] as any,

  // ---------------------------------------------------------------------------
  // COMPONENT DEFAULTS — override the stock Material look at the source
  // Anything using bare <Button>, <Paper>, <Chip>, etc. now matches our aesthetic.
  // ---------------------------------------------------------------------------
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: palette.surfaceMuted, color: palette.textPrimary, fontFamily: fontFamily.sans },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: false },
      styleOverrides: {
        root: {
          borderRadius:  radii.sm,
          textTransform: 'none',
          fontWeight:    fontWeight.medium,
          fontSize:      fontSize.base,
          paddingInline: 14,
          minHeight:     36,
          boxShadow:     'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: palette.primary,
          color:           palette.primaryText,
          '&:hover':       { backgroundColor: palette.primaryHover },
        },
        outlined: {
          borderColor: palette.border,
          color:       palette.textPrimary,
          backgroundColor: palette.surface,
          '&:hover':   { backgroundColor: palette.surfaceSubtle, borderColor: palette.borderStrong },
        },
        text: { color: palette.textSecondary, '&:hover': { backgroundColor: palette.surfaceSubtle, color: palette.textPrimary } },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: palette.surface,
          backgroundImage: 'none',
          border:          `1px solid ${palette.border}`,
          borderRadius:    radii.md,
        },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border:       `1px solid ${palette.border}`,
          borderRadius: radii.md,
          boxShadow:    shadows.card,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: fontSize.xs, fontWeight: fontWeight.medium, height: 22, borderRadius: radii.full, paddingInline: 4,
        },
        filled:  { backgroundColor: palette.surfaceSubtle, color: palette.textSecondary },
        outlined:{ borderColor: palette.border, color: palette.textSecondary, backgroundColor: palette.surface },
      },
    },

    MuiTextField: {
      defaultProps: { size: 'small', variant: 'outlined', fullWidth: true },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radii.sm,
          backgroundColor: palette.surface,
          fontSize: fontSize.base,
          '& fieldset': { borderColor: palette.border },
          '&:hover fieldset': { borderColor: palette.borderStrong },
          '&.Mui-focused fieldset': { borderColor: palette.focusRing, borderWidth: 1 },
        },
        input: { padding: '8px 12px', height: 'auto' },
      },
    },

    MuiSelect: {
      defaultProps: { size: 'small' },
      styleOverrides: { select: { paddingBlock: 8 } },
    },

    MuiInputLabel: {
      styleOverrides: { root: { fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: palette.textSecondary } },
    },

    MuiSwitch: {
      styleOverrides: {
        root: { width: 40, height: 24, padding: 0, overflow: 'visible' },
        switchBase: {
          padding: 3,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': { backgroundColor: palette.primary, opacity: 1 },
          },
        },
        thumb: { width: 18, height: 18, boxShadow: shadows.xs },
        track: { borderRadius: radii.full, backgroundColor: colors.zinc[300], opacity: 1 },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: radii.xl, border: `1px solid ${palette.border}`, boxShadow: shadows.xl },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: palette.textPrimary, color: '#fff', fontSize: fontSize.xs,
          padding: '6px 10px', borderRadius: radii.sm,
        },
        arrow: { color: palette.textPrimary },
      },
    },

    MuiDivider: { styleOverrides: { root: { borderColor: palette.borderSubtle } } },

    MuiMenu: {
      styleOverrides: {
        paper: { borderRadius: radii.md, border: `1px solid ${palette.border}`, boxShadow: shadows.lg, marginTop: 4 },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: { fontSize: fontSize.base, paddingBlock: 8, '&:hover': { backgroundColor: alpha(palette.primary, 0.04) } },
      },
    },
  },
});

export type AppTheme = typeof theme;
