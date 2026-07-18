# Task 013 — Start Button Integration

Status: Active  
Sprint: Sprint 03 — Core Experience

---

# Context

You are working on the 2 Mins Expo React Native application.

Before making changes, read:

- `.codex/AGENTS.md`
- `docs/PRODUCT.md`
- `docs/PRD.md`
- `docs/BRAND.md`
- `docs/NORTH_STAR.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `tasks/007_task_domain_model.md`
- `tasks/010_task_selection_engine.md`
- `tasks/011_home_task_integration.md`
- `tasks/012_session_domain.md`

Inspect the current implementation under:

```text
app/index.tsx
src/features/tasks/
src/features/sessions/
```

The application already has:

- curated tasks
- local task repository
- task selection engine
- Home task integration
- pure TaskSession domain and transitions

Use those systems.

Do not duplicate session or task logic.

---

# Objective

Connect the Home screen’s `Start` button to the existing Session domain.

When the user presses Start:

1. create an active `TaskSession`
2. associate it with the currently displayed task
3. keep the active session in local React state
4. change Home into a calm active-session state
5. prevent the task from being replaced while the session is active

This task covers local in-memory Start behavior only.

Do not add a timer, completion, cancellation, persistence, history, navigation, animations, or haptics.

---

# Required Work

Update:

```text
app/index.tsx
```

Create if useful:

```text
src/features/sessions/hooks/
├── useTaskSession.ts
└── index.ts
```

Prefer a small session hook so route-level UI stays readable.

Do not create a global store.

Do not use Zustand.

---

# Session Hook

If created, the hook should expose a minimal API:

```ts
interface UseTaskSessionResult {
  session: TaskSession | undefined;
  startSession: (task: Task) => void;
  isActive: boolean;
}
```

Do not expose setters directly.

Do not add completion or cancellation actions yet.

---

# Session Creation

Use the existing:

```ts
createTaskSession()
```

Do not construct TaskSession objects manually.

When Start is pressed, supply:

```ts
{
  id,
  taskId,
  startedAt,
}
```

No context or energy snapshot is required yet because context and energy selection are not implemented.

---

# Session ID Creation

Create the ID outside the domain transition.

The ID must:

- be unique for the current local application session
- not equal the Task ID
- be a non-empty string
- require no new dependency

Use a small local helper.

A suitable direction is:

```ts
session-${Date.now()}-${counter}
```

Use a module-level incrementing counter so two starts in the same millisecond cannot produce the same ID.

Do not use array indexes.

Do not add UUID dependencies.

---

# Timestamp Creation

Create the timestamp at the integration boundary:

```ts
new Date().toISOString()
```

Do not move timestamp generation into the Session domain.

---

# Start Behavior

When no active session exists:

- Start is enabled
- pressing Start creates an active session for `currentTask`
- the active session’s `taskId` must equal `currentTask.id`

When an active session already exists:

- do not create another session
- repeated presses must have no effect
- Start must be disabled

If no current task exists:

- Start remains disabled
- no session is created

---

# Active Session Home State

Keep the same overall Home design.

When a session becomes active:

## Context Label

Replace:

```text
For right now.
```

with:

```text
You started.
```

Keep the styling calm and visually quiet.

Do not show exaggerated congratulations.

## Task Card

Continue showing the task belonging to the active session.

The displayed task must not change after Start is pressed.

Do not show:

- session ID
- timestamps
- task metadata
- timer
- progress
- status text inside the card

## Primary Button

Change the label from:

```text
Start
```

to:

```text
In progress
```

Disable the button.

Do not change the PrimaryButton public API.

## Secondary Action

Disable:

```text
Not this one
```

while a session is active.

It may remain visible, but it must clearly appear unavailable through the existing disabled state.

Do not hide it if hiding causes layout movement.

## Bottom Navigation

Keep Favorites and History placeholders unchanged.

## Settings and Theme Switcher

Keep them unchanged.

---

# Task Replacement Protection

While a session is active:

- `Not this one` must not select another task
- the active task must remain displayed
- recent-task tracking must not change
- task selection must not rerun because of session state

Do not modify the Task Selection Engine.

Implement this protection at the Home integration boundary.

---

# Local State Only

The session must reset when:

- the application reloads
- the component unmounts
- Expo refreshes

This is expected.

Do not persist the session.

Do not use AsyncStorage.

---

# Accessibility

When Start creates a session:

- preserve logical screen-reader order
- expose the PrimaryButton disabled state
- expose the GhostButton disabled state
- keep the task readable
- optionally announce:

```text
Task started.
```

Use React Native `AccessibilityInfo.announceForAccessibility()` only if it can be added simply.

Do not add dependencies.

Do not announce technical session information.

---

# Error Handling

Normal user actions must not throw.

If Start is called without a task:

- do nothing safely

If a session already exists:

- do nothing safely

Domain errors caused by invalid developer input may surface during development.

Do not display raw errors to users.

Do not add an error screen.

---

# Architecture Constraints

Do not implement:

- timer
- countdown
- completion
- cancellation UI
- history records
- persistence
- AsyncStorage
- Zustand
- session repository
- context selection
- energy selection
- animations
- haptics
- navigation
- notifications
- analytics
- backend

Do not modify:

- Task interface
- TaskSession interface
- session transitions
- task-selection fallback rules
- curated task content
- shared component public APIs

Do not add dependencies.

---

# Acceptance Criteria

The task is complete only when:

- Start creates a TaskSession
- the session references the displayed task ID
- the session is stored in local React state
- repeated Start presses cannot create multiple sessions
- Home shows `You started.` while active
- Start changes to `In progress`
- Start is disabled while active
- Not this one is disabled while active
- the displayed task cannot change while active
- no timer or completion behavior is added
- light and dark themes still work
- TypeScript passes
- lint passes
- Expo starts successfully

---

# Manual Verification

Verify:

1. Home initially displays a task.
2. `Not this one` changes the task before Start.
3. Pressing Start creates an active session.
4. The context label becomes `You started.`
5. Start becomes `In progress` and disabled.
6. Not this one becomes disabled.
7. Repeated Start presses do nothing.
8. The task remains unchanged while active.
9. Reloading the application resets the session.
10. Light and dark themes still render correctly.

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

Verify Expo startup:

```powershell
npx expo start --port 8082
```

Stop Expo afterward.

---

# Self Review

Before finishing, inspect every changed file.

Check for:

- manually constructed TaskSession objects
- timestamp generation inside the domain
- duplicate session creation
- task replacement while active
- session IDs matching task IDs
- session state leaking globally
- unnecessary abstractions
- visual layout movement
- disabled-state accessibility problems
- unrelated changes
- new dependencies

Fix discovered issues before writing the final report.

---

# Final Response Format

Return:

## Summary

## Files Created

## Files Modified

## Session Integration Flow

Explain:

- session ID creation
- timestamp creation
- TaskSession creation
- active-session state
- duplicate-start prevention

## Home Behavior

Explain:

- context-label change
- Start state
- Not this one state
- task replacement protection

## Manual Verification

Report all required manual checks.

## Validation Results

Report:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Work

Mention intentionally deferred:

- timer
- completion
- cancellation
- history
- persistence
- context and energy snapshots
- animations
- haptics

Do not implement those items.

Do not continue to another task.