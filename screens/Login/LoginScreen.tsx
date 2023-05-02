import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useAuthContext } from "../../global/context/authContext";
import { useState } from "react";
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie App</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => login({ username, password })}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
