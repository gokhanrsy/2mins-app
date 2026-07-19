# Task 017 — Brand Identity Refresh

Status: Active
Sprint: Sprint 05 — Product Polish

---

# Context

Read before changing files:

- .codex/AGENTS.md
- docs/PRODUCT.md
- docs/BRAND.md
- docs/NORTH_STAR.md
- docs/DESIGN.md
- docs/ARCHITECTURE.md
- tasks/015_split_home_task_flow.md
- tasks/016_direct_task_flow_redesign.md

Inspect:

app/
src/theme/
src/components/
src/features/tasks/
src/features/sessions/

---

# Objective

This is a visual-only redesign.

Business logic must remain unchanged.

Do not modify:

- task selection
- session creation
- completion logic
- navigation
- repositories
- hooks
- persistence

The goal is to make 2 Mins feel like a polished App Store product instead of a developer prototype.

---

# Design Direction

The inspiration is the provided reference.

Do NOT recreate it.

Use only its visual principles.

Target feeling:

- premium
- calm
- modern
- confident
- playful enough to feel friendly
- never childish
- never productivity-dashboard

---

# Brand Identity

2 Mins should feel like:

"One tiny action."

Not:

"Complete your productivity."

Avoid wellness clichés.

Avoid corporate SaaS styling.

Avoid Material Design feeling.

---

# Color Refresh

Replace the current visual language.

Primary Background

Deep Burgundy

Approximate direction:

#4B2337

Primary Accent

Warm Coral

Approximate direction:

#E48E79

Secondary Surface

Muted Plum

Approximate direction:

#6B4255

Primary Text

Warm White

Approximate direction:

#FFF8F6

Muted Text

Approximate direction:

#D8C0C8

Divider

Approximate direction:

#7C5566

Exact values may change if accessibility improves.

Maintain excellent contrast.

---

# Home Screen

Current Home feels unfinished.

Redesign it.

Hierarchy:

App Logo

↓

Headline

↓

Supporting copy

↓

Primary CTA

↓

Secondary shortcuts

↓

Small brand signature

The screen should breathe.

Do not fill empty space.

---

Headline

Got 2 minutes?

Supporting copy

Pick one small thing.
No pressure.

Primary Button

Give me a task

Large.

Confident.

Rounded.

---

Secondary shortcuts

History

Favorites

Quiet.

Small.

Do not dominate.

---

Brand Signature

Very small.

Centered.

Example direction:

• 2 MINS

You may create a more refined typographic signature.

---

# Task Screen

This is the most important screen.

Task becomes the hero.

Hierarchy:

Header

↓

Category

↓

Task

↓

Primary Action

↓

Secondary Actions

↓

Brand Signature

Task should occupy visual attention.

Not the buttons.

---

Category

Smaller.

Sentence case preferred.

Examples:

Body

Mind

Home

Avoid ALL CAPS.

---

Task Typography

Largest element.

Comfortable line spacing.

Strong weight.

Centered.

No oversized card.

Prefer editorial layout.

---

Buttons

Primary

Done

Full width.

Rounded.

56 px minimum height.

Secondary Row

Skip

Back

Equal width.

Rounded.

Visually quieter.

Do not resemble disabled controls.

---

Completed State

Status:

Nice.

Task remains visible.

Primary:

Another task

Secondary:

Back

Keep exactly the same layout.

Only change state.

No new completion screen.

---

Spacing

Increase whitespace.

Reduce visual noise.

Avoid dense stacking.

Every section should have breathing room.

---

Corner Radius

Modern.

16–22 px direction.

Use consistently.

---

Shadow

Very restrained.

Prefer elevation through color.

Avoid floating cards.

---

Motion

Preserve existing calm animations.

Do not invent new ones.

Reduce any excessive movement.

---

Icons

Use existing icon system.

Do not introduce decorative illustration packs.

---

Typography

Refine hierarchy.

Examples:

Headline

30–36

Task

34–40

Category

12–13

Muted copy

15–16

Maintain Dynamic Type.

---

Theme

Update both:

Light

Dark

The application should feel intentionally designed in both.

Not simply color-inverted.

---

Brand Consistency

Home and Task must clearly belong to the same product.

Buttons

Spacing

Typography

Corner radius

Color

Must feel unified.

---

Do NOT

Do not redesign navigation.

Do not redesign architecture.

Do not add features.

Do not add timers.

Do not add onboarding.

Do not add illustrations.

Do not add gradients.

Do not add glassmorphism.

Do not add neumorphism.

Do not add Lottie.

Do not add dependencies.

---

Acceptance Criteria

The redesign succeeds when:

- Home feels like a finished product
- Task feels like the hero screen
- Brand identity feels unique
- Visual hierarchy is immediately understandable
- Screens feel calmer
- Whitespace improves readability
- Both themes look intentional
- Existing business logic is untouched
- TypeScript passes
- Lint passes
- Expo starts successfully

---

Validation

Run:

npm run typecheck

npm run lint

npx expo start --port 8082

Stop Expo afterwards.

---

Final Response

Return:

## Summary

## Files Modified

## Visual Changes

## Theme Changes

## Typography Changes

## Button Changes

## Validation Results

Do not continue to another task.