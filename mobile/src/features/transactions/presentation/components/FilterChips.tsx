// Single-select filter pills under the search box
import { Pressable, Text, View } from "react-native";
import type { MovementsFilterId } from "../viewmodels/movementsList";

type Props = {
  filters: { id: MovementsFilterId; label: string }[];
  active: MovementsFilterId;
  onChange: (id: MovementsFilterId) => void;
};

export const FilterChips = ({ filters, active, onChange }: Props) => (
  <View className="flex-row gap-2">
    {filters.map((filter) => {
      const isActive = filter.id === active;
      return (
        <Pressable
          key={filter.id}
          onPress={() => onChange(filter.id)}
          accessibilityRole="button"
          accessibilityState={{ selected: isActive }}
          accessibilityLabel={`Filtrar: ${filter.label}`}
          testID={`movements-filter-${filter.id}`}
          className={
            isActive
              ? "rounded-pill bg-primary px-[14px] py-[7px]"
              : "rounded-pill border border-hairline-strong bg-surface px-[14px] py-[7px] active:opacity-70"
          }
        >
          <Text
            className={
              isActive
                ? "font-sans-semibold text-[13px] text-white"
                : "font-sans-semibold text-[13px] text-ink-soft"
            }
          >
            {filter.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);
