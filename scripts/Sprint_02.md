# Sprint 02 — Design System

Status: Active  
Target Version: 0.2.0  
Branch: feature/design-system

---

# Sprint Goal

Build the reusable visual foundation of 2 Mins.

This sprint must create the theme system and shared UI components that future screens will use.

No product feature should be implemented in this sprint.

---

# Source of Truth

Before every task, read:

- `.codex/AGENTS.md`
- `docs/PRODUCT.md`
- `docs/PRD.md`
- `docs/BRAND.md`
- `docs/NORTH_STAR.md`
- `docs/DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`

---

# Planned Tasks

## Task 002 — Theme Foundation

Create:

```text
src/theme/
├── tokens/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── radius.ts
│   ├── typography.ts
│   ├── motion.ts
│   └── shadows.ts
├── themes/
│   ├── light.ts
│   └── dark.ts
├── types.ts
├── ThemeProvider.tsx
├── useAppTheme.ts
└── index.ts
```

Requirements:

- semantic light and dark themes
- system theme detection
- light, dark, and system preference support
- typed theme tokens
- no repeated hardcoded visual values
- reduced-motion awareness where appropriate

---

## Task 003 — Shared UI Components

Create:

```text
src/components/ui/
├── AppText.tsx
├── PrimaryButton.tsx
├── GhostButton.tsx
├── Card.tsx
├── IconButton.tsx
└── Divider.tsx
```

Requirements:

- theme-aware
- accessible
- typed
- reusable
- disabled states
- press feedback
- minimum touch targets
- reduced-motion compatible

---

## Task 004 — Layout Components

Create:

```text
src/components/layout/
├── Screen.tsx
├── SafeAreaScreen.tsx
└── CenteredContent.tsx
```

Requirements:

- safe-area support
- configurable padding
- keyboard-safe where necessary
- responsive maximum content width
- theme-aware background

---

## Task 005 — Feedback Components

Create:

```text
src/components/feedback/
├── EmptyState.tsx
├── LoadingState.tsx
└── ErrorState.tsx
```

Requirements:

- calm product tone
- no oversized illustrations
- accessible labels
- reusable actions
- light and dark theme support

---

## Task 006 — Design System Preview

Update the temporary foundation screen to preview:

- App name
- tagline
- PrimaryButton
- GhostButton
- Card
- Divider
- EmptyState

This is only a design-system verification screen.

Do not create the final Home screen.

---

# Non-Goals

Do not implement:

- onboarding
- task engine
- task data
- favorites
- history
- notifications
- settings
- persistence
- Zustand stores
- final navigation
- production app icon
- store assets

---

# Validation

Every task must pass:

```powershell
npm run typecheck
npm run lint
```

The application must also start successfully with:

```powershell
npx expo start
```

---

# Self-Review Rules

Before finishing each task, review all changed files for:

- duplicated code
- unnecessary abstractions
- hardcoded design values
- inconsistent naming
- architecture violations
- accessibility problems
- dead code
- unused imports
- excessive component complexity

Fix discovered issues before reporting completion.

---

# Sprint Exit Criteria

Sprint 02 is complete only when:

- light theme works
- dark theme works
- system theme works
- all shared components use theme tokens
- no repeated hardcoded design values exist in shared components
- buttons have accessible and disabled states
- minimum touch targets are respected
- preview screen renders successfully
- TypeScript passes
- lint passes
- Expo starts successfully

---

# Expected Commit

```text
Sprint 2: Add design system foundation
```