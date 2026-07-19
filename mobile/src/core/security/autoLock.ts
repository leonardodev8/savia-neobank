// Auto-lock policy. Pure time math so the rule is testable without React or AppState.
// True when the app has been away long enough for the session to require re-authentication
export const shouldLock = (
  backgroundedAt: number | null,
  now: number,
  timeoutMs: number,
): boolean => backgroundedAt !== null && now - backgroundedAt >= timeoutMs;
