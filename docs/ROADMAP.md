# 2 Mins — Product Roadmap

Version: 1.0  
Status: Active  
Product Stage: Pre-MVP

---

# Roadmap Purpose

This roadmap defines the planned development path for 2 Mins.

The roadmap is not a promise to build every possible feature.

Every feature must support the North Star:

> Every decision should reduce friction and help users start immediately.

Features that add complexity without helping users begin should be rejected or postponed.

---

# Release Philosophy

2 Mins should be released in small, stable, production-ready versions.

Each release must:

- work reliably
- feel complete
- remain simple
- preserve the calm product identity
- avoid unnecessary technical debt
- be suitable for real users

The application should not wait for every future feature before launch.

The first public release should solve one problem exceptionally well:

> Give the user one useful action they can start immediately.

---

# Development Stages

The roadmap is divided into the following stages:

1. Foundation
2. Core Experience
3. MVP Completion
4. Store Preparation
5. Public Launch
6. Post-Launch Improvement
7. Premium and Intelligence
8. Platform Expansion

---

# Stage 0 — Product Definition

Status: Completed

Goal:

Define the product before writing production code.

Completed documents:

- `README.md`
- `docs/PRODUCT.md`
- `docs/PRD.md`
- `docs/BRAND.md`
- `docs/NORTH_STAR.md`
- `docs/DESIGN.md`
- `docs/ARCHITECTURE.md`
- `.codex/AGENTS.md`

Exit criteria:

- product vision is clear
- design direction is clear
- technical architecture is clear
- Codex has explicit project rules
- MVP scope is understood

---

# Stage 1 — Project Foundation

Target version: `0.1.0`

Goal:

Create a clean and stable technical foundation.

## Deliverables

### Project Cleanup

- remove default Expo example screens
- remove unused assets
- remove unused dependencies
- verify Expo Router structure
- verify strict TypeScript configuration

### Folder Structure

Create the approved architecture:

- `app`
- `src/components`
- `src/features`
- `src/data`
- `src/hooks`
- `src/repositories`
- `src/services`
- `src/stores`
- `src/theme`
- `src/types`
- `src/utils`
- `tests`

### Design System

Implement centralized tokens for:

- colors
- typography
- spacing
- radius
- shadows
- motion
- light theme
- dark theme

### Shared Components

Implement initial reusable components:

- `AppText`
- `Screen`
- `PrimaryButton`
- `GhostButton`
- `Card`
- `IconButton`

### Core Dependencies

Install only approved dependencies required for the foundation:

- Zustand
- AsyncStorage
- Lucide React Native
- Expo Haptics
- React Native Reanimated if required

### Quality Setup

- lint must pass
- TypeScript must pass
- application must start on Android
- application must start on web where supported
- no placeholder example code remains

## Exit Criteria

Stage 1 is complete when:

- the app launches successfully
- theme tokens are usable
- shared components render correctly
- navigation structure exists
- the repository is clean
- no TypeScript errors exist
- no lint errors exist

---

# Stage 2 — Onboarding Experience

Target version: `0.2.0`

Goal:

Introduce the product clearly without overwhelming the user.

## Screens

### Welcome

Message:

```text
Start before you're ready.
```

Purpose:

Introduce the product philosophy.

### Context Introduction

Message:

```text
Tell us what this moment feels like.
```

Purpose:

Explain that suggestions can adapt to the user's situation.

### Final Introduction

Message:

```text
One small thing. Nothing more.
```

Purpose:

Explain the single-action experience.

## Functional Requirements

- maximum three onboarding screens
- onboarding completed state stored locally
- onboarding shown only on first launch
- quiet skip option
- accessible navigation controls
- support light and dark themes
- transition to Home after completion

## Exit Criteria

- onboarding works on a fresh install
- completion persists after app restart
- returning users go directly to Home
- the full flow takes under 30 seconds

---

# Stage 3 — Core Task Engine

Target version: `0.3.0`

Goal:

Create the product's main business logic.

## Task Data

Create an initial curated local task library.

Minimum target:

- 120 total tasks
- balanced across categories
- balanced across contexts
- balanced across energy levels
- no unsafe or misleading instructions
- every task can realistically begin or finish within two minutes

## Task Categories

- Mind
- Body
- Home
- Digital
- Social
- Productivity
- Self Care

## Task Types

- Do
- Think
- Reset

## Contexts

- Home
- Work
- Outside
- Resting

## Energy Levels

- Low
- Medium
- High

## Selection Rules

The engine must:

- filter by context when available
- filter by energy level when available
- avoid immediate repetition
- exclude recently shown tasks
- use fallback logic when no exact match exists
- always return a task while built-in tasks exist
- remain testable

## Tests

Add unit tests for:

- exact-match selection
- fallback selection
- recent-task exclusion
- no-repeat behavior
- empty-filter recovery
- deterministic random selection

## Exit Criteria

- the engine always produces a valid task
- task selection logic is independent from screens
- tests pass
- task data is separate from UI code

---

# Stage 4 — Home Experience

Target version: `0.4.0`

Goal:

Build the main experience users will return to.

## Home Screen Structure

The screen should contain:

1. contextual message
2. one main task card
3. one primary action
4. one quiet alternative action

Example:

```text
A small thing for right now.

Drink a glass
of water.

Start

Not this one
```

## Interactions

### Start

Begins the current task flow.

The first MVP may treat Start as immediate engagement without a visible timer.

### Complete

Marks the task as completed.

### Not This One

Requests another eligible task.

The next task must not immediately repeat.

### Favorite

Allows the task to be saved quietly.

The favorite control must not dominate the interface.

## Completion Experience

When completed:

- subtle scale
- subtle fade
- subtle upward movement
- success haptic
- calm completion message

Examples:

- `That's enough for now.`
- `One small thing done.`
- `You started.`
- `Nice.`

## Exit Criteria

- user can receive a task
- user can request another task
- user can complete a task
- user can favorite a task
- completion persists
- recent tasks persist
- the screen works offline
- light and dark themes work

---

# Stage 5 — Context and Energy Personalization

Target version: `0.5.0`

Goal:

Provide the right task for the current moment.

## Context Selection

User can select:

- Home
- Work
- Outside
- Resting

## Energy Selection

User can select:

- Low
- Medium
- High

## UX Rules

- selection must remain quick
- user should not complete a long questionnaire
- previous choices may be remembered
- choices can be changed easily
- skipping selection must remain possible
- Home must still work without personalization

## Special Mode

Introduce a calm low-energy state for moments when the user feels overwhelmed.

Possible entry label:

```text
I need something easy.
```

This mode should prioritize:

- breathing
- grounding
- hydration
- tiny resets
- very low-effort actions

Avoid presenting this as medical treatment.

## Exit Criteria

- context affects task selection
- energy affects task selection
- no-match cases use safe fallback logic
- personalization never blocks task access

---

# Stage 6 — Favorites and History

Target version: `0.6.0`

Goal:

Allow users to revisit useful actions without creating complexity.

## Favorites

Features:

- view saved tasks
- remove saved tasks
- start a saved task
- empty state
- local persistence

Empty state:

```text
Nothing saved yet.

Keep the ones that feel right.
```

## History

Features:

- view completed actions
- show completion date
- simple chronological list
- clear history through confirmation
- local persistence

Empty state:

```text
No completed actions yet.

Your small wins will appear here.
```

## History Rules

Do not add:

- XP
- levels
- competitive statistics
- guilt-based streaks
- public sharing pressure

Simple completion counts may be evaluated after launch.

## Exit Criteria

- favorites persist
- history persists
- empty states work
- clearing history requires confirmation
- screens remain calm and uncluttered

---

# Stage 7 — Settings and Appearance

Target version: `0.7.0`

Goal:

Give users necessary control without turning Settings into a control panel.

## Settings Sections

### Appearance

- Light
- Dark
- System

### Notifications

- enable or disable reminders
- select reminder time
- request permissions clearly
- explain denied permission calmly

### Preferences

- default context
- default energy level
- haptics enabled or disabled

### Data

- clear history
- clear favorites
- reset onboarding
- reset local application data

### About

- app version
- tagline
- privacy policy
- terms if required
- contact or support link

## Exit Criteria

- settings persist
- theme switches immediately
- destructive actions require confirmation
- notification permission denial does not break the app

---

# Stage 8 — Notifications

Target version: `0.8.0`

Goal:

Invite users back gently.

## Notification Philosophy

Notifications must never:

- shame
- threaten streak loss
- create artificial urgency
- send excessive reminders
- use manipulative language

## Example Notification Copy

```text
Two quiet minutes?
```

```text
One small thing is enough.
```

```text
Start before you're ready.
```

```text
A tiny reset might help.
```

## Functional Requirements

- local notifications
- user-selected time
- permission request after clear explanation
- no permission request on first app launch
- cancel and reschedule correctly
- survive app restart where platform behavior allows
- timezone-safe scheduling

## Exit Criteria

- reminders schedule correctly
- reminders can be disabled
- denied permissions are handled gracefully
- no duplicate notifications are created

---

# Stage 9 — MVP Stabilization

Target version: `0.9.0`

Goal:

Turn the feature-complete application into a reliable release candidate.

## Required Work

### Functional QA

Test:

- onboarding
- Home
- task selection
- completion
- favorites
- history
- settings
- notifications
- theme switching
- persistence
- app restart behavior

### Device QA

Test on:

- small Android phone
- large Android phone
- at least one iPhone
- light mode
- dark mode
- large text
- reduced motion
- offline mode

### Accessibility QA

Verify:

- labels
- screen-reader order
- contrast
- touch targets
- dynamic text behavior
- reduced-motion behavior

### Technical QA

Run:

- TypeScript checks
- lint
- unit tests
- component tests
- production build
- dependency audit

### Product QA

Review every screen against:

- `PRODUCT.md`
- `BRAND.md`
- `NORTH_STAR.md`
- `DESIGN.md`

## Exit Criteria

- no known critical bugs
- no known data-loss bugs
- no startup crashes
- no blocking accessibility issues
- no placeholder copy
- no placeholder assets
- release build succeeds

---

# Stage 10 — Store Preparation

Target version: `1.0.0-rc`

Goal:

Prepare all technical and marketing materials for Apple App Store and Google Play.

## Product Assets

- final app icon
- adaptive Android icon
- splash screen
- store screenshots
- promotional text
- short description
- full description
- keywords
- category selection
- support contact
- privacy policy

## Legal and Privacy

Prepare:

- privacy policy
- terms only if required
- Apple privacy questionnaire
- Google Play Data Safety form
- notification usage explanation

## Store Configuration

### Apple

- Apple Developer account
- bundle identifier
- App Store Connect record
- certificates and signing through EAS
- TestFlight build
- age rating
- review information

### Google

- Google Play Console account
- package name
- app signing
- internal test
- closed test if required
- content rating
- Data Safety declaration

## Release Testing

- TestFlight testing
- Google Play internal testing
- store metadata review
- screenshot review
- clean-install test
- upgrade test where applicable

## Exit Criteria

- both store listings are complete
- both privacy declarations are complete
- release candidates install successfully
- TestFlight build is approved for testing
- Google Play test build is available

---

# Stage 11 — Public Launch

Target version: `1.0.0`

Goal:

Release a focused, stable, calm MVP.

## Version 1.0 Features

Version 1.0 should include:

- onboarding
- curated local tasks
- context selection
- energy selection
- single-task Home experience
- task completion
- task replacement
- favorites
- history
- theme preferences
- local notifications
- offline support
- accessibility support
- local data persistence

Version 1.0 should not include:

- accounts
- cloud sync
- AI
- subscriptions
- advertisements
- social features
- public profiles
- leaderboards
- watch applications
- widgets

## Launch Process

- submit Apple build
- submit Google build
- respond to review feedback
- monitor crashes and store feedback
- avoid immediate feature expansion during launch week

## Exit Criteria

- application is publicly available
- critical launch issues are resolved
- early user feedback is collected
- first post-launch priorities are identified

---

# Stage 12 — Post-Launch Improvement

Target versions:

- `1.0.1`
- `1.0.2`
- `1.1.0`

Goal:

Improve the product using real usage and feedback.

## Priority Order

1. crash fixes
2. data-loss fixes
3. notification reliability
4. accessibility improvements
5. confusing user flows
6. task quality
7. performance
8. small UX improvements

## Possible Version 1.1 Features

- more curated tasks
- task packs
- improved personalization
- optional simple insights
- improved low-energy mode
- task feedback such as:
  - helpful
  - not for me
- better tablet layout
- localization foundation

## Analytics Decision

After launch, evaluate privacy-respecting analytics only if needed.

Do not add analytics until exact questions are defined.

Examples of valid questions:

- Do users complete onboarding?
- Do users receive a valid task?
- Which screens cause abandonment?
- Are notifications useful?

Do not collect data without a clear reason.

---

# Stage 13 — Widgets

Target version: `1.2.0` or later

Goal:

Let users receive one small action without opening the full app.

## Possible Widgets

- current task
- quick new task
- low-energy reset
- favorite task shortcut

## Rules

Widgets must:

- remain simple
- avoid showing lists
- avoid unnecessary controls
- stay consistent with the brand
- work without requiring an account

Platform feasibility must be evaluated separately for iOS and Android.

---

# Stage 14 — Premium Foundation

Target version: `1.3.0` or later

Goal:

Introduce optional paid value without damaging the free product.

## Possible Premium Features

- curated task packs
- deeper personalization
- custom task collections
- additional notification schedules
- advanced widgets
- cloud sync
- cross-device preferences
- premium visual themes
- early access features

## Monetization Rules

The free version must remain genuinely useful.

Do not:

- block the core task experience
- create artificial daily limits
- use aggressive paywalls
- interrupt the first session with purchase prompts
- hide basic accessibility features behind payment

RevenueCat may be used when monetization requirements are finalized.

---

# Stage 15 — AI Personalization

Target version: `2.0.0` or later

Goal:

Use AI to understand the user's current needs, not merely generate random tasks.

## Product Principle

AI should not be added because it is fashionable.

AI should create meaningful personalization.

## Possible AI Capabilities

User input examples:

```text
I slept badly.
```

```text
My head feels crowded.
```

```text
I'm at work and can't leave my desk.
```

```text
I want to feel a little more productive today.
```

AI may use this input to:

- classify current context
- estimate suitable effort
- recommend existing safe tasks
- adapt tone
- avoid repeatedly unsuitable categories
- create carefully constrained suggestions

## AI Safety Rules

AI-generated actions must not:

- provide medical diagnosis
- provide dangerous physical instructions
- encourage harmful behavior
- pretend to replace professional care
- create high-risk financial or legal instructions
- create manipulative emotional dependence

Prefer selecting from reviewed task templates over unrestricted generation.

## Privacy Rules

Before adding AI:

- define what data leaves the device
- request consent where required
- update privacy policy
- define retention
- allow users to avoid AI entirely
- avoid sending full history unless necessary

---

# Stage 16 — Accounts and Cloud Sync

Target version: `2.x`

Goal:

Allow optional synchronization across devices.

## Possible Technology

Supabase may provide:

- authentication
- database
- synchronization
- remote task packs
- user preferences

## Rules

- accounts must remain optional unless a future feature truly requires them
- anonymous local use must continue
- local data must not be lost during account creation
- offline use must continue
- synchronization conflicts must be handled safely

---

# Stage 17 — Wearables and Voice

Target version: Future

Goal:

Make starting even easier.

## Possible Platforms

- Apple Watch
- WearOS
- Siri Shortcuts
- App Intents
- Android voice actions

## Possible Actions

- show one task
- request another task
- complete current task
- start low-energy mode
- open a favorite task

These experiences must reuse the core task engine rather than duplicate logic.

---

# Localization Roadmap

## Initial Release

English only, unless Turkish is added before store launch.

## Future Languages

Possible priority:

1. English
2. Turkish
3. German
4. Spanish
5. French

Localization must be implemented through translation files.

Do not hardcode user-facing copy throughout components.

Before adding multiple languages, define:

- translation workflow
- copy ownership
- pluralization support
- date and time localization
- store listing localization

---

# Versioning Strategy

Use semantic versioning.

## Major Version

Example:

```text
2.0.0
```

Used for major product or architecture changes.

## Minor Version

Example:

```text
1.2.0
```

Used for backward-compatible features.

## Patch Version

Example:

```text
1.0.1
```

Used for fixes and small improvements.

Pre-release examples:

```text
1.0.0-alpha.1
1.0.0-beta.1
1.0.0-rc.1
```

---

# Branch and Delivery Strategy

Use small focused branches.

Suggested naming:

```text
feature/project-foundation
feature/design-system
feature/onboarding
feature/task-engine
feature/home-screen
feature/favorites
feature/history
feature/notifications
fix/task-selection-repeat
release/1.0.0
```

Each Codex task should:

- address one clear goal
- avoid unrelated changes
- update documentation when needed
- include validation commands
- produce a reviewable diff

---

# Prompt Roadmap

Codex prompts should be stored in `prompts`.

Initial planned prompts:

```text
001_project_foundation.md
002_design_system.md
003_shared_components.md
004_navigation_structure.md
005_onboarding.md
006_task_domain_and_data.md
007_task_selection_engine.md
008_home_screen.md
009_task_completion.md
010_favorites.md
011_history.md
012_context_and_energy.md
013_settings.md
014_notifications.md
015_accessibility_review.md
016_test_suite.md
017_release_configuration.md
018_store_preparation.md
```

Prompt numbering may change when a task needs to be divided.

Prompts must never request multiple major features in one uncontrolled step.

---

# Current Priority

The current active stage is:

```text
Stage 1 — Project Foundation
```

The next implementation task is:

```text
Create the approved project structure, remove Expo example code, install only the required foundation dependencies, and verify that the clean application builds successfully.
```

No product feature should be implemented before the foundation task is reviewed and accepted.

---

# Roadmap Review Rule

This roadmap must be reviewed when:

- MVP scope changes
- a new dependency changes architecture
- a backend is introduced
- monetization is introduced
- analytics is introduced
- AI is introduced
- store requirements change
- a major version is planned

Do not silently change product scope.

Update this document whenever an approved roadmap decision changes.