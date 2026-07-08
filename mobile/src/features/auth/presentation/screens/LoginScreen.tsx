import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tokens } from "@/core/theme/tokens";
import { BrandMark } from "../components/BrandMark";
import { FaceIdIcon, FingerprintIcon } from "../components/icons";
import { SecureNotice } from "../components/SecureNotice";
import { UserChip } from "../components/UserChip";
import { useLoginViewModel } from "../viewmodels/useLoginViewModel";

export const LoginScreen = () => {
  const vm = useLoginViewModel();

  // Show the fingerprint icon on fingerprint devices, face icon otherwise
  const BiometricIcon =
    vm.biometric.kind === "fingerprint" ? FingerprintIcon : FaceIdIcon;

  return (
    <SafeAreaView className="flex-1 bg-bg" testID="login-screen">
      {/* Top: brand, vertically centered */}
      <View className="flex-1 items-center justify-center px-9">
        <BrandMark />
      </View>

      {/* Bottom: user info + biometric login */}
      <View className="items-center px-6 pb-[30px]">
        <UserChip
          initials={vm.user.initials}
          fullName={vm.user.fullName}
          maskedAccount={vm.user.maskedAccount}
        />

        <Pressable
          onPress={vm.onBiometricPress}
          disabled={vm.isAuthenticating || !vm.biometric.available}
          accessibilityRole="button"
          accessibilityLabel={vm.biometric.actionText}
          accessibilityState={{
            disabled: vm.isAuthenticating || !vm.biometric.available,
            busy: vm.isAuthenticating,
          }}
          testID="login-biometric"
          className="mb-4 h-[86px] w-[86px] items-center justify-center rounded-full bg-primary active:opacity-90 disabled:opacity-40"
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
            <BiometricIcon size={42} />
          )}
        </Pressable>

        <Text className="font-sans-semibold text-[16px] text-ink">
          {vm.biometric.actionText}
        </Text>
        <Text className="mt-[5px] text-[13px] text-muted">
          {vm.biometric.hint}
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
