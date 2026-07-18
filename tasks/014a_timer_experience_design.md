# Task 014A — Timer Experience Design

Status: Active
Sprint: Sprint 04 — Core Experience

---

# Objective

Design the complete user experience of the active 2-minute session.

This task is design only.

No timer logic.
No countdown implementation.
No session changes.
No persistence.
No animations beyond simple visual concepts.

The goal is to define exactly how the experience should feel before implementing it.

---

# Product Philosophy

The timer is **not** a stopwatch.

The timer is **not** a productivity tracker.

The timer is simply quiet companionship while the user completes one tiny action.

The interface should reduce pressure, not increase it.

Every design decision should support:

- calm
- clarity
- confidence

Never urgency.

---

# Design Goals

The user should always know:

• what they are doing

• how much time remains

• that finishing is optional but encouraged

The UI should never feel stressful.

---

# Screen Flow

Design all of the following screens.

---

## 1.

Session Started

Immediately after Start.

Purpose:

Reassure the user they have begun.

Contents:

Header

Small status label

Task card

Progress indicator

Disabled secondary button

No celebration.

---

## 2.

Running

The primary timer experience.

Contents:

Task title

Circular progress

Remaining time

Quiet supporting sentence

No distracting UI.

---

## 3.

Final 15 Seconds

The experience becomes slightly warmer.

Do NOT flash.

Do NOT vibrate.

Do NOT animate aggressively.

Possible changes:

Accent color

Supporting sentence

Subtle ring color transition

Nothing dramatic.

---

## 4.

Completed

Soft success.

Not achievement.

Not productivity.

Just:

"You did it."

Possible actions:

Done

Another task

No confetti.

No fireworks.

No XP.

---

# Layout Rules

The task title must remain visible at all times.

Never replace it with the timer.

Recommended hierarchy:

Status

↓

Task

↓

Timer

↓

Supporting text

↓

Primary action

---

# Timer

Use a circular progress ring.

Large enough to read comfortably.

Inside:

01:42

Below:

remaining

Do not use milliseconds.

---

# Supporting Copy

Keep messages extremely short.

Examples:

Take your time.

Keep going.

One small step.

Almost there.

You're doing fine.

Do not rotate messages rapidly.

One message every 20–30 seconds is enough.

---

# Colors

The current Home palette remains.

Only the final seconds become slightly warmer.

Never use alarming red.

---

# Motion

Gentle only.

Examples:

Ring progression.

Soft fade.

Opacity.

Never:

Bounce.

Shake.

Pulse.

Countdown jumps.

---

# Accessibility

Task title always visible.

Large Dynamic Type supported.

High contrast.

Screen reader friendly.

No color-only meaning.

---

# Out of Scope

Do not implement:

Timer engine

Completion

History

Persistence

Navigation

Haptics

Analytics

Notifications

---

# Deliverables

Produce high-quality mockups for:

1. Session Started

2. Running

3. Final 15 Seconds

4. Completed

Also include:

- spacing guidance
- typography hierarchy
- motion notes
- accessibility notes

No production code.

No React Native components.

Only UX specification and visual mockups.

---

# Final Response

Return:

## Design Summary

## Screen Flow

## Visual Hierarchy

## Motion

## Accessibility

## Future Implementation Notes

Do not implement the timer itself.