// Search box for narrowing the list by merchant or person
import { TextInput, View } from "react-native";
import { tokens } from "@/core/theme/tokens";
import { SearchIcon } from "./icons";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export const SearchField = ({ value, onChangeText }: Props) => (
  <View className="h-[46px] flex-row items-center gap-[10px] rounded-input border border-hairline bg-surface px-[14px]">
    <SearchIcon />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Buscar comercio o persona"
      placeholderTextColor={tokens.color.muted}
      className="flex-1 py-0 text-[14.5px] text-ink"
      accessibilityLabel="Buscar comercio o persona"
      testID="movements-search"
      returnKeyType="search"
      autoCorrect={false}
    />
  </View>
);
