/**
  Connects the device's biometrics (Face ID, fingerprint, iris) to the app.
  authenticate() never throws: failures are returned as a result.
**/
import * as LocalAuthentication from "expo-local-authentication";
import type {
  BiometricCapability,
  BiometricFailure,
  BiometricKind,
  BiometricPrompt,
  BiometricResult,
  IBiometricAuthenticator,
} from "@/features/auth/domain/repositories/IBiometricAuthenticator";

// Pick the best available method: face > fingerprint > iris
const toKind = (
  types: LocalAuthentication.AuthenticationType[],
): BiometricKind => {
  if (
    types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
  ) {
    return "facial";
  }
  if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
    return "fingerprint";
  }
  if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
    return "iris";
  }
  return "none";
};

// Convert Expo authentication errors into domain failure reasons
const toFailure = (error: string | undefined): BiometricFailure => {
  switch (error) {
    case "user_cancel":
    case "system_cancel":
    case "app_cancel":
    case "user_fallback":
      return "cancelled";
    case "lockout":
    case "lockout_permanent":
      return "lockout";
    case "not_enrolled":
      return "not_enrolled";
    case "not_available":
    case "passcode_not_set":
      return "not_available";
    default:
      return "failed";
  }
};

export const biometricAuthenticator: IBiometricAuthenticator = {
  async getCapability(): Promise<BiometricCapability> {
    const [hasHardware, isEnrolled, types] = await Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.isEnrolledAsync(),
      LocalAuthentication.supportedAuthenticationTypesAsync(),
    ]);
    return { hasHardware, isEnrolled, kind: toKind(types) };
  },

  async authenticate({
    promptMessage,
    cancelLabel,
  }: BiometricPrompt): Promise<BiometricResult> {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      cancelLabel,
      // Don't use the device passcode; the app has its own PIN
      disableDeviceFallback: true,
    });

    if (result.success) return { success: true };
    return { success: false, reason: toFailure(result.error) };
  },
};
