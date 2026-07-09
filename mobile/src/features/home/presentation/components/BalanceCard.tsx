/**
  Teal-gradient balance card: label + eye toggle, amount, account line + brand badge
**/
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { tokens } from "@/core/theme/tokens";
import { EyeIcon, EyeOffIcon } from "./icons";

type Props = {
  valueText: string;
  accountLine: string;
  visible: boolean;
  onToggleVisibility: () => void;
};

export const BalanceCard = ({
  valueText,
  accountLine,
  visible,
  onToggleVisibility,
}: Props) => {
  const ToggleIcon = visible ? EyeIcon : EyeOffIcon;

  return (
    <LinearGradient
      colors={tokens.gradient.balance}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={{
        overflow: "hidden",
        borderRadius: tokens.radius.card,
        paddingHorizontal: 22,
        paddingTop: 22,
        paddingBottom: 20,
        shadowColor: tokens.color.primary,
        shadowOpacity: 0.6,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 12 },
        elevation: 12,
      }}
    >
      {/* Decorative corner circle */}
      <View className="absolute -right-[30px] -top-[30px] h-[140px] w-[140px] rounded-full bg-white/[0.06]" />

      <View className="flex-row items-center justify-between">
        <Text className="font-sans-semibold text-[12px] uppercase tracking-[0.6px] text-white/70">
          Saldo disponible
        </Text>
        <Pressable
          onPress={onToggleVisibility}
          accessibilityRole="button"
          accessibilityLabel={visible ? "Ocultar saldo" : "Mostrar saldo"}
          hitSlop={10}
          testID="balance-toggle"
          className="active:opacity-70"
        >
          <ToggleIcon color="rgba(255,255,255,0.8)" />
        </Pressable>
      </View>

      <Text
        className="mt-[10px] font-display text-balance tracking-[-1px] text-white"
        style={{ fontVariant: ["tabular-nums"] }}
        testID="balance-amount"
      >
        {valueText}
      </Text>

      <View className="mt-[14px] flex-row items-center justify-between">
        <Text
          className="text-[13px] text-white/[0.78]"
          style={{ fontVariant: ["tabular-nums"] }}
        >
          {accountLine}
        </Text>
        <View className="rounded-sm bg-white/[0.16] px-[9px] py-1">
          <Text className="font-sans-semibold text-[11px] text-white">
            Savia
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};
