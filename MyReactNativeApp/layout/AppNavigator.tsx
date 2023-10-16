// AppNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../pages/HomeScreen";
import Cart from "../pages/Cart";
import ItemScreen from "../pages/ItemScreen";
import Orders from "../pages/Orders";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
