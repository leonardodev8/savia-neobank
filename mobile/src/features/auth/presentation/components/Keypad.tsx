/**
  Custom number pad for entering the code.
  Not a TextInput, no system keyboard, no paste, no autofill.
**/
import { Pressable, Text, View } from "react-native";
import { tokens } from "@/core/theme/tokens";
import { BackspaceIcon, FaceIdIcon } from "./icons";

type KeypadProps = {
  onKeyPress: (digit: string) => void;
  onDelete: () => void;
  onBiometricPress: () => void;
  disabled?: boolean;
};

const ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
] as const;

type KeyProps = {
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
  children: React.ReactNode;
  testID?: string;
};

// A single round button used by every key
const Key = ({
  onPress,
  accessibilityLabel,
  disabled = false,
  children,
  testID,
}: KeyProps) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    testID={testID}
    className="h-[72px] w-[72px] items-center justify-center rounded-full active:bg-primary/10 disabled:opacity-40"
  >
    {children}
  </Pressable>
);

export const Keypad = ({
  onKeyPress,
  onDelete,
  onBiometricPress,
  disabled = false,
}: KeypadProps) => (
  <View className="gap-3" accessibilityRole="keyboardkey">
    {/* Rows 1-9 */}
    {ROWS.map((row) => (
      <View key={row[0]} className="flex-row justify-center gap-6">
        {row.map((digit) => (
          <Key
            key={digit}
            onPress={() => onKeyPress(digit)}
            disabled={disabled}
            accessibilityLabel={digit}
            testID={`key-${digit}`}
          >
            <Text className="font-display-medium text-[28px] text-ink">
              {digit}
            </Text>
          </Key>
        ))}
      </View>
    ))}

    {/* Bottom row: biometrics, 0, backspace */}
    <View className="flex-row justify-center gap-6">
      <Key
        onPress={onBiometricPress}
        disabled={disabled}
        accessibilityLabel="Volver a ingreso biométrico"
        testID="key-biometric"
      >
        <FaceIdIcon size={28} color={tokens.color.secondary} />
      </Key>

      <Key
        onPress={() => onKeyPress("0")}
        disabled={disabled}
        accessibilityLabel="0"
        testID="key-0"
      >
        <Text className="font-display-medium text-[28px] text-ink">0</Text>
      </Key>

      <Key
        onPress={onDelete}
        disabled={disabled}
        accessibilityLabel="Borrar"
        testID="key-delete"
      >
        <BackspaceIcon size={26} color={tokens.color.ink} />
      </Key>
    </View>
  </View>
);
