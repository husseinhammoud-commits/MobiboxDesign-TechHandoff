/**
 * Design tokens — the single source of truth for visual values across the product.
 *
 * Every color, radius, shadow, and type definition the design system uses lives here.
 * The MUI theme consumes these; never hard-code values at the component level — extend
 * this file and pull from it.
 *
 * If you add a token, add it here first. If you find yourself writing a hex color or a
 * pixel value inside a component, ask whether it should be a token.
 */

// =============================================================================
// COLOR — zinc neutral scale + accent palettes
// Mirrors Tailwind's zinc/* + emerald/amber/rose/violet/blue ramps so existing
// prototype CSS translates 1:1. Pick from these scales rather than inventing colors.
// =============================================================================
export const colors = {
  // Neutrals (the workhorse — 95% of the UI uses these)
  zinc: {
    50:  '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Status — paired with each status pill / chip / banner
  emerald: { 50: '#ecfdf5', 100: '#d1fae5', 500: '#10b981', 700: '#047857' },
  amber:   { 50: '#fffbeb', 100: '#fef3c7', 500: '#f59e0b', 700: '#b45309' },
  rose:    { 50: '#fff1f2', 100: '#ffe4e6', 500: '#f43f5e', 700: '#be123c' },

  // Accent — used sparingly (themed badge, blue icon container)
  violet:  { 50: '#f5f3ff', 100: '#ede9fe', 600: '#7c3aed', 700: '#6d28d9' },
  blue:    { 50: '#eff6ff', 100: '#dbeafe', 600: '#2563eb' },
} as const;

// =============================================================================
// SEMANTIC ALIASES — map raw colors to roles. Components reference roles, not zinc.X
// This is what lets us re-skin the system later by changing one file.
// =============================================================================
export const palette = {
  // Backgrounds
  surface:        '#ffffff',
  surfaceMuted:   colors.zinc[50],
  surfaceSubtle:  colors.zinc[100],

  // Borders
  border:         colors.zinc[200],
  borderStrong:   colors.zinc[300],
  borderSubtle:   colors.zinc[100],

  // Text
  textPrimary:    colors.zinc[900],
  textSecondary: colors.zinc[600],
  textMuted:      colors.zinc[500],
  textDisabled:   colors.zinc[400],
  textInverse:    '#ffffff',

  // Interactive (buttons, links)
  primary:        colors.zinc[900],
  primaryHover:   colors.zinc[800],
  primaryText:    '#ffffff',

  // Status (online / offline / draft / themed)
  success:        colors.emerald[500],
  successBg:      colors.emerald[50],
  successText:    colors.emerald[700],

  warning:        colors.amber[500],
  warningBg:      colors.amber[50],
  warningText:    colors.amber[700],

  danger:         colors.rose[500],
  dangerBg:       colors.rose[50],
  dangerText:     colors.rose[700],

  accent:         colors.violet[600],
  accentBg:       colors.violet[100],
  accentText:     colors.violet[700],

  // Focus ring
  focusRing:      colors.zinc[400],
} as const;

// =============================================================================
// RADII — used for cards, inputs, buttons, chips, dialogs
// =============================================================================
export const radii = {
  none: 0,
  xs:   4,    // small chips
  sm:   6,    // inputs, buttons, tags
  md:   8,    // cards
  lg:   12,   // sections
  xl:   14,   // dialogs, drawers
  '2xl': 16,
  full: 9999, // pills, avatars
} as const;

// =============================================================================
// SPACING — 4px scale, matches Tailwind defaults
// =============================================================================
export const spacing = {
  0:  0,
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================
export const fontFamily = {
  sans: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
} as const;

export const fontSize = {
  xs:    11,
  sm:    12,
  base:  13,    // body default
  md:    14,
  lg:    15,
  xl:    16,
  '2xl': 18,
  '3xl': 22,
  '4xl': 28,
} as const;

export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
} as const;

export const lineHeight = {
  tight:   1.2,
  snug:    1.35,
  normal:  1.5,
  relaxed: 1.6,
} as const;

// =============================================================================
// SHADOWS — soft elevation, kept restrained (Linear/Stripe style)
// =============================================================================
export const shadows = {
  xs:   '0 1px 2px 0 rgba(0,0,0,0.04)',
  sm:   '0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 1px 0 rgba(0,0,0,0.03)',
  md:   '0 2px 6px -1px rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
  lg:   '0 6px 16px -4px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
  xl:   '0 16px 32px -8px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.06)',
  card: '0 1px 2px 0 rgba(0,0,0,0.04)',
} as const;

// =============================================================================
// MOTION — used by Dialog, Drawer, Toast, etc.
// =============================================================================
export const motion = {
  fast:   '120ms cubic-bezier(0.4, 0, 0.2, 1)',
  medium: '220ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow:   '350ms cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

// =============================================================================
// Z-INDEX — keep the stacking order explicit and documented
// =============================================================================
export const zIndex = {
  base:    0,
  sticky:  20,
  header:  30,
  drawer:  40,
  dialog:  60,
  popover: 70,
  toast:   80,
} as const;

// Re-export everything as one default for convenience
export const tokens = {
  colors,
  palette,
  radii,
  spacing,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  shadows,
  motion,
  zIndex,
} as const;

export type Tokens = typeof tokens;
