import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";

import { getIsSignedIn } from "./utils/authentication";
import {
  AuthContextProvider,
  useAuthContext,
} from "./global/context/authContext";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <AppComponent />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

function AppComponent() {
  const { userToken } = useAuthContext();
  const isSignedIn = userToken !== null;
  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
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
