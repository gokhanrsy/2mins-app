# Task 007 — Task Domain Model

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
- `tasks/002_theme_foundation.md`
- `tasks/003_ui_components.md`
- `tasks/005_home_screen_v1.md`
- `tasks/006_home_screen_polish.md`

Inspect the existing repository before implementation.

This task defines the application’s core domain language.

Do not implement UI behavior, storage, task selection, or navigation.

---

# Objective

Create the production-ready TypeScript domain model for 2 Mins tasks and task completions.

The model must support the current offline MVP while remaining suitable for future:

- context-aware recommendations
- energy-based filtering
- favorites
- completion history
- task packs
- localization
- remote task sources
- carefully constrained AI personalization

Do not add speculative complexity that is not justified by these known product requirements.

---

# Required Files

Create:

```text
src/features/tasks/
├── types.ts
├── constants.ts
├── validation.ts
└── index.ts
```

Create:

```text
src/features/history/
├── types.ts
└── index.ts
```

Do not create stores, repositories, hooks, screens, or services.

---

# Domain Language

Use the product term:

```text
Task
```

Do not rename it to:

- Action
- Activity
- Habit
- Challenge
- Mission

The application is built around one suggested Task at a time.

---

# Task Categories

Define exactly these categories:

```ts
export const TASK_CATEGORIES = [
  "mind",
  "body",
  "home",
  "digital",
  "social",
  "productivity",
  "selfCare",
] as const;
```

Derive the TypeScript type from the constant.

Expected type:

```ts
export type TaskCategory = (typeof TASK_CATEGORIES)[number];
```

Do not duplicate the union manually.

---

# Task Types

Define exactly:

```ts
export const TASK_TYPES = [
  "do",
  "think",
  "reset",
] as const;
```

Expected meanings:

- `do`: perform one small concrete action
- `think`: pause, notice, reflect, or decide
- `reset`: reduce friction or gently reset the current moment

Derive the type from the constant.

---

# Energy Levels

Define exactly:

```ts
export const ENERGY_LEVELS = [
  "low",
  "medium",
  "high",
] as const;
```

Energy describes the effort appropriate for the user’s current state.

It is not a difficulty score.

Derive the type from the constant.

---

# User Contexts

Define exactly:

```ts
export const USER_CONTEXTS = [
  "home",
  "work",
  "outside",
  "resting",
] as const;
```

Derive the type from the constant.

Do not add location permission concepts.

These values are manually selected product contexts, not physical GPS locations.

---

# Task Interface

Create a `Task` interface with exactly the following required fields:

```ts
export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  type: TaskType;
  energyLevels: readonly EnergyLevel[];
  contexts: readonly UserContext[];
  estimatedSeconds: number;
  isPremium: boolean;
}
```

---

# Task Field Rules

## `id`

Must be:

- stable
- unique
- human-readable where practical
- independent from array position
- safe for local persistence and future remote sync

Example:

```text
drink-glass-of-water
```

Do not use numeric array indexes as IDs.

## `title`

Contains the user-facing task instruction.

Example:

```text
Drink a glass of water.
```

Rules:

- concise
- sentence case
- actionable or reflective
- no HTML
- no Markdown
- no unsafe instructions

Localization is not implemented in this task.

Do not add translation fields yet.

## `category`

One primary category only.

Do not allow category arrays in MVP.

## `type`

One of:

- do
- think
- reset

## `energyLevels`

A task may be appropriate for one or more energy levels.

The array must not be empty.

## `contexts`

A task may be appropriate for one or more user contexts.

The array must not be empty.

## `estimatedSeconds`

Estimated time required to begin or complete the task.

Rules:

- positive integer
- maximum 120 seconds
- minimum 10 seconds

Do not hardcode all tasks to exactly 120 seconds.

The product promise is “less than or around two minutes,” not a visible timer requirement.

## `isPremium`

Must exist now so future task packs can be introduced without changing persisted task shapes.

All initial MVP tasks will use:

```ts
false
```

Do not implement monetization behavior.

---

# Do Not Add to Task

Do not add:

- difficulty
- XP
- score
- streak value
- reward
- timer state
- completion state
- favorite state
- createdAt
- updatedAt
- AI prompt
- database identifiers
- image
- illustration
- icon
- color
- notification schedule
- repeat policy
- user notes

These belong elsewhere or are not approved product requirements.

---

# Task Completion Model

Create the history type in:

```text
src/features/history/types.ts
```

Define:

```ts
export interface TaskCompletion {
  id: string;
  taskId: string;
  completedAt: string;
  context?: UserContext;
  energyLevel?: EnergyLevel;
}
```

---

# Completion Field Rules

## `id`

Unique identifier for the completion record.

It must not equal the task ID because the same task may be completed multiple times.

## `taskId`

References the stable `Task.id`.

Do not copy the full Task object into the completion model.

## `completedAt`

ISO 8601 datetime string.

Example:

```text
2026-07-18T18:30:00.000Z
```

Use a string rather than a `Date` object because completion records will later be persisted.

## `context`

Optional snapshot of the selected context at completion time.

## `energyLevel`

Optional snapshot of the selected energy level at completion time.

---

# Validation Functions

Create lightweight runtime validation helpers in:

```text
src/features/tasks/validation.ts
```

Required functions:

```ts
export function isTaskCategory(value: unknown): value is TaskCategory;
export function isTaskType(value: unknown): value is TaskType;
export function isEnergyLevel(value: unknown): value is EnergyLevel;
export function isUserContext(value: unknown): value is UserContext;
export function isTask(value: unknown): value is Task;
```

---

# Validation Rules

`isTask()` must verify:

- input is a non-null object
- `id` is a non-empty string
- `title` is a non-empty string
- category is valid
- type is valid
- energyLevels is a non-empty array
- every energy level is valid
- contexts is a non-empty array
- every context is valid
- estimatedSeconds is an integer
- estimatedSeconds is between 10 and 120 inclusive
- isPremium is boolean

Do not add a schema-validation dependency.

Use plain TypeScript.

Keep the implementation readable.

Do not throw errors from type guards.

Return `false` for invalid data.

---

# Constants

Place domain constants in:

```text
src/features/tasks/constants.ts
```

Export:

- `TASK_CATEGORIES`
- `TASK_TYPES`
- `ENERGY_LEVELS`
- `USER_CONTEXTS`
- `MIN_TASK_SECONDS`
- `MAX_TASK_SECONDS`

Use:

```ts
export const MIN_TASK_SECONDS = 10;
export const MAX_TASK_SECONDS = 120;
```

Validation must use these constants.

Do not duplicate numeric boundaries.

---

# Public Exports

Create:

```text
src/features/tasks/index.ts
```

Export:

- Task
- TaskCategory
- TaskType
- EnergyLevel
- UserContext
- all domain constants
- all validation helpers

Create:

```text
src/features/history/index.ts
```

Export:

- TaskCompletion

Use type-only exports where appropriate.

---

# Tests

Create:

```text
tests/task-domain.test.ts
```

Use the project’s existing test setup if one exists.

If no test runner is configured:

- do not install one in this task
- do not create a fake test script
- create no unusable test file
- report that tests are deferred until the testing foundation task

If a working test runner already exists, test:

- valid Task passes
- empty ID fails
- empty title fails
- invalid category fails
- empty energyLevels fails
- invalid energy level fails
- empty contexts fails
- invalid context fails
- estimatedSeconds below 10 fails
- estimatedSeconds above 120 fails
- non-integer estimatedSeconds fails
- non-boolean isPremium fails

Do not modify architecture merely to add tests.

---

# Architecture Constraints

Do not implement:

- task data
- JSON task repository
- task selection
- randomization
- Zustand store
- AsyncStorage
- Home screen integration
- Favorites
- History persistence
- completion creation functions
- navigation
- UI components
- timers
- notifications
- backend
- AI
- analytics

This task defines types, constants, and validation only.

---

# Code Quality

Requirements:

- strict TypeScript
- no `any`
- no duplicated unions
- no unsafe type assertions unless unavoidable
- small focused files
- clear naming
- no placeholder implementation
- no TODO comments
- no speculative abstractions
- no new dependency

Prefer simple helper functions over generic validation frameworks.

---

# Acceptance Criteria

The task is complete only when:

- all task-domain constants exist
- all types are derived correctly
- `Task` matches the approved shape
- `TaskCompletion` matches the approved shape
- runtime validation exists
- invalid task objects safely return false
- no product behavior is added
- public barrel exports work
- TypeScript passes
- lint passes
- existing app startup remains unaffected

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

Stop Expo after verification.

If a test runner already exists, run the relevant tests.

Do not claim tests passed if no test runner exists.

---

# Self Review

Before finishing, inspect all changed files.

Check for:

- duplicated domain values
- manually duplicated union types
- missing readonly array usage
- weak validation
- unsafe casting
- unnecessary fields
- architecture violations
- accidental product logic
- new dependencies
- unused exports
- unclear naming

Fix discovered issues before writing the final report.

---

# Final Response Format

Return:

## Summary

## Files Created

## Files Modified

## Domain Model

Summarize the final Task and TaskCompletion shapes.

## Validation

Describe the runtime validation behavior.

## Tests

State whether tests ran.

If no test runner exists, say so clearly.

## Validation Results

Report:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Work

Mention intentionally deferred work:

- curated task data
- task repository
- task selection engine
- persistence
- completion creation
- test-runner setup if missing

Do not implement those items.

Do not continue to another task.