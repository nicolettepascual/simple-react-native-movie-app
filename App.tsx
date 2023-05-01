import * as React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  AuthContextProvider,
  useAuthContext,
} from "./global/context/authContext";
import { MoviesContextProvider } from "./global/context/moviesContext";

import { AccountScreen } from "./screens/Account/AccountScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { HomeStackScreen } from "./screens/Home/HomeScreen";
import { SearchScreen } from "./screens/Search/SearchScreen";
import { SearchContextProvider } from "./global/context/searchContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <AuthContextProvider>
      <MoviesContextProvider>
        <SearchContextProvider>
          <NavigationContainer>
            <AppComponent />
          </NavigationContainer>
        </SearchContextProvider>
      </MoviesContextProvider>
    </AuthContextProvider>
  );
};

function AppComponent() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
      ) : (
        <>
          <Stack.Screen name="LogIn" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            const iconName = focused ? "home-sharp" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Account") {
            const iconName = focused
              ? "ios-person-sharp"
              : "ios-person-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Search") {
            const iconName = focused ? "search-sharp" : "search-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "deepskyblue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default App;
