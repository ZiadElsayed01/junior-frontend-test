import { memo } from "react";
import { TextInput, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (value: string) => void;
}

function SearchBar({ value, onChangeText }: Props) {
  return (
    <View className="mb-[14px]">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search users by name..."
        placeholderTextColor="#737373"
        className="bg-card border border-border rounded-md px-[14px] py-[12px] text-[15px] text-foreground"
      />
    </View>
  );
}

export default memo(SearchBar);
