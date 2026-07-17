# 2 Mins — App Store Release Requirements

Version: 1.0  
Status: Pre-Release Planning  
Platforms: Apple App Store and Google Play

---

# Purpose

This document defines everything required to publish 2 Mins on:

- Apple App Store
- Google Play

It covers:

- developer accounts
- application identifiers
- technical builds
- store listings
- privacy requirements
- testing
- screenshots
- review preparation
- release workflow

This document must be updated whenever Apple, Google, or Expo release requirements change.

---

# Release Strategy

The application will be released using Expo Application Services.

Primary tools:

- Expo
- EAS Build
- EAS Submit
- App Store Connect
- TestFlight
- Google Play Console
- Google Play testing tracks

The release process should be handled in this order:

1. Finish MVP.
2. Complete internal quality checks.
3. Create store developer accounts.
4. Configure permanent app identifiers.
5. Create production builds.
6. Upload test builds.
7. Complete store metadata and privacy forms.
8. Run external testing where required.
9. Submit both applications for review.
10. Release gradually after approval.

---

# App Identity

## Public App Name

```text
2 Mins
```

## Tagline

```text
Start before you're ready.
```

## Apple Bundle Identifier

Recommended:

```text
com.silentfrost.2mins
```

## Android Package Name

Recommended:

```text
com.silentfrost.twomins
```

The word `2mins` may not be accepted consistently in every identifier format.

The final identifiers must be decided before the first production store build.

Once an application is published, its bundle identifier or package name cannot be casually changed.

## Expo Project Slug

Recommended:

```text
2mins
```

## URL Scheme

Recommended:

```text
twomins
```

---

# Developer Accounts

## Apple Developer Program

Required for:

- App Store distribution
- TestFlight
- signing certificates
- production iOS builds
- App Store Connect access

The account must use:

- the legal account holder name
- a verified Apple Account
- two-factor authentication
- valid contact information
- valid payment information

An individual account will display the account holder's legal personal name as the seller.

An organization account requires a legally registered organization and additional business verification.

## Google Play Console

Required for:

- Android app distribution
- testing tracks
- store listing
- app signing
- production access

The developer account requires:

- identity verification
- legal developer information
- contact information
- payment of the registration fee
- policy declarations

New personal accounts may be required to complete a closed test before production access is granted.

At the time of this document, the expected requirement is:

- at least 12 opted-in testers
- testers remain enrolled continuously for at least 14 days
- production access application after testing

This requirement must be checked again before release.

---

# Apple Technical Requirements

Apple submission requirements change over time.

At the time of this document:

- iOS applications must be built using a currently accepted iOS SDK
- applications uploaded after April 28, 2026 must use the iOS 26 SDK or later
- builds must be produced with Xcode 26 or later
- the application must support currently required device and privacy standards

EAS Build should use an Expo SDK version that supports the required Apple SDK.

Before submission, verify:

- current Expo SDK
- current EAS build image
- Apple minimum SDK requirement
- deployment target
- iPhone compatibility
- iPad support configuration
- application privacy manifest requirements

---

# Google Technical Requirements

Google Play requires new applications and updates to target a recent Android API level.

Before submission, verify:

- current required target API level
- minimum Android version
- package name
- app signing configuration
- Android App Bundle output
- 64-bit support
- adaptive icon
- notification permission behavior
- edge-to-edge layout behavior
- background task restrictions

Production builds should use Android App Bundle format:

```text
.aab
```

Do not upload a debug build.

---

# Expo and EAS Setup

## Required Global Tool

Install or update EAS CLI:

```powershell
npm install -g eas-cli
```

Verify:

```powershell
eas --version
```

## Expo Authentication

Log in:

```powershell
eas login
```

Verify the current account:

```powershell
eas whoami
```

## Project Configuration

Initialize EAS:

```powershell
eas build:configure
```

This should create:

```text
eas.json
```

Do not run production builds until:

- app identifiers are approved
- app icon is final
- splash configuration is final
- versioning is configured
- privacy declarations are understood

---

# Build Profiles

The project should eventually contain the following EAS build profiles.

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

## Development Build

Used for:

- local device development
- native dependency testing
- notification testing
- debugging

## Preview Build

Used for:

- internal testers
- stakeholder review
- release candidate testing

## Production Build

Used for:

- TestFlight
- App Store
- Google Play

---

# Versioning

## Public Version

Example:

```text
1.0.0
```

This is the version users see.

## iOS Build Number

Example:

```text
1
```

Must increase with every uploaded iOS build.

## Android Version Code

Example:

```text
1
```

Must increase with every uploaded Android build.

EAS may manage build-number increments automatically.

## Version Rules

Use semantic versioning:

```text
Major.Minor.Patch
```

Examples:

```text
1.0.0
1.0.1
1.1.0
2.0.0
```

Do not reuse an already uploaded build number or Android version code.

---

# Store Categories

## Apple Primary Category

Recommended:

```text
Productivity
```

## Apple Secondary Category

Possible:

```text
Lifestyle
```

## Google Play Category

Recommended:

```text
Productivity
```

The category should describe the actual current product, not future ambitions.

---

# Age Rating

2 Mins is intended to contain:

- no violence
- no gambling
- no sexual content
- no unrestricted web browsing
- no user-generated public content
- no social networking
- no controlled substances
- no medical diagnosis

Expected age rating:

```text
4+ or equivalent low-age classification
```

The final rating must be generated through each store's questionnaire.

Do not manually claim a rating without completing the official forms.

---

# App Store Listing Content

## App Name

```text
2 Mins
```

The final name must be checked for availability.

## Apple Subtitle

Maximum length must be verified before submission.

Draft:

```text
Start with one small action
```

## Google Short Description

Draft:

```text
One calm, useful action you can start in less than two minutes.
```

## Promotional Text

Draft:

```text
Start before you're ready. 2 Mins gives you one small action for the moment you're in.
```

## Full Description Draft

```text
Starting is often harder than doing.

2 Mins helps you begin with one small action at a time.

Tell the app where you are and how much energy you have. It will suggest one calm, useful action that can be started or completed in less than two minutes.

No complicated plans.
No guilt.
No streak pressure.
No overwhelming task lists.

Just one small thing for right now.

Features:

• Curated two-minute actions
• Suggestions based on context and energy
• Calm low-energy actions
• Favorites
• Completion history
• Gentle reminders
• Light and dark themes
• Fully offline use
• No account required

Start before you're ready.
```

Store copy must be reviewed again after the final product is complete.

Do not advertise features that are not included in the submitted build.

---

# Keywords

Possible Apple keyword concepts:

```text
productivity
procrastination
focus
micro habits
small tasks
self care
motivation
mindfulness
daily reset
ADHD productivity
```

Keyword selection must:

- avoid competitor names
- avoid misleading claims
- avoid medical claims
- describe real product functionality
- fit Apple's current keyword character limit

Google Play does not use a separate keyword field in the same way.

Keywords should appear naturally in the description.

Do not stuff keywords unnaturally.

---

# Store Screenshots

Screenshots should communicate the product in a few seconds.

## Screenshot Story

### Screenshot 1

Headline:

```text
Start before you're ready.
```

Visual:

Home screen with one task.

### Screenshot 2

Headline:

```text
One small thing for right now.
```

Visual:

Main task card and Start button.

### Screenshot 3

Headline:

```text
Made for the moment you're in.
```

Visual:

Context and energy selection.

### Screenshot 4

Headline:

```text
No pressure. No streaks.
```

Visual:

Calm completion state.

### Screenshot 5

Headline:

```text
Keep the ones that help.
```

Visual:

Favorites screen.

### Screenshot 6

Headline:

```text
Your small wins, quietly saved.
```

Visual:

History screen.

### Screenshot 7

Headline:

```text
Light or dark. Always calm.
```

Visual:

Light and dark themes.

## Screenshot Rules

Screenshots must:

- use real application UI
- match the submitted version
- avoid fake features
- avoid unreadable tiny text
- respect safe areas
- use consistent marketing typography
- avoid excessive decoration
- avoid device frames unless they improve clarity
- avoid personal or sensitive test data

Required device sizes must be checked immediately before submission.

---

# App Icon

The final icon must follow `docs/DESIGN.md`.

Direction:

- warm cream background
- two dark circular dots
- left dot slightly larger
- right dot slightly smaller
- no text
- no number
- no clock

## Apple Icon Requirements

Provide a high-resolution square source icon.

Do not include transparent pixels in the final App Store icon unless current Apple tooling explicitly supports the chosen configuration.

Do not manually round the icon corners.

Apple applies its own mask.

## Android Icon Requirements

Prepare:

- adaptive foreground layer
- adaptive background layer
- standard legacy icon
- monochrome icon if supported and appropriate

The icon must remain recognizable at small sizes.

---

# Splash Screen

The splash screen should be minimal.

Recommended:

- background matching light-theme background
- centered two-dot mark
- no tagline
- no animation dependency
- fast transition into the app

Avoid a long branded intro.

The splash screen should not delay startup.

---

# Privacy Position

The initial MVP should:

- require no account
- use no advertising SDK
- use no analytics SDK
- contain no third-party tracking
- store user data locally
- work offline
- avoid collecting personal information

Expected local data:

- onboarding status
- theme preference
- selected context
- selected energy level
- favorite task identifiers
- completion history
- notification preferences

This data should remain on the user's device in the MVP.

---

# Privacy Policy

A public privacy-policy URL is required or strongly recommended for store submission.

The policy should explain:

- what data is stored
- where data is stored
- whether data leaves the device
- notification permissions
- third-party services
- data deletion
- contact information
- policy update date

The policy must match the actual application.

Do not copy a generic privacy policy that claims services we do not use.

## Draft Privacy Summary

```text
2 Mins does not require an account and does not collect personal information in its initial release.

Preferences, favorites, and completion history are stored locally on the user's device.

The application does not use advertising, third-party tracking, or analytics SDKs.

If users enable reminders, notification scheduling is handled through the operating system and Expo-supported notification services where required.

Users can delete locally stored app data through the application settings or by uninstalling the application.
```

A complete privacy-policy document will be prepared before store submission.

---

# Apple App Privacy

App Store Connect requires an App Privacy declaration.

For the initial MVP, the intended declaration should reflect:

```text
No data collected
```

This can only be selected if the final application and all included SDKs genuinely collect no data.

Before submission, inspect every dependency.

If any SDK transmits:

- identifiers
- diagnostics
- usage data
- notification tokens
- crash data
- purchase information

the declaration must be updated.

Do not assume that an SDK collects nothing.

Verify it.

---

# Google Play Data Safety

Google Play requires a Data Safety form.

For the initial MVP, the intended position is:

- no personal data collected
- no data shared
- local app activity remains on device
- users may delete data locally
- no account creation
- no advertising
- no analytics

The final answers must match all included SDK behavior.

Notification-related data handling must be reviewed before submission.

---

# Permissions

The MVP should request as few permissions as possible.

## Expected Permission

Notifications.

## Permission Rules

Do not request notification permission during the first seconds of app launch.

First explain:

- what reminders do
- why the permission is needed
- that reminders are optional

Only request permission after a clear user action.

## Avoid Unnecessary Permissions

Do not request:

- contacts
- precise location
- camera
- microphone
- photo library
- health data
- Bluetooth
- background location

unless a future approved feature genuinely requires them.

---

# Notification Disclosure

Notification copy must remain calm and non-manipulative.

Examples:

```text
Two quiet minutes?
```

```text
One small thing is enough.
```

```text
Start before you're ready.
```

Notifications must not:

- claim urgency
- threaten lost progress
- shame inactivity
- imply medical treatment
- send excessive reminders

Users must be able to disable them easily.

---

# Accessibility Review

Before submission, verify:

- VoiceOver support
- TalkBack support
- accessible button labels
- minimum touch targets
- dynamic font behavior
- sufficient color contrast
- reduced-motion support
- logical focus order
- dark-mode contrast
- landscape behavior where supported

Store review should not be the first accessibility test.

---

# App Review Preparation

## Apple Review Notes

Review notes should explain:

- no account is required
- the app works offline
- onboarding appears only on first launch
- notification permission is optional
- how to reset onboarding if reviewers need to retest it
- where Favorites and History are located
- any feature that may not be immediately obvious

Draft:

```text
2 Mins works fully offline and does not require an account.

On first launch, the app displays a three-screen onboarding flow. After onboarding, users receive one small suggested action.

Users can request another suggestion, complete an action, save favorites, and review local completion history.

Notifications are optional and are only requested after the user opens reminder settings.

To view onboarding again, open Settings and select Reset Onboarding.
```

## Review Contact

Prepare:

- contact name
- email address
- phone number if required
- support URL
- privacy-policy URL

All contact details must be actively monitored during review.

---

# Google Closed Testing Plan

If the Google Play developer account is subject to the personal-account testing requirement:

1. Create a closed testing track.
2. Prepare a production-like Android App Bundle.
3. Add at least 12 reliable testers.
4. Ensure every tester opts into the test.
5. Keep testers continuously enrolled for at least 14 days.
6. Ask testers to install and genuinely use the application.
7. Collect structured feedback.
8. Fix critical issues.
9. Complete the production-access questionnaire.
10. Apply for production access.

Use more than the minimum number of testers when possible.

Recommended target:

```text
15 to 20 testers
```

This reduces the risk of falling below the required minimum if someone leaves the test.

Do not wait until launch week to find testers.

---

# TestFlight Plan

## Internal Testing

Use for:

- developer testing
- trusted team members
- quick build validation

## External Testing

Use for:

- wider beta testing
- realistic user feedback
- final release-candidate testing

External TestFlight builds may require beta review.

Tester instructions should include:

- complete onboarding
- request several tasks
- use all energy levels
- use all contexts
- complete tasks
- favorite and unfavorite tasks
- restart the app
- test notifications
- test dark mode
- report confusing wording
- report crashes

---

# Test Accounts

The MVP has no accounts.

Therefore:

- no review login is required
- no username is required
- no password is required

If accounts are introduced later, a fully functional review account must be supplied.

---

# Support Requirements

Create a simple support page before launch.

It should include:

- application name
- current version
- support email
- frequently asked questions
- notification troubleshooting
- data deletion instructions
- privacy-policy link

Recommended support email format:

```text
support@silentfrost.com
```

Use only an email address that is actively configured and monitored.

---

# Website Requirements

A simple public webpage is recommended.

Possible URL:

```text
https://silentfrost.com/2mins
```

The page may include:

- app icon
- tagline
- short description
- store links
- privacy-policy link
- support link

A complex marketing site is not required for the initial launch.

---

# Content Safety

Every built-in task must be reviewed.

Tasks must not:

- provide medical treatment
- recommend medication changes
- encourage dangerous physical activity
- encourage unsafe driving behavior
- encourage trespassing
- create financial or legal risk
- promote self-harm
- shame the user
- require permissions the app does not have

Physical tasks should be gentle and broadly safe.

Examples:

Good:

```text
Relax your shoulders.
```

```text
Drink a glass of water.
```

Avoid:

```text
Hold your breath for as long as possible.
```

```text
Do fifty push-ups immediately.
```

---

# Medical Positioning

2 Mins is not a medical application.

Do not claim that it:

- treats ADHD
- cures anxiety
- treats depression
- provides therapy
- replaces professional support
- diagnoses any condition

Store copy may describe common experiences such as procrastination or feeling overwhelmed.

Avoid medical outcome promises.

---

# Copyright and Ownership

Before submission, confirm ownership or valid licensing for:

- app icon
- screenshots
- illustrations
- sounds
- copy
- task content
- fonts
- third-party assets

Do not use copyrighted assets copied from other applications.

Lucide usage must comply with its license.

License information should be retained where required.

---

# Store Review Risks

Potential rejection risks include:

- application feels unfinished
- broken navigation
- placeholder content
- misleading store screenshots
- privacy declaration does not match SDK behavior
- notification permission requested without context
- crash on first launch
- duplicate or repetitive task experience
- insufficient lasting value
- unusable large-text layout
- missing privacy-policy URL
- incorrect account or seller information
- non-functional support URL
- hidden or undocumented purchases
- inappropriate medical claims

Each risk must be checked before submission.

---

# Minimum Value Review

Apple may reject apps that appear too limited or incomplete.

2 Mins must demonstrate lasting value through:

- a substantial curated task library
- context personalization
- energy personalization
- Favorites
- History
- local notifications
- accessibility
- polished onboarding
- high-quality design
- meaningful repeat usage

The app must not feel like a single static screen with random text.

---

# Pre-Submission Checklist

## Product

- [ ] MVP scope is complete
- [ ] no placeholder features
- [ ] all user-facing copy is reviewed
- [ ] all built-in tasks are reviewed
- [ ] onboarding works
- [ ] reset onboarding works
- [ ] Favorites work
- [ ] History works
- [ ] Settings work
- [ ] notifications work
- [ ] offline mode works

## Technical

- [ ] TypeScript passes
- [ ] lint passes
- [ ] tests pass
- [ ] production Android build succeeds
- [ ] production iOS build succeeds
- [ ] app identifiers are final
- [ ] build numbers are correct
- [ ] app version is correct
- [ ] no development logs remain
- [ ] no development menu is exposed
- [ ] no test data remains
- [ ] clean install tested
- [ ] application restart tested

## Design

- [ ] final app icon
- [ ] adaptive Android icon
- [ ] splash screen
- [ ] light mode reviewed
- [ ] dark mode reviewed
- [ ] small-screen layout reviewed
- [ ] large-screen layout reviewed
- [ ] large-font layout reviewed
- [ ] reduced-motion behavior reviewed

## Privacy

- [ ] privacy policy published
- [ ] privacy-policy URL works
- [ ] Apple App Privacy form completed
- [ ] Google Data Safety form completed
- [ ] included SDK behavior verified
- [ ] permission explanations reviewed
- [ ] local data deletion works

## Store Listing

- [ ] app name available
- [ ] subtitle prepared
- [ ] short description prepared
- [ ] full description prepared
- [ ] keywords prepared
- [ ] category selected
- [ ] age-rating forms completed
- [ ] screenshots uploaded
- [ ] support URL works
- [ ] support email works
- [ ] review notes prepared

## Testing

- [ ] TestFlight internal test completed
- [ ] TestFlight external test completed if needed
- [ ] Google internal test completed
- [ ] Google closed-test requirement completed if applicable
- [ ] tester feedback reviewed
- [ ] critical issues resolved

---

# Release Commands

These commands are examples and must be run only after EAS is fully configured.

## Android Production Build

```powershell
eas build --platform android --profile production
```

## iOS Production Build

```powershell
eas build --platform ios --profile production
```

## Submit Android

```powershell
eas submit --platform android
```

## Submit iOS

```powershell
eas submit --platform ios
```

## Build Both Platforms

```powershell
eas build --platform all --profile production
```

Do not run production commands casually.

Confirm:

- branch
- version
- build numbers
- environment
- identifiers
- store metadata

before every production build.

---

# Release Day Checklist

1. Confirm approved store versions.
2. Confirm support channels are active.
3. Confirm privacy-policy URL works.
4. Confirm store screenshots are correct.
5. Confirm rollout settings.
6. Release gradually where possible.
7. Install the public version from each store.
8. Test onboarding from a clean installation.
9. Test primary Home flow.
10. Monitor crash reports and reviews.
11. Avoid shipping unrelated changes on launch day.

---

# Post-Launch Monitoring

Monitor:

- startup crashes
- task-selection failures
- persistence failures
- notification issues
- layout issues
- store-review feedback
- support requests
- repeated task complaints
- accessibility complaints

Priority order:

1. crashes
2. data loss
3. broken core flow
4. notification failures
5. accessibility blockers
6. confusing UX
7. cosmetic issues
8. new features

---

# Current Store Status

```text
Apple Developer Account: Not confirmed
Google Play Console Account: Not confirmed
Apple Bundle Identifier: Draft
Android Package Name: Draft
Privacy Policy: Not created
Support Page: Not created
App Icon: Direction approved, final asset pending
Store Screenshots: Pending
EAS Configuration: Pending
TestFlight Build: Pending
Google Test Build: Pending
Public Release: Pending
```

---

# Next Store Action

No store account or production build action is required during the current foundation stage.

The immediate next action is:

```text
Complete the technical foundation and produce a stable development build.
```

Store accounts should be prepared well before the MVP is finished, especially because Google Play production access may require an extended closed-testing period.