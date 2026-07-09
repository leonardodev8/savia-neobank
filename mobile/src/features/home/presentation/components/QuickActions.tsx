/**
  Quick actions row: Transferir, Recargar, Pagar and Más
  Only Transferir navigates for now; the rest are upcoming features
**/
import { Pressable, Text, View } from "react-native";
import type { ComponentType } from "react";
import { TransferArrowsIcon } from "@/shared/components/ui/icons";
import { tokens } from "@/core/theme/tokens";
import { MoreDotsIcon, PayIcon, RechargeIcon } from "./icons";

type Props = {
  onTransferPress: () => void;
};

type ActionProps = {
  label: string;
  Icon: ComponentType<{ size?: number; color?: string }>;
  onPress?: (() => void) | undefined;
};

const Action = ({ label, Icon, onPress }: ActionProps) => (
  <Pressable
    onPress={onPress}
    disabled={!onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    testID={`quick-action-${label.toLowerCase()}`}
    className="flex-1 items-center gap-2 active:opacity-70"
  >
    <View className="h-[54px] w-[54px] items-center justify-center rounded-tile bg-primary-tint">
      <Icon size={23} color={tokens.color.primary} />
    </View>
    <Text className="font-sans-medium text-[12px] text-ink-soft">{label}</Text>
  </Pressable>
);

export const QuickActions = ({ onTransferPress }: Props) => (
  <View className="flex-row justify-between">
    <Action
      label="Transferir"
      Icon={TransferArrowsIcon}
      onPress={onTransferPress}
    />
    <Action label="Recargar" Icon={RechargeIcon} />
    <Action label="Pagar" Icon={PayIcon} />
    <Action label="Más" Icon={MoreDotsIcon} />
  </View>
);
