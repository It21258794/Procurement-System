import { StyleSheet } from "react-native";

import { NativeBaseProvider } from "native-base";
import Card from "./components/ItemCard";
import CustomHeader from "./layout/AppHeader";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./layout/AppNavigator";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
