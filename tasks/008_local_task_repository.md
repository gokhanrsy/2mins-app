# Task 008 — Local Task Repository

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

Inspect the current implementation under:

```text
src/features/tasks/
src/data/tasks/
```

The Task domain model already exists.

Use the existing exported `Task` type and runtime validation helpers.

Do not duplicate domain types or validation logic.

---

# Objective

Create a small local task repository that provides validated built-in tasks to the application.

This repository will become the boundary between task consumers and the underlying task source.

For the MVP, tasks are bundled locally with the application.

Do not implement remote data, persistence, state management, random selection, or UI integration.

---

# Required Structure

Create:

```text
src/features/tasks/repositories/
├── TaskRepository.ts
├── LocalTaskRepository.ts
└── index.ts
```

Create:

```text
src/data/tasks/
├── seedTasks.ts
└── index.ts
```

The seed data in this task should contain only a small representative sample.

The full curated task library belongs to the next task.

---

# Repository Contract

Create:

```text
src/features/tasks/repositories/TaskRepository.ts
```

Define:

```ts
import type { Task } from "@/features/tasks";

export interface TaskRepository {
  getAll(): readonly Task[];
  getById(id: string): Task | undefined;
}
```

Requirements:

- keep the interface synchronous
- return readonly task collections
- do not return Promises
- do not expose mutable internal arrays
- do not add filtering or random-selection methods
- do not add create, update, or delete methods

The built-in MVP task source is static and bundled locally, so asynchronous APIs are unnecessary.

---

# Local Repository

Create:

```text
src/features/tasks/repositories/LocalTaskRepository.ts
```

Implement:

```ts
export class LocalTaskRepository implements TaskRepository
```

Constructor:

```ts
constructor(tasks: readonly Task[])
```

Required behavior:

## Initialization

When constructed:

- validate every task using the existing `isTask()` helper
- reject invalid task data immediately
- reject duplicate task IDs
- create an internal immutable copy
- create an internal ID lookup structure

Invalid bundled task data is a developer error.

The constructor may throw a descriptive error when:

- a task is invalid
- an ID is duplicated

Do not silently discard invalid tasks.

Do not expose raw validation internals to application users.

## `getAll()`

Must:

- return the validated task collection
- preserve source ordering
- prevent callers from mutating repository state

Do not sort the tasks automatically.

## `getById(id)`

Must:

- return the matching Task
- return `undefined` when no match exists
- not throw for an unknown ID

---

# Error Messages

Errors should be useful during development.

Example directions:

```text
Invalid task at index 3.
```

```text
Duplicate task id: drink-glass-of-water
```

Do not include entire task objects in error messages.

Do not create a custom error-class hierarchy.

---

# Seed Data

Create:

```text
src/data/tasks/seedTasks.ts
```

Export:

```ts
export const seedTasks: readonly Task[]
```

Include exactly 12 valid sample tasks.

These tasks are temporary representative seed data for repository development.

They must cover:

## Categories

Use a reasonable spread across:

- mind
- body
- home
- digital
- social
- productivity
- selfCare

## Task Types

Include examples of:

- do
- think
- reset

## Energy Levels

Include tasks appropriate for:

- low
- medium
- high

Some tasks may support multiple energy levels.

## Contexts

Include examples for:

- home
- work
- outside
- resting

Some tasks may support multiple contexts.

---

# Seed Task Quality

Every task must:

- be safe
- be realistic
- be concise
- be understandable without extra explanation
- take between 10 and 120 seconds
- use sentence case
- end with appropriate punctuation
- have a stable kebab-case ID
- use `isPremium: false`

Good examples:

```text
Drink a glass of water.
```

```text
Relax your shoulders.
```

```text
Delete five unnecessary photos.
```

```text
Write down the next tiny step.
```

Avoid:

- medical claims
- dangerous physical actions
- vague motivational quotes
- tasks requiring unavailable permissions
- tasks that realistically take longer than two minutes
- duplicates with slightly different wording
- guilt-based language

Do not create the full production task library in this task.

---

# Seed Data Export

Create:

```text
src/data/tasks/index.ts
```

Export:

```ts
seedTasks
```

---

# Repository Export

Create:

```text
src/features/tasks/repositories/index.ts
```

Export:

- `TaskRepository`
- `LocalTaskRepository`

Use type-only exports where appropriate.

Update:

```text
src/features/tasks/index.ts
```

so repository consumers may import the public repository types and implementation from:

```ts
import {
  LocalTaskRepository,
  type TaskRepository,
} from "@/features/tasks";
```

Do not create a global singleton repository in this task.

Do not instantiate the repository in a route or screen.

---

# Tests

Inspect whether a working test runner now exists.

If no test runner exists:

- do not install one
- do not create unusable test files
- report that tests remain deferred

If a test runner exists, add tests for:

- valid repository construction
- `getAll()` preserves ordering
- `getById()` returns a matching task
- `getById()` returns undefined for unknown IDs
- invalid task throws
- duplicate ID throws
- returned collection cannot mutate repository state

Do not add a test dependency during this task.

---

# Architecture Constraints

Do not implement:

- task selection
- randomization
- recent-task tracking
- filtering
- context recommendation
- energy recommendation
- Zustand stores
- AsyncStorage
- Home-screen integration
- Favorites
- History persistence
- task completion
- remote repository
- Supabase
- AI task generation
- analytics

Do not add dependency injection infrastructure.

Do not create generic base repositories.

Do not create speculative asynchronous APIs.

---

# Code Quality

Requirements:

- strict TypeScript
- no `any`
- no duplicate Task definitions
- no duplicate runtime validation
- no mutable repository state exposure
- no unnecessary abstractions
- no TODO comments
- no placeholder implementation
- no new dependencies
- clear and concise naming

Prefer a simple `Map<string, Task>` for ID lookup when appropriate.

---

# Acceptance Criteria

The task is complete only when:

- the repository interface exists
- the local repository implementation exists
- all constructor input is validated
- duplicate IDs are rejected
- `getAll()` returns readonly validated tasks
- `getById()` behaves correctly
- exactly 12 valid seed tasks exist
- seed tasks cover the approved domain values
- repository exports work
- no selection or UI behavior is implemented
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

Verify startup using an available port:

```powershell
npx expo start --port 8082
```

Stop Expo after verification.

Run repository tests only if a working test runner already exists.

Do not claim tests passed when no runner exists.

---

# Self Review

Before finishing, inspect every changed file.

Check for:

- mutable task arrays leaking from the repository
- duplicate validation logic
- duplicate task IDs
- invalid seed-task durations
- incomplete category, type, energy, or context coverage
- unsafe seed-task instructions
- unnecessary async code
- speculative methods
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

## Repository API

Summarize the final public repository contract.

## Seed Data

Summarize category, type, energy, and context coverage.

## Tests

State whether tests ran.

## Validation Results

Report:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Work

Mention intentionally deferred items:

- full curated task library
- task-selection engine
- recent-task exclusion
- context and energy filtering
- persistence
- Home-screen integration

Do not implement those items.

Do not continue to another task.