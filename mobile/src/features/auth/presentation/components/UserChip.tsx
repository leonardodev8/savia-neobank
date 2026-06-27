import { Text, View } from "react-native";

type UserChipProps = {
  initials: string;
  fullName: string;
  maskedAccount: string;
};

export const UserChip = ({
  initials,
  fullName,
  maskedAccount,
}: UserChipProps) => (
  <View className="mb-[26px] flex-row items-center gap-3">
    <View className="h-11 w-11 items-center justify-center rounded-full bg-primary">
      <Text className="font-sans-bold text-[15px] text-white">{initials}</Text>
    </View>
    <View>
      <Text className="font-sans-semibold text-body text-ink">{fullName}</Text>
      <Text
        className="font-sans text-label text-muted"
        style={{ fontVariant: ["tabular-nums"] }}
      >
        {maskedAccount}
      </Text>
    </View>
  </View>
);
