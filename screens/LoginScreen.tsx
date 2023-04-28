import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { globalStyles } from "../global/styles";
import { useAuthContext } from "../global/context/authContext";
import { useState } from "react";

export function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthContext();

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => login({ username, password })}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
