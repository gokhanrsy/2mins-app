# Task 006 — Home Screen Polish

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
- `tasks/005_home_screen_v1.md`

Inspect:

```text
src/theme/
src/components/ui/
app/index.tsx
```

The current Home screen works correctly. This task is a focused visual-polish pass.

Do not add product features.

---

# Objective

Elevate Home Screen v1 from a functional prototype into a refined, memorable, App Store-quality interface.

The final result should feel:

- warm
- calm
- premium
- approachable
- focused
- human
- intentionally minimal

The task text must remain the strongest visual element.

---

# Approved Direction

Combine:

- Concept E warmth
- Concept F neutrality
- Concept J editorial hierarchy
- Concept I dark-theme contrast

Avoid:

- wellness-app green
- Material Design appearance
- excessive roundness
- oversized controls
- loud colors
- gradients
- illustrations
- decorative clutter
- cold corporate minimalism

---

# Required Work

Polish:

```text
app/index.tsx
```

Update the existing theme tokens and shared component internals only where required to support the approved design.

Preserve existing public component APIs.

---

# 1. Replace the Green Accent

Remove the current green primary accent.

Use a restrained soft copper / dusty apricot direction.

Recommended light-theme accent family:

```text
accent: #C9795E
accentPressed: #B8674F
accentSoft: #F1DDD4
```

Recommended dark-theme accent family:

```text
accent: #D9967D
accentPressed: #E2A58E
accentSoft: #3B2924
```

These values may be adjusted slightly for accessibility and visual balance.

Requirements:

- centralize the colors in theme tokens
- maintain sufficient text contrast
- avoid saturated orange
- avoid pink
- avoid brown-looking primary controls
- use the accent sparingly

The overall interface should remain mostly neutral.

---

# 2. Refine the Light Theme

The light theme should use a warm paper-like background.

Target direction:

```text
background: warm off-white
surface: slightly lighter warm surface
card: soft paper surface
textPrimary: graphite
textSecondary: muted warm gray
border: very subtle warm gray
```

Do not use pure white for the main background.

The card may be lighter than the page but must not look like a bright floating white box.

---

# 3. Refine the Dark Theme

The dark theme should use a warm charcoal, not pure black.

Target direction:

```text
background: #141614 or similar
surface: #1D211E or similar
card: #202421 or similar
```

Requirements:

- preserve warmth
- avoid green-tinted black
- keep borders subtle
- ensure task text remains crisp
- use the soft copper accent in small amounts

Do not merely invert the light theme.

---

# 4. Compact Developer Theme Switcher

The temporary developer theme switcher currently dominates the header.

Refine it.

Requirements:

- keep support for Light, System, and Dark
- make it substantially more compact
- use icons instead of full text where practical:
  - Sun
  - Monitor or CircleHalf
  - Moon
- each control must have an accessibility label
- active state must remain clear
- minimum touch target must remain 44 points
- visual footprint should remain small
- show it only in development using `__DEV__`

The header priority should be:

1. App name
2. Settings
3. Developer theme control

The developer control must not look like a production navigation element.

---

# 5. Refine Header

The header should feel quiet and balanced.

Requirements:

- reduce the visual weight of `2 Mins`
- keep it clearly identifiable
- slightly reduce the Settings icon size or visual prominence
- maintain accessible touch targets
- align all controls cleanly
- avoid crowding on narrow screens

Do not add a logo yet.

---

# 6. Refine Context Label

Keep:

```text
For right now.
```

Requirements:

- move it slightly closer to the task area
- use secondary text color
- keep the accent mark very small
- replace the current green accent with the new soft copper accent
- avoid excessive vertical space around it

The label should introduce the task, not create a separate section.

---

# 7. Refine Task Card

The task card is the main visual object.

Requirements:

- reduce excessive height
- preserve generous breathing room
- reduce the heavy box feeling
- use a slightly tighter radius
- use a very subtle border
- use a restrained shadow in light mode
- prefer border and surface contrast in dark mode
- make the card feel like premium paper, not a Material card
- keep the task vertically and horizontally balanced

The card should not look empty when the task occupies only two lines.

Do not add:

- icons
- category labels
- timers
- progress
- task number
- illustrations

---

# 8. Refine Task Typography

The task text should feel editorial but readable.

Current task:

```text
Drink a glass of water.
```

Requirements:

- remain the largest text on screen
- use a comfortable line height
- avoid overly heavy weight
- avoid looking like a generic bold system heading
- retain text scaling
- maintain good wrapping on small screens

Do not install custom fonts during this task unless the existing token implementation already supports them safely.

If custom fonts are needed for the approved visual direction, mention them under `Future Improvements` instead.

---

# 9. Refine Primary Button

The current PrimaryButton is too visually dominant.

Update its internal styling without changing its public API.

Requirements:

- reduce height slightly while keeping at least 48 points
- reduce pill-like appearance
- use a more restrained radius
- use the new soft copper accent
- ensure label contrast passes
- preserve clear press feedback
- preserve reduced-motion behavior
- keep the button width aligned with the task card
- ensure it remains important but visually secondary to the task

Avoid Material Design styling.

Do not add:

- gradient
- icon
- shadow-heavy treatment
- loading state
- new props

---

# 10. Refine Ghost Button

The GhostButton is already close to the target.

Requirements:

- preserve its quiet appearance
- ensure spacing below the PrimaryButton is intentional
- use a clear but muted text color
- retain accessible press feedback
- avoid making it look disabled

Do not add underline or border.

---

# 11. Refine Bottom Navigation Preview

The current bottom controls sit too close to the bottom edge.

Requirements:

- move the preview slightly upward
- preserve safe-area spacing
- reduce visual separation from the main screen only slightly
- keep the top divider subtle
- maintain 44-point touch targets
- keep icons and labels quiet
- ensure labels remain readable in both themes

The navigation preview must not compete with the main task.

Do not create real navigation.

---

# 12. Vertical Rhythm

Review the entire screen as one composition.

Requirements:

- reduce the large empty gap above the context label
- maintain breathing room without making the screen feel unfinished
- keep the task block near the visual center
- prevent the primary action from appearing too low
- keep the bottom navigation grounded
- support short and tall phones
- permit scrolling only when text scaling requires it

The screen should feel intentionally spacious, not sparse.

---

# Accessibility

Preserve:

- accessible Settings label
- theme switcher labels
- Start button role
- GhostButton role
- Favorites and History labels
- minimum touch targets
- logical reading order
- dynamic text scaling
- reduced-motion support

Check contrast after changing accent colors.

Do not rely only on color for the active theme selection.

---

# Architecture Constraints

Do not implement:

- task engine
- task rotation
- persistence
- Favorites behavior
- History behavior
- Settings route
- onboarding
- notifications
- haptics
- animations beyond existing press feedback
- custom font loading
- navigation
- backend
- analytics

Do not create speculative components.

Do not change shared component public APIs.

---

# Acceptance Criteria

The task is complete only when:

- green is no longer the primary accent
- light mode feels warm and approachable
- dark mode uses warm charcoal surfaces
- the developer theme switcher is compact
- the header is less crowded
- the task card is less oversized
- the task remains the strongest visual element
- the PrimaryButton no longer overpowers the task
- the bottom navigation sits more comfortably
- no product behavior is added
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

Verify startup using an available port:

```powershell
npx expo start --port 8082
```

Stop the Expo process after verification.

---

# Self Review

Before finishing, inspect all changed files.

Check:

- whether the accent still looks like wellness green
- whether the copper accent is too saturated
- whether the task card feels oversized
- whether the button feels Material-like
- whether spacing feels unfinished
- whether the header is crowded
- whether dark mode feels cold or green-tinted
- whether borders and shadows are too visible
- whether accessibility contrast is sufficient
- whether unnecessary abstractions were introduced
- whether public component APIs changed

Fix issues before writing the report.

---

# Final Response Format

Return:

## Summary

## Files Modified

## Theme Changes

## Home Screen Changes

## Shared Component Corrections

Write `None` if no shared component correction was required.

## Validation Results

Report:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Visual Review Notes

Describe:

- light theme
- dark theme
- hierarchy
- small-screen behavior

## Future Improvements

Mention intentionally deferred items such as:

- custom editorial font
- micro-animations
- real navigation
- task behavior

Do not implement them.

Do not continue to another task.