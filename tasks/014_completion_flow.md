# Task 014 — Calm Completion Flow

Status: Active  
Sprint: Sprint 04 — Active Session Experience

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
- `tasks/007_task_domain_model.md`
- `tasks/011_home_task_integration.md`
- `tasks/012_session_domain.md`
- `tasks/013_start_button_integration.md`

Inspect:

```text
app/index.tsx
src/features/tasks/
src/features/sessions/
src/features/history/
```

The application already has:

- real curated tasks
- task selection
- local active TaskSession state
- Start-button integration
- pure session completion transition
- TaskCompletion domain type

The product decision is final:

```text
2 Mins does not use a countdown timer in the core experience.
```

“2 Mins” describes the size of the suggested tasks, not a time limit imposed on the user.

Do not add timer logic.

---

# Objective

Implement a calm manual completion flow.

When the user starts a task:

- the task remains visible
- the user completes it at their own pace
- the primary action becomes `Done`
- pressing `Done` completes the active TaskSession
- Home briefly enters a calm completed state
- the user may then request another task

This task uses local in-memory state only.

Do not add persistence or a History screen yet.

---

# Product Principles

The experience must not pressure the user.

Do not use:

- countdowns
- elapsed-time displays
- urgency
- streaks
- XP
- scores
- confetti
- exaggerated celebration
- guilt-based copy

The completion state should quietly acknowledge the action.

Preferred feeling:

```text
You did one small thing. That is enough.
```

---

# Required Work

Update:

```text
src/features/sessions/hooks/useTaskSession.ts
src/features/sessions/hooks/index.ts
app/index.tsx
```

Create only if it keeps mapping logic clean:

```text
src/features/history/createTaskCompletion.ts
```

Update:

```text
src/features/history/index.ts
```

Do not create stores, repositories, routes, or persistence.

---

# Session Hook API

Extend the existing session hook minimally.

Expected public result:

```ts
interface UseTaskSessionResult {
  session: TaskSession | undefined;
  startSession: (task: Task) => void;
  completeSession: () => TaskSession | undefined;
  resetSession: () => void;
  isActive: boolean;
  isCompleted: boolean;
}
```

Requirements:

- preserve existing Start behavior
- do not expose the React state setter
- do not add cancellation yet
- do not add timer fields
- do not add persistence
- keep the API focused

If an equivalent minimal API fits the existing implementation better, preserve the same capabilities without unnecessary abstraction.

---

# Complete Session Behavior

Use the existing domain transition:

```ts
completeTaskSession()
```

Do not construct a completed TaskSession manually.

When `completeSession()` is called:

1. confirm an active session exists
2. create `completedAt` using:

```ts
new Date().toISOString()
```

3. call `completeTaskSession()`
4. store the returned completed session
5. return the completed session

If no active session exists:

- return `undefined`
- do nothing safely

Repeated completion attempts must not create multiple completions.

Do not allow a completed session to be completed again.

---

# Reset Session Behavior

`resetSession()` should:

- clear the current completed session
- return Home to its normal task-suggestion state
- not automatically replace the task itself

Do not clear an active session through this function during normal UI use.

The completed state will call it after the user chooses another action.

---

# Task Completion Mapping

Create a pure helper only if useful:

```ts
export function createTaskCompletion(
  session: TaskSession,
): TaskCompletion;
```

Rules:

- accept only a completed TaskSession
- throw a descriptive developer error for an active or cancelled session
- create a new completion ID
- preserve `taskId`
- use `session.completedAt`
- copy optional context
- copy optional energyLevel
- do not copy the full Task object

A suitable completion ID direction:

```text
completion-${session.id}
```

Do not generate a second timestamp.

Do not add the completion to persistent History yet.

If this mapping is not needed by the current UI, it may still be implemented and validated because it is the approved boundary between completed sessions and future History records.

Do not create a History repository or store.

---

# Home States

Home must support exactly three visual states:

```text
idle
active
completed
```

These are UI-derived states.

Do not add an `idle` status to the TaskSession domain.

---

# Idle State

When no session exists, preserve the current Home behavior:

Context label:

```text
For right now.
```

Primary action:

```text
Start
```

Secondary action:

```text
Not this one
```

Behavior:

- Start begins a session
- Not this one selects another task

Do not redesign the idle Home screen.

---

# Active State

When the session status is `active`:

Context label:

```text
You started.
```

Task card:

- keep showing the active task
- never hide or replace it

Primary action:

```text
Done
```

The `Done` button must be enabled.

Secondary action:

```text
Not this one
```

It remains visible but disabled.

Do not display:

- time
- timer
- duration
- progress
- session ID
- timestamps
- metadata

The user decides when the task is done.

---

# Completed State

When the session status is `completed`, show a calm completion state.

## Context Label

Use:

```text
One small thing done.
```

## Main Card

Replace the task instruction with:

```text
That's enough for now.
```

You may show the completed task title quietly below the message if it improves clarity.

The completion message must remain the primary content.

Do not show:

- confetti
- checkmark animation
- XP
- streak
- completion duration
- statistics
- timestamps

## Primary Action

Label:

```text
Another task
```

Behavior:

1. reset the completed session
2. request a new task through the existing Home task-selection integration
3. display the new task in idle state

Do not select directly from `seedTasks`.

Use the existing task hook and selection engine.

## Secondary Action

Label:

```text
Stay here
```

Behavior:

- remain on the completed state
- harmless no-op is acceptable in this task

If this action adds no real value or feels confusing, it may be omitted, but the layout must remain intentional.

Do not add navigation.

---

# New Task After Completion

When `Another task` is pressed:

- remember the completed task as recently shown
- request another task through the existing selection path
- avoid immediate repetition
- clear the completed session
- return to idle Home
- display the new task

Extend the Home task hook minimally if required.

Do not duplicate the selection engine.

Do not call `Math.random()` from the route.

---

# Task Freezing

While session status is:

```text
active
```

or:

```text
completed
```

the displayed task must remain the task associated with that session.

Do not allow background task-selection state to visually replace it.

Use the current active-task freezing approach.

When `Another task` is selected, release the frozen task and show the newly selected task.

---

# Completion Accessibility

When completion succeeds, announce politely:

```text
Task completed.
```

Use:

```ts
AccessibilityInfo.announceForAccessibility()
```

only through existing React Native APIs.

Do not announce exaggerated praise.

Reading order in completed state:

1. completion context
2. completion message
3. completed task title, if displayed
4. actions

Preserve Dynamic Type.

Preserve disabled-state semantics.

---

# Visual Behavior

Preserve:

- current warm light theme
- current warm charcoal dark theme
- current header
- developer theme switcher
- Settings button
- bottom navigation placeholders
- stable task region
- stable action region

The active and completed states must not cause large layout jumps.

Use existing components and theme tokens.

Do not modify public shared-component APIs.

Do not introduce a new visual system.

---

# Optional Motion

No motion is required in this task.

If an existing simple opacity transition is already available without new dependencies, it may be used sparingly.

Do not add:

- Reanimated dependency
- bouncing
- pulsing
- confetti
- large movement
- looping animation

A static polished experience is preferable to unnecessary animation.

---

# Error Handling

If completion is requested without an active session:

- do nothing safely

If a domain transition fails because of invalid developer state:

- allow the error to surface during development
- do not show raw technical text to users

If a new task cannot be selected after completion:

- clear the session
- display the existing calm no-task fallback
- disable unavailable actions

Do not crash the app for normal empty conditions.

---

# Architecture Constraints

Do not implement:

- timer
- countdown
- elapsed-time tracking
- cancellation
- pause or resume
- persistence
- AsyncStorage
- Zustand
- History repository
- History screen
- Favorites
- navigation
- notifications
- haptics
- sound
- analytics
- backend
- custom fonts
- new dependencies

Do not modify:

- Task interface
- TaskSession interface
- TaskCompletion interface
- task-selection fallback rules
- curated task content
- repository contract
- shared-component public APIs

---

# Tests

Inspect whether a working test runner exists.

If none exists:

- do not install one
- perform temporary validation
- remove disposable validation files
- report automated tests as deferred

Validate:

1. active session completes correctly
2. completedAt is canonical ISO
3. original active session is not mutated
4. repeated completion is blocked
5. completion mapping preserves taskId
6. completion mapping preserves optional context and energy
7. active sessions cannot map to TaskCompletion
8. completed session resets correctly through the hook behavior

---

# Acceptance Criteria

The task is complete only when:

- active Home shows an enabled `Done` button
- Done uses `completeTaskSession()`
- the completed session is stored locally
- completed Home shows calm acknowledgment
- the task remains identifiable
- Another task returns to idle with a new task
- immediate task repetition is avoided
- repeated Done presses cannot create multiple completions
- no timer exists
- no duration is displayed
- no persistence or History UI is added
- light and dark themes work
- layout remains stable
- TypeScript passes
- lint passes
- Expo starts successfully

---

# Manual Verification

Verify:

1. Home initially shows a task.
2. Not this one changes it.
3. Start changes Home to active state.
4. The active task remains visible.
5. Done is enabled.
6. Not this one is disabled while active.
7. Done changes the session to completed.
8. Calm completion copy appears.
9. Repeated Done cannot create another completion.
10. Another task returns to idle state.
11. A different task appears.
12. Light and dark themes still work.
13. Reload resets all local session state.
14. No timer or duration appears anywhere.

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

Before finishing, inspect all changed files.

Check for:

- timer concepts accidentally remaining
- manually constructed completed sessions
- duplicate completion creation
- mutation of the original session
- completed task changing unexpectedly
- direct selection from seedTasks
- direct Math.random usage
- completion copy becoming exaggerated
- layout jumps
- public component API changes
- persistence added too early
- unrelated changes
- new dependencies

Fix discovered issues before reporting completion.

---

# Final Response Format

Return:

## Summary

## Files Created

## Files Modified

## Completion Flow

Explain:

- active Done behavior
- session transition
- completed state
- Another task behavior
- task freezing

## TaskCompletion Mapping

Explain whether the helper was created and how it behaves.

## Tests

State whether automated tests ran.

Describe temporary validation when applicable.

## Manual Verification

State which checks were performed interactively and which were code-path reviewed only.

## Validation Results

Report:

- temporary completion validation
- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Work

Mention intentionally deferred:

- persistent History
- History screen
- cancellation
- haptics
- micro-animation
- Favorites
- navigation

Do not implement those items.

Do not continue to another task.