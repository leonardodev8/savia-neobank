/**
  Biometric interface used by the domain layer.
  The data layer implements it with expo-local-authentication, so no Expo, React, or native types leak in here.
**/

// Main biometric type the device offers ("facial" = Face ID / Android face unlock)
export type BiometricKind = "facial" | "fingerprint" | "iris" | "none";

export type BiometricCapability = {
  // The device has a face/fingerprint sensor
  hasHardware: boolean;
  // The user has set up a face/fingerprint in the OS
  isEnrolled: boolean;
  kind: BiometricKind;
};

// Why the prompt failed ("cancelled" just means the user dismissed it)
export type BiometricFailure =
  | "cancelled"
  | "lockout"
  | "not_enrolled"
  | "not_available"
  | "failed";

export type BiometricResult =
  | { success: true }
  | { success: false; reason: BiometricFailure };

export type BiometricPrompt = {
  promptMessage: string;
  cancelLabel: string;
};

export interface IBiometricAuthenticator {
  // What the device supports (to enable the feature and label the UI)
  getCapability(): Promise<BiometricCapability>;
  // Shows the OS prompt and returns a result (never throws)
  authenticate(prompt: BiometricPrompt): Promise<BiometricResult>;
}
