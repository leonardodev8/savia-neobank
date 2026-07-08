import { useEffect } from "react";
import {
  ActivityIndicator,
  AppState,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenCapture from "expo-screen-capture";
import { tokens } from "@/core/theme/tokens";
import { CodeDots } from "../components/CodeDots";
import { ChevronLeftIcon } from "../components/icons";
import { Keypad } from "../components/Keypad";
import { useCodeViewModel } from "../viewmodels/useCodeViewModel";

export const CodeScreen = () => {
  const vm = useCodeViewModel();
  const { clear } = vm;

  // Block screenshots/screen recording while a code can be on screen
  useEffect(() => {
    void ScreenCapture.preventScreenCaptureAsync("savia-code");
    return () => {
      void ScreenCapture.allowScreenCaptureAsync("savia-code");
    };
  }, []);

  // Wipe any partially entered code when the app leaves the foreground
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state !== "active") clear();
    });
    return () => sub.remove();
  }, [clear]);

  return (
    <SafeAreaView className="flex-1 bg-bg" testID="code-screen">
      {/* Header */}
      <View className="h-12 justify-center px-3">
        <Pressable
          onPress={vm.onBack}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          testID="code-back"
          className="h-10 w-10 items-center justify-center rounded-full active:bg-primary/10"
        >
          <ChevronLeftIcon size={24} color={tokens.color.ink} />
        </Pressable>
      </View>

      {/* Title, subtitle and the masked dots */}
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-display-semibold text-title text-ink">
          Ingresa tu código
        </Text>
        <Text className="mt-2 text-[14px] text-secondary">
          6 dígitos para entrar a Savia
        </Text>

        <View className="mt-9">
          <CodeDots
            filled={vm.filled}
            total={vm.maxLength}
            error={vm.hasError}
          />
        </View>

        {/* Fixed height so the layout doesn't jump when the error shows */}
        <View className="mt-4 h-5 items-center justify-center">
          {vm.errorMessage ? (
            <Text className="text-[13px] text-expense" testID="code-error">
              {vm.errorMessage}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Number pad */}
      <View className="items-center pb-8">
        <Keypad
          onKeyPress={vm.onKeyPress}
          onDelete={vm.onDelete}
          onBiometricPress={vm.onBiometricPress}
          disabled={vm.isLocked || vm.isVerifying}
        />
        <View className="mt-4 h-6 items-center justify-center">
          {vm.isVerifying ? (
            <ActivityIndicator color={tokens.color.primary} />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};
