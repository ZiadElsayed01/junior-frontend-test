import { memo } from "react";
import { Pressable, Text } from "react-native";

interface Props {
  onPress: () => void;
  disabled: boolean;
}

function LoadMoreButton({ onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={
        disabled
          ? "items-center justify-center min-h-[46px] rounded-md bg-muted mt-1 mb-5"
          : "items-center justify-center min-h-[46px] rounded-md bg-primary mt-1 mb-5"
      }
    >
      <Text className={disabled ? "text-muted-foreground text-[14px] font-extrabold" : "text-primary-foreground text-[14px] font-extrabold"}>
        {disabled ? "All users loaded" : "Load More"}
      </Text>
    </Pressable>
  );
}

export default memo(LoadMoreButton);
