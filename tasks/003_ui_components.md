# Task 003 — Shared UI Components

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

Inspect the existing implementation under:

```text
src/theme/
```

Use the existing theme system as the source of truth.

Do not duplicate theme values.

---

# Objective

Create the first reusable UI components for 2 Mins.

These components will form the visual foundation of future screens.

They must be:

- production-ready
- theme-aware
- accessible
- typed
- minimal
- easy to maintain

Do not create product screens or business logic.

---

# Engineering Principles

Prefer readability over cleverness.

Prefer composition over configuration.

Prefer fewer props over flexible APIs.

Do not create abstractions without a real current use case.

Do not add speculative functionality.

Every component should expose only the minimum API required by this task.

If additional props might be useful later, do not implement them. Mention them in the final report under `Future Improvements`.

If the implementation becomes over-engineered, choose the simpler solution.

---

# Required Files

Create or replace:

```text
src/components/ui/
├── AppText.tsx
├── Card.tsx
├── Divider.tsx
├── PrimaryButton.tsx
├── GhostButton.tsx
├── IconButton.tsx
└── index.ts
```

Do not create unrelated components.

---

# General Component Rules

All components must:

- use the existing theme system
- use `useAppTheme()`
- avoid repeated hardcoded design values
- support light and dark themes
- use strict TypeScript
- avoid `any`
- use named exports
- accept standard accessibility props where appropriate
- remain small and focused
- contain no product logic
- contain no storage logic
- contain no navigation logic

Do not add external dependencies unless absolutely necessary.

Do not add Storybook.

Do not create a preview screen in this task.

---

# AppText

Create:

```text
src/components/ui/AppText.tsx
```

## Purpose

Provide the standard text component for the application.

It should apply typography and semantic colors consistently.

## Required Variants

Support exactly:

```text
display
headline
title
body
label
caption
```

Map each variant to the closest typography token already defined in the theme.

Do not invent duplicate typography values.

## Required Props

Support:

```ts
variant?: AppTextVariant;
color?: keyof AppTheme["colors"];
children: React.ReactNode;
```

Also support normal React Native `Text` props.

The default variant should be:

```text
body
```

The default color should be:

```text
textPrimary
```

## Style Behavior

Consumer-provided `style` should be applied after the component's default styles so deliberate local layout overrides remain possible.

Do not allow the component to crash when no optional props are provided.

## Example Usage

```tsx
<AppText variant="display">
  Drink a glass of water.
</AppText>
```

```tsx
<AppText color="textSecondary">
  Start before you're ready.
</AppText>
```

---

# Card

Create:

```text
src/components/ui/Card.tsx
```

## Purpose

Provide the default surface container used by future task and content screens.

## Required Props

Support:

```ts
children: React.ReactNode;
padded?: boolean;
```

Also support normal React Native `View` props.

The default value of `padded` should be:

```text
true
```

## Default Style

Use theme tokens for:

- surface background
- border color
- border width
- card radius
- internal spacing
- subtle shadow

The card must feel warm, quiet, and premium.

Do not use dramatic elevation or a heavy shadow.

Do not add variants.

Do not add press behavior.

Do not add configurable radius, background, or shadow props.

## Example Usage

```tsx
<Card>
  <AppText>Content</AppText>
</Card>
```

```tsx
<Card padded={false}>
  <AppText>Content</AppText>
</Card>
```

---

# Divider

Create:

```text
src/components/ui/Divider.tsx
```

## Purpose

Provide a simple horizontal divider.

## Required Props

Support:

```ts
inset?: boolean;
```

Also support normal React Native `View` props.

The default value of `inset` should be:

```text
false
```

## Style

Use the semantic divider color from the theme.

Use the theme's standard border width.

When `inset` is enabled, apply horizontal margin using an existing spacing token.

Do not create a vertical divider in this task.

Do not add orientation or thickness props.

---

# PrimaryButton

Create:

```text
src/components/ui/PrimaryButton.tsx
```

## Purpose

Provide the primary action button used throughout the application.

## Required Props

Support:

```ts
children: React.ReactNode;
onPress: () => void;
disabled?: boolean;
```

Also support appropriate React Native `Pressable` props without conflicting with the required API.

## Visual Style

Use theme tokens for:

- accent background
- accent pressed background
- high-contrast button text
- button height
- horizontal padding
- radius
- typography
- motion duration

The button should normally fill its available width through its container layout.

Do not add a `fullWidth` prop.

## Interaction

Implement subtle press feedback.

Use a restrained opacity or scale effect consistent with `DESIGN.md`.

Respect reduced-motion preference.

When reduced motion is enabled, avoid scale animation and use simple visual feedback.

## Disabled State

When disabled:

- prevent interaction
- use disabled styling from the theme
- expose the disabled accessibility state
- avoid haptic feedback

## Accessibility

Set an appropriate button role.

Preserve any explicit accessibility label supplied by the consumer.

The touch target must be at least 44 points high.

## Do Not Add

Do not add:

- loading state
- icon props
- size variants
- visual variants
- haptic behavior
- gradients

---

# GhostButton

Create:

```text
src/components/ui/GhostButton.tsx
```

## Purpose

Provide a quiet secondary action.

Examples include:

```text
Not this one
Skip
Back to home
```

## Required Props

Support:

```ts
children: React.ReactNode;
onPress: () => void;
disabled?: boolean;
```

Also support appropriate React Native `Pressable` props.

## Visual Style

Use:

- transparent background
- secondary text color
- minimum touch target
- subtle press feedback
- no visible border by default

The component must remain visually quieter than `PrimaryButton`.

## Disabled State

Use the theme's disabled color and prevent interaction.

## Do Not Add

Do not add:

- loading state
- icons
- size variants
- underline variants
- haptics

---

# IconButton

Create:

```text
src/components/ui/IconButton.tsx
```

## Purpose

Provide a compact accessible button for icons such as Settings or Favorite.

## Required Props

Support:

```ts
icon: LucideIcon;
onPress: () => void;
accessibilityLabel: string;
disabled?: boolean;
```

Use the existing `lucide-react-native` package.

Also support appropriate React Native `Pressable` props.

## Style

Use theme tokens for:

- icon color
- disabled color
- minimum touch target
- radius
- press feedback

Use the standard icon size and stroke width defined in the design documentation or existing theme tokens.

If these values are not currently represented as theme tokens, use a small local constant in this component rather than changing the theme architecture during this task.

Do not add background styling unless required for clear press feedback.

## Accessibility

The `accessibilityLabel` must be required.

Use the button accessibility role.

Expose disabled state.

## Do Not Add

Do not add:

- tooltip
- badge
- icon position
- icon size prop
- icon color prop
- loading state

---

# Barrel Export

Create:

```text
src/components/ui/index.ts
```

Export:

```ts
AppText
Card
Divider
PrimaryButton
GhostButton
IconButton
```

Also export public component prop types when useful.

Future imports should work like:

```ts
import {
  AppText,
  Card,
  Divider,
  GhostButton,
  IconButton,
  PrimaryButton,
} from "@/components/ui";
```

---

# Constraints

Do not modify:

- product documentation
- task engine
- onboarding
- navigation structure
- repositories
- stores
- services
- application metadata
- production assets

Do not create:

- screens
- preview routes
- business logic
- task data
- favorites
- history
- notification logic
- persistence

Only modify another existing file if compilation genuinely requires it.

Explain any such modification in the final report.

---

# Acceptance Criteria

The task is complete only when:

- all six components exist
- all components use the theme system
- light and dark themes are supported
- component APIs remain minimal
- no duplicated hardcoded colors exist
- no duplicated typography definitions exist
- buttons meet minimum touch-target requirements
- disabled states work
- accessibility roles and states are present
- `IconButton` requires an accessibility label
- no unrelated product features are implemented
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

Do not claim success if any validation fails.

---

# Self Review

Before finishing, inspect every changed file.

Check for:

- duplicated styles
- hardcoded theme colors
- hardcoded typography values
- unnecessary props
- unused imports
- dead code
- inaccessible interactive controls
- touch targets below 44 points
- inconsistent naming
- architecture violations
- over-engineering
- unsupported React Native style values

Fix discovered issues before writing the final report.

---

# Final Response Format

Return:

## Summary

Briefly explain what was implemented.

## Files Created

List every created file.

## Files Modified

List any modified existing file.

## Component APIs

Summarize the final public API of each component.

## Validation Results

Report:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Improvements

List useful but intentionally unimplemented capabilities.

Examples may include:

- loading buttons
- button icons
- size variants
- interactive cards

Do not implement these during this task.

## Notes

Mention any limitation, decision, or conflict.

Do not continue to the next task.