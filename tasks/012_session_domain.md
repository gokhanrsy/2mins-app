# Task 012 — Session Domain

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
- `tasks/011_home_task_integration.md`

Inspect the existing implementation under:

```text
src/features/tasks/
src/features/history/
```

The application already has:

- Task domain model
- TaskCompletion domain model
- Local task repository
- Task selection engine
- Home integration

This task defines the session domain only.

Do not implement UI behavior, timers, persistence, navigation, or state management.

---

# Objective

Create the production-ready domain model and pure transition helpers for a task session.

A session represents one user engaging with one selected task.

The domain must support:

- starting a task
- later completing it
- later cancelling it
- future timer integration
- future completion history creation

Keep the model minimal.

Do not add speculative analytics, rewards, or complex workflow state.

---

# Required Structure

Create:

```text
src/features/sessions/
├── constants.ts
├── types.ts
├── transitions.ts
├── validation.ts
└── index.ts
```

Do not create:

- stores
- hooks
- screens
- repositories
- services
- persistence
- timers

---

# Session Statuses

Create in:

```text
src/features/sessions/constants.ts
```

Define exactly:

```ts
export const SESSION_STATUSES = [
  "active",
  "completed",
  "cancelled",
] as const;
```

Derive:

```ts
export type SessionStatus =
  (typeof SESSION_STATUSES)[number];
```

Do not add:

- idle
- paused
- failed
- expired
- abandoned

Idle means no session exists and should not be represented as a stored Session object.

---

# Session Interface

Create in:

```text
src/features/sessions/types.ts
```

Define:

```ts
import type {
  EnergyLevel,
  UserContext,
} from "@/features/tasks";

import type { SessionStatus } from "./constants";

export interface TaskSession {
  id: string;
  taskId: string;
  status: SessionStatus;
  startedAt: string;
  completedAt?: string;
  cancelledAt?: string;
  context?: UserContext;
  energyLevel?: EnergyLevel;
}
```

---

# Field Rules

## `id`

Unique identifier for one session.

It must not equal the task ID.

The same task can be started many times.

## `taskId`

References the stable Task ID.

Do not copy the full Task object into the session.

## `status`

One of:

- active
- completed
- cancelled

## `startedAt`

ISO 8601 datetime string.

The session starts immediately when created.

## `completedAt`

Required only when status is `completed`.

Must be absent for active and cancelled sessions.

## `cancelledAt`

Required only when status is `cancelled`.

Must be absent for active and completed sessions.

## `context`

Optional snapshot of the selected user context at session start.

## `energyLevel`

Optional snapshot of the selected energy level at session start.

---

# Session Creation Input

Define:

```ts
export interface CreateTaskSessionInput {
  id: string;
  taskId: string;
  startedAt: string;
  context?: UserContext;
  energyLevel?: EnergyLevel;
}
```

Do not generate IDs or timestamps inside the domain helper.

Callers must supply them.

This keeps the domain deterministic and testable.

---

# Session Completion Input

Define:

```ts
export interface CompleteTaskSessionInput {
  completedAt: string;
}
```

---

# Session Cancellation Input

Define:

```ts
export interface CancelTaskSessionInput {
  cancelledAt: string;
}
```

---

# Pure Transition Functions

Create in:

```text
src/features/sessions/transitions.ts
```

Required functions:

```ts
export function createTaskSession(
  input: CreateTaskSessionInput,
): TaskSession;
```

```ts
export function completeTaskSession(
  session: TaskSession,
  input: CompleteTaskSessionInput,
): TaskSession;
```

```ts
export function cancelTaskSession(
  session: TaskSession,
  input: CancelTaskSessionInput,
): TaskSession;
```

---

# Creation Rules

`createTaskSession()` must:

- create an active session
- copy id
- copy taskId
- set status to active
- copy startedAt
- copy optional context
- copy optional energyLevel
- not set completedAt
- not set cancelledAt
- not mutate input

---

# Completion Rules

`completeTaskSession()` must:

- only accept an active session
- return a new session object
- set status to completed
- set completedAt
- remove cancelledAt if somehow present
- preserve all other fields
- not mutate the original session

If the session is already completed or cancelled:

- throw a descriptive Error

Suggested direction:

```text
Cannot complete a non-active session.
```

Do not silently return the input.

---

# Cancellation Rules

`cancelTaskSession()` must:

- only accept an active session
- return a new session object
- set status to cancelled
- set cancelledAt
- remove completedAt if somehow present
- preserve all other fields
- not mutate the original session

If the session is already completed or cancelled:

- throw a descriptive Error

Suggested direction:

```text
Cannot cancel a non-active session.
```

---

# Timestamp Rules

Transition helpers must not use:

```ts
new Date()
Date.now()
```

They must receive timestamps through input.

This keeps the domain pure and deterministic.

Do not compare timestamp ordering in this task.

Runtime timestamp-format validation is handled separately.

---

# Runtime Validation

Create in:

```text
src/features/sessions/validation.ts
```

Required functions:

```ts
export function isSessionStatus(
  value: unknown,
): value is SessionStatus;
```

```ts
export function isTaskSession(
  value: unknown,
): value is TaskSession;
```

---

# ISO Date Validation

Create a small internal helper:

```ts
function isIsoDateString(value: unknown): value is string;
```

Requirements:

- value must be a non-empty string
- Date parsing must produce a valid date
- serializing the parsed date with `toISOString()` must equal the original value

This means values must be canonical ISO 8601 UTC strings such as:

```text
2026-07-18T18:30:00.000Z
```

Do not add a date library.

---

# TaskSession Validation Rules

`isTaskSession()` must verify:

## Common Fields

- input is a non-null object
- id is a non-empty string
- taskId is a non-empty string
- status is valid
- startedAt is a canonical ISO date string
- optional context is valid when present
- optional energyLevel is valid when present

## Active Session

When status is `active`:

- completedAt must be absent
- cancelledAt must be absent

## Completed Session

When status is `completed`:

- completedAt must be a canonical ISO date string
- cancelledAt must be absent

## Cancelled Session

When status is `cancelled`:

- cancelledAt must be a canonical ISO date string
- completedAt must be absent

Do not throw from type guards.

Return false for invalid values.

---

# Relationship to TaskCompletion

Do not modify:

```text
src/features/history/types.ts
```

Do not create TaskCompletion records in this task.

Future completion integration may map a completed TaskSession into TaskCompletion.

The two models remain separate:

- TaskSession represents engagement lifecycle
- TaskCompletion represents history data

---

# Public Exports

Create:

```text
src/features/sessions/index.ts
```

Export:

- SESSION_STATUSES
- SessionStatus
- TaskSession
- CreateTaskSessionInput
- CompleteTaskSessionInput
- CancelTaskSessionInput
- createTaskSession
- completeTaskSession
- cancelTaskSession
- isSessionStatus
- isTaskSession

Use type-only exports where appropriate.

Consumers should be able to write:

```ts
import {
  completeTaskSession,
  createTaskSession,
  type TaskSession,
} from "@/features/sessions";
```

Do not export internal helpers.

---

# Tests

Inspect whether a working test runner exists.

If no test runner exists:

- do not install one
- do not create unusable test files
- perform temporary validation if useful
- remove disposable files afterward
- report automated tests as deferred

If a working test runner exists, test:

1. active session creation
2. creation does not mutate input
3. active session validation
4. completed session validation
5. cancelled session validation
6. invalid timestamp fails
7. active session with completedAt fails
8. completed session without completedAt fails
9. completed session with cancelledAt fails
10. cancelled session without cancelledAt fails
11. completing active session works
12. cancelling active session works
13. completion does not mutate original
14. cancellation does not mutate original
15. completing completed session throws
16. completing cancelled session throws
17. cancelling completed session throws
18. cancelling cancelled session throws

Do not add test dependencies.

---

# Architecture Constraints

Do not implement:

- UI integration
- Start button behavior
- timer
- countdown
- pause/resume
- persistence
- AsyncStorage
- Zustand
- session repository
- history creation
- haptics
- animations
- navigation
- analytics
- backend
- notifications

Do not modify:

- Task interface
- TaskCompletion interface
- task-selection engine
- curated task data
- Home screen

Do not add dependencies.

---

# Code Quality

Requirements:

- strict TypeScript
- no `any`
- pure transition functions
- no mutation
- no duplicated task-domain unions
- descriptive names
- small focused files
- no TODO comments
- no speculative abstraction
- no custom error hierarchy
- no date dependency

---

# Acceptance Criteria

The task is complete only when:

- session-status constants exist
- SessionStatus derives from constants
- TaskSession matches the approved shape
- creation input types exist
- transition helpers exist
- transitions are immutable
- only active sessions can complete or cancel
- runtime validation exists
- status-specific timestamp rules are validated
- canonical ISO strings are required
- public exports work
- no UI or persistence behavior is added
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

Verify Expo startup:

```powershell
npx expo start --port 8082
```

Stop Expo afterward.

If no automated test runner exists, perform a temporary validation covering:

- active creation
- completion
- cancellation
- immutability
- invalid transitions
- runtime validation

Remove disposable validation code afterward.

---

# Self Review

Before finishing, inspect all changed files.

Check for:

- accidental idle status
- timestamp generation inside helpers
- mutation of original sessions
- completed and cancelled timestamps coexisting
- weak status-specific validation
- duplicated context or energy unions
- custom error over-engineering
- UI or state leakage
- unrelated file changes
- unused exports

Fix discovered issues before writing the report.

---

# Final Response Format

Return:

## Summary

## Files Created

## Files Modified

## Session Model

Summarize:

- statuses
- TaskSession shape
- timestamp rules
- optional snapshots

## Transition Behavior

Summarize:

- creation
- completion
- cancellation
- invalid-transition handling
- immutability

## Tests

State whether automated tests ran.

If no runner exists, describe temporary validation.

## Validation Results

Report:

- temporary session validation if applicable
- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Work

Mention intentionally deferred:

- Start-button integration
- session state
- timer
- completion history
- persistence
- haptics
- animations

Do not implement those items.

Do not continue to another task.