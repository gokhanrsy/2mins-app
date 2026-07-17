# Task 001 — Project Foundation

You are working inside the 2 Mins Expo React Native repository.

Before making any changes, read all of the following files:

- `.codex/AGENTS.md`
- `docs/PRODUCT.md`
- `docs/PRD.md`
- `docs/BRAND.md`
- `docs/NORTH_STAR.md`
- `docs/DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/APP_STORE.md`

These documents are the source of truth.

---

# Goal

Create the clean technical foundation for the 2 Mins mobile application.

Do not implement product features yet.

The result must be a minimal, production-ready Expo project prepared for later feature work.

---

# Required Work

## 1. Inspect the Existing Project

Review:

- `package.json`
- `app.json`
- `tsconfig.json`
- Expo Router structure
- existing dependencies
- default Expo example files
- existing assets

Do not assume the project is clean.

---

## 2. Remove Expo Example Code

Remove all default Expo example content that is not needed.

This includes:

- example screens
- example components
- demo hooks
- demo constants
- unused example assets
- instructional boilerplate
- unused styles

Do not delete files required by Expo Router or Expo startup.

---

## 3. Create the Approved Folder Structure

Create only the required folders.

```text
app/
src/
├── components/
│   ├── ui/
│   ├── layout/
│   └── feedback/
├── features/
│   ├── onboarding/
│   ├── tasks/
│   ├── favorites/
│   ├── history/
│   ├── settings/
│   └── notifications/
├── data/
│   └── tasks/
├── hooks/
├── repositories/
├── services/
├── stores/
├── theme/
├── types/
└── utils/
tests/
```

Do not create unnecessary placeholder files inside every directory.

Use `.gitkeep` only where Git needs an empty folder to remain tracked.

---

## 4. Install Foundation Dependencies

Install only the following dependencies if they are not already installed:

```text
zustand
@react-native-async-storage/async-storage
lucide-react-native
expo-haptics
```

Use Expo-compatible installation commands where appropriate.

Do not add Redux.

Do not add MMKV.

Do not add Firebase.

Do not add Supabase.

Do not add analytics.

Do not add monetization packages.

Do not add any other dependency unless it is absolutely required for the project to build.

If another dependency is required, explain why before installing it.

---

## 5. Configure TypeScript

Keep TypeScript strict.

Ensure path aliases work for:

```text
@/*
```

The alias should resolve to:

```text
src/*
```

Do not weaken strictness.

Do not introduce `any`.

---

## 6. Create a Minimal Application Shell

Create a minimal app that launches successfully.

The application should show one simple screen containing:

```text
2 Mins

Start before you're ready.
```

This is not the final Home screen.

It is only a temporary foundation verification screen.

The screen should:

- use React Native components
- respect safe areas
- work on Android and iOS
- use no hardcoded demo navigation
- contain no product logic
- contain no animations
- contain no task system

Keep route files small.

---

## 7. Create Initial Navigation Structure

Use Expo Router.

Required initial route structure:

```text
app/
├── _layout.tsx
└── index.tsx
```

Do not create onboarding or tab routes yet.

The root layout should be ready for future navigation expansion.

---

## 8. Create Foundation Constants

Create a minimal application metadata file.

Suggested location:

```text
src/constants/app.ts
```

It should contain:

```ts
export const APP_NAME = "2 Mins";
export const APP_TAGLINE = "Start before you're ready.";
```

If `src/constants` does not exist in the architecture, create it only because these values are genuine shared constants.

Update `docs/ARCHITECTURE.md` if this new folder changes the approved structure.

---

## 9. Configure App Metadata

Review `app.json` or `app.config.ts`.

Set only safe foundation metadata:

```text
name: 2 Mins
slug: 2mins
version: 0.1.0
orientation: portrait
userInterfaceStyle: automatic
```

Do not finalize bundle identifiers yet.

Do not configure production signing.

Do not configure EAS.

Do not claim permissions that are not yet used.

---

## 10. Preserve Required Assets

Keep only assets currently required for Expo startup.

Do not create final branding assets.

Do not generate the final app icon.

Do not create store screenshots.

Temporary default icon assets may remain until the brand asset task.

---

## 11. Add Validation Scripts

Ensure `package.json` provides usable commands for:

```text
start
android
ios
web
lint
typecheck
```

Add a typecheck script using:

```text
tsc --noEmit
```

Do not add fake test scripts unless a test runner is actually configured.

---

## 12. Update README

Update `README.md` only where necessary.

Include:

- project name
- tagline
- current status
- installation command
- development start command
- typecheck command
- lint command

Keep it concise.

Do not duplicate all product documentation.

---

# Constraints

Do not implement:

- onboarding
- task selection
- favorites
- history
- settings
- notifications
- dark mode controls
- Zustand stores
- AsyncStorage repositories
- production design system
- premium features
- AI features

Dependencies may be installed now, but feature implementations belong to later tasks.

Do not redesign the product documents.

Do not change the approved product direction.

Do not modify unrelated files.

---

# Validation

After completing the work, run:

```powershell
npm install
npm run typecheck
npm run lint
```

Also verify the Expo project starts with:

```powershell
npx expo start
```

Do not leave the Expo process running after verification.

---

# Final Response Format

When finished, provide:

## Summary

A concise description of what changed.

## Files Changed

List created, modified, and removed files.

## Dependencies

List installed dependencies and why each one is required.

## Validation

Report the result of:

- `npm run typecheck`
- `npm run lint`
- Expo startup verification

## Notes

Mention any important decision, limitation, or issue.

Do not claim success if a command failed.

Do not continue into the next task.