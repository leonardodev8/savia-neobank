/**
  Movements: search, filter chips and the virtualized full history.
  renderItem/keyExtractor live at module scope so row identity stays stable
  across re-renders and memoized rows are never redrawn for nothing
**/
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { tokens } from "@/core/theme/tokens";
import { DateHeader } from "../components/DateHeader";
import { FilterChips } from "../components/FilterChips";
import { MovementsSkeleton } from "../components/MovementsSkeleton";
import { SearchField } from "../components/SearchField";
import { TransactionRow } from "../components/TransactionRow";
import { useMovementsViewModel } from "../viewmodels/useMovementsViewModel";
import type { MovementsListItem } from "../viewmodels/movementsList";

const keyExtractor = (item: MovementsListItem): string => item.id;
const getItemType = (item: MovementsListItem): string => item.type;
const renderItem = ({ item }: { item: MovementsListItem }) =>
  item.type === "header" ? (
    <DateHeader label={item.label} />
  ) : (
    <TransactionRow movement={item.movement} />
  );

const LIST_CONTENT_STYLE = { paddingHorizontal: 22, paddingBottom: 24 };

export const MovementsScreen = () => {
  const vm = useMovementsViewModel();

  return (
    <SafeAreaView
      className="flex-1 bg-bg"
      edges={["top"]}
      testID="movements-screen"
    >
      <View className="px-[22px] pb-[14px] pt-2">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="font-sans-bold text-heading tracking-[-0.4px] text-ink">
            Movimientos
          </Text>
        </View>

        <SearchField value={vm.query} onChangeText={vm.onQueryChange} />

        <View className="mt-[14px]">
          <FilterChips
            filters={vm.filters}
            active={vm.filter}
            onChange={vm.onFilterChange}
          />
        </View>
      </View>

      {vm.status === "loading" ? (
        <View className="px-[22px]">
          <MovementsSkeleton />
        </View>
      ) : vm.status === "error" ? (
        <View className="items-center gap-3 px-9 py-16">
          <Text className="text-center text-[14px] text-secondary">
            No pudimos cargar tus movimientos
          </Text>
          <Pressable
            onPress={vm.onRetry}
            accessibilityRole="button"
            accessibilityLabel="Reintentar"
            testID="movements-retry"
            className="rounded-button bg-primary px-6 py-3 active:opacity-90"
          >
            <Text className="font-sans-semibold text-[14px] text-white">
              Reintentar
            </Text>
          </Pressable>
        </View>
      ) : vm.status === "empty" ? (
        <View className="items-center px-9 py-16" testID="movements-empty">
          <Text className="font-sans-semibold text-[16px] text-ink">
            Sin resultados
          </Text>
          <Text className="mt-[6px] text-center text-[13px] text-muted">
            Prueba con otra búsqueda u otro filtro
          </Text>
        </View>
      ) : (
        <FlashList
          data={vm.items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemType={getItemType}
          onEndReached={vm.onEndReached}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={LIST_CONTENT_STYLE}
          ListFooterComponent={
            vm.isFetchingMore ? (
              <View className="py-4">
                <ActivityIndicator color={tokens.color.primary} />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};
