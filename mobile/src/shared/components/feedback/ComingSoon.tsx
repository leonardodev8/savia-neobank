/**
  Placeholder body for tab routes whose feature is not built yet
**/
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = { title: string };

export const ComingSoon = ({ title }: Props) => (
  <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
    <View className="px-[22px] pt-2">
      <Text className="font-sans-bold text-heading tracking-[-0.4px] text-ink">
        {title}
      </Text>
    </View>
    <View className="flex-1 items-center justify-center px-9 pb-16">
      <Text className="font-sans-semibold text-[16px] text-ink">
        Próximamente
      </Text>
      <Text className="mt-[6px] text-center text-[13px] text-muted">
        Estamos construyendo esta sección
      </Text>
    </View>
  </SafeAreaView>
);
