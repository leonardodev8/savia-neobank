# Savia

> Mobile banking app: secure, offline-first, and built to stay fast with thousands of transactions.

A digital banking (neobank) client for iOS and Android.

## Stack

- **Framework:** Expo SDK 56 (React Native 0.85, React 19.2), TypeScript (strict)
- **Navigation:** Expo Router (file-based)
- **Styling:** NativeWind v4

## Features

### Login

- **Biometric login** (Face ID/fingerprint/iris) via `expo-local-authentication`, with clear error messages when biometrics are cancelled, locked out, or not set up.
- **6-digit code fallback**: a dedicated code screen with a custom keypad and animated dots, used when biometrics are unavailable or the user prefers it.
- **Screenshot protection** on the code screen (`expo-screen-capture`), so the PIN entry can't be captured.
- **Auto-lock**: the session locks when the app stays in background past a configurable timeout (60s default) and on every cold start, reopening always asks for biometrics or the code. The persisted session is kept, only re-authentication is required.
- **Privacy screen**: a brand overlay covers the UI whenever the app leaves the foreground, so the app switcher never shows balances or movements.

### Home

- **Balance card** with a show/hide toggle that masks the amount (`S/ ******`), account alias and masked account number.
- **Quick actions** (Transferir, Recargar, Pagar, Más) and a **recent movements** list with per-category styling and signed amounts (`+ S/ 3,200.00` / `- S/ 120.00`).
- **Money as integer cents** end to end: amounts are only formatted at render time through a single `core/money` module (no floats, no ad-hoc formatting).
- **Loading / error / empty states** handled, with retry on failure.
- **Tab navigation** with a custom tab bar and a center **Transferir** FAB (Inicio | Movimientos | Transferir | Tarjetas | Perfil).

## Getting started

### Prerequisites

- Node.js **≥ 20.19.4** (22 LTS recommended)
- A **development build** on a device or emulator, Expo Go is not supported on SDK 56
- For local native builds: Android Studio, or Xcode 26.4+ for iOS

### Install

```bash
npm install
```

### Run

SDK 56 requires a development build (not Expo Go).

**Local build** (requires native toolchains):

```bash
npx expo run:android   # or: npx expo run:ios
```

### Quality checks

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run test        # jest
```

## Decisions & tradeoffs

- **No certificate pinning (yet).** Certificate pinning helps protect the app from man-in-the-middle attacks. This is important for banking apps. In Expo, it needs extra native configuration and a new app build. If it is not set up correctly, the app may stop working when the certificate changes. For this MVP, we use TLS and encrypted storage. This is enough for the current mock backend. Certificate pinning can be added later.
- **Session management is handled in the Zustand store.** Actions like `hydrate`, `signIn`, `signOut`, and `lock` are in the store because they control which screens the user can access.
- **Authentication rules stay in the domain layer.** For example, code validation and biometric checks are handled by use-cases and repository interfaces.
- **Sessions are stored only in `expo-secure-store`.** It uses Keychain on iOS and encrypted storage on Android, so tokens stay protected, remain on the current device, and are never saved in `AsyncStorage`.
- **Auto-lock and privacy screen are more important than staying signed in.** The app asks for biometrics or a code after a restart or long time in the background, and it hides sensitive information in recent apps, but full screenshot blocking on Android will be added later.
- **Money transfers are not shown as complete before server confirmation** (planned): They first appear as `pending` and only change to completed after the server confirms the transaction.
