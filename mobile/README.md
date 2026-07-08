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
```