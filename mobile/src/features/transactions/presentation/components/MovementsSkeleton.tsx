// Loading placeholder mirroring the row layout
import { View } from "react-native";

const SkeletonRow = () => (
  <View className="flex-row items-center gap-[13px] py-[10px]">
    <View className="h-[44px] w-[44px] rounded-[13px] bg-hairline" />
    <View className="flex-1 gap-[7px]">
      <View className="h-[13px] w-3/5 rounded-full bg-hairline" />
      <View className="h-[11px] w-2/5 rounded-full bg-hairline" />
    </View>
    <View className="h-[13px] w-[64px] rounded-full bg-hairline" />
  </View>
);

const ROWS = Array.from({ length: 8 }, (_, i) => i);

export const MovementsSkeleton = () => (
  <View className="pt-2" testID="movements-skeleton">
    {ROWS.map((i) => (
      <SkeletonRow key={i} />
    ))}
  </View>
);
