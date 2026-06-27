/**
  Encrypted key/value for credentials (Keychain on iOS, EncryptedSharedPreferences on Android)
**/
import * as SecureStore from "expo-secure-store";

export const secureStore = {
  get: (key: string): Promise<string | null> => SecureStore.getItemAsync(key),
  set: (key: string, value: string): Promise<void> =>
    SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
    }),
  remove: (key: string): Promise<void> => SecureStore.deleteItemAsync(key),
};
