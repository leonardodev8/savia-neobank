# Savia

**Tu dinero, claro y en movimiento.**

Savia is a digital banking app built as a showcase and production-grade portfolio project using React Native. It addresses real-world concerns faced by modern banking apps, including biometric authentication with encrypted session storage, handling money as integer cents (never floats), virtualized transaction lists for performance, and a strict Clean Architecture with framework-agnostic domain logic.

> All UI text is in Spanish and monetary amounts use Peruvian Soles (`S/`).

## Tech stack (mobile)

- **Expo SDK 56** · React Native 0.85 · React 19 · TypeScript `strict`
- **Expo Router** (file-based navigation) with protected routes
- **TanStack Query v5** (server state) + **Zustand** (client state)
- **NativeWind** (Tailwind for RN) + centralized design tokens
- **expo-secure-store** for encrypted token storage, **expo-local-authentication** for biometrics
- **Jest** (`jest-expo`) + React Native Testing Library

## Getting started

### Prerequisites

- Node.js 22 LTS (20.19.4 minimum)
- For local native builds: JDK 17 and Android Studio (Android SDK), or Xcode on macOS

### Install and run

```sh
cd mobile
npm ci
npx expo run:android   # or: npx expo run:ios
```

This produces a local development build and starts the dev server. On subsequent runs you can just start the server with `npx expo start`.

Development builds can also be produced in the cloud with [EAS](https://docs.expo.dev/develop/development-builds/introduction/):

```sh
npm install -g eas-cli
eas login
eas init            # links the project to your Expo account (one-time)
eas build --profile development --platform android
```

### Scripts

Run from `mobile/`:

| Script | What it does |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run test` | Jest unit tests |
| `npm run format` | Prettier |

## Continuous integration

Every push to `main` and every pull request runs typecheck, lint, and unit tests via GitHub Actions (`.github/workflows/ci.yml`). CI must be green before merging.

## Architecture

The app follows a feature-based Clean Architecture: each feature is a self-contained slice with `data` (DTOs, mappers, repositories), `domain` (entities, use-cases; no React, no API knowledge), and `presentation` (screens, components, ViewModels). Cross-cutting infrastructure lives in `core/` and reusable UI in `shared/`.

## License

[MIT](LICENSE)
