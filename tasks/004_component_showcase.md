# Task 004 — Component Showcase

Status: Active  
Sprint: Sprint 02 — Design System

---

# Context

You are working on the 2 Mins Expo React Native application.

Before making changes, read:

- `.codex/AGENTS.md`
- `docs/PRODUCT.md`
- `docs/PRD.md`
- `docs/BRAND.md`
- `docs/NORTH_STAR.md`
- `docs/DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `sprints/Sprint_02.md`
- `tasks/002_theme_foundation.md`
- `tasks/003_ui_components.md`

Inspect the existing implementation under:

```text
src/theme/
src/components/ui/
app/
```

Use the existing theme and shared UI components.

Do not duplicate their styles.

---

# Objective

Create a temporary developer showcase screen so the current design system can be inspected on a real device.

This screen is not the final Home screen.

It exists only to visually verify:

- typography
- colors
- spacing
- card styling
- divider styling
- primary button
- ghost button
- icon button
- light theme
- dark theme

Do not implement product features.

---

# Required Work

Update the temporary application route:

```text
app/index.tsx
```

Use it as a scrollable component showcase.

Do not create additional routes.

Do not add navigation.

Do not create business logic.

---

# Screen Structure

The showcase screen should contain the following sections in this order.

## Header

Display:

```text
2 Mins
```

Below it:

```text
Start before you're ready.
```

Use existing application constants where available.

---

## Typography Section

Show each existing `AppText` variant.

Required examples:

```text
Display
Drink a glass of water.
```

```text
Headline
One small thing for right now.
```

```text
Title
Start before you're ready.
```

```text
Body
A calm action that takes less than two minutes.
```

```text
Label
PRIMARY ACTION
```

```text
Caption
Design system preview
```

The variant name should be visually quieter than its example.

Do not add new typography variants.

---

## Divider Section

Show:

```tsx
<Divider />
```

and:

```tsx
<Divider inset />
```

Label them clearly but quietly.

---

## Card Section

Show one default card.

Suggested content:

```text
For right now.

Drink a glass of water.
```

Also show one card with:

```tsx
padded={false}
```

The unpadded card may contain a simple internal View so its behavior is visible.

Do not turn cards into interactive elements.

---

## Buttons Section

Show:

### Primary Button

```text
Start
```

### Disabled Primary Button

```text
Start
```

### Ghost Button

```text
Not this one
```

### Disabled Ghost Button

```text
Not this one
```

Button presses may use a harmless local callback.

Do not add alerts, navigation, persistence, or product behavior.

---

## Icon Button Section

Show an `IconButton` using the Lucide Settings icon.

Required accessibility label:

```text
Open settings
```

Also show its disabled state.

Do not create an actual Settings screen.

---

## Theme Information

At the bottom, display the currently active theme name:

```text
Theme: Light
```

or:

```text
Theme: Dark
```

Use the existing `useAppTheme()` hook.

Do not add theme-switching controls in this task.

The app should continue following the current theme preference or system setting.

---

# Layout Requirements

The screen must:

- use `ScrollView`
- respect safe areas
- use the theme background
- use generous vertical spacing
- use centralized theme tokens
- remain readable on small phones
- constrain content width on large devices where practical
- avoid hardcoded colors
- avoid dramatic shadows
- avoid decorative illustrations
- avoid gradients
- avoid fake product content

Use only the minimum local styles needed to arrange the showcase.

The screen should feel orderly and calm, not like a dense debug panel.

---

# Accessibility

Ensure:

- section order is logical
- text remains readable with font scaling
- buttons retain their accessibility roles
- disabled states remain exposed
- icon button labels remain accessible
- scrolling works with larger text

Do not disable font scaling.

---

# Constraints

Do not modify the public APIs of:

- `AppText`
- `Card`
- `Divider`
- `PrimaryButton`
- `GhostButton`
- `IconButton`

If a component has a real defect that blocks the showcase:

1. make the smallest necessary correction
2. explain it in the final report
3. do not expand its API

Do not add:

- onboarding
- task data
- task engine
- favorites
- history
- settings
- notifications
- storage
- Zustand stores
- new dependencies
- font packages
- final Home UI

This is a visual verification screen only.

---

# Acceptance Criteria

The task is complete only when:

- the showcase renders from `app/index.tsx`
- every `AppText` variant is visible
- default and inset dividers are visible
- padded and unpadded cards are visible
- primary and ghost buttons are visible
- enabled and disabled button states are visible
- enabled and disabled icon buttons are visible
- active theme name is displayed
- light and dark themes render without errors
- the screen scrolls on small devices
- no product feature is implemented
- TypeScript passes
- lint passes
- Expo starts successfully

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

Verify startup with:

```powershell
npx expo start
```

Stop the Expo process after verification.

Do not claim success if validation fails.

---

# Self Review

Before finishing, inspect every changed file.

Check for:

- duplicated component styles
- hardcoded theme colors
- excessive local styling
- inaccessible controls
- broken disabled states
- layout overflow
- unreadable typography
- architecture violations
- unrelated changes
- unused imports
- dead code

Fix discovered issues before writing the final report.

---

# Final Response Format

Return:

## Summary

## Files Modified

## Visual Sections Included

## Validation Results

Report:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Component Corrections

List any existing component that required a small correction.

Write:

```text
None
```

if no correction was required.

## Notes

Do not continue to another task.