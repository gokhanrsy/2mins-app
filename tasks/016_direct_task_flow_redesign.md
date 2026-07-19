# Task 016 — Direct Task Flow Redesign

Status: Active  
Sprint: Sprint 04 — Core Experience

---

# Context

Read before changing files:

- `.codex/AGENTS.md`
- `docs/PRODUCT.md`
- `docs/PRD.md`
- `docs/BRAND.md`
- `docs/NORTH_STAR.md`
- `docs/DESIGN.md`
- `docs/ARCHITECTURE.md`
- `tasks/011_home_task_integration.md`
- `tasks/012_session_domain.md`
- `tasks/014_completion_flow.md`
- `tasks/015_split_home_task_flow.md`

Inspect:

```text
app/
src/features/tasks/
src/features/sessions/
src/features/history/
src/theme/
src/components/ui/
```

The approved flow has changed.

Current:

```text
Home → Task idle → Start → Active
```

New:

```text
Home → Give me a task → Active task
```

The intermediate Start step must be removed.

---

# Objective

Redesign the task experience so requesting a task immediately starts it.

The Task screen should feel complete and self-explanatory.

Required active-task actions:

```text
I am done
Skip
Back
```

The visual direction should take inspiration from the provided reference:

- strong full-screen composition
- centered task
- small category label
- clear primary action
- two secondary actions
- confident but approachable
- minimal interface

Do not copy the reference colors or branding.

Use the existing 2 Mins warm copper / charcoal identity.

---

# Navigation Flow

## Home

Home keeps:

```text
Got 2 minutes?
Pick one small thing. No pressure.
Give me a task
```

When `Give me a task` is pressed:

1. navigate to `/task`
2. Task screen selects a task
3. Task screen immediately creates an active TaskSession
4. no Start button is shown

Home must not own the selected task or session.

---

# Task Screen States

Task screen now supports:

```text
active
completed
```

No visible idle state is required.

Do not add `idle` to TaskSession domain.

---

# Active State

When `/task` opens:

- select a real task through the existing task hook
- immediately create a TaskSession
- freeze the selected task
- show the active-task UI

Required content:

## Header

- menu or Back control on the left
- keep orientation clear
- accessible label

Do not overcrowd the header.

## Category

Show the real task category as a small quiet label.

Examples:

```text
BODY
MIND
HOME
```

Use existing domain values.

## Task

Show the task title as the strongest visual element.

Do not place it inside a heavy floating card unless needed for readability.

Prefer a cleaner full-screen editorial layout.

## Primary Action

Label:

```text
I am done
```

Behavior:

- complete the active session
- use existing completion transition
- preserve TaskCompletion mapping
- enter completed state

## Secondary Actions

Two side-by-side buttons:

```text
Skip
Back
```

### Skip

Behavior:

1. do not complete the current task
2. reset the current local session safely
3. select another task through the existing selection path
4. immediately create a new active TaskSession for the new task
5. avoid immediate repetition

Do not create cancellation history yet.

### Back

Behavior:

- return to Home
- do not complete the task
- local route state may be discarded
- do not add persistence or cancellation records

---

# Completed State

After `I am done`:

Status:

```text
Nice.
```

Keep the completed task visible.

Primary action:

```text
Another task
```

Behavior:

1. reset completed session
2. select a new task
3. immediately create a new active session
4. remain on `/task`

Secondary action:

```text
Back
```

Behavior:

- return Home

Do not show:

- Stay here
- That's enough for now.
- Start
- Not this one
- timer
- duration
- confetti
- statistics
- repeated completion summary

---

# Visual Redesign

The current pale card-and-button layout should be revised.

Target:

- stronger full-screen composition
- task centered vertically
- category above task
- primary action clearly separated
- Skip and Back aligned side by side
- small 2 Mins signature near the bottom if it improves identity
- balanced whitespace
- no dashboard feeling
- no dense metadata

Use existing theme tokens where possible.

You may update theme tokens only when necessary to support this screen.

Do not redesign the entire application.

---

# Color Direction

Light theme:

- warm paper background
- graphite text
- copper primary action
- subtle neutral secondary buttons

Dark theme:

- warm charcoal background
- soft high-contrast task text
- apricot/copper primary action
- restrained borders

Do not use:

- magenta
- bright pink
- alarming red
- gradients
- neon
- wellness green

---

# Buttons

## I am done

- strongest action
- full width
- clear contrast
- calm but confident
- minimum 48-point height

## Skip / Back

- equal width
- visually secondary
- clearly interactive
- not styled as disabled
- minimum 44-point touch targets

Do not add new public APIs to existing shared components unless absolutely necessary.

A local task-screen button style is acceptable if the three-button layout cannot be expressed cleanly with current components.

Do not create a generic button system unnecessarily.

---

# Session Behavior

Reuse:

```text
useTaskSession
createTaskSession
completeTaskSession
```

The Task screen must not manually construct session objects.

Opening `/task` must create exactly one session for the selected task.

Prevent:

- duplicate session creation from rerenders
- session creation loops
- selected task changing after session creation
- multiple completions

When Skip or Another task selects a new task:

- the new task must receive a new TaskSession
- the previous task must remain recent
- immediate repetition must be avoided

---

# Hook Adjustments

You may extend hooks minimally.

Potential capabilities:

```ts
startSession(task)
completeSession()
resetSession()
```

The Task hook may expose a dedicated replacement method suitable for:

- Skip
- Another task

Do not expose raw React setters.

Do not add Zustand or Context API.

---

# Animation

Preserve calm state feedback.

## Task Entry

When Task screen opens:

- task may fade in
- use a small restrained upward movement if motion is allowed

## Skip

- old task fades or moves slightly out
- new task appears calmly
- avoid large swipe gestures for now

## Completion

- task remains visible
- status changes to Nice.
- action labels transition clearly

Respect reduced motion.

Do not add:

- bounce
- shake
- pulse
- confetti
- looping motion

Use existing React Native Animated capabilities.

No new dependency.

---

# Accessibility

Requirements:

- category read before task
- task read before actions
- I am done has clear button semantics
- Skip and Back have accessible labels
- completed-state status is announced politely
- disabled-state semantics remain correct
- Dynamic Type works
- reduced-motion is respected
- touch targets meet minimum size

Do not rely only on animation or color to explain state.

---

# Architecture Constraints

Do not implement:

- timer
- duration display
- persistence
- AsyncStorage
- Zustand
- cancellation history
- History screen
- Favorites screen
- category filters
- premium UI
- onboarding
- notifications
- analytics
- backend
- custom fonts
- new dependencies

Do not modify:

- Task interface
- TaskSession interface
- TaskCompletion interface
- selection fallback priority
- curated task content
- repository contract

---

# Acceptance Criteria

The task is complete only when:

- Home still shows the invitation screen
- Give me a task opens `/task`
- `/task` immediately starts a selected task
- Start button no longer exists
- active Task screen shows I am done, Skip, and Back
- Skip replaces the task and starts a new session
- Back returns Home
- I am done completes the session
- completed state shows Nice.
- completed task remains visible
- Another task selects and immediately starts a new task
- completed state includes Back
- no timer exists
- layout feels complete and understandable
- light and dark themes work
- TypeScript passes
- lint passes
- Expo starts successfully

---

# Manual Verification

Verify:

1. Home opens normally.
2. Give me a task opens Task.
3. Task is already active.
4. No Start button appears.
5. I am done works.
6. Skip changes task.
7. Skipped task does not immediately repeat.
8. Back returns Home.
9. Completed state shows Nice.
10. Another task immediately starts a new task.
11. Completed-state Back returns Home.
12. Re-entering Task creates one new active session.
13. Light and dark themes work.
14. No timer or duration appears.

---

# Validation

Run:

```powershell
npm run typecheck
npm run lint
npx expo start --port 8082
```

Stop Expo afterward.

---

# Final Response Format

Return:

## Summary

## Files Created

## Files Modified

## New Flow

Explain:

- Home to active task
- Skip
- Back
- completion
- Another task

## Session Handling

Explain how duplicate starts and task freezing are prevented.

## Visual Changes

Explain the new hierarchy and button layout.

## Manual Verification

State which checks were performed interactively.

## Validation Results

Report:

- typecheck
- lint
- Expo startup

## Future Work

Mention intentionally deferred:

- persistence
- History
- Favorites
- cancellation records
- category filtering
- onboarding

Do not continue to another task.