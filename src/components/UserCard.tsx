import { memo } from "react";
import { Text, View } from "react-native";
import type { User } from "../types/user";

function UserCard({ user }: { user: User }) {
  const address = [user.address.street, user.address.city, user.address.zipcode]
    .filter(Boolean)
    .join(", ");
  return (
    <View className="flex-row p-4 mb-[10px] bg-card rounded-lg border border-border">
      <View className="w-11 h-11 rounded-full items-center justify-center bg-primary mr-3">
        <Text className="text-primary-foreground text-[17px] font-extrabold">
          {user.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-foreground text-[16px] font-extrabold" numberOfLines={1}>
          {user.name}
        </Text>
        <Text className="mt-[3px] text-muted-foreground text-[13px]" numberOfLines={1}>
          {user.email}
        </Text>
        <Text
          className="mt-[5px] text-muted-foreground text-[12px] leading-[17px]"
          numberOfLines={2}
        >
          {address}
        </Text>
      </View>
    </View>
  );
}

export default memo(UserCard);
