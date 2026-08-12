import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { store } from "./src/redux/store";
import UserListScreen from "./src/screens/UserListScreen";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <UserListScreen />
    </Provider>
  );
}
