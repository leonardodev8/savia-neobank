/**
  Font registration map for expo-font's 'useFonts'
  Keys become the React Native fontFamily strings and MUST equal the `tokens.fontFamily`
  values (which 'tailwind.config.js' references)
**/

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  InterTight_500Medium,
  InterTight_600SemiBold,
  InterTight_700Bold,
} from "@expo-google-fonts/inter-tight";

export const fontMap = {
  Inter: Inter_400Regular,
  "Inter-Medium": Inter_500Medium,
  "Inter-SemiBold": Inter_600SemiBold,
  "Inter-Bold": Inter_700Bold,
  "InterTight-Medium": InterTight_500Medium,
  "InterTight-SemiBold": InterTight_600SemiBold,
  "InterTight-Bold": InterTight_700Bold,
} as const;
