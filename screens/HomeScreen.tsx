import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../global/styles";
import request from "../api/api";
import { useContext, useEffect } from "react";
import { Asset } from "expo-asset";
import { useAuthContext } from "../global/context/authContext";

export function HomeScreen() {
  const { userToken, login, signUp, logout } = useAuthContext();
  return (
    <View>
      {userToken && <Text>{userToken}</Text>}
      <TouchableOpacity onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signUp}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
}
