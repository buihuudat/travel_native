import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ContextProvider } from "./hook/auth";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Discover from "./screens/Discover";
import ExploreScreen from "./screens/ExploreScreen";
import HomeScreen from "./screens/HomeScreen";
import ItemScreen from "./screens/ItemScreen";
import Payment from "./screens/Payment";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DiscoverScreen" component={Discover} />
          <Stack.Screen name="ItemScreen" component={ItemScreen} />
          <Stack.Screen
            name="ExploreScreen"
            component={ExploreScreen}
            options={({ route }) => ({
              title: route.params?.title,
              headerTitleStyle: {
                fontWeight: "bold",
                color: "#2c7379",
              },
            })}
          />
          <Stack.Screen name="PaymentScreen" component={Payment} />

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
