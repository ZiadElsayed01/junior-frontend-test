import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUsers, loadMore } from "../redux/usersSlice";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import LoadMoreButton from "../components/LoadMoreButton";
import type { User } from "../types/user";

export default function UserListScreen() {
  const d = useAppDispatch();
  const { items, status, error, fromCache, visibleCount } = useAppSelector(
    (s) => s.users,
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    d(fetchUsers());
  }, [d]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q
      ? items.filter((u) => u.name.toLowerCase().includes(q))
      : items;
  }, [items, search]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => <UserCard user={item} />,
    [],
  );
  const keyExtractor = useCallback((item: User) => String(item.id), []);

  const refresh = useCallback(() => {
    d(fetchUsers());
  }, [d]);
  const more = useCallback(() => {
    d(loadMore());
  }, [d]);

  const loading = status === "loading";
  const canMore = visibleCount < filtered.length;

  if (loading && !items.length)
    return (
      <SafeAreaView className="flex-1 items-center justify-center p-6 bg-background">
        <ActivityIndicator size="large" color="#000000" />
        <Text className="mt-2 text-muted-foreground text-center">
          Loading users...
        </Text>
      </SafeAreaView>
    );

  if (status === "failed" && !items.length)
    return (
      <SafeAreaView className="flex-1 items-center justify-center p-6 bg-background">
        <Text className="text-foreground text-[18px] font-extrabold">
          Could not load users
        </Text>
        <Text className="mt-2 text-muted-foreground text-center">{error}</Text>
        <Text
          className="mt-4 text-primary font-extrabold"
          onPress={refresh}
        >
          Tap to retry
        </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4">
        <View className="pt-[14px] pb-[18px]">
          <Text className="text-[32px] font-black text-foreground">Users</Text>
          <Text className="mt-1 text-[13px] text-muted-foreground">
            {fromCache ? "Offline cached data" : `${items.length} users`}
          </Text>
        </View>

        <SearchBar value={search} onChangeText={setSearch} />

        {status === "failed" && items.length > 0 && (
          <View className="mb-3 p-2.5 rounded-md bg-warning">
            <Text className="text-warning-foreground text-[12px] font-bold">
              Network unavailable. Showing cached users.
            </Text>
          </View>
        )}

        <FlatList
          data={visible}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refresh}
              tintColor="#000000"
            />
          }
          ListEmptyComponent={
            <View className="pt-20 items-center">
              <Text className="text-foreground text-[18px] font-extrabold">
                No users found
              </Text>
              <Text className="text-muted-foreground mt-2">
                Try another name.
              </Text>
            </View>
          }
          ListFooterComponent={
            visible.length > 0 ? (
              <LoadMoreButton onPress={more} disabled={!canMore} />
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 8 }}
        />
      </View>
    </SafeAreaView>
  );
}
