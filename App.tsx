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

import { AccountStackScreen } from "./screens/Account/AccountScreen";
import { HomeStackScreen } from "./screens/Home/HomeScreen";
import { SearchScreen } from "./screens/Search/SearchScreen";
import { SearchContextProvider } from "./global/context/searchContext";
import { AccountContextProvider } from "./global/context/accountContext";
import { LoginScreen } from "./screens/Login/LoginScreen";
import { colors } from "./global/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <AuthContextProvider>
      <AccountContextProvider>
        <MoviesContextProvider>
          <SearchContextProvider>
            <NavigationContainer>
              <AppComponent />
            </NavigationContainer>
          </SearchContextProvider>
        </MoviesContextProvider>
      </AccountContextProvider>
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
          <Stack.Screen
            name="LogIn"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // FIXME: Clean up code
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
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        headerStyle: {
          backgroundColor: colors.background,
        },
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
        options={{ title: "Search" }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default App;
