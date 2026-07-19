import { useAuthStore } from "./authStore";
import { secureStore } from "@/core/storage/secureStore";
import type { Session } from "@/features/auth";

// Unit tests use a simple in-memory version of the encrypted store, so they do not need the native module
jest.mock("@/core/storage/secureStore", () => {
  const data = new Map<string, string>();
  return {
    secureStore: {
      get: jest.fn((key: string) => Promise.resolve(data.get(key) ?? null)),
      set: jest.fn((key: string, value: string) => {
        data.set(key, value);
        return Promise.resolve();
      }),
      remove: jest.fn((key: string) => {
        data.delete(key);
        return Promise.resolve();
      }),
    },
  };
});

const session: Session = {
  token: "jwt-token",
  issuedAt: "2026-07-09T10:00:00-05:00",
  user: {
    id: "acc-1",
    fullName: "Leonardo Buleje",
    initials: "LB",
    maskedAccount: "**** **** 4821",
  },
};

const SESSION_KEY = "savia.session";

describe("authStore", () => {
  beforeEach(async () => {
    await secureStore.remove(SESSION_KEY);
    useAuthStore.setState({ status: "idle", session: null });
    jest.clearAllMocks();
  });

  it("hydrates to unauthenticated when nothing is persisted", async () => {
    await useAuthStore.getState().hydrate();
    expect(useAuthStore.getState().status).toBe("unauthenticated");
  });

  it("hydrates a persisted session to locked, never straight to authenticated", async () => {
    await secureStore.set(SESSION_KEY, JSON.stringify(session));

    await useAuthStore.getState().hydrate();

    const state = useAuthStore.getState();
    expect(state.status).toBe("locked");
    expect(state.session).toEqual(session);
  });

  it("drops a corrupt payload and hydrates to unauthenticated", async () => {
    await secureStore.set(SESSION_KEY, "{not json");

    await useAuthStore.getState().hydrate();

    expect(useAuthStore.getState().status).toBe("unauthenticated");
    expect(secureStore.remove).toHaveBeenCalledWith(SESSION_KEY);
  });

  it("persists the session on signIn", async () => {
    await useAuthStore.getState().signIn(session);

    expect(useAuthStore.getState().status).toBe("authenticated");
    expect(secureStore.set).toHaveBeenCalledWith(
      SESSION_KEY,
      JSON.stringify(session),
    );
  });

  it("locks an authenticated session and keeps it in memory", async () => {
    await useAuthStore.getState().signIn(session);

    useAuthStore.getState().lock();

    const state = useAuthStore.getState();
    expect(state.status).toBe("locked");
    expect(state.session).toEqual(session);
  });

  it("does not lock when there is no authenticated session", () => {
    useAuthStore.setState({ status: "unauthenticated", session: null });

    useAuthStore.getState().lock();

    expect(useAuthStore.getState().status).toBe("unauthenticated");
  });

  it("clears everything on signOut", async () => {
    await useAuthStore.getState().signIn(session);

    await useAuthStore.getState().signOut();

    expect(useAuthStore.getState().status).toBe("unauthenticated");
    expect(useAuthStore.getState().session).toBeNull();
    expect(secureStore.remove).toHaveBeenCalledWith(SESSION_KEY);
  });
});
