/**
  Custom bottom tab bar: regular tabs plus one raised center FAB route.
  Labels and icons come from each screen's options (title, tabBarIcon),
  so this stays independent of the actual routes
**/
import { Pressable, Text, View } from "react-native";
import { tokens } from "@/core/theme/tokens";
import type { BottomTabBarProps } from "expo-router/js-tabs";

type TabBarProps = BottomTabBarProps & {
  // Route name rendered as the raised center FAB
  fabRouteName: string;
};

const MIN_BOTTOM_PADDING = 10;

export const TabBar = ({
  state,
  descriptors,
  navigation,
  insets,
  fabRouteName,
}: TabBarProps) => {
  return (
    <View
      className="flex-row border-t border-hairline bg-surface px-2 pt-[10px]"
      style={{ paddingBottom: Math.max(insets.bottom, MIN_BOTTOM_PADDING) }}
    >
      {state.routes.map((route, index) => {
        const descriptor = descriptors[route.key];
        if (!descriptor) return null;

        const { options } = descriptor;
        const isActive = state.index === index;
        const isFab = route.name === fabRouteName;
        const label = options.title ?? route.name;
        const color = isActive ? tokens.color.primary : tokens.color.muted;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityLabel={label}
            accessibilityState={{ selected: isActive }}
            testID={`tab-${route.name}`}
            className="flex-1 items-center"
          >
            {isFab ? (
              <View className="-mt-4 items-center gap-1">
                <View
                  className="h-[52px] w-[52px] items-center justify-center rounded-[18px] bg-primary"
                  style={{
                    shadowColor: tokens.color.primary,
                    shadowOpacity: 0.5,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 8 },
                    elevation: 10,
                  }}
                >
                  {options.tabBarIcon?.({
                    focused: isActive,
                    color: tokens.color.surface,
                    size: 25,
                  })}
                </View>
                <Text
                  className="font-sans-semibold text-[10.5px]"
                  style={{ color }}
                >
                  {label}
                </Text>
              </View>
            ) : (
              <View className="items-center gap-1 pt-[2px]">
                {options.tabBarIcon?.({ focused: isActive, color, size: 25 })}
                <Text
                  className={
                    isActive
                      ? "font-sans-semibold text-[10.5px]"
                      : "font-sans-medium text-[10.5px]"
                  }
                  style={{ color }}
                >
                  {label}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};
