/**
  Full-screen overlay shown while the app is not in the foreground, so the
  app switcher snapshot shows the brand instead of balances or movements
**/
import { Text, View } from "react-native";

export const PrivacyShield = () => (
  <View
    className="absolute inset-0 items-center justify-center bg-primary"
    pointerEvents="none"
  >
    <Text className="font-display text-[32px] tracking-tight text-white">
      Savia
    </Text>
  </View>
);
