/**
  One movement row: toned initials, title + subtitle, signed amount.
  Memoized so paging and filtering don't redraw unchanged rows
**/
import { memo } from "react";
import { Text, View } from "react-native";
import { tokens } from "@/core/theme/tokens";
import type { TransactionRowVM } from "../viewmodels/movementsList";

type Props = { movement: TransactionRowVM };

export const TransactionRow = memo(({ movement }: Props) => {
  const tone = tokens.avatarTone[movement.tone];

  return (
    <View
      className="flex-row items-center gap-[13px] py-[10px]"
      testID={`movement-row-${movement.id}`}
    >
      <View
        className="h-[44px] w-[44px] items-center justify-center rounded-[13px]"
        style={{ backgroundColor: tone.bg }}
      >
        <Text
          className="font-sans-bold text-[14px]"
          style={{ color: tone.ink }}
        >
          {movement.initials}
        </Text>
      </View>

      <View className="min-w-0 flex-1">
        <Text
          className="font-sans-semibold text-[14.5px] text-ink"
          numberOfLines={1}
        >
          {movement.title}
        </Text>
        <Text className="text-[12.5px] text-muted">{movement.subtitle}</Text>
      </View>

      <Text
        className={
          movement.isIncome
            ? "font-sans-bold text-[15px] text-income"
            : "font-sans-bold text-[15px] text-expense"
        }
        style={{ fontVariant: ["tabular-nums"] }}
      >
        {movement.amountText}
      </Text>
    </View>
  );
});

TransactionRow.displayName = "TransactionRow";
