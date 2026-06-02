# Tech Handoff — MUI v6 Implementation

This folder converts the design prototype into the team's stack: **TypeScript + React 19 + Next.js 16 + MUI v6**, with a thin design-system layer on top of MUI that locks in the look of the prototype.

## The pitch (5 lines)

We're **not** asking the team to drop MUI. We're asking them to **theme** it.
- `design-tokens.ts` is the source of truth (colors, radii, shadows, type)
- `theme.ts` maps tokens to MUI's `createTheme` and overrides every default component
- `components/*.tsx` are thin wrappers that lock down our API and hide MUI specifics
- Result: standard MUI under the hood; the prototype's zinc-neutral aesthetic at the surface

## Status

| Screen | Status |
|---|---|
| **Services overview** | ✅ Done — grid, filter chips, search, infinite scroll, 3-dot menu, archive/restore, delete |
| **Service-detail Drawer** | ✅ Done — sticky header, action bar, Overview / Offers / Activity tabs |
| **Dashboard** | ✅ Done — KPI strip + 3 sections (Payouts / CAPs / Country & Op) each with search + expand |
| **5-step Wizard** | ✅ Done — Service / Set up / Offers / Portals / Review with full state plumbing |
| **Inline offer-theme editor** | ✅ Done — Step 3 takeover with phone preview + property panel + "I'm done" + confirm modal |
| Sidebar shell | ✅ Done |
| **Storybook** | ✅ Set up — 10 primitive stories included |

Every flow from the prototype is now wired in TypeScript / React / MUI form. The handoff is complete.

## Getting it running

```bash
cd tech-handoff
npm install
npm run dev          # Next.js dev server  → http://localhost:3000
npm run storybook    # Storybook           → http://localhost:6006
npm run typecheck    # one-shot TS check
```

To **integrate into the team's existing Next 16 app** instead:

1. Drop `design-tokens.ts`, `theme.ts`, `components/`, `hooks/`, `lib/` into `src/design-system/` (rename the alias in `tsconfig.json` to match).
2. Wrap your root layout in `<AppRouterCacheProvider><ThemeProvider theme={theme}>` (see `app/layout.tsx` for the pattern).
3. Import from `@/design-system/components`.
4. Copy the route group (`(shell)/layout.tsx`) and the four pages as starting references.

No new build tooling. No babel plugins. No Tailwind required.

## File map

```
tech-handoff/
├── README.md
├── package.json                   ← deps (MUI v6, React 19, Next 16, lucide-react, Storybook 9)
├── tsconfig.json                  ← @/tech-handoff/* path alias
├── next.config.js
│
├── design-tokens.ts              ← single source of truth (colors / radii / shadows / type / spacing / motion / z-index)
├── theme.ts                       ← MUI createTheme + global component overrides
│
├── components/                    (24 components — primitives + composites)
│   ├── index.ts                   ← barrel — always import from here
│   │
│   │  ── PRIMITIVES ────────────
│   ├── Button.tsx                  Button (variant × size × loading)
│   ├── IconButton.tsx              icon-only square button
│   ├── Card.tsx                    surface container (padded / hoverable)
│   ├── Chip.tsx                    filter chips, metadata tags, dismissible
│   ├── StatusPill.tsx              online / offline / draft / themed / error
│   ├── StatTile.tsx                KPI tile (label + big value + tone)
│   ├── Banner.tsx                  inline alert (info / success / warning / danger)
│   ├── Input.tsx                   text input with label-above pattern
│   ├── Select.tsx                  chevron dropdown
│   ├── Switch.tsx                  inline OR stacked label layout
│   ├── ProgressBar.tsx             slim horizontal progress with semantic tone
│   ├── BarChart.tsx                pure-CSS vertical bars + cursor tooltip
│   ├── Dialog.tsx                  compound: Dialog.Body / Dialog.Footer
│   ├── Drawer.tsx                  compound: Drawer.Header / Body / Footer
│   ├── Tabs.tsx                    underline tabs with optional sticky positioning
│   ├── Menu.tsx                    popover menu + useMenu() helper
│   ├── Avatar.tsx                  initials block (deterministic tint from name)
│   ├── Skeleton.tsx                animated loading placeholder
│   ├── Stepper.tsx                 wizard step indicator
│   │
│   │  ── APP-SHELL COMPOSITES ───
│   ├── Sidebar.tsx                 left nav, active state via usePathname()
│   ├── PageHeader.tsx              sticky h-14 header (title + actions)
│   ├── WizardShell.tsx             wizard chrome (header + stepper + footer)
│   │
│   │  ── SCREEN-LEVEL COMPOSITES ───
│   ├── ServiceCard.tsx             service grid card
│   ├── ServiceGrid.tsx             chips + search + grid + infinite scroll + drawer
│   ├── ServiceDetailDrawer.tsx     right-side panel (Overview / Offers / Activity)
│   ├── DashboardSection.tsx        shared shell — title + search + expand
│   ├── DashboardPayouts.tsx        payouts section body (chart + table)
│   ├── DashboardCAPs.tsx           CAPs section body (progress bars + alert)
│   ├── DashboardCountryOps.tsx     country×operator performance table
│   │
│   │  ── WIZARD STEPS ──────────────
│   └── wizard/
│       ├── index.ts                ← wizard step barrel
│       ├── Step1Service.tsx        ← Service name / Client / Category / Premium
│       ├── Step2Setup.tsx          ← Country / Billing / Theme tabs
│       ├── Step3Offers.tsx         ← Offer form + list + per-card 3-dot menu
│       ├── Step4Portals.tsx        ← Portal config (Country / Operator / URL / Parameters)
│       ├── Step5Review.tsx         ← Read-only summary with "Edit" per block
│       └── OfferThemeEditor.tsx    ← Step-3 takeover (phone preview + property panel)
│
├── hooks/
│   └── useInfiniteScroll.ts       ← paginated render with cascade-load on tall displays
│
├── lib/
│   ├── mock-services.ts           ← 24 seed + 500 generated services (deterministic)
│   ├── mock-dashboard.ts          ← MOCK_PAYOUTS + MOCK_CAPS + aggregation helpers
│   └── service-detail.ts          ← KPIs + offers + activity + countries (drawer mocks)
│
├── app/                           (Next.js 16 App Router)
│   ├── layout.tsx                 ← ThemeProvider + AppRouterCacheProvider
│   ├── globals.css                ← minimal — most styling lives in the MUI theme
│   ├── page.tsx                   ← / → /dashboard
│   └── (shell)/                   ← sidebar shell route group
│       ├── layout.tsx
│       ├── dashboard/page.tsx     ← Dashboard with KPIs + 3 sections
│       └── services/
│           ├── page.tsx           ← Services overview
│           └── new/page.tsx       ← Create-service wizard
│
└── .storybook/                    ← Storybook 9 config
    ├── main.ts
    └── preview.tsx                ← wraps stories in ThemeProvider

components/stories/                ← stories for the documented primitives
   ├── Avatar.stories.tsx
   ├── Banner.stories.tsx
   ├── BarChart.stories.tsx
   ├── Button.stories.tsx
   ├── Card.stories.tsx
   ├── Chip.stories.tsx
   ├── Input.stories.tsx
   ├── ProgressBar.stories.tsx
   ├── StatTile.stories.tsx
   ├── StatusPill.stories.tsx
   └── Switch.stories.tsx
```

## Design philosophy (the rules)

1. **Tokens → primitives → composites → screens.** `design-tokens.ts` is the source of truth. Theme consumes it. Primitives consume the theme. Composites compose primitives. Screens compose composites. Never reach across layers.

2. **The wrapper is thin.** Each primitive is ~30–80 lines. Heavy logic stays in MUI underneath. Wrappers exist to lock down our variant API and standardize prop names.

3. **The theme is the safety net.** Even if a developer reaches for `<MuiButton>` directly, theme overrides ensure it still looks like ours.

4. **No styled-components, no inline `sx` sprawl.** `sx` is fine for layout. For visual styling, fix the theme.

5. **Status colors are semantic.** `online` is always emerald. `draft` is always amber. `themed` is always violet. `StatusPill` is the only place statuses cash out into hex values.

## What's interesting (engineering notes for the team)

- **`useInfiniteScroll` has a cascade-load fix.** Vanilla IntersectionObserver pagination breaks on tall displays — once a couple batches load without scrolling, the sentinel sits in the viewport but never re-enters, so the observer stops firing. Our hook cascade-loads additional batches until the page is tall enough to require scrolling, then defers to scroll-driven loading. (See the design prototype bug we hit for context.)

- **`Tabs` is fully typed over the value union.** `<Tabs<'overview' | 'offers' | 'activity'>>` narrows `onChange` at compile time — typos are caught at build, not runtime.

- **Dashboard sections share a shell via render props.** `DashboardSection` owns the search + expand state and exposes both via a `children` render function. Section bodies focus purely on their content, not on state plumbing.

- **`BarChart` is pure CSS.** No Recharts or D3 — the datasets are small and a tiny custom implementation gives us full control over the cursor-tracking tooltip + entry animation. Swap for Recharts later if we need axes, multi-series, or zoom.

- **Wizard form state is consolidated in the page.** Each step is presentational; the page owns the merged draft and decides what each navigation does. The "review" step renders that same draft back as a read-only summary with per-block Edit jumps.

- **Inline OfferThemeEditor lives inside Step 3.** Clicking "Duplicate & edit theme" on an offer card swaps the Step 3 body for the editor; the wizard chrome (header + footer) stays put. A sticky amber banner + "I'm done" → confirmation modal is the only way to commit, which prevents accidental loss of theme edits.

## Storybook

10 primitive stories included out of the gate:

- `Button` — every variant × size + with-icon + loading
- `StatusPill` — every status, with the iconOnly variant
- `Card` — default / hoverable / unpadded
- `Chip` — soft / outline / selected / with-count, filter-row example
- `Input` — basic / with description / with search icon / with error
- `Banner` — info / warning / success / with action button
- `StatTile` — individual tones + a full KPI strip example
- `ProgressBar` — healthy / near-limit / exhausted + full spectrum
- `BarChart` — by-GEO / by-operator / empty state
- `Switch` — bare / inline / stacked
- `Avatar` — sizes + a deterministic-tints grid

The preview decorator wraps every story in our ThemeProvider so what you see in Storybook matches the app exactly.

## Design philosophy (continued): when to add a Storybook story

Don't write a story per file by reflex. Add a story when:
- The component has **multiple variants worth documenting visually** (Button, StatusPill, Chip)
- The component has **non-trivial states** (Input with error, ProgressBar with thresholds)
- The component has a **representative composition** that's worth showing (KPI strip, filter chips row, avatar grid)

Skip a story when the component is purely structural (PageHeader, WizardShell — they're better demonstrated by rendering the screen).

## Open questions for the team

1. **Where does the design system live in the monorepo?** Inside `src/design-system/` of the main app, or a sibling package?
2. **Component naming.** Plain `Button`, `Card`, `Chip` — should we prefix with `Dcb` to avoid collisions with MUI? Imports come from our barrel so collisions aren't a real concern; flag if the team prefers otherwise.
3. **Tailwind in addition?** Works fine alongside (`sx` and Tailwind don't collide). Worth a quick conversation.
4. **Icon library.** Currently `lucide-react`. Could switch to `@mui/icons-material` (already in the bundle). Pick one for consistency.
5. **Server vs client components.** All interactive components here are `'use client'`. Pages are server-rendered where possible. The team should establish a convention — default-server, opt-in to client when needed.

## Roadmap from here

The handoff covers the entire prototype. What's next is integration + iteration with real backend data:

1. **Wire real data.** Replace `lib/mock-services.ts`, `lib/mock-dashboard.ts`, `lib/service-detail.ts` with RSC fetches or react-query.
2. **Wire real auth + RBAC.** The Sidebar's `Hussein` profile chip + Notifications badge are placeholders.
3. **Internationalization.** Add `next-intl` or similar. MUI handles RTL via `theme.direction = 'rtl'`.
4. **Add what was deferred.** A few primitives we could add as the codebase grows: Toast/Snackbar wrapper, Tooltip wrapper, DataGrid (likely MUI's heavily themed), DatePicker wrapper.

---

*Generated for the MobiBox DCB Platform redesign. Questions → Hussein.*
