# 2 Mins — Technical Architecture

Version: 1.0  
Status: Initial Architecture  
Platform: iOS and Android

---

# Purpose

This document defines how the 2 Mins application must be structured and developed.

It is the technical source of truth for the project.

All implementation decisions must support the product principles defined in:

- `docs/PRODUCT.md`
- `docs/PRD.md`
- `docs/NORTH_STAR.md`
- `docs/BRAND.md`
- `docs/DESIGN.md`

The architecture must remain simple, maintainable, testable, and suitable for App Store and Google Play production releases.

---

# Technology Stack

## Application Framework

React Native with Expo.

## Language

TypeScript with strict type checking.

## Navigation

Expo Router.

Navigation is file-based.

Route files must remain lightweight and should compose screens from feature modules.

## State Management

Zustand.

Zustand should only be used for shared application state.

Local component state should remain inside components when it is not needed elsewhere.

Do not place every value in the global store.

## Persistent Storage

AsyncStorage for MVP.

Use it for:

- onboarding completion
- user preferences
- theme preference
- favorite tasks
- task completion history
- notification preferences
- recent task identifiers

Storage access must be isolated behind repository or service functions.

Components must never directly call AsyncStorage.

A future migration to MMKV must be possible without rewriting feature components.

## Backend

No backend in MVP.

The application must work fully offline.

A future backend may use Supabase for:

- cloud synchronization
- account management
- premium user data
- remote task packs
- AI personalization

Backend-specific code must not be introduced before it is required.

## Authentication

No authentication in MVP.

Users must be able to use the entire MVP without creating an account.

## Notifications

Expo Notifications.

Notification scheduling must be isolated inside a notification service.

Screens and UI components must not contain platform-specific notification logic.

## Haptics

Expo Haptics.

Haptic calls must be isolated behind a small utility or service.

The application must continue working if haptics are unavailable.

## Icons

Lucide React Native.

Do not mix multiple icon libraries.

## Animations

React Native Reanimated when animation complexity requires it.

Use basic React Native animations when sufficient.

Animations must respect reduced-motion preferences.

## Styling

React Native `StyleSheet`.

Use centralized design tokens for:

- colors
- typography
- spacing
- radius
- shadows
- motion durations

Do not hardcode design values repeatedly inside components.

---

# Architecture Principles

## Simplicity First

Do not introduce architectural complexity without a clear need.

Avoid unnecessary:

- dependency injection frameworks
- event buses
- Redux
- large service containers
- abstract base classes
- generic systems without real use cases

## Feature-Based Structure

Business logic should be grouped by feature.

Examples:

- onboarding
- tasks
- favorites
- history
- settings
- notifications

Shared UI and utilities should remain outside feature folders.

## Separation of Concerns

Keep the following responsibilities separate:

- presentation
- application state
- business logic
- persistence
- platform services
- navigation

UI components must not contain storage or notification implementation details.

## Offline First

All core functions must work without an internet connection.

Network availability must never prevent users from:

- receiving a local task
- completing a task
- viewing history
- using favorites
- changing preferences

## Type Safety

Avoid `any`.

Use explicit domain types.

Public functions and service boundaries must have clear parameter and return types.

Validate persisted data before using it.

## Dependency Control

Before adding a dependency, determine whether the requirement can be solved safely with the existing stack.

Every dependency must have a clear purpose.

Do not add overlapping packages that solve the same problem.

---

# Project Structure

```text
2mins-app/
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── (onboarding)/
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── context.tsx
│   │   └── finish.tsx
│   │
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── favorites.tsx
│   │   ├── history.tsx
│   │   └── settings.tsx
│   │
│   └── settings/
│       ├── notifications.tsx
│       ├── appearance.tsx
│       └── about.tsx
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── feedback/
│   │
│   ├── features/
│   │   ├── onboarding/
│   │   ├── tasks/
│   │   ├── favorites/
│   │   ├── history/
│   │   ├── settings/
│   │   └── notifications/
│   │
│   ├── data/
│   │   └── tasks/
│   │
│   ├── constants/
│   ├── hooks/
│   ├── repositories/
│   ├── services/
│   ├── stores/
│   ├── theme/
│   ├── types/
│   └── utils/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── adaptive-icon/
│
├── docs/
├── prompts/
├── tests/
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

# Folder Responsibilities

## `app`

Contains Expo Router route files and navigation layouts.

Route files should:

- configure navigation
- read route parameters
- render feature screens
- remain small

Route files should not contain large UI implementations or business logic.

## `src/components`

Contains reusable application components.

### `src/components/ui`

Generic design-system components.

Examples:

- Button
- IconButton
- Text
- Card
- Divider
- Switch
- EmptyState

### `src/components/layout`

Reusable structural components.

Examples:

- Screen
- SafeAreaContainer
- CenteredContent
- Section

### `src/components/feedback`

Feedback-related shared components.

Examples:

- ErrorMessage
- LoadingState
- ConfirmationSheet

## `src/features`

Contains product feature modules.

Each feature may contain:

```text
feature-name/
├── components/
├── hooks/
├── screens/
├── services/
├── types.ts
└── utils.ts
```

Only create subfolders that are actually required.

Do not create empty architecture for hypothetical future needs.

## `src/data`

Contains static application data.

Initial curated tasks will be stored here.

Task data must be separated from UI components.

## `src/constants`

Contains small shared constants used across the application.

Examples:

- app metadata
- storage keys

Constants must not become a dumping ground for feature logic.

## `src/hooks`

Contains shared React hooks used by multiple features.

Feature-specific hooks should remain inside their feature folder.

## `src/repositories`

Contains persistent data access.

Examples:

- settings repository
- favorites repository
- history repository

Repositories hide storage implementation details.

## `src/services`

Contains platform and infrastructure services.

Examples:

- notification service
- haptics service
- accessibility service
- logging service

## `src/stores`

Contains Zustand stores.

Stores must be small and domain-focused.

Avoid a single global store containing the entire application.

## `src/theme`

Contains design-system implementation.

Expected files:

```text
src/theme/
├── colors.ts
├── typography.ts
├── spacing.ts
├── radius.ts
├── shadows.ts
├── motion.ts
├── themes.ts
└── index.ts
```

## `src/types`

Contains shared domain and utility types.

Do not place every feature type here.

Feature-specific types should stay with their feature.

## `src/utils`

Contains pure reusable utility functions.

Utilities must not depend on React components.

---

# Domain Model

## Task

```ts
export type TaskCategory =
  | "mind"
  | "body"
  | "home"
  | "digital"
  | "social"
  | "productivity"
  | "selfCare";

export type TaskType = "do" | "think" | "reset";

export type EnergyLevel = "low" | "medium" | "high";

export type UserContext =
  | "home"
  | "work"
  | "outside"
  | "resting";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  type: TaskType;
  energyLevels: EnergyLevel[];
  contexts: UserContext[];
  estimatedSeconds: number;
  isPremium: boolean;
}
```

## Task Completion

```ts
export interface TaskCompletion {
  id: string;
  taskId: string;
  completedAt: string;
  context?: UserContext;
  energyLevel?: EnergyLevel;
}
```

## User Preferences

```ts
export type ThemePreference = "light" | "dark" | "system";

export interface UserPreferences {
  onboardingCompleted: boolean;
  theme: ThemePreference;
  notificationsEnabled: boolean;
  notificationTime?: string;
  preferredContexts: UserContext[];
}
```

---

# Task Selection Engine

Task selection logic must remain separate from the Home screen.

The engine should accept:

```ts
export interface TaskSelectionInput {
  context?: UserContext;
  energyLevel?: EnergyLevel;
  excludedTaskIds: string[];
  favoriteTaskIds?: string[];
}
```

The engine should return one eligible task.

Selection rules for MVP:

1. Match the selected context when available.
2. Match the selected energy level when available.
3. Exclude recently shown tasks.
4. Avoid immediate repetition.
5. Prefer non-completed tasks when practical.
6. Use a safe fallback when no exact match exists.
7. Never return `undefined` while built-in tasks are available.

Randomization must be testable.

Do not put raw `Math.random()` calls throughout the application.

Inject or isolate random selection logic.

---

# State Management Rules

Zustand stores may include:

## App Store

Responsible for:

- application hydration status
- onboarding completion
- active theme preference

## Task Store

Responsible for:

- current task
- recent task identifiers
- current context
- current energy level

## Favorites Store

Responsible for:

- favorite task identifiers
- adding a favorite
- removing a favorite

## History Store

Responsible for:

- completed task records
- adding a completion
- clearing history through explicit confirmation

Stores should expose actions, not allow arbitrary state mutation.

Components should subscribe only to the state they require.

---

# Persistence Rules

Persistent storage keys must be centralized.

Example:

```ts
export const STORAGE_KEYS = {
  preferences: "2mins.preferences.v1",
  favorites: "2mins.favorites.v1",
  history: "2mins.history.v1",
  recentTasks: "2mins.recentTasks.v1",
} as const;
```

Never scatter storage-key strings throughout the project.

Persisted objects must include versioning when migration may be required.

Corrupted storage data must fall back safely to defaults.

Storage failures must not crash the application.

---

# Theme Architecture

Components must consume semantic theme values.

Correct:

```ts
theme.colors.background
theme.colors.textPrimary
theme.spacing[6]
theme.radius.card
```

Avoid:

```ts
"#F5F1E8"
24
28
```

inside repeated component styles.

Both light and dark themes must implement the same token interface.

Theme selection must support:

- light
- dark
- system

---

# Component Rules

Reusable components must have focused responsibilities.

Do not create giant components.

Suggested limits:

- extract components when a screen becomes difficult to read
- extract repeated UI patterns
- keep business logic outside visual components

Components must support accessibility props where relevant.

Interactive components must expose:

- accessibility role
- accessibility label
- disabled state
- press feedback

---

# Error Handling

Expected failures must be handled gracefully.

Examples:

- storage unavailable
- invalid persisted data
- notification permission denied
- notification scheduling failure
- missing task data

Do not show raw technical errors to users.

Development errors may be logged in development mode.

The application must provide safe fallback behavior in production.

---

# Logging

Use a small centralized logger.

Development logging may use the console through that logger.

Production code must not contain scattered console statements.

Never log sensitive user information.

---

# Testing Strategy

## Unit Tests

Use unit tests for:

- task filtering
- task selection
- recent-task exclusion
- persistence parsing
- storage migration
- date utilities

## Component Tests

Use React Native Testing Library for important reusable components and user flows.

Prioritize tests for:

- completing a task
- changing context
- selecting energy level
- toggling favorites
- empty history state
- onboarding completion

## Manual Tests

Test on:

- Android physical device
- iPhone through Expo Go or a development build
- small screen
- large screen
- light mode
- dark mode
- increased font size
- reduced motion
- offline mode

---

# Performance Rules

Avoid unnecessary rerenders.

Use Zustand selectors.

Do not memoize everything automatically.

Large static task data should not be recreated during every render.

Keep the Home screen initialization lightweight.

The application should not require network requests during startup.

---

# Accessibility Rules

Every interactive control must have an accessible label.

Do not rely only on color.

Support screen-reader reading order.

Respect device font scaling where layout permits.

Respect reduced-motion preferences.

Touch targets must be at least 44 by 44 points.

---

# Security and Privacy

MVP should collect no personal data.

No account is required.

No analytics SDK should be added without updating:

- privacy policy
- App Store privacy information
- Google Play Data Safety form
- this architecture document

Do not store sensitive personal information.

---

# Analytics

No analytics in the initial MVP.

Before introducing analytics, define:

- exact events
- business purpose
- retention period
- consent requirements
- privacy disclosures

Do not add analytics merely because it is common.

---

# Monetization

No monetization code in the initial foundation phase.

Future purchases may use RevenueCat.

Premium architecture must not be implemented before premium product requirements are finalized.

Core free usage must never depend on purchase-service availability.

---

# Future Migration Paths

The architecture should allow:

## AsyncStorage to MMKV

Repositories should hide the underlying storage implementation.

## Offline Data to Supabase

Domain models and repositories should remain independent of Supabase types.

## Static Tasks to Remote Task Packs

The task engine should consume task-domain objects regardless of source.

## Anonymous Usage to Account Sync

Authentication should be introduced at the application boundary without rewriting core task logic.

## Mobile to Widgets and Watch Apps

Task selection logic should remain independent from React Native screens where practical.

---

# Dependency Policy

Before adding a package:

1. Confirm the functionality is not already provided by Expo or React Native.
2. Confirm the package is actively maintained.
3. Confirm compatibility with the current Expo SDK.
4. Confirm it works on both iOS and Android.
5. Evaluate bundle and native-build impact.
6. Document why it is required.

Dependencies must be installed through Expo-compatible commands when appropriate.

---

# Definition of Done

A technical task is complete only when:

- the application builds
- TypeScript passes
- lint passes
- relevant tests pass
- the feature works offline
- light and dark themes are considered
- accessibility is considered
- reduced motion is considered
- no unrelated files are changed
- no placeholder implementation remains
- documentation is updated when architecture changes

---

# Architecture Decision Summary

The MVP uses:

- React Native
- Expo
- TypeScript
- Expo Router
- Zustand
- AsyncStorage
- Expo Notifications
- Expo Haptics
- Lucide React Native
- centralized design tokens
- offline-first local task data
- no account
- no backend
- no analytics
- no monetization code

This architecture should remain deliberately small until real product needs justify additional complexity.