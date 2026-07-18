# Task 009 — Curated Task Library

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

Inspect:

```text
src/features/tasks/
src/data/tasks/
```

The Task domain model, validation helpers, repository contract, and local repository already exist.

Do not duplicate or modify those systems unless compilation genuinely requires it.

---

# Objective

Replace the temporary 12-task seed collection with the first production-quality curated task library for the 2 Mins MVP.

The library must contain exactly:

```text
120 tasks
```

These tasks will be bundled locally and used by the future task-selection engine.

This task covers task content and validation only.

Do not implement selection behavior, UI integration, persistence, or state.

---

# Required Work

Update:

```text
src/data/tasks/seedTasks.ts
```

The exported API must remain:

```ts
export const seedTasks: readonly Task[];
```

Do not rename the export.

Do not split the library into unnecessary files unless the single file becomes genuinely difficult to maintain.

If splitting is necessary, preserve the public export from:

```text
src/data/tasks/index.ts
```

---

# Library Size

The final collection must contain exactly:

```text
120 unique tasks
```

Requirements:

- exactly 120 unique IDs
- exactly 120 distinct task instructions
- no placeholder tasks
- no near-duplicates with trivial wording changes
- all tasks pass the existing `isTask()` validation
- all tasks use `isPremium: false`

---

# Category Distribution

Use the following exact distribution:

```text
mind: 18
body: 18
home: 18
digital: 16
social: 14
productivity: 18
selfCare: 18
```

Total:

```text
120
```

Each task has one primary category only.

Do not change the approved category constants.

---

# Task Type Distribution

Target a balanced library with approximately:

```text
do: 60–70
think: 20–30
reset: 25–35
```

Requirements:

- every category must contain more than one task type
- do not classify nearly everything as `do`
- `think` tasks must still be concrete and brief
- `reset` tasks must actively reduce friction or tension

Do not add new task types.

---

# Energy Coverage

Every task must support at least one energy level.

Across the complete library:

- at least 45 tasks must support `low`
- at least 55 tasks must support `medium`
- at least 35 tasks must support `high`

A task may support multiple energy levels.

Low-energy tasks should genuinely require little effort.

Do not mark demanding physical or organizational tasks as low energy merely to satisfy counts.

---

# Context Coverage

Every task must support at least one context.

Across the complete library:

- at least 45 tasks must support `home`
- at least 35 tasks must support `work`
- at least 25 tasks must support `outside`
- at least 35 tasks must support `resting`

A task may support multiple contexts.

Context values are manually selected situations, not GPS locations.

---

# Duration Distribution

Every `estimatedSeconds` value must remain between:

```text
10 and 120 inclusive
```

Use realistic estimates.

Recommended distribution:

- short resets: 10–30 seconds
- tiny actions: 30–60 seconds
- fuller actions: 60–120 seconds

Do not set every task to 120 seconds.

Use integer values only.

Prefer a reasonable variety such as:

```text
15
20
30
45
60
75
90
120
```

Other valid integer values may be used when justified.

---

# Writing Style

Every task title must:

- be written in English
- use sentence case
- end with appropriate punctuation
- be concise
- be immediately understandable
- contain one clear action or reflection
- feel calm and human
- avoid hype
- avoid guilt
- avoid childish language
- avoid corporate productivity jargon

Preferred tone:

```text
Drink a glass of water.
```

```text
Close one tab you no longer need.
```

```text
Notice where your shoulders are holding tension.
```

```text
Write down the next tiny step.
```

Avoid:

```text
Crush your goals!
```

```text
Be productive right now!
```

```text
You have no excuse.
```

```text
Transform your entire workspace.
```

---

# Safety Rules

Tasks must not:

- diagnose or treat medical conditions
- suggest medication changes
- make mental-health treatment claims
- encourage breath holding
- encourage dangerous stretching
- require intense exercise
- encourage unsafe behavior while driving
- require entering unsafe locations
- involve fire, blades, chemicals, or risky tools
- encourage deleting important files
- encourage sending emotionally risky messages impulsively
- create financial or legal consequences
- instruct users to share personal information
- depend on camera, contacts, microphone, GPS, or photo permissions
- require an internet connection
- realistically take longer than two minutes

Physical tasks must remain gentle and broadly accessible.

Where a task may not suit every user, phrase it cautiously and provide a simple action rather than a performance target.

---

# Content Guidance by Category

## Mind

Possible directions:

- noticing thoughts
- naming one priority
- reducing mental clutter
- grounding attention
- brief gratitude
- making one tiny decision
- pausing before reacting

Avoid therapy claims and vague motivational quotes.

## Body

Possible directions:

- relaxing shoulders
- standing gently
- drinking water
- unclenching jaw
- changing posture
- gentle wrist or neck movement
- taking a few comfortable breaths

Avoid intense exercise and medical advice.

## Home

Possible directions:

- clearing one small surface
- putting away one object
- opening a window when appropriate
- wiping a small area
- preparing one item for later
- removing one piece of visible clutter

Avoid tasks that realistically become full cleaning projects.

## Digital

Possible directions:

- closing unused tabs
- deleting clearly unnecessary screenshots
- organizing one file
- muting one unnecessary notification source
- clearing one small digital distraction
- replying to one uncomplicated message

Do not require access to permissions the app does not use.

Do not encourage deleting uncertain or important data.

## Social

Possible directions:

- sending a brief kind message
- thanking someone
- replying to one simple message
- checking in without pressure
- acknowledging someone’s effort
- deciding who needs a response later

Avoid emotionally manipulative or high-stakes communication.

## Productivity

Possible directions:

- writing the next step
- opening the required document
- placing one item where it will be needed
- choosing one priority
- starting a tiny part of a task
- removing one obstacle

Do not turn the application into a full task manager.

## Self Care

Possible directions:

- getting water
- resting eyes
- adjusting lighting
- preparing a small comfort
- checking basic needs
- creating a calmer immediate environment

Avoid medical or clinical framing.

---

# ID Rules

Every task ID must:

- be unique
- use lowercase kebab-case
- remain stable
- describe the task
- avoid category prefixes unless needed for uniqueness
- avoid numeric suffixes unless genuinely meaningful

Good:

```text
drink-glass-of-water
close-one-unused-tab
write-next-tiny-step
```

Avoid:

```text
task-001
body-task-4
drink-water-2
```

---

# Duplicate Review

Before finishing, manually review the complete library for:

- exact duplicate titles
- duplicate IDs
- tasks with the same meaning expressed slightly differently
- repeated opening phrases
- too many water or breathing tasks
- too many cleaning tasks
- too many digital deletion tasks
- category imbalance
- energy misclassification
- context misclassification

The library should feel varied.

A user requesting several new tasks in a row should not feel that the application is repeating itself.

---

# Validation Helper

Add a lightweight development-time library assertion if useful.

Possible location:

```text
src/data/tasks/validateSeedTasks.ts
```

It may verify:

- exact count is 120
- unique IDs
- every task passes `isTask()`
- exact category distribution
- required type coverage
- required energy coverage
- required context coverage

Requirements:

- do not add a dependency
- do not expose it as product functionality
- do not run expensive validation during every render
- keep it deterministic
- use existing domain constants and `isTask()`

If the repository constructor already sufficiently validates shape and duplicate IDs, the helper should focus only on library-level count and distribution requirements.

Do not create unnecessary generic validation infrastructure.

---

# Tests

Inspect whether a working test runner exists.

If no test runner exists:

- do not install one
- do not create unusable test files
- validate using TypeScript, lint, repository construction, and the optional development assertion
- report tests as deferred

If a test runner exists, add tests for:

- exact task count
- unique IDs
- every task validates
- category distribution
- energy coverage
- context coverage

Do not add testing dependencies during this task.

---

# Architecture Constraints

Do not implement:

- random task selection
- context filtering
- energy filtering
- recent-task exclusion
- task rotation
- Zustand stores
- AsyncStorage
- Home-screen integration
- Favorites
- History
- task completion
- remote task fetching
- AI-generated runtime tasks
- localization
- monetization behavior
- UI changes

Do not modify the Task interface.

Do not add new categories, contexts, energy levels, or task types.

Do not add dependencies.

---

# Acceptance Criteria

The task is complete only when:

- exactly 120 tasks exist
- all IDs are unique
- all titles are distinct
- every task passes `isTask()`
- category counts match the exact required distribution
- every category has varied task types
- energy coverage requirements are met
- context coverage requirements are met
- all duration values are realistic integers from 10 to 120
- all tasks use `isPremium: false`
- unsafe, manipulative, or medical tasks are absent
- no selection or UI behavior is added
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

Verify repository construction with the final seed library.

Use a temporary development command or small validation module when needed, but do not leave disposable scripts in the project.

Verify Expo startup using an available port:

```powershell
npx expo start --port 8082
```

Stop Expo afterward.

Run tests only if a working test runner already exists.

---

# Self Review

Before finishing, inspect the full library.

Check:

- exact task count
- exact category distribution
- duplicate IDs
- duplicate meanings
- invalid durations
- awkward English
- unsafe advice
- guilt-based language
- vague motivational statements
- unrealistic two-minute claims
- poor low-energy classification
- poor context classification
- overuse of a single task pattern
- accidental product logic
- unrelated file changes

Fix all discovered issues before reporting completion.

---

# Final Response Format

Return:

## Summary

## Files Created

## Files Modified

## Library Statistics

Report:

- total task count
- category counts
- task type counts
- energy-level coverage counts
- context coverage counts
- minimum and maximum duration

## Quality Review

Briefly summarize:

- duplicate review
- safety review
- tone review
- duration review

## Tests

State whether tests ran.

## Validation Results

Report:

- repository construction
- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Future Work

Mention intentionally deferred:

- selection engine
- recent-task exclusion
- context and energy filtering
- persistence
- Home-screen integration
- localization

Do not implement those items.

Do not continue to another task.