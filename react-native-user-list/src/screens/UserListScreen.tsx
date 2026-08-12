import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
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
    return q ? items.filter((u) => u.name.toLowerCase().includes(q)) : items;
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
      <SafeAreaView style={s.center}>
        <ActivityIndicator size="large" color="#635bff" />
        <Text style={s.muted}>Loading users...</Text>
      </SafeAreaView>
    );

  if (status === "failed" && !items.length)
    return (
      <SafeAreaView style={s.center}>
        <Text style={s.error}>Could not load users</Text>
        <Text style={s.muted}>{error}</Text>
        <Text style={s.retry} onPress={refresh}>
          Tap to retry
        </Text>
      </SafeAreaView>
    );
    
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <View style={s.header}>
          <Text style={s.title}>Users</Text>
          <Text style={s.subtitle}>
            {fromCache ? "Offline cached data" : `${items.length} users`}
          </Text>
        </View>
        <SearchBar value={search} onChangeText={setSearch} />
        {status === "failed" && items.length > 0 && (
          <View style={s.warning}>
            <Text style={s.warningText}>
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
              tintColor="#635bff"
            />
          }
          ListEmptyComponent={
            <View style={s.empty}>
              <Text style={s.error}>No users found</Text>
              <Text style={s.muted}>Try another name.</Text>
            </View>
          }
          ListFooterComponent={
            visible.length > 0 ? (
              <LoadMoreButton onPress={more} disabled={!canMore} />
            ) : null
          }
          contentContainerStyle={s.list}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f7fb" },
  container: { flex: 1, paddingHorizontal: 16 },
  header: { paddingTop: 14, paddingBottom: 18 },
  title: { fontSize: 32, fontWeight: "900", color: "#182235" },
  subtitle: { marginTop: 4, fontSize: 13, color: "#7a8496" },
  list: { paddingBottom: 8 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f7fb",
  },
  muted: { marginTop: 8, color: "#7a8496", textAlign: "center" },
  error: { color: "#182235", fontSize: 18, fontWeight: "800" },
  retry: { marginTop: 16, color: "#635bff", fontWeight: "800" },
  warning: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff4dc",
  },
  warningText: { color: "#8a6500", fontSize: 12, fontWeight: "700" },
  empty: { paddingTop: 80, alignItems: "center" },
});
