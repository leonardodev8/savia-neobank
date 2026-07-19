/**
  Global auth slice (client state). Stores the session and drives route gating the root layout. 
  The session is persisted in 'secureStore' (encrypted), allowing it to be restored on app launch via 'hydrate()'
**/
import { create } from "zustand";
import { secureStore } from "@/core/storage/secureStore";
import type { Session } from "@/features/auth";

type AuthStatus = "idle" | "authenticated" | "locked" | "unauthenticated";

type AuthState = {
  status: AuthStatus;
  session: Session | null;
  // Restore a persisted session on launch. Resolves "idle" -> locked/unauthed
  hydrate: () => Promise<void>;
  signIn: (session: Session) => Promise<void>;
  signOut: () => Promise<void>;
  // Keep the session but require biometrics/code again to see any content
  lock: () => void;
};

const SESSION_KEY = "savia.session";

export const useAuthStore = create<AuthState>((set) => ({
  status: "idle",
  session: null,

  hydrate: async () => {
    const raw = await secureStore.get(SESSION_KEY);
    if (!raw) {
      set({ status: "unauthenticated", session: null });
      return;
    }
    try {
      const session = JSON.parse(raw) as Session;
      // Never restore straight into the app: a persisted session still
      // requires biometrics or the code on every launch
      set({ status: "locked", session });
    } catch {
      // Corrupt payload, drop it and fall back to logged-out
      await secureStore.remove(SESSION_KEY);
      set({ status: "unauthenticated", session: null });
    }
  },

  signIn: async (session) => {
    await secureStore.set(SESSION_KEY, JSON.stringify(session));
    set({ status: "authenticated", session });
  },

  signOut: async () => {
    await secureStore.remove(SESSION_KEY);
    set({ status: "unauthenticated", session: null });
  },

  lock: () => {
    set((state) =>
      state.status === "authenticated" ? { status: "locked" } : state,
    );
  },
}));
