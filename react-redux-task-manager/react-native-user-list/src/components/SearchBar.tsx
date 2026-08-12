import { memo } from "react";
import { StyleSheet, TextInput, View } from "react-native";
interface Props {
  value: string;
  onChangeText: (value: string) => void;
}
function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={s.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search users by name..."
        placeholderTextColor="#8a94a6"
        style={s.input}
      />
    </View>
  );
}
export default memo(SearchBar);
const s = StyleSheet.create({
  container: { marginBottom: 14 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e5ec",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#182235",
  },
});
