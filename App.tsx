import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";

import {
  AuthContextProvider,
  useAuthContext,
} from "./global/context/authContext";
import { MoviesContextProvider } from "./global/context/moviesContext";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthContextProvider>
      <MoviesContextProvider>
        <NavigationContainer>
          <AppComponent />
        </NavigationContainer>
      </MoviesContextProvider>
    </AuthContextProvider>
  );
}

function AppComponent() {
  const { isLoggedIn } = useAuthContext();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="LogIn" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default App;
