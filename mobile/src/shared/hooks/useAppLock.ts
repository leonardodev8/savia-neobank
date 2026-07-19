/**
  Watches AppState to protect the session when the app leaves the foreground:
  reports when content should be hidden from the app switcher (isObscured)
  locks the session when the app comes back after AUTO_LOCK_MS away
**/
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { env } from "@/core/config/env";
import { shouldLock } from "@/core/security/autoLock";
import { useAuthStore } from "@/store/authStore";

export const useAppLock = (): { isObscured: boolean } => {
  const lock = useAuthStore((s) => s.lock);
  const [isObscured, setIsObscured] = useState(false);
  // Set once when leaving the foreground (iOS fires "inactive" then "background")
  const backgroundedAt = useRef<number | null>(null);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        if (shouldLock(backgroundedAt.current, Date.now(), env.AUTO_LOCK_MS)) {
          lock();
        }
        backgroundedAt.current = null;
        setIsObscured(false);
      } else {
        backgroundedAt.current ??= Date.now();
        setIsObscured(true);
      }
    });
    return () => sub.remove();
  }, [lock]);

  return { isObscured };
};
