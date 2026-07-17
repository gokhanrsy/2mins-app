# 2 Mins — Design System

Version: 1.0  
Design Direction: Quiet Momentum

---

# Design Goal

2 Mins should feel calm, premium, warm, and effortless.

The interface must reduce decision fatigue.

The user should always understand what to do next without thinking.

The design must never feel noisy, childish, overly motivational, or unfinished.

---

# Core Design Principles

## One Clear Action

Every screen should have one obvious primary action.

Secondary actions must remain visually quiet.

## Calm Over Excitement

Avoid:

- confetti
- aggressive gradients
- loud colors
- excessive badges
- streak pressure
- exaggerated success messages

## Space Is Part of the Design

Use generous spacing.

Do not fill empty areas unnecessarily.

## Premium Simplicity

The interface should feel intentionally minimal, not incomplete.

## Consistency

Do not create new visual patterns for individual screens.

Reuse the same tokens, components, and interaction rules.

---

# Color System

## Light Theme

```ts
export const lightColors = {
  background: "#F5F1E8",
  surface: "#FFFDF8",
  surfaceSecondary: "#EEE8DC",
  textPrimary: "#1E211F",
  textSecondary: "#737870",
  textMuted: "#9A9E97",
  accent: "#7D927D",
  accentPressed: "#6E826E",
  border: "#DED8CC",
  divider: "#E7E1D6",
  success: "#6F8A73",
  warning: "#B58B50",
  danger: "#A65E58",
  disabled: "#C7C5BE",
  overlay: "rgba(30, 33, 31, 0.36)",
};
```

## Dark Theme

```ts
export const darkColors = {
  background: "#151816",
  surface: "#202421",
  surfaceSecondary: "#292E2A",
  textPrimary: "#F4F1E8",
  textSecondary: "#AEB4AC",
  textMuted: "#858B84",
  accent: "#93A893",
  accentPressed: "#A2B6A2",
  border: "#343A35",
  divider: "#2D322E",
  success: "#8BA38E",
  warning: "#C3A06C",
  danger: "#C37A73",
  disabled: "#555B56",
  overlay: "rgba(0, 0, 0, 0.52)",
};
```

---

# Color Usage Rules

Use `background` for main screen backgrounds.

Use `surface` for cards, sheets, and raised elements.

Use `accent` only for important actions and selected states.

Do not use more than one strong accent color on the same screen.

Use `danger` only for destructive actions or serious errors.

Never use pure black or pure white.

---

# Typography

Use the system font.

## iOS

SF Pro.

## Android

Roboto or the default Android system font.

Do not load custom fonts in the MVP unless there is a strong product reason.

## Typography Scale

```ts
export const typography = {
  display: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "600",
  },
  headline: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "600",
  },
  titleLarge: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "600",
  },
  titleMedium: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "600",
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "400",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
} as const;
```

## Typography Rules

Task text is the visual priority on the Home screen.

Use sentence case.

Avoid full uppercase text.

Avoid excessive bold text.

Never place long paragraphs in the main task experience.

Support dynamic text scaling where practical.

---

# Spacing Scale

Use multiples of four.

```ts
export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;
```

---

# Layout Rules

Default horizontal screen padding:

```ts
24
```

Compact devices may use:

```ts
20
```

Maximum readable content width on large screens:

```ts
560
```

Main content should remain vertically balanced.

Do not place the primary task too close to the top.

Respect safe areas on every device.

---

# Border Radius

```ts
export const radius = {
  small: 10,
  medium: 16,
  large: 24,
  card: 28,
  pill: 999,
} as const;
```

The main task card should use `card`.

Buttons should use `medium` or `pill`.

Avoid mixing too many radius values on one screen.

---

# Borders

Default border width:

```ts
1
```

Use borders subtly.

Cards should not look boxed in.

Prefer light borders over heavy shadows.

---

# Shadows

Shadows must remain subtle.

## Small

```ts
export const smallShadow = {
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  elevation: 2,
};
```

## Medium

```ts
export const mediumShadow = {
  shadowOpacity: 0.08,
  shadowRadius: 18,
  shadowOffset: {
    width: 0,
    height: 6,
  },
  elevation: 4,
};
```

Do not use dramatic shadows.

In dark mode, prefer borders and surface contrast over visible shadows.

---

# Iconography

Use Lucide icons.

Default icon size:

```ts
20
```

Large icon size:

```ts
24
```

Default stroke width:

```ts
1.75
```

Icons should support the interface, not decorate it.

Do not mix icon libraries.

---

# Touch Targets

Minimum touch target:

```text
44 x 44
```

Preferred primary button height:

```ts
56
```

Interactive elements must have enough spacing to prevent accidental taps.

---

# Buttons

## Primary Button

Use for the main action on a screen.

Example:

```text
Start
```

Style:

- accent background
- high contrast text
- height 56
- medium or pill radius
- full width when appropriate
- subtle press scale

## Secondary Button

Use for alternative actions.

Style:

- surface or transparent background
- optional border
- primary text
- visually quieter than the primary button

## Ghost Button

Use for low-priority actions.

Example:

```text
Not this one
```

Style:

- transparent background
- secondary text
- no visible border by default

## Destructive Button

Use only for destructive actions.

Style:

- danger text or danger background
- clear wording
- visually separated from the primary action

---

# Main Task Card

The Home screen contains only one main task card.

Style:

- surface background
- card radius
- subtle border
- optional small shadow
- generous internal padding
- centered task text
- no unnecessary metadata
- no heavy decoration

Recommended padding:

```ts
{
  paddingHorizontal: 28,
  paddingVertical: 36,
}
```

The card must feel important but calm.

---

# Home Screen Structure

Recommended order:

1. Small contextual line
2. Main task card
3. Primary action
4. Quiet alternative action

Example:

```text
A small thing for right now.

Drink a glass
of water.

Start

Not this one
```

No task list should appear on the Home screen.

---

# Task Completion State

When a task is completed:

- the card slightly scales down
- opacity reduces
- the card moves upward subtly
- success haptic is triggered
- the completion state appears calmly

Completion message examples:

```text
That's enough for now.
```

```text
One small thing done.
```

```text
You started.
```

```text
Nice.
```

Do not show confetti.

Do not show XP.

Do not show exaggerated congratulations.

---

# Motion

Motion should feel natural and restrained.

## Standard Durations

```ts
export const motion = {
  fast: 140,
  normal: 220,
  slow: 320,
} as const;
```

## Preferred Motion

Use:

- subtle fade
- short slide
- gentle scale
- controlled spring animation

Avoid:

- bouncing
- spinning
- repeated looping animations
- flashy page transitions

---

# Press Feedback

On press:

```ts
{
  transform: [{ scale: 0.98 }],
  opacity: 0.92,
}
```

The interaction should return immediately when released.

---

# Reduced Motion

Respect the device's reduced motion preference.

When reduced motion is enabled:

- remove scale animations
- remove large movement
- use simple opacity transitions
- keep all functionality unchanged

---

# Haptics

Use haptics sparingly.

## Light

Use for:

- changing a selection
- requesting another task
- toggling a favorite

## Success

Use for:

- completing a task

## Warning

Use only for important confirmation moments.

Do not trigger haptics on every tap.

---

# Navigation

Use simple bottom tab navigation only when needed.

Possible sections:

- Home
- Favorites
- History
- Settings

The Home tab must remain the default screen.

Do not add more than four main navigation destinations in the MVP.

Icons should remain simple.

Labels should remain visible.

---

# Onboarding

Maximum three screens.

## Screen 1

Title:

```text
Start before you're ready.
```

Purpose:

Explain the core philosophy.

## Screen 2

Title:

```text
Tell us what this moment feels like.
```

Purpose:

Explain context and energy selection.

## Screen 3

Title:

```text
One small thing. Nothing more.
```

Purpose:

Explain that the app provides a single action.

The onboarding should take less than 30 seconds.

A quiet skip option may be provided.

---

# Empty States

Empty states should be warm and concise.

## Favorites

Title:

```text
Nothing saved yet.
```

Message:

```text
Keep the ones that feel right.
```

## History

Title:

```text
No completed actions yet.
```

Message:

```text
Your small wins will appear here.
```

## Search

Title:

```text
Nothing found.
```

Message:

```text
Try a different word.
```

Do not use large illustrations in the MVP.

---

# Error States

Errors should be calm and actionable.

Avoid technical language.

Example:

```text
Something didn't load.

Try again.
```

Never blame the user.

Never expose raw errors.

---

# Dark Mode

Support:

- Light
- Dark
- System

Dark mode must preserve the warm visual identity.

Do not use pure black backgrounds.

Test contrast separately for both themes.

---

# Accessibility

The app must support:

- screen readers
- dynamic type where practical
- clear focus order
- accessible labels
- sufficient contrast
- minimum 44 x 44 touch targets
- reduced motion
- clear selected states

Do not rely only on color to communicate meaning.

---

# App Icon Direction

The icon should contain:

- warm cream background
- two dark circular dots
- left dot slightly larger
- right dot slightly smaller
- no clock symbol
- no number
- no text

The icon should remain recognizable at small sizes.

---

# Visual Tone

The app should feel:

- calm
- warm
- intelligent
- minimal
- personal
- premium
- trustworthy

The app should never feel:

- childish
- corporate
- loud
- gamified
- clinical
- crowded