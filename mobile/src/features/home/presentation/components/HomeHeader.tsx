/**
  Home header: avatar initials + greeting on the left, notifications bell on the right
**/
import { Text, View } from "react-native";
import { tokens } from "@/core/theme/tokens";
import { BellIcon } from "./icons";

type Props = {
  greeting: string;
  fullName: string;
  initials: string;
};

export const HomeHeader = ({ greeting, fullName, initials }: Props) => (
  <View className="flex-row items-center justify-between">
    <View className="flex-row items-center gap-[11px]">
      <View className="h-[42px] w-[42px] items-center justify-center rounded-full bg-primary">
        <Text className="font-sans-bold text-[14px] text-white">
          {initials}
        </Text>
      </View>
      <View>
        <Text className="text-[13px] text-secondary">{greeting}</Text>
        <Text className="font-sans-bold text-[16px] text-ink">{fullName}</Text>
      </View>
    </View>

    {/* Notifications entry point (visual only for now) */}
    <View className="h-[42px] w-[42px] items-center justify-center rounded-[13px] border border-hairline bg-surface">
      <BellIcon color={tokens.color.ink} />
      <View className="absolute right-[11px] top-[9px] h-[7px] w-[7px] rounded-full border-[1.5px] border-surface bg-accent" />
    </View>
  </View>
);
