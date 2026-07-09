import "../../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { fontMap } from "@/core/theme/fonts";
import { queryClient } from "@/core/query/queryClient";
import { useAuthStore } from "@/store/authStore";

// Keep the splash visible until the fonts and the persisted session are resolved
void SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts(fontMap);
  const status = useAuthStore((s) => s.status);
  const hydrate = useAuthStore((s) => s.hydrate);

  // Restore any persisted session once on launch
  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const fontsReady = loaded || !!error;
  const authReady = status !== "idle";

  useEffect(() => {
    if (fontsReady && authReady) {
      void SplashScreen.hideAsync();
    }
  }, [fontsReady, authReady]);

  if (!fontsReady || !authReady) {
    return null;
  }

  const isAuthenticated = status === "authenticated";

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/code" />
          </Stack.Protected>
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
