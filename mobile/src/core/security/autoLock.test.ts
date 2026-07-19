import { shouldLock } from "./autoLock";

const TIMEOUT = 60_000;

describe("shouldLock", () => {
  it("never locks when the app was not backgrounded", () => {
    expect(shouldLock(null, Date.now(), TIMEOUT)).toBe(false);
  });

  it("does not lock before the timeout elapses", () => {
    expect(shouldLock(1_000, 1_000 + TIMEOUT - 1, TIMEOUT)).toBe(false);
  });

  it("locks exactly at the timeout", () => {
    expect(shouldLock(1_000, 1_000 + TIMEOUT, TIMEOUT)).toBe(true);
  });

  it("locks after the timeout", () => {
    expect(shouldLock(1_000, 1_000 + TIMEOUT * 10, TIMEOUT)).toBe(true);
  });
});
