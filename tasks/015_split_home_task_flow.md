# Task 015 — Split Home and Task Flow

Status: Active  
Sprint: Sprint 04 — Core Experience

---

# Context

You are working on the 2 Mins Expo React Native application.

Before changing files, read:

- `.codex/AGENTS.md`
- `docs/PRODUCT.md`
- `docs/PRD.md`
- `docs/BRAND.md`
- `docs/NORTH_STAR.md`
- `docs/DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `tasks/011_home_task_integration.md`
- `tasks/012_session_domain.md`
- `tasks/013_start_button_integration.md`
- `tasks/014_completion_flow.md`

Inspect:

```text
app/
src/features/tasks/
src/features/sessions/
src/features/history/
src/components/ui/
src/theme/
```

The application currently combines task discovery, active task, and completion states on one screen.

The approved UX direction has changed.

---

# Objective

Separate the experience into two clear stages:

```text
Home
→ Task
→ Completed state
```

Home should invite the user to receive a task.

The Task screen should display and manage the selected task.

Completion should remain a state of the Task screen rather than a separate route.

The experience must remain calm, warm, minimal, and easy to understand.

---

# Product Decision

“2 Mins” means:

> Small tasks that can be started or completed quickly.

It does not mean:

- countdown timer
- time pressure
- stopwatch
- forced two-minute session

Do not add timer-related UI or behavior.

---

# Required Routes

Use Expo Router.

Create or update:

```text
app/
├── _layout.tsx
├── index.tsx
└── task.tsx
```

## `app/index.tsx`

Becomes the invitation Home screen.

## `app/task.tsx`

Becomes the task experience screen.

Do not create a separate completion route.

Do not add tabs yet.

---

# Navigation Rules

Home primary action navigates to:

```text
/task
```

The Task route owns:

- selected task display
- task replacement
- session start
- session completion
- completed state

Use Expo Router navigation.

Do not manually build route state.

Do not add deep-link behavior beyond normal Expo Router operation.

---

# Home Screen

Home should not display a task immediately.

Its purpose is to ask whether the user wants one small task.

## Required Content

App name:

```text
2 Mins
```

Primary headline:

```text
Got 2 minutes?
```

Supporting text:

```text
Pick one small thing. No pressure.
```

Primary button:

```text
Give me a task
```

## Primary Button Behavior

When pressed:

1. navigate to `/task`
2. allow the Task screen to select and display a task

Do not select a task directly inside Home unless required to pass state cleanly.

Prefer task selection within the Task feature boundary.

## Secondary Content

Show quiet access points for:

```text
Favorites
History
```

They remain placeholders.

Do not create their routes yet.

Do not show:

- current task
- Start
- Not this one
- category filtering
- premium controls
- session status
- timer
- statistics

---

# Home Visual Direction

Use the current warm theme.

The Home screen should feel:

- clear
- inviting
- confident
- calm
- spacious

The main action must be obvious.

Avoid making the screen feel like a settings page or dashboard.

The developer theme switcher may remain visible under `__DEV__`, but it must not dominate the layout.

Keep Settings accessible and visually quiet.

---

# Task Screen

The Task screen must support these states:

```text
idle
active
completed
```

These are UI-derived states.

Do not add `idle` to the TaskSession domain.

---

# Task Screen Header

Provide a clear Back action.

Requirements:

- use an accessible icon button
- accessibility label:

```text
Go back
```

- navigate back to Home
- remain visually quiet

Keep the app name or a small screen title only if it improves orientation.

Do not overcrowd the header.

---

# Task Screen — Idle State

When the Task screen opens:

- select a task using the existing repository and selection engine
- display one task
- preserve recent-task avoidance
- do not use a fixed task

## Content

Optional quiet category label:

```text
BODY
```

Category may be shown only if it improves comprehension.

If included:

- use the task's real category
- format it as a subtle label
- do not make it visually dominant

Task title:

```text
Stretch your arms gently overhead.
```

Primary action:

```text
Start
```

Secondary action:

```text
Show another task
```

Back action remains available.

## Idle Behavior

- Start creates a TaskSession
- Show another task selects a different task
- immediate repetition must be avoided
- Back returns to Home

Do not add:

- timer
- duration display
- task metadata panel
- progress
- explanation text
- category picker

---

# Task Screen — Active State

When a session is active:

Context/status label:

```text
You're doing it.
```

Task title remains visible and unchanged.

Primary action:

```text
Done
```

Secondary action:

```text
Show another task
```

must remain visible but disabled.

Back remains available.

## Active Behavior

- Done completes the TaskSession using the existing domain transition
- the active task remains frozen
- task selection cannot change it
- Back may return to Home, but must not silently mutate or complete the session

Because persistence is not implemented, returning Home may discard local route state when the route unmounts. This is acceptable for the current task, but do not introduce hidden persistence.

Do not add cancellation behavior yet.

---

# Task Screen — Completed State

Completion stays on the same Task screen and keeps the same layout.

Status label:

```text
Nice.
```

Task title remains visible in the same task area.

Primary action:

```text
Another task
```

Behavior:

1. reset the completed session
2. select a new task through the existing selection path
3. return the Task screen to idle state
4. avoid immediate repetition

Do not show a secondary action.

Do not show:

- `Stay here`
- `That's enough for now.`
- repeated task summaries
- checkmark illustrations
- confetti
- statistics
- timestamps
- duration

The screen should feel like the same interface naturally changing state.

---

# Task Screen Layout

The visual hierarchy must be:

```text
Header
Status or category
Task
Primary action
Secondary action when applicable
```

The task must remain the strongest visual element.

Use a stable task region and stable action region.

Requirements:

- normal title-length changes must not move buttons significantly
- task remains readable with Dynamic Type
- accessibility text may cause scrolling
- no clipping
- no fixed height that breaks long text
- no dramatic layout jumps between idle, active, and completed

---

# Animation

Preserve the existing calm transition behavior when practical.

State changes should be understandable.

## Start

- subtle card response
- context/status fade
- primary action label transition
- optional light haptic where already implemented
- respect reduced motion

## Completion

- subtle content fade or small upward motion
- status changes to `Nice.`
- primary action changes to `Another task`
- completed task remains visible

Do not add dependencies.

Do not use:

- bounce
- pulse
- shake
- confetti
- looping animation
- large route transition effects

Navigation from Home to Task may use Expo Router's normal transition.

---

# Existing Hooks

Reuse and adapt:

```text
useHomeTask
useTaskSession
```

Rename or relocate only if truly necessary for clarity.

Do not duplicate:

- repository creation
- task selection
- recent-task behavior
- session creation
- session completion
- completion mapping

The Task route should coordinate existing hooks rather than reimplement their logic.

---

# State Ownership

Home should not own the active task session.

The Task route should own:

- current displayed task
- recent local task IDs
- active/completed session state
- frozen session task

Do not add:

- Zustand
- Context API
- AsyncStorage
- global mutable state

Local route state is sufficient.

---

# Completion Mapping

Preserve the existing:

```text
createTaskCompletion()
```

Do not persist the result yet.

Do not create History storage.

The mapper may remain validated and ready for the next task.

---

# Accessibility

Requirements:

- Home headline is read before the primary action
- Give me a task has button semantics
- Back has a clear accessibility label
- task title is read before task actions
- disabled actions expose disabled state
- completion may announce:

```text
Task completed.
```

- Dynamic Type remains enabled
- reduced-motion preferences remain respected
- controls meet minimum touch targets

Do not rely only on animation to communicate state.

Status labels must clearly communicate:

- idle task suggestion
- active task
- completed task

---

# Theme Behavior

Preserve:

- warm light theme
- warm charcoal dark theme
- current copper/apricot accent
- developer theme switcher under `__DEV__`

Both routes must work in light and dark themes.

Do not redesign theme tokens unless a genuine defect blocks the new flow.

---

# Architecture Constraints

Do not implement:

- timer
- countdown
- persistence
- AsyncStorage
- Zustand
- cancellation
- History screen
- Favorites screen
- category selection
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
- selection-engine priority
- curated task content
- repository contract
- shared UI public APIs

---

# Acceptance Criteria

The task is complete only when:

- Home no longer displays a task
- Home clearly invites the user to request a task
- Give me a task navigates to `/task`
- Task screen displays a real selected task
- Show another task changes the task before Start
- Start creates an active session
- active state clearly shows `You're doing it.`
- Done completes the session
- completed state clearly shows `Nice.`
- completed task remains visible
- Another task selects a new task and returns to idle task state
- no Stay here action exists
- Back returns to Home
- no timer exists
- layout remains stable
- light and dark themes work
- TypeScript passes
- lint passes
- Expo starts successfully

---

# Manual Verification

Verify:

1. App opens on invitation Home.
2. Home does not show a task.
3. Give me a task opens Task screen.
4. Task screen shows a curated task.
5. Show another task changes it.
6. Start enters active state.
7. Task remains visible.
8. Done enters completed state.
9. Status becomes Nice.
10. Another task shows a different task.
11. Back returns to Home.
12. Re-entering Task screen still works.
13. Light and dark themes work.
14. Large text remains usable.
15. No timer or duration appears.

---

# Validation

Run:

```powershell
npm run typecheck
npm run lint
```

Verify Expo startup:

```powershell
npx expo start --port 8082
```

Stop Expo afterward.

---

# Self Review

Check for:

- task selection duplicated across routes
- session logic inside Home
- direct access to seedTasks from route UI
- direct Math.random usage
- completed task disappearing
- button positions jumping
- confusing state labels
- unnecessary secondary actions
- broken Back behavior
- inaccessible controls
- timer concepts remaining
- unrelated changes
- new dependencies

Fix issues before reporting completion.

---

# Final Response Format

Return:

## Summary

## Files Created

## Files Modified

## Navigation Flow

Explain Home → Task and Back behavior.

## Task Screen States

Explain idle, active, and completed states.

## Existing Logic Reuse

Explain how task selection, session transitions, and completion mapping were reused.

## Manual Verification

State which checks were performed interactively.

## Validation Results

Report:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Work

Mention intentionally deferred:

- persistent History
- Favorites
- cancellation
- navigation tabs
- category filtering
- onboarding

Do not implement those items.

Do not continue to another task.