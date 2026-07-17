# Task 002 — Theme Foundation

Status: Active

Sprint: Sprint 02 — Design System

---

# Context

You are working on the 2 Mins mobile application.

This project follows strict architectural and design rules.

Before making any changes, read and understand:

- .codex/AGENTS.md
- docs/PRODUCT.md
- docs/PRD.md
- docs/BRAND.md
- docs/NORTH_STAR.md
- docs/DESIGN.md
- docs/ARCHITECTURE.md
- docs/ROADMAP.md
- docs/APP_STORE.md
- sprints/Sprint_02.md

These documents are the source of truth.

Do not ignore them.

# Approved Visual Direction

Use the following visual direction as the current design freeze:

- warm minimalism
- premium but approachable
- warm off-white backgrounds
- graphite text
- soft apricot accent
- generous whitespace
- task-focused hierarchy
- restrained shadows
- dark mode inspired by Concept I
- no green primary accent
- no loud gradients
- no wellness-app illustrations

Typography direction:

- Playfair Display for prominent task and editorial headings
- Inter for body text and interface labels

The exact accent tone may change later, so it must be centralized as a token.

---

# Objective

Create the complete design-token foundation for the application.

This task should establish the visual language that every future component will use.

Do NOT create business logic.

Do NOT implement application features.

Do NOT redesign the product.

---

# Requirements

Create the following structure.

```text
src/theme/

tokens/
    colors.ts
    spacing.ts
    radius.ts
    typography.ts
    motion.ts
    shadows.ts

themes/
    light.ts
    dark.ts

ThemeProvider.tsx

useAppTheme.ts

types.ts

index.ts
```

---

# Theme Tokens

Move every design value from DESIGN.md into reusable tokens.

Do not hardcode values inside components.

Tokens must include:

## Colors

Light theme

Dark theme

Semantic colors

Examples:

Background

Surface

Accent

Border

Success

Warning

Danger

Text

Muted

Divider

Overlay

---

## Typography

Export reusable typography definitions.

Do not duplicate typography objects.

---

## Radius

Export reusable radius tokens.

---

## Spacing

Use the spacing scale defined in DESIGN.md.

---

## Motion

Store animation durations.

Examples:

Fast

Normal

Slow

---

## Shadows

Export reusable shadow objects.

Support iOS and Android.

---

# Theme Objects

Create:

light.ts

dark.ts

Both themes must expose the same interface.

Example:

theme.colors

theme.spacing

theme.radius

theme.typography

theme.motion

theme.shadows

---

# Theme Provider

Create a ThemeProvider.

Requirements:

- React Context
- typed
- reusable
- production-ready

Support:

Light

Dark

System

The provider must automatically follow the operating system theme when "System" is selected.

---

# Hook

Create:

useAppTheme()

Requirements:

Return:

theme

themeName

isDark

setThemePreference()

Do not expose implementation details.

---

# Types

Create reusable theme types.

Avoid duplicated interfaces.

Avoid "any".

---

# Code Quality

Keep files small.

Keep naming descriptive.

No dead code.

No placeholder implementations.

No TODO comments.

No unnecessary abstractions.

---

# Accessibility

Respect reduced-motion settings where relevant.

The theme system should allow accessible colors.

Do not reduce contrast.

---

# Constraints

Do NOT create:

Buttons

Cards

Screens

Icons

Navigation

Stores

Repositories

Services

Business logic

Task engine

Home screen

Settings

History

Favorites

Notifications

Only the theme system.

---

# Validation

Run:

```powershell
npm run typecheck
```

Run:

```powershell
npm run lint
```

Verify:

```powershell
npx expo start
```

Do not leave Expo running.

---

# Self Review

Before finishing:

Review every changed file.

Look for:

- duplicated tokens
- hardcoded colors
- inconsistent naming
- architecture violations
- unnecessary exports
- dead code
- accessibility issues
- missing documentation

Fix everything before presenting the final result.

---

# Final Response

Return:

## Summary

## Files Created

## Files Modified

## Validation Results

## Notes

Do not continue to another task.