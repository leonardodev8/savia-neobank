import { Text, View } from "react-native";
import { tokens } from "@/core/theme/tokens";
import { LockIcon } from "./icons";

export const SecureNotice = () => (
  <View className="mt-[26px] flex-row items-center gap-[7px]">
    <LockIcon size={13} color={tokens.color.muted} />
    <Text className="text-[11.5px] text-muted">
      Conexión segura | cifrado de extremo a extremo
    </Text>
  </View>
);
