# Task 011 — Home Task Integration

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
- `tasks/008_local_task_repository.md`
- `tasks/009_curated_task_library.md`
- `tasks/010_task_selection_engine.md`

Inspect:

```text
app/index.tsx
src/features/tasks/
src/data/tasks/
```

The following already exist:

- Task domain model
- 120 curated local tasks
- LocalTaskRepository
- selectTask()
- Home Screen v1

Use those systems.

Do not duplicate selection logic or task data.

---

# Objective

Integrate the real local task library and selection engine into the Home screen.

Replace the fixed task text with a selected task from the curated library.

Make:

```text
Not this one
```

select and display a different eligible task.

This task covers in-memory Home behavior only.

Do not add persistence, Zustand, context selection, energy selection, completion behavior, or animations yet.

---

# Required Work

Update:

```text
app/index.tsx
```

You may create one small feature hook if needed:

```text
src/features/tasks/hooks/useHomeTask.ts
```

and:

```text
src/features/tasks/hooks/index.ts
```

Only create the hook if it genuinely improves readability and keeps selection logic out of the route.

Do not create a global store.

---

# Repository Setup

Use:

```ts
seedTasks
```

with:

```ts
LocalTaskRepository
```

The repository instance should not be recreated on every render.

Use a module-level constant or another simple stable approach.

Do not introduce dependency injection infrastructure.

Example direction:

```ts
const taskRepository = new LocalTaskRepository(seedTasks);
```

Do not expose repository implementation details to UI components unnecessarily.

---

# Initial Task Selection

When Home first renders:

- select one task from the repository
- use `selectTask()`
- provide no context
- provide no energy level
- use no hard exclusions
- use no persisted recent history

Expected match level:

```text
fallback
```

The Home screen must not display a fixed hardcoded task title.

If no task is available, show a calm fallback message rather than crashing.

Suggested fallback:

```text
No task is available right now.
```

Do not expose technical errors.

---

# Current Task State

Keep the current selected task in local React state.

Do not use:

- Zustand
- AsyncStorage
- Context API
- global mutable state

Use the smallest correct local-state solution.

---

# Recent Task Tracking

Track recently shown task IDs in local component or hook state.

Requirements:

- store at most the 5 most recently shown task IDs
- newest ID should be retained
- avoid immediate repetition
- pass recent IDs into `selectTask()`
- do not persist this list
- do not mutate the previous state array

When a new task is shown:

- add its ID
- remove older IDs beyond the 5-item limit
- avoid duplicate IDs in the recent list

Do not create a generic history utility.

---

# “Not This One” Behavior

When the user presses:

```text
Not this one
```

the app must:

1. use the current task ID as a recent ID
2. request a new task through `selectTask()`
3. update the displayed task
4. update the recent task list
5. avoid returning the same task when another task exists

Do not select directly from `seedTasks`.

Do not manually call `Math.random()` in the screen.

Use the selection engine.

---

# Current Task Display

Replace:

```text
Drink a glass of water.
```

with:

```ts
currentTask.title
```

Preserve the current Home layout and visual hierarchy.

Do not show:

- category
- type
- energy level
- context
- duration
- premium status
- match level

The user should still see one calm task only.

---

# Start Button

Keep:

```text
Start
```

visually unchanged.

For this task, pressing Start still does nothing.

Do not implement:

- completion
- timer
- session state
- navigation
- haptics
- animation

Use a stable no-op callback.

---

# Error and Empty Handling

If repository construction fails because bundled data is invalid:

- allow the developer error to surface during development
- do not silently hide invalid bundled data

If `selectTask()` returns no task:

- render the calm fallback message
- keep the screen usable
- disable `Not this one`
- keep Start disabled

Do not add an error screen.

---

# Button State

When no current task exists:

- disable Start
- disable Not this one

When a task exists:

- both remain enabled

Do not change button public APIs.

---

# Developer Theme Switcher

Preserve the existing developer-only theme switcher exactly.

Do not remove or redesign it.

---

# Accessibility

Ensure:

- the current task title is readable by screen readers
- `Not this one` updates the visible task
- disabled states remain exposed
- reading order remains logical
- dynamic text scaling remains enabled

Optional:

Use a polite accessibility announcement after task replacement if it can be implemented simply with React Native APIs and without adding dependencies.

Do not overcomplicate accessibility announcements.

---

# Architecture Constraints

Do not implement:

- context selection UI
- energy selection UI
- persistence
- Zustand stores
- AsyncStorage
- Favorites behavior
- History behavior
- Start behavior
- completion records
- task sessions
- animations
- haptics
- notifications
- navigation
- settings route
- premium filtering
- analytics
- backend

Do not modify:

- Task interface
- selection fallback order
- curated task content
- repository contract

Do not add dependencies.

---

# Acceptance Criteria

The task is complete only when:

- Home no longer uses a fixed task title
- the initial task comes from the repository
- selection uses `selectTask()`
- `Not this one` displays a new task
- immediate repetition is avoided
- at most 5 recent task IDs are tracked
- recent IDs are not persisted
- Start remains behaviorless
- no context or energy logic is added
- empty selection is handled safely
- current design remains intact
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

Verify Expo startup:

```powershell
npx expo start --port 8082
```

Manually verify:

1. Home shows a task from the curated library.
2. Pressing `Not this one` changes the task.
3. The same task does not immediately repeat.
4. Repeated presses continue producing valid tasks.
5. Start remains inactive.
6. Light and dark themes still work.

Stop Expo afterward.

---

# Self Review

Before finishing, inspect every changed file.

Check for:

- direct access to seedTasks from selection UI logic
- duplicated selection logic
- direct Math.random calls
- current task being repeated immediately
- recent list growing beyond 5
- mutation of state arrays
- repository being recreated on every render
- unnecessary hooks or abstractions
- visual regressions
- disabled-state bugs
- unrelated changes

Fix issues before writing the final report.

---

# Final Response Format

Return:

## Summary

## Files Created

## Files Modified

## Integration Flow

Explain:

- repository creation
- initial selection
- recent-task tracking
- Not this one behavior

## Manual Verification

Report:

- initial task display
- repeated task changes
- immediate-repeat prevention
- theme behavior

## Validation Results

Report:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Work

Mention intentionally deferred:

- context selection
- energy selection
- persistence
- Zustand
- Start behavior
- completion
- animations
- haptics

Do not implement those items.

Do not continue to another task.