import { memo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
interface Props {
  onPress: () => void;
  disabled: boolean;
}
function LoadMoreButton({ onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[s.button, disabled && s.disabled]}
    >
      <Text style={s.text}>{disabled ? "All users loaded" : "Load More"}</Text>
    </Pressable>
  );
}
export default memo(LoadMoreButton);
const s = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: "#635bff",
    marginTop: 4,
    marginBottom: 20,
  },
  disabled: { backgroundColor: "#b6bbc7" },
  text: { color: "#fff", fontSize: 14, fontWeight: "800" },
});
