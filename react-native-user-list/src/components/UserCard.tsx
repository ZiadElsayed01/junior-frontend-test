import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { User } from "../types/user";

function UserCard({ user }: { user: User }) {
  const address = [user.address.street, user.address.city, user.address.zipcode]
    .filter(Boolean)
    .join(", ");
  return (
    <View style={s.card}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={s.content}>
        <Text style={s.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={s.email} numberOfLines={1}>
          {user.email}
        </Text>
        <Text style={s.address} numberOfLines={2}>
          {address}
        </Text>
      </View>
    </View>
  );
}
export default memo(UserCard);
const s = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e9ef",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#635bff",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  content: { flex: 1 },
  name: { color: "#182235", fontSize: 16, fontWeight: "800" },
  email: { marginTop: 3, color: "#5d687b", fontSize: 13 },
  address: { marginTop: 5, color: "#8a94a6", fontSize: 12, lineHeight: 17 },
});
