// Sticky day separator; opaque background so rows scroll under it
import { memo } from "react";
import { Text, View } from "react-native";

type Props = { label: string };

export const DateHeader = memo(({ label }: Props) => (
  <View className="bg-bg pb-[6px] pt-[14px]">
    <Text className="font-sans-bold text-[12px] uppercase tracking-[0.5px] text-muted">
      {label}
    </Text>
  </View>
));

DateHeader.displayName = "DateHeader";
