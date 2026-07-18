# Task 005 — Home Screen v1

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
- `tasks/004_component_showcase.md`

Inspect the existing implementation under:

```text
src/theme/
src/components/ui/
app/
```

Use the existing theme system and shared UI components.

Do not duplicate their styles.

---

# Objective

Replace the temporary component showcase with the first real Home screen for 2 Mins.

This is Home Screen v1.

The goal is to create a calm, warm, minimal, premium-but-approachable experience focused on one small action.

The screen should be production-quality visually, but task selection and persistence are not part of this task.

---

# Approved Visual Direction

Use the following direction:

- warm minimalism
- premium but approachable
- generous whitespace
- one clear visual focus
- large task typography
- restrained decoration
- warm off-white light theme
- warm charcoal dark theme
- no wellness illustrations
- no gradients
- no gamification
- no confetti
- no excessive icons
- no dense debug information

The task must remain the visual center of the screen.

The primary button must not visually overpower the task.

---

# Required Work

Replace the temporary showcase implementation in:

```text
app/index.tsx
```

Create a real Home screen using existing shared components.

Do not create additional routes.

Do not add navigation yet.

---

# Screen Content

Use this temporary fixed task:

```text
Drink a glass of water.
```

Use this contextual line:

```text
For right now.
```

Use this primary action:

```text
Start
```

Use this secondary action:

```text
Not this one
```

Use the application name:

```text
2 Mins
```

Use shared constants where available.

---

# Screen Structure

The screen should contain, in this order:

## Header

Left side:

```text
2 Mins
```

Right side:

A Settings `IconButton`.

Required accessibility label:

```text
Open settings
```

The button does not navigate anywhere yet.

Use a harmless local callback.

The header should remain visually quiet.

---

## Context Label

Display:

```text
For right now.
```

Use a quiet text color.

Include a very small accent detail beneath or beside it.

The accent detail should be subtle and must use the theme accent token.

Do not add greeting text such as:

```text
Good morning.
```

---

## Main Task Card

Use the existing `Card` component.

Content:

```text
Drink a glass of water.
```

The card should:

- occupy the visual center of the screen
- contain generous internal spacing
- use large task typography
- avoid unnecessary metadata
- avoid icons and illustrations
- feel calm and tactile
- use the existing theme surface, border, radius, and shadow

The task text must be the most visually prominent element on the screen.

Do not add task numbers, progress bars, categories, or timers.

---

## Primary Action

Use the existing `PrimaryButton`.

Label:

```text
Start
```

Use a harmless local callback.

The button should:

- appear below the task card
- have comfortable spacing
- remain important but secondary to the task itself
- not use a gradient
- not contain an icon

Do not modify the public API of `PrimaryButton`.

---

## Secondary Action

Use the existing `GhostButton`.

Label:

```text
Not this one
```

Use a harmless local callback.

Place it below the primary button.

It should remain visually quiet.

---

## Bottom Navigation Preview

At the bottom, show two quiet navigation placeholders:

```text
Favorites
History
```

Use Lucide icons:

- Heart
- Clock or History

These controls are visual placeholders only.

Do not create routes or navigation behavior.

Each control must:

- use `Pressable`
- have a minimum 44-point touch target
- have an accessibility role
- have an accessibility label
- use theme colors
- use restrained icon sizing

Do not create a full reusable tab-bar system in this task.

Keep this implementation local and simple.

---

# Layout Requirements

The screen must:

- respect safe areas
- use the theme background
- support small and large iPhones
- remain visually balanced
- avoid unnecessary scrolling on normal phone sizes
- allow scrolling only when increased text size makes it necessary
- use centralized theme tokens
- avoid hardcoded colors
- avoid duplicated typography styles
- constrain content width on large screens where practical

Use:

```text
SafeAreaView
ScrollView
View
```

only where useful.

The primary content should feel vertically centered without forcing the header or bottom navigation off-screen.

---

# Light and Dark Themes

The screen must work in both themes.

## Light Theme

Should feel:

- warm
- soft
- clear
- approachable

## Dark Theme

Should feel:

- focused
- warm
- calm
- not pure black

Do not create theme-specific hardcoded values inside the screen.

Use semantic theme tokens only.

---

# Interaction Rules

For this task:

- Settings does nothing
- Start does nothing
- Not this one does nothing
- Favorites does nothing
- History does nothing

Use stable local no-op callbacks.

Do not show alerts.

Do not log to the console.

Do not implement fake loading.

Do not implement task changes.

---

# Accessibility

Ensure:

- Settings has an accessibility label
- Start retains button semantics
- Not this one retains button semantics
- Favorites and History have accessible labels
- touch targets are at least 44 points
- text scaling remains enabled
- screen reading order is logical
- task text is read before actions
- bottom navigation controls expose button roles

Do not rely only on color to indicate interactivity.

---

# Architecture Constraints

Do not implement:

- task engine
- task data files
- Zustand stores
- AsyncStorage
- Favorites behavior
- History behavior
- Settings screen
- navigation routes
- notifications
- onboarding
- animation system
- haptics
- theme switching controls
- custom fonts
- backend
- analytics

Do not create speculative layout components.

Only extract a component if it is genuinely required to keep `app/index.tsx` readable.

Keep route-level implementation straightforward.

---

# Existing Component Corrections

Do not modify shared UI component APIs.

If an existing component contains a genuine visual or accessibility defect that blocks the Home screen:

1. make the smallest possible internal correction
2. preserve its public API
3. explain the change in the final report

Do not redesign every shared component during this task.

---

# Acceptance Criteria

The task is complete only when:

- the temporary showcase is removed
- Home Screen v1 renders from `app/index.tsx`
- the header contains app name and Settings button
- the contextual label is visible
- one task card is visible
- the task is the strongest visual element
- Start is visible
- Not this one is visible
- Favorites and History placeholders are visible
- the screen works in light mode
- the screen works in dark mode
- small-screen layout remains usable
- accessibility requirements are met
- no product logic is implemented
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

- hardcoded colors
- duplicated theme values
- excessive local styles
- poor spacing hierarchy
- task text losing visual priority
- primary button overpowering the card
- inaccessible controls
- touch targets below 44 points
- layout overflow
- unnecessary abstractions
- unused imports
- unrelated changes
- dead code

Fix discovered issues before writing the final report.

---

# Final Response Format

Return:

## Summary

## Files Modified

## Home Screen Structure

## Existing Component Corrections

Write:

```text
None
```

if no correction was required.

## Validation Results

Report:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Visual Review Notes

Briefly describe:

- visual hierarchy
- light-theme behavior
- dark-theme behavior
- small-screen behavior

## Future Work

List intentionally unimplemented behavior:

- real task selection
- navigation
- favorites
- history
- settings
- animations
- haptics

Do not implement those items.

Do not continue to another task.