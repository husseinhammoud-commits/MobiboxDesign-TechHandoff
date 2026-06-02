module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/tech-handoff/design-tokens.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Design tokens — the single source of truth for visual values across the product.
 *
 * Every color, radius, shadow, and type definition the design system uses lives here.
 * The MUI theme consumes these; never hard-code values at the component level — extend
 * this file and pull from it.
 *
 * If you add a token, add it here first. If you find yourself writing a hex color or a
 * pixel value inside a component, ask whether it should be a token.
 */ // =============================================================================
// COLOR — zinc neutral scale + accent palettes
// Mirrors Tailwind's zinc/* + emerald/amber/rose/violet/blue ramps so existing
// prototype CSS translates 1:1. Pick from these scales rather than inventing colors.
// =============================================================================
__turbopack_context__.s([
    "colors",
    ()=>colors,
    "fontFamily",
    ()=>fontFamily,
    "fontSize",
    ()=>fontSize,
    "fontWeight",
    ()=>fontWeight,
    "lineHeight",
    ()=>lineHeight,
    "motion",
    ()=>motion,
    "palette",
    ()=>palette,
    "radii",
    ()=>radii,
    "shadows",
    ()=>shadows,
    "spacing",
    ()=>spacing,
    "tokens",
    ()=>tokens,
    "zIndex",
    ()=>zIndex
]);
const colors = {
    // Neutrals (the workhorse — 95% of the UI uses these)
    zinc: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#09090b'
    },
    // Status — paired with each status pill / chip / banner
    emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        500: '#10b981',
        700: '#047857'
    },
    amber: {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        700: '#b45309'
    },
    rose: {
        50: '#fff1f2',
        100: '#ffe4e6',
        500: '#f43f5e',
        700: '#be123c'
    },
    // Accent — used sparingly (themed badge, blue icon container)
    violet: {
        50: '#f5f3ff',
        100: '#ede9fe',
        600: '#7c3aed',
        700: '#6d28d9'
    },
    blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        600: '#2563eb'
    }
};
const palette = {
    // Backgrounds
    surface: '#ffffff',
    surfaceMuted: colors.zinc[50],
    surfaceSubtle: colors.zinc[100],
    // Borders
    border: colors.zinc[200],
    borderStrong: colors.zinc[300],
    borderSubtle: colors.zinc[100],
    // Text
    textPrimary: colors.zinc[900],
    textSecondary: colors.zinc[600],
    textMuted: colors.zinc[500],
    textDisabled: colors.zinc[400],
    textInverse: '#ffffff',
    // Interactive (buttons, links)
    primary: colors.zinc[900],
    primaryHover: colors.zinc[800],
    primaryText: '#ffffff',
    // Status (online / offline / draft / themed)
    success: colors.emerald[500],
    successBg: colors.emerald[50],
    successText: colors.emerald[700],
    warning: colors.amber[500],
    warningBg: colors.amber[50],
    warningText: colors.amber[700],
    danger: colors.rose[500],
    dangerBg: colors.rose[50],
    dangerText: colors.rose[700],
    accent: colors.violet[600],
    accentBg: colors.violet[100],
    accentText: colors.violet[700],
    // Focus ring
    focusRing: colors.zinc[400]
};
const radii = {
    none: 0,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 14,
    '2xl': 16,
    full: 9999
};
const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48
};
const fontFamily = {
    sans: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace'
};
const fontSize = {
    xs: 11,
    sm: 12,
    base: 13,
    md: 14,
    lg: 15,
    xl: 16,
    '2xl': 18,
    '3xl': 22,
    '4xl': 28
};
const fontWeight = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
};
const lineHeight = {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.6
};
const shadows = {
    xs: '0 1px 2px 0 rgba(0,0,0,0.04)',
    sm: '0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 1px 0 rgba(0,0,0,0.03)',
    md: '0 2px 6px -1px rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
    lg: '0 6px 16px -4px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
    xl: '0 16px 32px -8px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.06)',
    card: '0 1px 2px 0 rgba(0,0,0,0.04)'
};
const motion = {
    fast: '120ms cubic-bezier(0.4, 0, 0.2, 1)',
    medium: '220ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.22, 1, 0.36, 1)'
};
const zIndex = {
    base: 0,
    sticky: 20,
    header: 30,
    drawer: 40,
    dialog: 60,
    popover: 70,
    toast: 80
};
const tokens = {
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
    zIndex
};
}),
"[project]/tech-handoff/theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "theme",
    ()=>theme
]);
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/@mui/material/styles/createTheme.js [app-ssr] (ecmascript) <locals> <export default as createTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/design-tokens.ts [app-ssr] (ecmascript)");
;
;
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    // ---------------------------------------------------------------------------
    // PALETTE
    // ---------------------------------------------------------------------------
    palette: {
        mode: 'light',
        primary: {
            main: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].primary,
            contrastText: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].primaryText
        },
        secondary: {
            main: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].zinc[600],
            contrastText: '#ffffff'
        },
        success: {
            main: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].success,
            light: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].successBg,
            dark: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].successText
        },
        warning: {
            main: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].warning,
            light: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].warningBg,
            dark: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].warningText
        },
        error: {
            main: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].danger,
            light: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].dangerBg,
            dark: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].dangerText
        },
        accent: {
            main: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].accent,
            light: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].accentBg,
            dark: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].accentText,
            contrastText: '#ffffff'
        },
        text: {
            primary: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textPrimary,
            secondary: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textSecondary,
            disabled: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textDisabled
        },
        divider: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].border,
        background: {
            default: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surfaceMuted,
            paper: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surface
        },
        surface: {
            main: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surface,
            muted: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surfaceMuted,
            subtle: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surfaceSubtle
        },
        border: {
            main: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].border,
            strong: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].borderStrong,
            subtle: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].borderSubtle
        }
    },
    // ---------------------------------------------------------------------------
    // SHAPE — global border radius default
    // ---------------------------------------------------------------------------
    shape: {
        borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].sm
    },
    // ---------------------------------------------------------------------------
    // TYPOGRAPHY
    // ---------------------------------------------------------------------------
    typography: {
        fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontFamily"].sans,
        fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].base,
        htmlFontSize: 16,
        fontWeightRegular: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].regular,
        fontWeightMedium: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].medium,
        fontWeightBold: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].semibold,
        h1: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"]['4xl'],
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].semibold,
            lineHeight: 1.2
        },
        h2: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"]['3xl'],
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].semibold,
            lineHeight: 1.25
        },
        h3: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"]['2xl'],
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].semibold,
            lineHeight: 1.3
        },
        h4: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].lg,
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].semibold,
            lineHeight: 1.35
        },
        h5: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].md,
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].semibold,
            lineHeight: 1.4
        },
        h6: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].base,
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].semibold,
            lineHeight: 1.4
        },
        body1: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].base,
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].regular,
            lineHeight: 1.5
        },
        body2: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].sm,
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].regular,
            lineHeight: 1.45
        },
        button: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].base,
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].medium,
            textTransform: 'none',
            letterSpacing: 0
        },
        caption: {
            fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].xs,
            fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].regular,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textMuted
        }
    },
    // ---------------------------------------------------------------------------
    // SHADOWS — replace MUI's 25-step elevation with our restrained set
    // ---------------------------------------------------------------------------
    shadows: [
        'none',
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xs,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].sm,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].sm,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].md,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].md,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].md,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].lg,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].lg,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].lg,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].lg,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].lg,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].lg,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].lg,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].lg,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl,
        __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl
    ],
    // ---------------------------------------------------------------------------
    // COMPONENT DEFAULTS — override the stock Material look at the source
    // Anything using bare <Button>, <Paper>, <Chip>, etc. now matches our aesthetic.
    // ---------------------------------------------------------------------------
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surfaceMuted,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textPrimary,
                    fontFamily: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontFamily"].sans
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableRipple: false
            },
            styleOverrides: {
                root: {
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].sm,
                    textTransform: 'none',
                    fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].medium,
                    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].base,
                    paddingInline: 14,
                    minHeight: 36,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none'
                    }
                },
                containedPrimary: {
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].primary,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].primaryText,
                    '&:hover': {
                        backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].primaryHover
                    }
                },
                outlined: {
                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].border,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textPrimary,
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surface,
                    '&:hover': {
                        backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surfaceSubtle,
                        borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].borderStrong
                    }
                },
                text: {
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textSecondary,
                    '&:hover': {
                        backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surfaceSubtle,
                        color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textPrimary
                    }
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surface,
                    backgroundImage: 'none',
                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].border}`,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].md
                }
            }
        },
        MuiCard: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].border}`,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].md,
                    boxShadow: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].card
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].xs,
                    fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].medium,
                    height: 22,
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].full,
                    paddingInline: 4
                },
                filled: {
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surfaceSubtle,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textSecondary
                },
                outlined: {
                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].border,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textSecondary,
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surface
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
                variant: 'outlined',
                fullWidth: true
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].sm,
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].surface,
                    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].base,
                    '& fieldset': {
                        borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].border
                    },
                    '&:hover fieldset': {
                        borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].borderStrong
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].focusRing,
                        borderWidth: 1
                    }
                },
                input: {
                    padding: '8px 12px',
                    height: 'auto'
                }
            }
        },
        MuiSelect: {
            defaultProps: {
                size: 'small'
            },
            styleOverrides: {
                select: {
                    paddingBlock: 8
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].sm,
                    fontWeight: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontWeight"].medium,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textSecondary
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 40,
                    height: 24,
                    padding: 0,
                    overflow: 'visible'
                },
                switchBase: {
                    padding: 3,
                    '&.Mui-checked': {
                        transform: 'translateX(16px)',
                        color: '#fff',
                        '& + .MuiSwitch-track': {
                            backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].primary,
                            opacity: 1
                        }
                    }
                },
                thumb: {
                    width: 18,
                    height: 18,
                    boxShadow: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xs
                },
                track: {
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].full,
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].zinc[300],
                    opacity: 1
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].xl,
                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].border}`,
                    boxShadow: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].xl
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textPrimary,
                    color: '#fff',
                    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].xs,
                    padding: '6px 10px',
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].sm
                },
                arrow: {
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].textPrimary
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].borderSubtle
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["radii"].md,
                    border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].border}`,
                    boxShadow: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadows"].lg,
                    marginTop: 4
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fontSize"].base,
                    paddingBlock: 8,
                    '&:hover': {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$design$2d$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["palette"].primary, 0.04)
                    }
                }
            }
        }
    }
});
}),
"[project]/tech-handoff/app/Providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/@mui/material/styles/ThemeProvider.js [app-ssr] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/@mui/material/CssBaseline/CssBaseline.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2d$nextjs$2f$v13$2d$appRouter$2f$appRouterV13$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AppRouterCacheProvider$3e$__ = __turbopack_context__.i("[project]/tech-handoff/node_modules/@mui/material-nextjs/v13-appRouter/appRouterV13.js [app-ssr] (ecmascript) <export default as AppRouterCacheProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tech-handoff/theme.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2d$nextjs$2f$v13$2d$appRouter$2f$appRouterV13$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AppRouterCacheProvider$3e$__["AppRouterCacheProvider"], {
        options: {
            enableCssLayer: true
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
            theme: __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["theme"],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$tech$2d$handoff$2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/tech-handoff/app/Providers.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/tech-handoff/app/Providers.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/tech-handoff/app/Providers.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0~k88x4._.js.map