import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../global/styles";
import { useAuthContext } from "../global/context/authContext";

export function LoginScreen() {
  const { login } = useAuthContext();
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={() => login("login-test")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
