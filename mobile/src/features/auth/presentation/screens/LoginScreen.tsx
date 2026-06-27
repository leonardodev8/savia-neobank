import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/core/theme/tokens";
import { BrandMark } from "../components/BrandMark";
import { FaceIdIcon } from "../components/icons";
import { SecureNotice } from "../components/SecureNotice";
import { UserChip } from "../components/UserChip";
import { useLoginViewModel } from "../viewmodels/useLoginViewModel";

export const LoginScreen = () => {
  const vm = useLoginViewModel();

  return (
    <SafeAreaView className="flex-1 bg-bg" testID="login-screen">
      {/* Top: brand, vertically centered */}
      <View className="flex-1 items-center justify-center px-9">
        <BrandMark />
      </View>

      {/* Bottom: returning user + biometric entry */}
      <View className="items-center px-6 pb-[30px]">
        <UserChip
          initials={vm.user.initials}
          fullName={vm.user.fullName}
          maskedAccount={vm.user.maskedAccount}
        />

        <Pressable
          onPress={vm.onBiometricPress}
          disabled={vm.isAuthenticating}
          accessibilityRole="button"
          accessibilityLabel="Ingresar con Face ID"
          accessibilityState={{
            disabled: vm.isAuthenticating,
            busy: vm.isAuthenticating,
          }}
          testID="login-biometric"
          className="mb-4 h-[86px] w-[86px] items-center justify-center rounded-full bg-primary active:opacity-90"
          style={{
            shadowColor: tokens.color.primary,
            shadowOpacity: 0.5,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 16 },
            elevation: 12,
          }}
        >
          {vm.isAuthenticating ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <FaceIdIcon size={42} />
          )}
        </Pressable>

        <Text className="font-sans-semibold text-[16px] text-ink">
          Ingresar con Face ID
        </Text>
        <Text className="mt-[5px] text-[13px] text-muted">
          Mira tu teléfono para continuar
        </Text>

        <Pressable
          onPress={vm.onUseCodePress}
          disabled={vm.isAuthenticating}
          accessibilityRole="button"
          accessibilityLabel="Usar código de 6 dígitos"
          testID="login-use-code"
          className="mt-[22px] active:opacity-70"
        >
          <Text className="font-sans-semibold text-[14.5px] text-primary">
            Usar código de 6 dígitos
          </Text>
        </Pressable>

        {vm.error ? (
          <Text className="mt-3 text-[13px] text-expense" testID="login-error">
            {vm.error.message}
          </Text>
        ) : null}

        <SecureNotice />
      </View>
    </SafeAreaView>
  );
};
