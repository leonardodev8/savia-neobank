import "../../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { fontMap } from "@/core/theme/fonts";

// Keep the splash screen visible until the fonts are ready
void SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts(fontMap);

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};

export default RootLayout;
