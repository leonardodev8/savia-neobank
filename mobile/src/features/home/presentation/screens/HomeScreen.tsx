/**
  Home: header, balance card, quick actions and recent movements
**/
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/core/theme/tokens";
import { BalanceCard } from "../components/BalanceCard";
import { HomeHeader } from "../components/HomeHeader";
import { MovementRow } from "../components/MovementRow";
import { QuickActions } from "../components/QuickActions";
import { useHomeViewModel } from "../viewmodels/useHomeViewModel";

export const HomeScreen = () => {
  const vm = useHomeViewModel();

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]} testID="home-screen">
      <ScrollView
        contentContainerClassName="pb-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-[22px] pt-2">
          <HomeHeader
            greeting={vm.greeting}
            fullName={vm.user.fullName}
            initials={vm.user.initials}
          />
        </View>

        {vm.isLoading ? (
          <View className="items-center py-24">
            <ActivityIndicator color={tokens.color.primary} />
          </View>
        ) : vm.error ? (
          <View className="items-center gap-3 px-9 py-24">
            <Text className="text-center text-[14px] text-secondary">
              No pudimos cargar tu información
            </Text>
            <Pressable
              onPress={vm.onRetry}
              accessibilityRole="button"
              accessibilityLabel="Reintentar"
              testID="home-retry"
              className="rounded-button bg-primary px-6 py-3 active:opacity-90"
            >
              <Text className="font-sans-semibold text-[14px] text-white">
                Reintentar
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            {vm.balance ? (
              <View className="px-[22px] pt-[18px]">
                <BalanceCard
                  valueText={vm.balance.valueText}
                  accountLine={vm.balance.accountLine}
                  visible={vm.balance.visible}
                  onToggleVisibility={vm.onToggleBalanceVisibility}
                />
              </View>
            ) : null}

            <View className="px-[14px] pt-5">
              <QuickActions onTransferPress={vm.onTransferPress} />
            </View>

            <View className="flex-row items-center justify-between px-[22px] pt-6">
              <Text className="font-sans-bold text-[17px] text-ink">
                Movimientos recientes
              </Text>
              <Pressable
                onPress={vm.onSeeAllPress}
                accessibilityRole="button"
                accessibilityLabel="Ver todos los movimientos"
                testID="home-see-all"
                className="active:opacity-70"
              >
                <Text className="font-sans-semibold text-[13px] text-primary">
                  Ver todo
                </Text>
              </Pressable>
            </View>

            <View className="px-[22px] pt-3">
              {vm.movements.length === 0 ? (
                <Text className="py-8 text-center text-[13px] text-muted">
                  Aún no tienes movimientos
                </Text>
              ) : (
                vm.movements.map((movement, index) => (
                  <View key={movement.id}>
                    {index > 0 ? <View className="h-px bg-hairline" /> : null}
                    <MovementRow movement={movement} />
                  </View>
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
