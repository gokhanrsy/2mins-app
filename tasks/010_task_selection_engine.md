# Task 010 — Task Selection Engine

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

Inspect the existing implementation under:

```text
src/features/tasks/
src/data/tasks/
```

The following systems already exist:

- Task domain model
- runtime Task validation
- local task repository
- 120-task curated library

Use those existing systems.

Do not duplicate task types, constants, repository logic, or validation.

---

# Objective

Create a deterministic, testable Task Selection Engine.

The engine must select one suitable task based on:

- user context
- energy level
- excluded task IDs
- recently shown task IDs

It must avoid immediate repetition and use sensible fallback rules.

This task covers selection logic only.

Do not integrate the engine into the Home screen yet.

Do not add state management or persistence.

---

# Required Files

Create:

```text
src/features/tasks/selection/
├── types.ts
├── selectTask.ts
└── index.ts
```

Update:

```text
src/features/tasks/index.ts
```

to export the public selection API.

Do not create stores, hooks, screens, services, or repositories.

---

# Selection Input

Create in:

```text
src/features/tasks/selection/types.ts
```

```ts
import type {
  EnergyLevel,
  Task,
  UserContext,
} from "@/features/tasks/types";

export interface TaskSelectionInput {
  tasks: readonly Task[];
  context?: UserContext;
  energyLevel?: EnergyLevel;
  excludedTaskIds?: readonly string[];
  recentlyShownTaskIds?: readonly string[];
  random?: () => number;
}
```

---

# Selection Result

Define:

```ts
export interface TaskSelectionResult {
  task: Task | undefined;
  matchLevel:
    | "exact"
    | "context"
    | "energy"
    | "fallback"
    | "none";
}
```

Meaning:

- `exact`: matched both context and energy
- `context`: matched context only
- `energy`: matched energy only
- `fallback`: no personalization match, but a valid task was returned
- `none`: no usable task exists

Do not add scores or ranking metadata.

---

# Public Function

Create in:

```text
src/features/tasks/selection/selectTask.ts
```

```ts
export function selectTask(
  input: TaskSelectionInput,
): TaskSelectionResult;
```

---

# Core Rules

The selection engine must follow these rules in order.

## Rule 1 — Validate Source Availability

If `tasks` is empty:

```ts
{
  task: undefined,
  matchLevel: "none",
}
```

Do not throw.

---

## Rule 2 — Apply Hard Exclusions

Remove tasks whose IDs appear in:

```text
excludedTaskIds
```

These exclusions are strict.

Excluded tasks must not be returned unless no non-excluded task exists and the fallback rules explicitly allow recovery.

For this task, excluded IDs remain hard exclusions.

If every task is excluded, return:

```ts
{
  task: undefined,
  matchLevel: "none",
}
```

---

## Rule 3 — Avoid Recently Shown Tasks

Tasks in:

```text
recentlyShownTaskIds
```

should be avoided when another eligible task exists.

Recent-task exclusion is soft.

If every otherwise eligible task is recent, the engine may reuse a recent task rather than return nothing.

The engine must never prefer a recent task over an equivalent non-recent task.

---

# Match Priority

Use the following fallback sequence.

## Tier 1 — Exact Match

When both context and energy are provided:

Select tasks that contain:

- the selected context
- the selected energy level

Return:

```text
matchLevel: exact
```

---

## Tier 2 — Context Match

If no exact match exists and context is provided:

Select tasks containing the selected context.

Return:

```text
matchLevel: context
```

---

## Tier 3 — Energy Match

If no context match exists and energy is provided:

Select tasks containing the selected energy level.

Return:

```text
matchLevel: energy
```

---

## Tier 4 — General Fallback

If no personalized match exists:

Select from any non-excluded task.

Return:

```text
matchLevel: fallback
```

---

# Behavior When Only One Preference Exists

## Only Context Provided

Try:

1. context match
2. general fallback

Do not label a context-only match as `exact`.

Return:

```text
matchLevel: context
```

## Only Energy Provided

Try:

1. energy match
2. general fallback

Return:

```text
matchLevel: energy
```

## No Context or Energy Provided

Select from any valid non-excluded task.

Return:

```text
matchLevel: fallback
```

---

# Recent Task Handling

For every tier:

1. build the eligible candidate list
2. remove recently shown tasks
3. if non-recent candidates remain, select from them
4. otherwise select from the original eligible candidate list

This behavior must apply consistently to:

- exact matches
- context matches
- energy matches
- fallback matches

Do not permanently exclude recent tasks.

---

# Random Selection

The engine must not scatter direct `Math.random()` calls.

Use:

```ts
const random = input.random ?? Math.random;
```

Create one small internal helper for selecting a random item.

The provided random function must make behavior deterministic during future testing.

Requirements:

- clamp or safely handle unexpected random values
- avoid out-of-range indexes
- do not mutate the candidates array

Expected normal random range:

```text
0 <= value < 1
```

If the random function returns:

```text
1
```

or a value greater than 1, select the final valid candidate safely.

If it returns a negative value or `NaN`, fall back safely to the first candidate.

Keep this handling simple and readable.

---

# Collection Rules

The engine must:

- never mutate the original `tasks` array
- never mutate exclusion arrays
- preserve repository ordering before random selection
- use stable Task objects from the source collection
- avoid unnecessary array copying
- remain synchronous
- remain pure except for the injected random function

Do not use a class.

Do not create a selection service.

Use plain functions.

---

# Duplicate IDs

The repository already rejects duplicate Task IDs.

The selection engine may assume task IDs are unique.

Do not duplicate repository validation.

---

# Premium Tasks

Do not filter by:

```text
isPremium
```

in this task.

Premium access rules do not yet exist.

The engine should treat all supplied tasks as selectable.

Future callers may provide a pre-filtered task collection.

---

# Error Handling

Do not throw for normal selection conditions.

Return `none` when:

- the source task list is empty
- every task is hard-excluded

Do not log.

Do not show user-facing errors.

---

# Public Exports

Create:

```text
src/features/tasks/selection/index.ts
```

Export:

- `selectTask`
- `TaskSelectionInput`
- `TaskSelectionResult`

Use type-only exports where appropriate.

Update:

```text
src/features/tasks/index.ts
```

so consumers can write:

```ts
import {
  selectTask,
  type TaskSelectionInput,
  type TaskSelectionResult,
} from "@/features/tasks";
```

---

# Tests

Inspect whether a working test runner exists.

If no test runner exists:

- do not install one
- do not create unusable test files
- report tests as deferred
- verify behavior with a temporary local validation command if useful
- do not leave disposable scripts behind

If a working test runner exists, test:

1. empty tasks returns `none`
2. all tasks excluded returns `none`
3. exact context and energy match wins
4. context fallback works
5. energy fallback works
6. general fallback works
7. recently shown task is avoided
8. recent task may be reused when every eligible task is recent
9. hard exclusions are never returned
10. no input arrays are mutated
11. injected random function is deterministic
12. negative random value selects safely
13. `NaN` selects safely
14. random value of `1` selects the final candidate safely

Do not add a test dependency during this task.

---

# Architecture Constraints

Do not implement:

- Zustand stores
- AsyncStorage
- Home-screen integration
- task-change animations
- `Not this one` behavior
- Favorites
- History
- task completion
- sessions
- persistence
- remote data
- AI recommendations
- premium filtering
- analytics
- UI components
- navigation

Do not modify the Task interface.

Do not add dependencies.

---

# Code Quality

Requirements:

- strict TypeScript
- no `any`
- pure functions
- descriptive helper names
- no unnecessary abstractions
- no TODO comments
- no placeholder code
- no duplicated domain logic
- no mutation of input collections
- no direct dependency on seedTasks or LocalTaskRepository

The engine must work with any valid readonly Task collection.

---

# Acceptance Criteria

The task is complete only when:

- TaskSelectionInput exists
- TaskSelectionResult exists
- selectTask() exists
- exact-match selection works
- context fallback works
- energy fallback works
- general fallback works
- hard exclusions work
- recent-task avoidance works
- recent-task recovery works
- random selection is injectable
- invalid random values are handled safely
- no input arrays are mutated
- public exports work
- no state, persistence, or UI integration is added
- TypeScript passes
- lint passes
- Expo startup remains unaffected

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

Verify Expo startup using an available port:

```powershell
npx expo start --port 8082
```

Stop Expo afterward.

If no test runner exists, perform a temporary selection validation covering:

- exact match
- context fallback
- energy fallback
- recent-task avoidance
- all-excluded result

Remove any temporary validation files afterward.

Do not claim automated tests passed when no test runner exists.

---

# Self Review

Before finishing, inspect all changed files.

Check for:

- mutation of input arrays
- incorrect fallback ordering
- recent IDs acting as hard exclusions
- hard exclusions being ignored
- direct Math.random calls outside the defined fallback
- out-of-range random indexes
- unnecessary classes or services
- duplicated Task types
- seed-data coupling
- architecture violations
- unused exports
- unrelated changes

Fix discovered issues before writing the final report.

---

# Final Response Format

Return:

## Summary

## Files Created

## Files Modified

## Selection Rules

Summarize:

- exact matching
- fallback order
- exclusions
- recent-task behavior
- random injection

## Tests

State whether automated tests ran.

If no runner exists, describe the temporary validation performed.

## Validation Results

Report:

- temporary selection validation if applicable
- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Work

Mention intentionally deferred:

- persistent recent-task history
- Zustand integration
- Home-screen integration
- `Not this one`
- task transition animation
- context and energy UI
- premium filtering

Do not implement those items.

Do not continue to another task.